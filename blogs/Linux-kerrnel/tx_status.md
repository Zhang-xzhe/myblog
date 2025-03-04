---
title: tx_status
date: 2023-5-24
tags:
- wifi
- communication
- kernel
categories:
- Linux
---

tx_status 是发射端收到的feedback，可以帮助我们查看发送的包是否被接收方接收

这样的信息是这样传播的：
1. 网卡硬件中，发送方收到接收端的成功收到包的feedback/达到时间门限包仍然没有成功发出时，生成一个skb包，发给内核
2. 内核收到这样的skb包后出发中断，中断下半段tasklet机制中的函数：

/mac80211/main.c
```c
static void ieee80211_tasklet_handler(unsigned long data)
{
	struct ieee80211_local *local = (struct ieee80211_local *) data;
	struct sk_buff *skb;

	while ((skb = skb_dequeue(&local->skb_queue)) ||
	       (skb = skb_dequeue(&local->skb_queue_unreliable))) {
		switch (skb->pkt_type) {
		case IEEE80211_RX_MSG:
			/* Clear skb->pkt_type in order to not confuse kernel
			 * netstack. */
			skb->pkt_type = 0;
			ieee80211_rx(&local->hw, skb);
			break;
		case IEEE80211_TX_STATUS_MSG:
			skb->pkt_type = 0;
			ieee80211_tx_status(&local->hw, skb);
			break;
		default:
			WARN(1, "mac80211: Packet is of unknown type %d\n",
			     skb->pkt_type);
			dev_kfree_skb(skb);
			break;
		}
	}
}
```

上述ieee80211_local, sk_buff等结构体均在另一篇博客中描述

3. 上述产生的skb包的类型是IEEE80211_TX_STATUS_MSG，所以调用ieee80211_tx_status(&local->hw, skb)函数对skb包进行处理

/mac80211/status.c
```c
void ieee80211_tx_status(struct ieee80211_hw *hw, struct sk_buff *skb)
{
	struct ieee80211_hdr *hdr = (struct ieee80211_hdr *) skb->data;
	struct ieee80211_local *local = hw_to_local(hw);
	struct ieee80211_tx_status status = {
		.skb = skb,
		.info = IEEE80211_SKB_CB(skb),
	};
	struct rhlist_head *tmp;
	struct sta_info *sta;

	rcu_read_lock();

	for_each_sta_info(local, hdr->addr1, sta, tmp) {
		/* skip wrong virtual interface */
		if (!ether_addr_equal(hdr->addr2, sta->sdata->vif.addr))
			continue;

		status.sta = &sta->sta;
		break;
	}

	__ieee80211_tx_status(hw, &status);
	rcu_read_unlock();
}
```

4. 将本地的硬件信息和skb包传入正真的处理函数：__ieee80211_tx_status(hw, &status);

