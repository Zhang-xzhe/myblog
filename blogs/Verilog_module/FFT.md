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






### 一、DFT

1.DFT计算公式

$$   X(k) = \sum_{n=0}^{N-1} x[n]\cdot W^{kn}_{N}   $$
其中：$ W^{kn}_{N}=e^{-j\frac{2\pi}{N}kn} $，我们可以将其写作:
$$  X(k) = \sum_{n=0}^{\frac{N}{2}-1}x[2n]\cdot W^{2kn}_{N}+\sum_{n=0}^{\frac{N}{2}-1}x[2n+1]\cdot W^{k[2n+1]}_{N} $$
利用 $ W^{2kn}_{N}=e^{-j\frac{2\pi}{N} \cdot 2kn}=e^{-j\frac{2\pi}{\frac{N}{2}}kn}=W^{2kn}_{\frac{N}{2}} $,我们可以得到：
$$  X(k) = \sum_{n=0}^{\frac{N}{2}-1}x[2n]\cdot W^{kn}_{\frac{N}{2}}+W^{k}_{N}\sum_{n=0}^{\frac{N}{2}-1}x[2n+1]\cdot W^{kn}_{\frac{N}{2}} $$
不难发现其中:
$$ X(k) = \sum_{n=0}^{\frac{N}{2}-1}x[2n]\cdot W^{kn}_{\frac{N}{2}} $$
为原输入信号x[n]，偶数点的傅里叶变换（共$\frac{N}{2}$个点），而且
$$ X(k) = \sum_{n=0}^{\frac{N}{2}-1}x[2n+1]\cdot W^{kn}_{\frac{N}{2}} $$
为原输入信号x[n]，奇数点的傅里叶变换（共$\frac{N}{2}$个点），所以上式可以表示为：
$$  X(k) = DFT(x[n])_{n~\epsilon~even}+W^{k}_{N} \cdot DFT(x[n])_{n~\epsilon~odd} $$
同理

