---
title: struct in mac80211
date: 2023-5-24
tags:
- wifi
- communication
- kernel
categories:
- Linux
---

```c
struct ieee80211_tx_status {
  struct ieee80211_sta * sta;
  struct ieee80211_tx_info * info;
  struct sk_buff * skb;
};
```