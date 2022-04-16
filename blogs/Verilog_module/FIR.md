---
title: FIR_module:全流水，位宽增长不控制版
date: 2022-3-26
tags:
- fpga
- verilog
categories:
- Verilog
---
# FIR Design
## 一、原理
（略）
## 二、Matalb模拟
系数格式转换
```matlab
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%                       本程序用于辅助生成滤波器系数
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

coeff_temp = zeros(1,length(Num));
for i = 1:length(Num)
    j = 0;
    if Num(i) > 0
        coeff_temp(i) = floor(Num(i)*2.^18);
    else
        coeff_temp(i) = floor(2.^18+Num(i)*2.^18);
    end
end

coefficient = de2bi(coeff_temp,18,"left-msb");
pre = sprintf("19'b");
later = sprintf(";\n");
verilog_coeff = [];

for i = 1:185
    prepre = sprintf("assign cof[%d] = ",i-1);
    verilog_coeff_temp = sprintf("%d%d",coefficient(i,1),coefficient(i,:));
    verilog_coeff_new_temp = strcat(prepre,pre,verilog_coeff_temp,later);
    verilog_coeff = strcat(verilog_coeff,verilog_coeff_new_temp);
end
display(verilog_coeff)
```
模拟代码
```matlab
figure(1)
plot(de_signal)                                                               %信号波形
figure(2)
plot(Num)                                                                  %滤波器系数波形
data = zeros(1,185);                                                       %模拟输入寄存器
add_data = zeros(1,93);                                                    %模拟相加后的波形
mult_data = zeros(1,93);                                                   %模拟相乘后的波形
signal_out = zeros(1,1000);
for i = 1:1000
    signal_in = de_signal(i);

    %检查信号输入
    
    temp1_bi = de2bi(de_signal,16,"left-msb");
    temp1_bits = sprintf("%d%d",temp1_bi);



    j = length(data);
    while(1)
        data(j) = data(j-1);
        if j == 2
            break
        end
        j = j-1;
    end
    data(1) = signal_in;
    for k = 1:floor(length(data)/2+1)
        if k ~= 93
        add_data(k) = data(k)+data(186-k);
        else
            add_data(k) = data(93);
        end
    end
%     %=====================================================================%
%     %显示add_data
%     temp2 = zeros(1,93);
%     temp2_bi = zeros(93,17);
%     temp2_bits = [];
%     for w = 1:length(add_data)
%         temp2(w) = floor(add_data(w)*2.^15+2.^15);
%         temp2_bi(w,:) = de2bi(temp2(w),17,"left-msb");
%         temp2_bits_new = sprintf("%d",temp2_bi(w,:));
%         temp2_bits = [temp2_bits,temp2_bits_new];
%     end
    
    
    
    mult_data = add_data.*Num(1:length(add_data))*2.^18;
%     %=====================================================================%
%     %显示mul——data
%     temp3 = zeros(1,length(mult_data));
%     temp3_bits = [];
%     for w = 1:length(mult_data)
%         tt = floor(mult_data.*2.^33);
%         if mult_data(w) >= 0
%             temp3(w) = tt(w);
%         else
%             temp3(w) = 2.^36 + tt(w);
%         end
%     end
%     temp3_bi = de2bi(temp3,36,"left-msb");
%     for w = 1:length(temp3)
%         temp3_bits_new = sprintf("%d",temp3_bi(w,:));
%         temp3_bits = [temp3_bits,temp3_bits_new];
%     end


    signal_out(i) = sum(mult_data);
end
figure(3)
plot(signal_out)


coeff_temp1 = zeros(1,length(signal_out));
for i = 1:length(signal_out)
    if signal_out(i) > 0
        coeff_temp1(i) = floor(signal_out(i));
    else
        coeff_temp1(i) = floor(2.^43+signal_out(i));
    end
end

coefficient = de2bi(coeff_temp1,43,"left-msb");
pre = sprintf("19'b");
later = sprintf(";\n");
verilog_coeff = [];

for i = 1:length(signal_out)
    prepre = sprintf("assign cof[%d] = ",i-1);
    verilog_coeff_temp = sprintf("%d%d",coefficient(i,1),coefficient(i,:));
    verilog_coeff_new_temp = strcat(prepre,pre,verilog_coeff_temp,later);
    verilog_coeff = strcat(verilog_coeff,verilog_coeff_new_temp);
end
display(verilog_coeff)

ERROR = signal_out(1:800)-K(1:800)';
```
辅助产生verilog输入
```matlab
clear all;close all;clc;
%=======================================================
% generating a cos wave data with txt hex format
%=======================================================
%% 
fc          = 0.25e6 ;
fn          = 7.5e6 ;
Fs          = 50e6 ;
T           = 1/fc ;
Num         = Fs * T ;
t           = (0:Num-1)/Fs ;
cosx        = cos(2*pi*fc*t) ;
cosn        = cos(2*pi*fn*t) ;
cosy        = mapminmax(cosx + cosn) ;
cosy_dig    = floor((2^11-1) * cosy + 2^11) ;
% fid         = fopen('cosx0p25m7p5m12bit.txt', 'wt') ;
% fprintf(fid, '%x\n', cosy_dig) ;
% fclose(fid) ;

%时域波形
figure(1)
subplot(121);plot(t,cosx);
hold on ; plot(t,cosn) ;
subplot(122);plot(t,cosy_dig) ;

%频域波形
fft_cosy    = fftshift(fft(cosy, Num)) ;
f_axis      = (-Num/2 : Num/2 - 1) * (Fs/Num) ;
figure(5) ;
plot(f_axis, abs(fft_cosy)) ;


% coef * 2^11 



```
## 三、Verilog源码
```verilog
`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 2022/03/19 22:01:05
// Design Name: 
// Module Name: FIR_Design
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
//185阶 19位

