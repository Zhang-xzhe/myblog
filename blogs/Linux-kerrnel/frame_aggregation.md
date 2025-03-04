---
title: frame aggregation
date: 2023-5-24
tags:
- wifi
- communication
- kernel
categories:
- Linux
---

这一篇将记录我学习怎么控制mac层的frame aggregation。

frame aggregation是802.11n新加入的标准，将小包合并为一个大包发送.

首先需要调用ieee80211_start_tx_ba_session()函数，可以在速率控制函数里调用这个函数。这个函数会告诉驱动，我要启用aggregation

然后驱动会调用ieee80211_start_tx_ba_cb_irqsafe函数与peer协商开启aggregate