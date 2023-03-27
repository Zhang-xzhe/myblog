---
title: Statistical signal processing(2)
date: 2023-3-1
tags:
- math
- signal processing
categories:
- signal processing
---
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>

\
<a href="https://sm.ms/image/SgP2BX8enLwzRtC" target="_blank"><img src="https://s2.loli.net/2023/03/01/SgP2BX8enLwzRtC.png" ></a>

# Lecture 4: Sufficient Statistics

It is a new concept to me. 

$\textbf{ Definition 1 }$ : When the model of the distribution is known and many observation is accessible, finding a function to map from observation to the parameters of the distribution of random variable is called sufficient statistics.

该模型将信道表示为三个项的线性组合，分别代表直接路径、仅由地面反射的路径和多径路径。其中，第一个项是直接路径。$\alpha_{Tx}$表示第i个天线和第k个子载波之间的信道增益，其计算公式为$\frac{\lambda P_tG_tG_r}{4\pi l_{Tx}}$。其中，$P_t$为发送信号的幅度，$G_t$和$G_r$分别为发射和接收天线的增益，$l_{Tx}$为发送端和接收端之间的距离，$\phi_{Tx}$表示信号的到达角度，$\lambda_k$为第k个子载波的波长。

第二个项是仅由地面反射的路径。$\alpha_g$表示该路径的信道增益，其计算公式为$\frac{\lambda P_tG_tG_r}{4\pi l_{g}}\gamma_ge^{j\theta_g}$，其中$\gamma_g = \frac{sin\theta-Z}{sin\theta+Z}$，$\theta$为反射角度，$Z = \frac{\sqrt{\varepsilon_r-cos^2\theta}}{\varepsilon_r}$，$\varepsilon_r$为地面的相对介电常数，$l_g$为该路径的长度。

第三个项是多径路径。$\alpha_n$表示该路径的信道增益，其计算公式为$\frac{\lambda P_tG_tG_rR_n}{4\pi ||r_n-r_{rx}||}e^{j\theta_n}$，其中$R_n$为发射端和该路径上最后一个反射体之间的衰减，$r_n$为最后一个反射体的位置，$r_{rx}$为接收端的位置。如果只考虑单次反射，则$R_n = \frac{\gamma}{4\pi ||r_{Tx}-r_n||}$，$l_n$为该路径的总长度。