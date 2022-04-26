---
title: Energy-Efficient Mobile-Edge Computation Offloading for Applications With Shared Date
date: 2022-4-26
tags:
- MEC
- math
- convex
categories:
- Paper
---
# 共享数据的应用的节能MECO
## Abstract
MECO（移动边缘计算卸载）可以帮助计算能力不强的IOT设备缓解计算压力，而且对于一些用户共享相似的数据。基于这两大特征，本文主要解决：
**背景**：在一个多用户的云系统中，一些有着共享数据的单天线移动用户可以选择将部分数据放到朵云上算或者全部本地算。
**问题**：在总计算延迟受限、个体用户下载数据总能量受限，以及本地计算处理的频率受限的条件下，移动用户能量最小化是一个凸问题，可以用classical lagrangian duality找到最优解。
**结果**：基于这样的半闭式解，证明只能由一个用户发出共享数据，而不是多个。除此之外，与那些没有考虑用户本地计算能力和共享数据特性的基础算法相比，本文提出的联合计算卸载与通信资源分配节约了大量的能量