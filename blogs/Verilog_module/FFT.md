---
title: FFT_module：理论知识准备
date: 2022-4-6
tags:
- fpga
- verilog
categories:
- Verilog
---


$$J \left( \theta_0, \theta_1 \right) = \frac{1}{2m}\sum\limits_{i=1}^m \left( h_{\theta}(x^{(i)})-y^{(i)} \right)^{2}$$

### 一、DFT

1.DFT公式

$$  X(k) = \sum_{n=0}^{N-1} x[n]\cdot W^{kn}_{N}   $$



