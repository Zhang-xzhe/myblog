---
title: srsran project(1)：Up-link processing
date: 2025-3-4
tags:
- communication
- Math
- srsran
categories:
- 5G
---
 # The signal processing in NR uplink based on srsran

 ## 1. RU
 location:lib/radio/uhd and lib/ru

 我们用USRP X310作为RU，其被UHD库驱动。在srsran中，通过uhd的接口给USRP设置采样频率，中心频率等参数，并从X310中获取采样后的数据流。所以srsran中的RU就是一个接口和数据读取驱动。

 ## 2. PHY-low
 loaction:lib/phy/lower

 当RU将X310中的流数据读取到buffer中后，数据到达phy-low,此时的数据是有时间戳的数据流。在PHY_low中，首先要做的就是将其分割对齐，也就是将流分割为一个一个子帧，一个一个的符号

 ### a.对齐
 loaction:lib/phy/lower/processor/uplink

 具体来说在lower_phy_uplink_processor对象中调用process进行处理。处理步骤首先是process_alignment，根据当前sample的时间戳判断是否buffer中是否已经有了一个子帧的数据。
 
 ### b.加序号
 loaction:lib/phy/lower/processor/uplink

 有了足够的数据后process_alignment调用process_symbol_bounfdary生成符号的序列号，slot号等。

 ### c.拉取数据并处理
 loaction:lib/phy/lower/processor/uplink

 在做好上述准备后，会调用process_collecting函数进行处理，这个函数首先将所有数据转移到临时buffer中，然后调用prach_processor和puxch_processor进行处理。由于当前我们不知道是哪个信道，所以将buffer的数据同时给这俩。 这俩根据数据sector_id判断当前数据是否为自己的。至于这个sector_id是怎么知道的现在还未知

 #### c.1.PRACH

 #### c.2.PUxCH
 loaction:lib/phy/lower/processor/uplink/puxch

 对于PUxCH中的符号，puxch_processor调用demodulator将时域信号转为频域信号。

 ### d.去掉CP并DFT
 loaction:lib/phy/lower/modulation

 demodulation用采样频率除子载波间隔的方法计算出DFT点数，然后根据比例计算出CP长度并去掉。然后进行DFT。由于去掉了CP导致符号中的第一个点的相位不是0，所以首先将CP那段相位补回来也就是38.211中5.4节。以及采样时由于采样带来的偏移。然后此时得到的是采样频率对应的子载波，比如23.04M或者30.72M在30k子载波时分别得到768点和1024点。但是如果我们的带宽为20M，那么很多点都是没有数据的，这些点在中间，所以将两侧的点取出进行放入资源格方便后续处理。完成后上报。

 ## 3. PHY-upper
 location:include/srsran/ru
 lib/phy/upper/upper_phy_rx_symbol_hander_imp.cpp

 在PHY_low处理完后，会调用noticer去通知上层处理新的数据,上层的noticer知道后调用一系列函数，交给handle_rx_symbol区分信道。信道是通过时隙的位置来区分的。具体来书在建立连接后本地会存一个RE向物理信道映射的表。然后根据这个来判断,其中表格为ul_pdu_repository。

 ### a.PUSCH
 Location:lib/phy/upper/pusch/pusch_processor_impl.cpp

 #### a.1.信道估计
 上层处理的第一步就是信道估计。根据其中的DM-RS值进行估计得到的。这是一个4维的16比特的浮点复数表。其中第一维是子载波，第二维是OFDM符号，第三维是天线端口，第四维是切片

