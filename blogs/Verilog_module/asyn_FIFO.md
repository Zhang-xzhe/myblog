---
title: 异步FIFO_module
date: 2022-4-23
tags:
- fpga
- verilog
categories:
- Verilog
---

# 一、异步FIFO的概念
与同步FIFO相同，是一种缓存模块，为了协调前后的数据，特别是衔接时钟不同步的模块或系统。这样的情况太常见了，所以这样的FIFO应用相当广泛。
# 二、异步FIFO带来的问题
与同步FIFO不同，异步FIFO的读写时钟是不同步的。不同步会带来问题吗？从同步FIFO的结构中我们可以看到，其本质就是一块环状存储区域，在尾部读出，在头部写入，所以存储的不同数据是独立的，所以可以施行异步FIFO。但是FIFO中最困难的一部分就是储存区域状态的判断，若为空则不能读出，若为满则不能写入，同步FIFO中通过直接比较读写地址就可以判断，但是在异步FIFO中是不行的，由于读写时钟不同步，可能在比较时有一方正在变化，出现亚稳态，导致错误。
# 三、异步FIFO的解决方案
依旧采用同步FIFO的基础结构，在此之上修改标志位判断的问题。为了应对上述问题，主要的解决措施有两步：
### 1、插入一级做缓冲
因为时钟不同步，所以当读写地址比较时某一方地址可能不稳定，会出现亚稳态的情况。亚稳态是极其不稳定的，它会在高电平和低电平的中间位置停留一个不确定的时间，最终可能受噪声扰动达到高电平或者低电平。我们不能确定其停留的时间也不能确定最后是高电平还是低电平。基于这样的情况，我们可以利用加一级寄存器的方式来解决。比如当输入由0变为1时，恰好输出，我们在其中加入一级寄存器（这样我们输出有两级寄存器，第一级为我们加入的，第二级为我们原先的），第二级寄存器输出的是上一个时钟的第一级寄存器的输出，由于第一第二级是同一时钟源，故不会出现亚稳态。若第一级寄存器出现亚稳态，在一个时钟周期内有十分大的可能性会最终变为0或1，若出现0则输出没有采集到输入的变化，但是当下一时钟到来时输入早已经稳定，此时可以采集到1，若出现1则采集到变化，所以最后的情况是都能采集到信号，但是会有不确定的延时。这比将亚稳态信号直接输出给组合电路要安全得多。
### 2、采用格雷编码
上述我们采用了插入寄存器的方法解决了一位寄存器出现亚稳态的情况，下面我们将讨论多位数据如何避免亚稳态。当多位数据出现亚稳态时比如011加1变为100时，3位输出都发生变化，若按上述的方法插入寄存器，则可能有些位提前捕捉到，有些位没有，导致发生紊乱。比如其中第一位0变为1，寄存器捕捉到了，为1，而2，3为1变为0，亚稳态最终稳定在1，则会在其中一个时钟出现111这样的数值，这是我们不想看到的。所以我们想到能不能多位寄存器每次仅仅之有一位变化，我们想到了格雷码来编码地址。
### 3、空和满在不同的时钟域进行判断
当我们读数据时需要知道现在FIFO中是否还有数据，所以我们将写地址同步到读时钟域来判断，同理，将读时钟同步到写时钟域来判断。
# 四、程序源码
```verilog
`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 2022/04/23 21:18:12
// Design Name: 
// Module Name: asyn_FIFO
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////


