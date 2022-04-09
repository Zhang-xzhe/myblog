---
title: FFT_module：理论知识准备
date: 2022-4-6
tags:
- fpga
- verilog
categories:
- Verilog
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>
---


### 一、DFT

1.DFT公式

$$  X(k) = \sum_{n=0}^{N-1} x[n]\cdot W^{kn}_{N} \tag{1.1}  $$


