---
title: Stable Online Computation Offloading via Lyapunov-guided Deep Reinforcement Learing
date: 2022-4-26
tags:
- MEC
- computation offload
- DRL
- math
categories:
- Paper
---
# 通过Lyapunov引导的深度强化学习

## _Abstract_

<font size=5>**背景**：</font>这篇文章中我们考虑一个时变无线信道下在顺序时隙中随机用户任务数据到达的多用户MEC网络。

<font size=5>**问题**：</font>我们打算设计一个在长期数据序列稳定，平均功率受限的条件下，设计一个在线的计算卸载算法来最大化网络数据处理能力。从 为每个时间帧在没有未来信道条件和数据到来假设下的决定 的意义上来说，在线算法是实际的。我们把在连续时间帧中二元计算卸载（要么全部用户算要么全部服务器算）和系统资源分配联合处理的问题建模为一个多阶随机混合整数非线性规划（MINLP）问题。

<font size=5>**方法**：</font>为了耦合不同时间帧的决定，我们提出了一个新颖的网络LyDROO，它结合了Lyapunov和
DRL。特别是LyDROO首次应用Lyapunov优化将多阶随机MINLP问题解耦为确定的每帧更小的MINLP子问题。其次，它结合了有模型的优化和没有模型的DRL在低计算复杂度的条件下解决每帧的MINLP问题。

<font size=5>**结果**：</font>仿真结果显示在满足所有长期限制下，我们提出的LyDROO实现了最佳计算性能。除此之外除此之外它非常低的执行时延非常适合快衰落环境