module asyn_FIFO#(
    parameter DATA_WIDTH = 16,
    parameter ADDR_WIDTH = 40
    )(
    input rclk,wclk,ren,wen,rst_n,
    input [ DATA_WIDTH-1:0] datain,
    
    output empty,full,
    output reg vaild,
    output reg [ DATA_WIDTH-1:0] dataout
    );
    reg [ ADDR_WIDTH:0] waddr;
    reg [ ADDR_WIDTH:0] raddr;
    reg [ DATA_WIDTH-1:0] ram [ ADDR_WIDTH-1:0];
    
    wire [ ADDR_WIDTH:0] gray_waddr;
    reg [ ADDR_WIDTH:0] temp_gray_waddr;
    reg [ ADDR_WIDTH:0] syn_gray_waddr;
    wire [ ADDR_WIDTH:0] gray_raddr;
    reg [ ADDR_WIDTH:0] temp_gray_raddr;
    reg [ ADDR_WIDTH:0] syn_gray_raddr;
    ///////////////////////////////////////////读数据 
    always@(posedge rclk)
    begin
        if(!rst_n)//若复位则归零读地址
        begin
            raddr <= 0;
        end
        else
        begin
            if(!empty&&ren)//如果读使能且不为空则读取数据，读地址加一
            begin
                dataout <= ram[ raddr[ ADDR_WIDTH-1:0]];
                vaild <= 1;
                raddr <= raddr+1;
            end
            else
            begin//如果复位也不能读，则不变
                dataout <= dataout;
                raddr <= raddr;
                vaild <= 0;
            end
         end
     end
     
     ////////////////////////////////////////写数据 
     always@(posedge wclk)
     begin
        if(!rst_n)//若复位则归零写地址
        begin
            waddr <= 0;
        end
        else
        begin
            if(!full&&wen)
            begin
                ram[ waddr[ ADDR_WIDTH-1:0]] <= datain;
                waddr = waddr+1;
            end
            else
            begin//如果复位也不能读，则不变
                waddr <= waddr;
            end
         end
        
     end
     /////////////////////////////////////同步采用格雷码 
     assign gray_raddr = (raddr>>1)^raddr;
     assign gray_waddr = (waddr>>1)^waddr;  
     
     //////////////////////////////////////将读地址同步到写时钟域
     always@(posedge wclk)
     begin
        temp_gray_raddr <= gray_raddr;//插入缓存
        syn_gray_raddr <= temp_gray_raddr;//获得稳定的同步信号 
     end

     /////////////////////////////////////将写地址同步到读时钟域 
     always@(posedge rclk)
     begin
        temp_gray_waddr <= gray_waddr;//插入缓存
        syn_gray_waddr <= temp_gray_waddr;//获得稳定的同步信号 
     end
     
     ////////////////////////////////////满空信号产生,用格雷码比较 
     assign full = (gray_waddr == {~(syn_gray_raddr[ ADDR_WIDTH:ADDR_WIDTH-1]),syn_gray_raddr[ ADDR_WIDTH-2:0]});
     assign empty = (gray_raddr == syn_gray_waddr); 
     
endmodule

```
拷贝此testbench来使用时需要注意，输入数据是存放在一个txt下的，具体可以看readmemb函数。这个txt需要自己创建，自己输入一些数据，并更改相关路径。
```verilog
`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 2022/04/24 16:46:09
// Design Name: 
// Module Name: asyn_FIFO_tb
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////


module asyn_FIFO_tb(
    );
    parameter ADDR_WIDTH = 40;
    parameter DATA_WIDTH = 16;
    
    reg wclk,rclk,wen,ren,rst_n;
    reg [ DATA_WIDTH-1:0] datain;
    
    wire full,empty,vaild;
    wire [ DATA_WIDTH-1:0] dataout;
    
    reg [ DATA_WIDTH-1:0] inputdata [40:0];
    integer count_rdata;
    integer rdata;
    
    asyn_FIFO u1(
    .wclk(wclk),
    .rclk(rclk),
    .wen(wen),
    .ren(ren),
    .rst_n(rst_n),
    .datain(datain),
    .dataout(dataout),
    .full(full),
    .empty(empty),
    .vaild(vaild));
    
    initial//写时钟
    begin
        wclk = 0;
        forever #5 wclk=~wclk;
    end
    
    initial//读时钟
    begin
        rclk = 0;
        forever #6 rclk=~rclk;
    end
    
    initial
    begin
        wen = 0;
        ren = 0;
        rst_n = 1;
        datain = 0;
        #10 rst_n = 0;
        #100 rst_n = 1;
   end
   
   initial
   begin
       #110
       $readmemb("C:/Xilinx/myproject/asyn_FIFO/data.txt",inputdata);
   end
   
   initial
   begin
        count_rdata = 0;
        rdata = $fopen("C:/Xilinx/myproject/outputdata.txt","w");
   end
   
   integer i;
   initial//写数据
   #1000
   begin
        for(i = 0;i < 40;i = i+1)
        begin
            @(posedge wclk)
            begin
                wen <= 1;
                datain <= inputdata[i];
            end
            @(posedge wclk)
            begin
                wen <= 0;
            end
            repeat(10)@(posedge wclk);
       end
   end
 
 
   integer j;
   initial//读数据
   #1000
   begin
        for(j = 0;j < 40;j = j+1)
        begin
            @(posedge rclk)
            begin
                ren <= 1;
            end
            @(posedge rclk)
            begin
                ren <= 0;
            end
            repeat(10)@(posedge rclk);
       end
   end 

    always@(posedge rclk)
    begin
        if(vaild)
        begin
            count_rdata = count_rdata +1;
            if(count_rdata==40)
            begin
                $fclose(rdata);
            end
            $fwrite(rdata,"%b\n",$signed(dataout));
        end
    end
   
     
endmodule

```