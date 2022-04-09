---
title: FFT_module：理论知识准备
date: 2022-4-6
tags:
- fpga
- verilog
categories:
- Verilog
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>




$$J \left( \theta_0, \theta_1 \right) = \frac{1}{2m}\sum\limits_{i=1}^m \left( h_{\theta}(x^{(i)})-y^{(i)} \right)^{2}$$

### 一、DFT

1.DFT计算公式

$$ \tag{1.1}  X(k) = \sum_{n=0}^{N-1} x[n]\cdot W^{kn}_{N}   $$
$$  X(K) = \sum_{n=0}^{\frac{N}{2}-1}x[2n]\cdot W^{kn}_{\frac{N}{2}} $$



