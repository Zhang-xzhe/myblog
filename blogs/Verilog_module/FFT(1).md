---
title: FFT_module：项目规划
date: 2022-4-6
tags:
- fpga
- verilog
categories:
- Verilog
---

### 一、脚本仿真

`task1`：信号点数为2，3，4，5的幂的FFT仿真

`task2`：信号点数为2，3，4，5的混合次幂的仿真

`task3`：对最小butterfly进行优化后进行上述仿真


### 二、C_module

`task1`：将脚本文件中算法使用二进制bit级描述

`task2`：考虑硬件实现index_generater的复杂度，关注Verilog实现

`task3`：对各个单元进行仿真

### 三、Verilog

`module1`：different butterflies that based on different radix 

`module2`：index_generater

`module3`：buffer

`module4`：top_module
