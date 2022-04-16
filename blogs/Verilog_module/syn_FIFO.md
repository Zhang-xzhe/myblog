---
title: 同步FIFO_module
date: 2022-4-16
tags:
- fpga
- verilog
categories:
- Verilog
---

# 一、同步FIFO的概念
### 1.FIFO
先入先出存储器，常用作数据缓存
### 2.同步
写入时钟与读取时钟相同，故常在同一个系统内使用，用于数据缓冲

# 二、Verilog设计
### 设计思路

使用循环的存储器存储FIFO数据，使用读写两个指针进行操作

考虑其功能主要有三：写入，读取，标识
其中写入，写出由于指针的引入变得相对独立，且均只能在时钟到时锁存，故采用always块组合逻辑
标识可以用指针的关系求得，由于标志位应该根据指针的关系实时变化，故需采用组合逻辑always@（*）或assign

### 源码
```verilog
`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 2022/04/16 15:25:19
// Design Name: 
// Module Name: syn_fifo
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


module syn_fifo#(
parameter data_width = 16,
parameter addr_width = 5,
parameter remain_num = 4)(
input clk,rst_n,
input wr_en,rd_en,
input [data_width-1:0] wr_data,

output reg valid,full,empty,near_full,
output reg [ data_width-1:0] rd_data
    );
    reg [ addr_width:0] rd_addr;//read address
    reg [ addr_width:0] wr_addr;//write address
    reg [ data_width-1:0] ram[ {addr_width{1'b1}}:0];//ram storage
    
    
    ///////////////////////////////////////////////////describe the register that store the data
    always@(posedge clk)
    begin
        if (!rst_n)
        begin
            wr_addr <= 0;//复位将写地址置零,没必要清空所有数据，我们仅仅关心在指针范围内的
        end
        else
        begin
            if(wr_en&&(!full))
            begin
                ram[ wr_addr] <= wr_data;
                wr_addr <= wr_addr + 1;
            end
        end
    end
    
    ////////////////////////////////////////////////////describe the register that launch the data
    always@(posedge clk)
    begin
        if (!rst_n)
        begin
            rd_addr <= 0;//复位将写地址置零
        end
        else
        begin
            if(!empty)
            begin
                valid <= 1;
                rd_data <= ram[ rd_addr];
                rd_addr <= rd_addr+1;
            end
            else
            begin
                valid <= 0;
            end
        end
    end
    
    /////////////////////////////////////////////////////check full 
    always@(*)
    begin
        if(wr_addr==rd_addr) empty = 1;
        else
        begin
            if(wr_addr[ addr_width-1:0]==rd_addr[ addr_width-1:0])full = 1;
            else
            begin
                if(wr_addr[ addr_width-1:0] <= rd_addr[ addr_width-1:0]+remain_num)
                begin
                    near_full = 1;
                end
            end
        end
    end
endmodule

```

### Testbench
```verilog
`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 2022/04/16 17:02:26
// Design Name: 
// Module Name: syn_fifo_tb
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


module syn_fifo_tb#(
parameter addr_width = 5,
parameter data_width = 16,
parameter remain_num = 4
)();
    reg clk,rst_n,wr_en,rd_en;
    reg [ data_width-1:0] wr_data;
    
    wire valid,empty,full,near_full;
    wire [ data_width-1:0] rd_data;
    
    syn_fifo u1(
    .clk(clk),
    .rst_n(rst_n),
    .wr_en(wr_en),
    .rd_en(rd_en),
    .valid(valid),
    .empty(empty),
    .full(full),
    .near_full(near_full),
    .wr_data(wr_data),
    .rd_data(rd_data)
    );
    
    ///////////////////////////////clock module
    initial
    begin
        clk = 1;
        forever #5 clk =~clk;
    end
    
    ///////////////////////////////reset
    initial
    begin
        rst_n = 1;
        wr_en = 0;
        rd_en = 0;
        wr_data = 0;
        #50 rst_n = 0;
        #50 rst_n = 1;
    end
    
    ///////////////////////////////input data from txt
    reg [ data_width-1:0] input_data [9:0];
    initial
    begin
        #500;
        $readmemb("C:/Xilinx/myproject/syn_fifo/input_syn_data_b.txt",input_data);
    end
    
    //////////////////////////////output data to txt
    integer cnt_rd_data;
    integer fp_rd_data;
    initial
    begin
        cnt_rd_data = 0; 
        fp_rd_data = $fopen("C:/Xilinx/myproject/syn_fifo/output_syn_data_b.txt","w");
    end
    
    /////////////////////////////write data to mudule and read it 
    integer ii;
    initial 
    begin
        ii = 0;
        #1000 
        for(ii = 0;ii<10;ii = ii+1)
        begin
            @(posedge clk)begin
                wr_en <= 1;
                wr_data <= input_data[ii];
            end
            @(negedge clk)
            begin
                wr_en <= 0;
            end
            repeat(10)@(negedge clk);
        end
        
        for(ii = 0;ii<10;ii = ii+1)
        begin
            @(negedge clk)
            begin
                rd_en <= 1;
            end
            @(negedge clk)
            begin
                wr_en <= 0;
            end
            repeat(10)@(negedge clk);
        end        
    end
    

    always@(negedge clk)
    begin
        if(u1.valid)
        begin
            cnt_rd_data = cnt_rd_data + 1;
            if(cnt_rd_data == 9)
            begin
                $fclose(fp_rd_data);
            end
            $fwrite(fp_rd_data,"%b\n", $signed(u1.rd_data));
        end
    end
endmodule

```