module FIR_Design#(parameter Input_signal_width = 16, parameter coef_width = 19)(
input clk,
input rest_n,
input [Input_signal_width-1:0] signal_in,
output reg signed [42:0] signal_out
    );
    
   
reg [15:0] data[184:0];           //用于存储输入数据流 
wire signed [18:0] cof[92:0];             //滤波器系数因为对称所以记录一半即可
reg signed [17:0] add_data[92:0];        //用存放经过第一次加法后的数据 
reg signed [36:0] mult_data[92:0];       //用于存放经过乘法后的数据
reg signed [39:0] sum1[11:0];            //用于存放乘法后第一次求和 
reg [7:0] i;
reg [7:0] j;
   //数据移位
   always @(posedge clk or negedge rest_n) 
   begin
        if (!rest_n) 
        begin
            for (i = 0; i<185; i=i+1) 
            begin
                data[i]  <= 19'b0;
            end
        end
        else  
        begin
            data[0] <= signal_in ;
            for (j=0; j<184; j=j+1) begin
                data[j+1] <= data[j] ; //周期性移位操作
            end
        end
    end
    //利用FIR的对称性减少一半的乘法器，先首尾相加再进行乘法
        always@(*)
        begin
            for (i = 0;i<93;i = i+1)
            begin
                if (i != 92)
                begin
                    add_data[i] <= data[i] +data[184-i]; 
                end
                else
                begin
                    add_data[i] <= data[i];
                end
            end
        end
    
   //乘法系数
     assign cof[0] = 19'b0000000000000101011;
     assign cof[1] = 19'b0000000000001101101;
     assign cof[2] = 19'b0000000000010100001;
     assign cof[3] = 19'b0000000000001100001;
     assign cof[4] = 19'b1111111111101001000;
     assign cof[5] = 19'b1111111110101000010;
     assign cof[6] = 19'b1111111101011010010;
     assign cof[7] = 19'b1111111100100000011;
     assign cof[8] = 19'b1111111100011100111;
     assign cof[9] = 19'b1111111101011100111;
     assign cof[10] = 19'b1111111111001001011;
     assign cof[11] = 19'b0000000000101111100;
     assign cof[12] = 19'b0000000001011100111;
     assign cof[13] = 19'b0000000000111111111;
     assign cof[14] = 19'b1111111111110101110;
     assign cof[15] = 19'b1111111110110111101;
     assign cof[16] = 19'b1111111110110011010;
     assign cof[17] = 19'b1111111111101001111;
     assign cof[18] = 19'b0000000000101111011;
     assign cof[19] = 19'b0000000001001100011;
     assign cof[20] = 19'b0000000000101001111;
     assign cof[21] = 19'b1111111111100100011;
     assign cof[22] = 19'b1111111110110101101;
     assign cof[23] = 19'b1111111111000101101;
     assign cof[24] = 19'b0000000000001000011;
     assign cof[25] = 19'b0000000001000110001;
     assign cof[26] = 19'b0000000001001001001;
     assign cof[27] = 19'b0000000000001100010;
     assign cof[28] = 19'b1111111111000001101;
     assign cof[29] = 19'b1111111110101010000;
     assign cof[30] = 19'b1111111111011101010;
     assign cof[31] = 19'b0000000000110010011;
     assign cof[32] = 19'b0000000001100000000;
     assign cof[33] = 19'b0000000000111011001;
     assign cof[34] = 19'b1111111111011111000;
     assign cof[35] = 19'b1111111110011010000;
     assign cof[36] = 19'b1111111110101011010;
     assign cof[37] = 19'b0000000000001001100;
     assign cof[38] = 19'b0000000001100110000;
     assign cof[39] = 19'b0000000001101101111;
     assign cof[40] = 19'b0000000000010011111;
     assign cof[41] = 19'b1111111110100001011;
     assign cof[42] = 19'b1111111101111011011;
     assign cof[43] = 19'b1111111111001001100;
     assign cof[44] = 19'b0000000001001110110;
     assign cof[45] = 19'b0000000010010111011;
     assign cof[46] = 19'b0000000001011101100;
     assign cof[47] = 19'b1111111111001011000;
     assign cof[48] = 19'b1111111101011100111;
     assign cof[49] = 19'b1111111101111001000;
     assign cof[50] = 19'b0000000000010001000;
     assign cof[51] = 19'b0000000010100101110;
     assign cof[52] = 19'b0000000010110000111;
     assign cof[53] = 19'b0000000000011101010;
     assign cof[54] = 19'b1111111101100011001;
     assign cof[55] = 19'b1111111100100111100;
     assign cof[56] = 19'b1111111110101010101;
     assign cof[57] = 19'b0000000010000110001;
     assign cof[58] = 19'b0000000011111010110;
     assign cof[59] = 19'b0000000010010110010;
     assign cof[60] = 19'b1111111110100000110;
     assign cof[61] = 19'b1111111011101011111;
     assign cof[62] = 19'b1111111100100001101;
     assign cof[63] = 19'b0000000000100110100;
     assign cof[64] = 19'b0000000100100000101;
     assign cof[65] = 19'b0000000100101011101;
     assign cof[66] = 19'b0000000000100110010;
     assign cof[67] = 19'b1111111011100011111;
     assign cof[68] = 19'b1111111010000100011;
     assign cof[69] = 19'b1111111101110110101;
     assign cof[70] = 19'b0000000100000001011;
     assign cof[71] = 19'b0000000111001011110;
     assign cof[72] = 19'b0000000100000110000;
     assign cof[73] = 19'b1111111100110110100;
     assign cof[74] = 19'b1111110111100111001;
     assign cof[75] = 19'b1111111001011110000;
     assign cof[76] = 19'b0000000001101010101;
     assign cof[77] = 19'b0000001001100000010;
     assign cof[78] = 19'b0000001001101000100;
     assign cof[79] = 19'b0000000000101100100;
     assign cof[80] = 19'b1111110101100000111;
     assign cof[81] = 19'b1111110010001100111;
     assign cof[82] = 19'b1111111011011110110;
     assign cof[83] = 19'b0000001011010010111;
     assign cof[84] = 19'b0000010100000100110;
     assign cof[85] = 19'b0000001011010111001;
     assign cof[86] = 19'b1111110100000110100;
     assign cof[87] = 19'b1111011111111000010;
     assign cof[88] = 19'b1111100100100001000;
     assign cof[89] = 19'b0000001100010001010;
     assign cof[90] = 19'b0001001011111000001;
     assign cof[91] = 19'b0010000110100001001;
     assign cof[92] = 19'b0010011110010001011;
     
    //乘法计算
    always@(*)
    begin
        for(i = 0;i<93;i = i+1)
        begin
            mult_data[i] = $signed(add_data[i])*cof[i];
        end
    end
    
    
    //加法计算 
    always@(*)
    begin
        for(i = 0;i<87;i = i+8)
        begin
            sum1[i/8] <= mult_data[i]+mult_data[i+1]+mult_data[i+2]+mult_data[i+3]+mult_data[i+4]+mult_data[i+5]+mult_data[i+6]+mult_data[i+7];
        end
        sum1[11] = mult_data[88]+mult_data[89]+mult_data[90]+mult_data[91]+mult_data[92];
        signal_out = sum1[0]+sum1[1]+sum1[2]+sum1[3]+sum1[4]+sum1[5]+sum1[6]+sum1[7]+sum1[8]+sum1[9]+sum1[10]+sum1[11];
    end
    
endmodule

```