/mac80211/status.c
```c
static void __ieee80211_tx_status(struct ieee80211_hw *hw,
				  struct ieee80211_tx_status *status)
{
	struct sk_buff *skb = status->skb;
	struct ieee80211_hdr *hdr = (struct ieee80211_hdr *) skb->data;
	struct ieee80211_local *local = hw_to_local(hw);
	struct ieee80211_tx_info *info = status->info;
	struct sta_info *sta;
	__le16 fc;
	struct ieee80211_supported_band *sband;
	int retry_count;
	int rates_idx;
	bool send_to_cooked;
	bool acked;
	struct ieee80211_bar *bar;
	int shift = 0;
	int tid = IEEE80211_NUM_TIDS;

	rates_idx = ieee80211_tx_get_rates(hw, info, &retry_count);

	sband = local->hw.wiphy->bands[info->band];
	fc = hdr->frame_control;

	if (status->sta) {
		sta = container_of(status->sta, struct sta_info, sta);
		shift = ieee80211_vif_get_shift(&sta->sdata->vif);



		if (info->flags & IEEE80211_TX_STATUS_EOSP)
			clear_sta_flag(sta, WLAN_STA_SP);

		acked = !!(info->flags & IEEE80211_TX_STAT_ACK);

		//Nov 3: Collect the TX status for the sent polling packet
		unsigned char* data = (unsigned char*)skb->data;
		data = data+36;
		if (local->status_update_in_process==1){

			if (*(data+10)==0x40 && *(data+11)==0x00 && *(data+12)==0x35 && *(data+13)==0x11){
				//printk("November 13 ieee80211_tx_status is called to handle TX status\n");
				//printk("ieee80211_tx_status get sta is %x, the sdata address is %x\n",sta->addr, sta->sdata);

				//April 11 V4
				local->Polling_reception_time_in_MAC = skb->skb_mstamp;

				local->polling_in_process = 0; //Accept new polling packets
				if (acked){
					int ACKED = 1;					
					ktime_t polling_finish_ts;
					polling_finish_ts = ktime_get_real();
					local->Polling_TX_status_report_time = ktime_to_ns(polling_finish_ts)/1000;
					u64 Physical_tx_period = local->Polling_TX_status_report_time - local->Polling_reception_time_in_MAC;
					netlink_inform_polling_status(local->Polling_reception_time_in_MAC,Physical_tx_period, ACKED, retry_count);
					printk("The previous status update has successfully/ delivered at jk%lld/\n",local->Polling_TX_status_report_time);
					//March 21
					rates_idx = polling_tx_get_rates(hw, info, &retry_count,sband);

				}
				else{
					int ACKED = 0;
					ktime_t polling_finish_ts;
					polling_finish_ts = ktime_get_real();
					local->Polling_TX_status_report_time = ktime_to_ns(polling_finish_ts)/1000;
					u64 Physical_tx_period = local->Polling_TX_status_report_time - local->Polling_reception_time_in_MAC;
					netlink_inform_polling_status(local->Polling_reception_time_in_MAC,Physical_tx_period, ACKED, retry_count);
					printk("The previous polling fails/ \n");
					//March 21
					rates_idx = polling_tx_get_rates(hw, info, &retry_count,sband);

				}

				//April 6
				printk("Polling packet transmission finishes at $%lld/ \n",local->Polling_TX_status_report_time);
				local->Sent_number = local->Sent_number +1;
				int rates_idx;
				rates_idx = polling_tx_get_rates(hw, info, &retry_count,sband);
				u64 polling_MAC_reception_time = local->Polling_reception_time_in_MAC;
				printk("FINAL, PHY layer delay is P%lld/ \n",(local->Polling_TX_status_report_time-polling_MAC_reception_time));



			}	
		}


		//April 9 Support WiFresh APP
		if (*(data+10)==0x40 && *(data+11)==0x00 && *(data+12)==0x32 && *(data+13)==0x11){
			
			//April 11 V4
			local->Polling_reception_time_in_MAC = skb->skb_mstamp;

			if (acked){
				int ACKED = 1;					
				ktime_t polling_finish_ts;
				polling_finish_ts = ktime_get_real();
				local->Polling_TX_status_report_time = ktime_to_ns(polling_finish_ts)/1000;
				u64 Physical_tx_period = local->Polling_TX_status_report_time - local->Polling_reception_time_in_MAC;

				printk("WIFRESH The previous status update has successfully/ delivered at %lld",local->Polling_TX_status_report_time);
				//March 21
				rates_idx = polling_tx_get_rates(hw, info, &retry_count,sband);

			}
			else{
				int ACKED = 0;
				ktime_t polling_finish_ts;
				polling_finish_ts = ktime_get_real();
				local->Polling_TX_status_report_time = ktime_to_ns(polling_finish_ts)/1000;
				u64 Physical_tx_period = local->Polling_TX_status_report_time - local->Polling_reception_time_in_MAC;
				printk("WiFresh The previous polling fails/ \n");
				//March 21
				rates_idx = polling_tx_get_rates(hw, info, &retry_count,sband);

			}

			//April 6
			printk("WiFresh Polling packet transmission finishes at $%lld/ \n",local->Polling_TX_status_report_time);
			local->Sent_number = local->Sent_number +1;
			int rates_idx;
			rates_idx = polling_tx_get_rates(hw, info, &retry_count,sband);
			u64 polling_MAC_reception_time = local->Polling_reception_time_in_MAC;
			printk("WiFresh FINAL, PHY layer delay is P%lld/ \n",(local->Polling_TX_status_report_time-polling_MAC_reception_time));



		}	

		//March 26
		// unsigned char* data = (unsigned char*)skb->data;
		// int i;
		// for (i = 0; i<100;i++){
		// 	printk("Receives a broadcasting packet! %dth value is %x\n",i, *(data+i));
		// }




		/* mesh Peer Service Period support */
		if (ieee80211_vif_is_mesh(&sta->sdata->vif) &&
		    ieee80211_is_data_qos(fc))
			ieee80211_mpsp_trigger_process(
				ieee80211_get_qos_ctl(hdr), sta, true, acked);

		if (!acked && test_sta_flag(sta, WLAN_STA_PS_STA)) {
			/*
			 * The STA is in power save mode, so assume
			 * that this TX packet failed because of that.
			 */
			ieee80211_handle_filtered_frame(local, sta, skb);
			return;
		}

		if (ieee80211_hw_check(&local->hw, HAS_RATE_CONTROL) &&
		    (ieee80211_is_data(hdr->frame_control)) &&
		    (rates_idx != -1))
			sta->tx_stats.last_rate =
				info->status.rates[rates_idx];

		if ((info->flags & IEEE80211_TX_STAT_AMPDU_NO_BACK) &&
		    (ieee80211_is_data_qos(fc))) {
			u16 ssn;
			u8 *qc;

			qc = ieee80211_get_qos_ctl(hdr);
			tid = qc[0] & 0xf;
			ssn = ((le16_to_cpu(hdr->seq_ctrl) + 0x10)
						& IEEE80211_SCTL_SEQ);
			ieee80211_send_bar(&sta->sdata->vif, hdr->addr1,
					   tid, ssn);
		} else if (ieee80211_is_data_qos(fc)) {
			u8 *qc = ieee80211_get_qos_ctl(hdr);

			tid = qc[0] & 0xf;
		}

		if (!acked && ieee80211_is_back_req(fc)) {
			u16 control;

			/*
			 * BAR failed, store the last SSN and retry sending
			 * the BAR when the next unicast transmission on the
			 * same TID succeeds.
			 */
			bar = (struct ieee80211_bar *) skb->data;
			control = le16_to_cpu(bar->control);
			if (!(control & IEEE80211_BAR_CTRL_MULTI_TID)) {
				u16 ssn = le16_to_cpu(bar->start_seq_num);

				tid = (control &
				       IEEE80211_BAR_CTRL_TID_INFO_MASK) >>
				      IEEE80211_BAR_CTRL_TID_INFO_SHIFT;

				ieee80211_set_bar_pending(sta, tid, ssn);
			}
		}

		if (info->flags & IEEE80211_TX_STAT_TX_FILTERED) {
			ieee80211_handle_filtered_frame(local, sta, skb);
			return;
		} else {
			if (!acked)
				sta->status_stats.retry_failed++;
			sta->status_stats.retry_count += retry_count;

			if (ieee80211_is_data_present(fc)) {
				if (!acked)
					sta->status_stats.msdu_failed[tid]++;

				sta->status_stats.msdu_retries[tid] +=
					retry_count;
			}
		}

		rate_control_tx_status(local, sband, status);
		if (ieee80211_vif_is_mesh(&sta->sdata->vif))
			ieee80211s_update_metric(local, sta, status);

		if (!(info->flags & IEEE80211_TX_CTL_INJECTED) && acked)
			ieee80211_frame_acked(sta, skb);

		if ((sta->sdata->vif.type == NL80211_IFTYPE_STATION) &&
		    ieee80211_hw_check(&local->hw, REPORTS_TX_ACK_STATUS))
			ieee80211_sta_tx_notify(sta->sdata, (void *) skb->data,
						acked, info->status.tx_time);

		if (ieee80211_hw_check(&local->hw, REPORTS_TX_ACK_STATUS)) {
			if (info->flags & IEEE80211_TX_STAT_ACK) {
				if (sta->status_stats.lost_packets)
					sta->status_stats.lost_packets = 0;

				/* Track when last TDLS packet was ACKed */
				if (test_sta_flag(sta, WLAN_STA_TDLS_PEER_AUTH))
					sta->status_stats.last_tdls_pkt_time =
						jiffies;
			} else {
				ieee80211_lost_packet(sta, info);
			}
		}
	}

	/* SNMP counters
	 * Fragments are passed to low-level drivers as separate skbs, so these
	 * are actually fragments, not frames. Update frame counters only for
	 * the first fragment of the frame. */
	if ((info->flags & IEEE80211_TX_STAT_ACK) ||
	    (info->flags & IEEE80211_TX_STAT_NOACK_TRANSMITTED)) {
		if (ieee80211_is_first_frag(hdr->seq_ctrl)) {
			I802_DEBUG_INC(local->dot11TransmittedFrameCount);
			if (is_multicast_ether_addr(ieee80211_get_DA(hdr)))
				I802_DEBUG_INC(local->dot11MulticastTransmittedFrameCount);
			if (retry_count > 0)
				I802_DEBUG_INC(local->dot11RetryCount);
			if (retry_count > 1)
				I802_DEBUG_INC(local->dot11MultipleRetryCount);
		}

		/* This counter shall be incremented for an acknowledged MPDU
		 * with an individual address in the address 1 field or an MPDU
		 * with a multicast address in the address 1 field of type Data
		 * or Management. */
		if (!is_multicast_ether_addr(hdr->addr1) ||
		    ieee80211_is_data(fc) ||
		    ieee80211_is_mgmt(fc))
			I802_DEBUG_INC(local->dot11TransmittedFragmentCount);
	} else {
		if (ieee80211_is_first_frag(hdr->seq_ctrl))
			I802_DEBUG_INC(local->dot11FailedCount);
	}

	if (ieee80211_is_nullfunc(fc) && ieee80211_has_pm(fc) &&
	    ieee80211_hw_check(&local->hw, REPORTS_TX_ACK_STATUS) &&
	    !(info->flags & IEEE80211_TX_CTL_INJECTED) &&
	    local->ps_sdata && !(local->scanning)) {
		if (info->flags & IEEE80211_TX_STAT_ACK) {
			local->ps_sdata->u.mgd.flags |=
					IEEE80211_STA_NULLFUNC_ACKED;
		} else
			mod_timer(&local->dynamic_ps_timer, jiffies +
					msecs_to_jiffies(10));
	}

	ieee80211_report_used_skb(local, skb, false);

	/* this was a transmitted frame, but now we want to reuse it */
	skb_orphan(skb);

	/* Need to make a copy before skb->cb gets cleared */
	send_to_cooked = !!(info->flags & IEEE80211_TX_CTL_INJECTED) ||
			 !(ieee80211_is_data(fc));

	/*
	 * This is a bit racy but we can avoid a lot of work
	 * with this test...
	 */
	if (!local->monitors && (!send_to_cooked || !local->cooked_mntrs)) {
		dev_kfree_skb(skb);
		return;
	}

	/* send to monitor interfaces */
	ieee80211_tx_monitor(local, skb, sband, retry_count, shift, send_to_cooked);
}
```

这个函数我们进行了一些修改，可以在这个函数里将tx_status打印到系统的log中
其中printk将信息打印到/var/log/syslog中
