---
title: Vitis_accel(1)
date: 2023-10-19
tags:
- FPGA_Soc
categories:
- FPGA
---
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>

# Vitis 软件介绍
Vitis是一个Xilinx推出的一个既可以开发SOC中ARM核应用的，又可以开发PL的开发套件.

在Soc开发时，vitis需要先构建一个包含操作系统和一定硬件配置的基本平台（.xfpm）。在这个基础上添加ARM核上的程序以及PL部分，ARM核上的程序以ELF文件的形式添加到platform中，PL部分被编译成kernel以xo文件的形式添加到platform中，最后将ELF文件，XO文件以及xfpm文件等一起编译为一个image，下载到板子中,如下图所示：

<a href="https://sm.ms/image/jcyuSVNHKbMwr23" target="_blank"><img src="https://s2.loli.net/2023/10/20/jcyuSVNHKbMwr23.png" ></a>

# Vitis开发准备
Vits开发需要
1.Vitis这一套软件，这个可以用官方下载链接下载：https://www.xilinx.com/support/download/index.html/content/xilinx/en/downloadNav/vitis.html
2.除此之外，我们还需要用到一个叫做XRT的库，这个库也可以在上面的链接中找到，而且一般在下载软件的过程中，就自动帮忙装了。
3，platform，这个是最麻烦的，因为每个板子都不一样，官方只提供了几个评估板的platform。而且这些platform应该需要配置板子上所有usb口等硬件设备，后面才能够使用这些硬件设备。下面小节将介绍PYNQ-ZU板子的Platform的构建。


### PYNQ-ZU Platform 
PS:强烈建议刚开始搞这个的时候买Xilinx自己的开发板，Xilinx提供了这些板子的platform：
<a href="https://sm.ms/image/xc46f5LkU9AzylH" target="_blank"><img src="https://s2.loli.net/2023/10/20/xc46f5LkU9AzylH.png" ></a>

不幸，我得用PYNQ-ZU开发硬件加速，所以这里提供了参考：
Platform需要以下几部分：
1.XSA
2.Device_tree
3.Common inmage

1.PYNQ-ZU的vivado文件
