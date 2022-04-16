---
title: SDR_communication
date: 2022-4-1
tags:
- Matlab
- communication
- Math
categories:
- Matlab
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>






# 一、信道环境
一切通信系统皆是为了适应信道，以高效，可靠的传输，故在设计具体的通信方式前，先考虑信道环境。我们假设信道有如下几个特征：

### 1.带有高斯噪声
在功率受限时，高斯噪声熵最大，且与实际通信环境比较相符，同时易于分析。

### 2.信道的频率响应是带通的
通信需要在规定的频谱资源内完成通信，故这里采用带通的响应来逼近。

### 3.信道中存在干扰
此特征可以对比不同通信方式抗干扰的能力

### 4.信道中存在随机时延
这是在Matlab仿真中常容易忽略的，由于发射机和接收机通常分隔两地，有不同的时钟源，所以接收机收到信号时需要做时间同步，载波同步，帧同步，这是通信系统中不可或缺的一部分。

### 5.信道中存在多径效应和多普勒效应等
这些是在实际的通信环境中常常遇到的场景，使得出现时间和频率上的选择性衰落。应对这些问题，可以采用一些通信技术来解决。如OFDM等

在这次仿真中将先在1，2条件下进行仿真，完成链路的搭建，再考虑加入后面的特征，进行功能的验证。

# 二、802.11b
本次仿真希望尽量贴合实际，故选取了实际中使用的通信协议进行仿真，仿真关注于点对点通信，故仅仅仿真其物理层，数据采用其帧格式
……
# 三、源码
由于仿真系统较为庞大，函数过多，这里仅提供主函数。其他函数文件可在 <a href="https://github.com/Zhang-xzhe/matlab_simulation/tree/main/synthetical%20curriculum%20design" target="_blank" rel="noopener noreferrer">GitHub<OutboundLink/></a>中找到

```matlab
%综合课程设计，3路SDR系统
%1、802.11b
%2、OFDM
%3、跳频系统

%系统参数设置（由于系统经过相同的信道，所以设为相同）
Fs = 40e6;                                                                 %采样率设为40MHz
IF_fre = 18e6;                                                             %扩频中频设为10MHz
IF_fre1 = 10e6;                                                            %OFDM中频设为15MHz
IF_fre2 = 2e6;                                                             %跳频中频设为2MHz

%按照802.11帧格式，形成发射的比特流
message = 'hello world';                                                   %发送的信息
frame = framer(message);                                                   %成PHY帧
dist_frame = disturber(frame);                                             %扰码
fram_length = length(dist_frame);                                          %帧长



    %用户交互
    mode_request = "please choose a communication mode: 1.802.11b  2.OFDM 3.FHSS 4.quit\n ";
    mode_num = input(mode_request);
    if mode_num == 4
        end_communication_message = "thank you";
        disp(end_communication_message);
        
    end
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % 制式1——802.11b物理层           发射机
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    %参数设置
    L = 10;                                                                    %扩频因子
    PN_code = [1,-1,1,1,-1,1,1,1,-1,-1];                                       %802.11定义的扩频码
    alpha_factor = 0.25;                                                       %升余弦滤波器滚降系数
    symbol_rate1 = 1e5;                                                         %数据率400kbits
    bandW1 = symbol_rate1*L*2;

    %差分编码
    diff_code = diff_coder(dist_frame);                                        %差分编码为后面IQ调制做准备
    %直接序列扩频
    DSSS_bits_I = DSSSer(diff_code(1,:),PN_code,L);                            %用PN码对其进行扩频,其中L为扩频因子
    DSSS_bits_Q = DSSSer(diff_code(2,:),PN_code,L);                            %用PN码对其进行扩频,其中L为扩频因子
    DSSS_bits = [DSSS_bits_I;DSSS_bits_Q];
    %脉冲成形
    shaped_signal_I = risecos(DSSS_bits_I,alpha_factor,Fs,symbol_rate1*L/2);    %防止码间干扰
    shaped_signal_Q = risecos(DSSS_bits_Q,alpha_factor,Fs,symbol_rate1*L/2);    %防止码间干扰
    shaped_signal = [shaped_signal_I;shaped_signal_Q];
    figure(912)
    plot(shaped_signal_Q(1:500))
    %DQPSK调制
    IF_signal1 = QPSKmodulator(shaped_signal,Fs,IF_fre);
    %滤波器防止频谱污染
    IF_signal1 = channel_choose1(IF_signal1,Fs,IF_fre,bandW1);


%     %画DQPSK一部分时域
%     print_len = 1000;
%     t = 1:print_len;
%     t = t/Fs;
%     figure(985)
%     plot(t,IF_signal1(1:print_len));
%     xlim([0 print_len/Fs])
%     xlabel("t/s");
%     ylabel("Amplitude")
%     title("扩频DQPSK时域波形（已经脉冲成形）")
%     %画DQPSK频谱
%     IF_signal_f = abs(fft(IF_signal1));
%     w = 1:length(IF_signal_f);
%     w = w*2*pi/length(IF_signal_f);
%     figure(986)
%     plot(w,IF_signal_f)
%     xticks([0,pi/2,pi,3*pi/2,2*pi]);    
%     xticklabels({'0','\pi/2','\pi','3\pi/2','2\pi'});
%     xlim([0 2*pi])
%     xlabel("w/rad")
%     ylabel("Amplitude")
%     title("扩频后DQPSK的频谱")


    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % 制式2——OFDM
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    %参数设置
    channel_num = 64;                                                          %10个子信道
    QAM_num = 16;                                                              %16QAM
    symbol_rate2 = 80e6;                                                        %数据率100kbits

    %串并转换
    multi_bits = uni_to_multi([dist_frame,dist_frame,dist_frame,dist_frame],channel_num);                %单转多
    %星座映射
    QAM_bits = QAM_map(multi_bits,channel_num);                                %映射为星座点
    %IFFT
    moudule_signal = OFDM(QAM_bits,channel_num);                               %调制
    %升采样
    ready_signal = up_inter(moudule_signal,symbol_rate2/QAM_num,Fs);
    figure(2048)
    plot(real(ready_signal))
    figure(7036)
            plot(abs(fft(ready_signal)))
    %DA，IQ调制
    IF_signal2 = OFDM_IQ(ready_signal,IF_fre1,Fs);
    %功率归一
    %IF_signal2 = IF_signal2./abs(IF_signal2);

    %画星座图
    figure(6)
    plot(QAM_bits,"."); 
    xlabel("Amplitude I")
    ylabel("Amplitude Q")
    xlim([-4 4])
    ylim([-4 4])
    title("发射机 16QAM星座图");
    %画OFDM时域波形
    t = 1:length(IF_signal2);
    t = t/Fs;
    figure(211)
    plot(t,IF_signal2)
    xlim([0 length(IF_signal2)/Fs])
    xlabel("t/s");
    ylabel("Amplitude")
    title("OFDM时域波形")
    %画频域波形
    IF_signal_f = abs(fft(IF_signal2));
    w = 1:length(IF_signal_f);
    w = w/length(IF_signal_f)*(2*pi);
    figure(210)
    plot(w,IF_signal_f)
    xticks([0,pi/2,pi,3*pi/2,2*pi]);    
    xticklabels({'0','\pi/2','\pi','3\pi/2','2\pi'});
    xlim([0 2*pi])
    xlabel("w/rad")
    ylabel("Amplitude")
    title("OFDM频域波形")



    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % 制式3——HFSS
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    %参数设置
    hop_fre = [0,5e5,10e5,15e5,20e5];                              %跳频频率
    BFSK_delta = 2e5;                                              %BFSK调制时差频200k
    hop_seq = hoplist(dist_frame);                                 %跳频序列产生
    hop_persymbol = 1;                                             %每个符号跳频的数目
    symbol_rate3 = 1e5;                                            %数据率100kbits
    bandW3 = 2*(max(hop_fre)+BFSK_delta+symbol_rate3/2);

    %发送频率产生
    fre_seq = fre_generater(dist_frame,hop_fre,hop_seq,IF_fre2,BFSK_delta,hop_persymbol);     %频率计算
    %上变频发送
    IF_signal3 = FSK(Fs,symbol_rate3,fre_seq,hop_persymbol);                       %频移键控
    %防止频谱污染
    IF_signal3 = channel_choose3(IF_signal3,Fs,IF_fre2,bandW3);

%     %画跳频图案
%     figure(21)
%     plot(fre_seq,'bs')
%     xlim([-5 300])
%     ylim([1*10^6 5*10.^6])
%     xlabel("t/Ts")
%     ylabel("frequency/Hz")
%     title("跳频图案")
%     %画时域波形
%     print_len3 = 1000;
%     t = 1:print_len3;
%     t = t/Fs;
%     figure(987)
%     plot(t,IF_signal3(1:print_len3));
%     xlim([0 print_len3/Fs])
%     xlabel("t/s");
%     ylabel("Amplitude")
%     title("跳频时域波形")
%     %画频域波形
%     IF_signal_f = abs(fft(IF_signal3));
%     w = 1:length(IF_signal_f);
%     w = w/length(IF_signal_f)*(2*pi);
%     figure(321)
%     plot(w,IF_signal_f)
%     xticks([0,pi/2,pi,3*pi/2,2*pi]);    
%     xticklabels({'0','\pi/2','\pi','3\pi/2','2\pi'});
%     xlim([0 2*pi])
%     xlabel("w/rad")
%     ylabel("Amplitude")
%     title("跳频频谱")

     
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %                            信道
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




    IF_fre_channel = 10e6;                                                 %信道带宽
    passband_w = 18e6;                                                     %带通信道的带宽
    passband_filter_order = 46;                                            %带通信道阶数
    %信号合并（每通道信号循环发送）
    signal1_len = length(IF_signal1);
    signal2_len = length(IF_signal2);
    signal3_len = length(IF_signal3);
    signal_len = max([signal1_len,signal2_len,signal3_len]);
%     %能量计算
%     energy1 = sum(IF_signal1.^2);
%     energy2 = sum(IF_signal2.^2);
%     energy3 = sum(IF_signal3.^2);
%     %能量归一化
%     IF_signal1 = (IF_signal1./energy1).*signal1_len;
%     IF_signal2 = (IF_signal2./energy2).*signal2_len;
%     IF_signal3 = (IF_signal3./energy3).*signal3_len;
%     
    IF_signal1_eq = IF_signal1;
    IF_signal2_eq = IF_signal2;
    IF_signal3_eq = IF_signal3;
    while(length(IF_signal1_eq)<signal_len)
        desire_len = signal_len-length(IF_signal1_eq);
        if desire_len<signal1_len
            IF_signal1_eq = [IF_signal1_eq,IF_signal1(1:desire_len)];
        else
            IF_signal1_eq = [IF_signal1_eq,IF_signal1];
        end
    end
    while(length(IF_signal2_eq)<signal_len)
        desire_len = signal_len-length(IF_signal2_eq);
        if desire_len<signal2_len
            IF_signal2_eq = [IF_signal2_eq,IF_signal2(1:desire_len)];
        else
            IF_signal2_eq = [IF_signal2_eq,IF_signal2];
        end
    end
    %对于跳频系统，还需扩展跳频序列
    hop_len = length(hop_seq);
    rate = signal3_len/hop_len;
    while(length(IF_signal3_eq)<signal_len)
        desire_len = signal_len-length(IF_signal3_eq);
        if desire_len<signal3_len
            IF_signal3_eq = [IF_signal3_eq,IF_signal3(1:desire_len)];
        else
            IF_signal3_eq = [IF_signal3_eq,IF_signal3];
        end
    end
    add_seq = length(IF_signal3_eq)/rate - length(hop_seq);
    hop_seq_eq = hop_seq;
    while(add_seq>0)
        if add_seq<hop_len
            hop_seq_eq = [hop_seq_eq,hop_seq(1:add_seq)];
            break
        else
            hop_seq_eq = [hop_seq_eq,hop_seq];
            add_seq = add_seq-hop_len;
        end
    end

    IF_signal = IF_signal1_eq+IF_signal2_eq+IF_signal3_eq;
    %噪声
    signal_energy = sum(IF_signal.^2)/length(IF_signal);                   %信号能量计算
    SNR = 10;                                                              %信噪比
    %noise_strength = sqrt(signal_energy/(10.^(SNR/10)));                   %噪声强度
    noise_strength = 0;                   %噪声强度
    %过信道
    receive_signal = channelpass(IF_signal,Fs,passband_filter_order,IF_fre_channel,passband_w,noise_strength);        %过带限信道

    %画过信道前频域波形
    IF_signal_f = abs(fft(IF_signal));
    w = 1:length(IF_signal_f);
    w = w/length(IF_signal_f)*(2*pi);
    figure(365)
    plot(w,IF_signal_f)
    xticks([0,pi/2,pi,3*pi/2,2*pi]);    
    xticklabels({'0','\pi/2','\pi','3\pi/2','2\pi'});
    xlim([0 2*pi])
    xlabel("w/rad")
    ylabel("Amplitude")
    title("过信道前频谱")
    %画过信道后频域波形
    IF_signal_f = abs(fft(receive_signal));
    w = 1:length(IF_signal_f);
    w = w/length(IF_signal_f)*(2*pi);
    figure(366)
    plot(w,IF_signal_f)
    xticks([0,pi/2,pi,3*pi/2,2*pi]);    
    xticklabels({'0','\pi/2','\pi','3\pi/2','2\pi'});
    xlim([0 2*pi])
    xlabel("w/rad")
    ylabel("Amplitude")
    title("过信道后频谱")




    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %                            接收机
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    switch mode_num
        case 1
            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            % 制式1——802.11b物理层           接收机
            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

            %参数设置
            L = 10;                                                                    %扩频因子
            PN_code = [1,-1,1,1,-1,1,1,1,-1,-1];                                       %802.11定义的扩频码
            alpha_factor = 0.25;                                                       %升余弦滤波器滚降系数
            bandW1 = symbol_rate1*L*2;
            
            %高通滤波器
            receive_signal1 = channel_choose1(receive_signal,Fs,IF_fre,bandW1);
            %IQ DQPSK解调
            demoduled_signal = de_DQPSK(receive_signal1,Fs,IF_fre,symbol_rate1*L);
            %抽样
            Dbits = sampler(demoduled_signal,Fs,symbol_rate1*L/2);
            %解扩
            deDSSS_signal = deDSSSer(Dbits,PN_code);
            %解差分
            bits = De_differ(deDSSS_signal);
            %解扰
            de_disturb_signal = de_disturber(bits);
            %读信息
            receiver_message = readframe(de_disturb_signal);
            display(receiver_message)

            %QPSK
            figure(999)
            t = 1:5000;
            t = t/Fs;
            plot(t,demoduled_signal(1,1:5000))
            xlim([1/Fs,5000/Fs])
            xlabel('t/s')
            ylabel('Amplitude')
            title("QPSK解调信号")
            %画过滤波器后的频谱图
            IF_signal_f = abs(fft(receive_signal1));
            w = 1:length(IF_signal_f);
            w = w*2*pi/length(IF_signal_f);
            figure(115)
            plot(w,IF_signal_f)
            xticks([0,pi/2,pi,3*pi/2,2*pi]);    
            xticklabels({'0','\pi/2','\pi','3\pi/2','2\pi'});
            xlim([0 2*pi])
            xlabel("w/rad")
            ylabel("Amplitude")
            title("过滤波器后选择的第一路频谱")
            %画体制1的信号流向图
            figure(3)
            subplot(2,5,1)
            plot(frame)
            title("原始数据帧");
            subplot(2,5,2)
            plot(dist_frame)
            title("扰码数据帧");
            subplot(2,5,3)
            plot(DSSS_bits_I(1:50))
            title("扩频数据帧")
            subplot(2,5,4)
            plot(shaped_signal_I(1:4000))
            title("脉冲成形后的基带信号")
            subplot(2,5,5)
            plot(IF_signal(1,1:4000))
            title("IQ调制频带信号")
            subplot(2,5,10)
            plot(receive_signal(1,1:4000))
            title("频带信号经过信道")
            subplot(2,5,9)
            plot(demoduled_signal(1,1:4000))
            title("解IQ后的信号")
            subplot(2,5,8)
            plot(Dbits(1:50))
            title("基带抽样后的信号")
            subplot(2,5,7)
            plot(deDSSS_signal(1,:))
            title("解扩信号")
            subplot(2,5,6)
            plot(de_disturb_signal)
            title("解扰信号")
        case 2
            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            % 制式2——OFDM
            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

            %参数设置
            channel_num = 64;                                                          %10个子信道
            QAM_num = 16;                                                              %16QAM
            bandW2 = 2*symbol_rate2/QAM_num;

            %带通滤波器
            receive_signal2 = channel_choose2(receive_signal,Fs,IF_fre1,bandW2);
            %正交解调
            deIQ_signal = IQ_demodule(receive_signal2,Fs,IF_fre1);
            figure(1024)
            plot(real(deIQ_signal))
            figure(3036)
            plot(abs(fft(deIQ_signal)))
            %降采样
            bits_stream = tran2bits(deIQ_signal,Fs,symbol_rate2/QAM_num);
            %FFT
            deOFDM_bits = de_OFDM(bits_stream(1:320),channel_num);
            %QAM解调
            deQAM_bits = de_QAM(deOFDM_bits,channel_num);
            %并串转换
            frame_bits = multi_to_uni(deQAM_bits,channel_num,fram_length);
            %解扰
            de_disturb_signal = de_disturber(frame_bits);
            %读信息
            receiver_message = readframe(de_disturb_signal);

            %画过滤波器后的频谱图
            IF_signal_f = abs(fft(receive_signal2));
            w = 1:length(IF_signal_f);
            w = w*2*pi/length(IF_signal_f);
            figure(115)
            plot(w,IF_signal_f)
            xticks([0,pi/2,pi,3*pi/2,2*pi]);    
            xticklabels({'0','\pi/2','\pi','3\pi/2','2\pi'});
            xlim([0 2*pi])
            xlabel("w/rad")
            ylabel("Amplitude")
            title("过滤波器后选择的第二路频谱")
            %画星座图
            figure(5)
            plot(deOFDM_bits,".")
            xlabel("Amplitude I")
            ylabel("Amplitude Q")
            xlim([-4 4])
            ylim([-4 4])
            title("接收机 16QAM星座图");

            display(receiver_message)

        case 3
            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            % 制式3——HFSS
            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            
            %参数设置

            
            hop_fre = [0,5e5,10e5,15e5,20e5];                              %跳频频率
            BFSK_delta = 2e5;                                              %BFSK调制时其中一个频率
            bandW3 = 2*(max(hop_fre)+BFSK_delta+symbol_rate3/2);

            %低通滤波器
            receive_signal3 = channel_choose3(receive_signal,Fs,IF_fre2,bandW3);
            %解跳
            dehop_signal = dehop(receive_signal3,Fs,IF_fre2,BFSK_delta,hop_seq_eq,hop_fre,symbol_rate3);
            %BFSK解调
            deBFSK_signal = de_BFSK(dehop_signal,Fs,IF_fre2,BFSK_delta); 
            %抽样判决
            frame_bits = signal2bits(deBFSK_signal,symbol_rate3,Fs);
            %解扰
            de_disturb_signal = de_disturber(frame_bits);
            %读信息
            receiver_message = readframe(de_disturb_signal(1:280));

            %画过滤波器后的频谱图
            IF_signal_f = abs(fft(receive_signal3));
            w = 1:length(IF_signal_f);
            w = w*2*pi/length(IF_signal_f);
            figure(115)
            plot(w,IF_signal_f)
            xticks([0,pi/2,pi,3*pi/2,2*pi]);    
            xticklabels({'0','\pi/2','\pi','3\pi/2','2\pi'});
            xlim([0 2*pi])
            xlabel("w/rad")
            ylabel("Amplitude")
            title("过滤波器后选择的第三路频谱")
            %画解跳后的时域信号
            figure(9)
            plot(dehop_signal)
            title("解跳时域")
            %画解跳后的频域
            figure(10)
            plot(abs(fft(dehop_signal)))
            title("解跳频域")
            %画解BPSK后的时域波形
            figure(3)
            plot(deBFSK_signal)
            title("解BPSK时域")
            %画解BPSK后的频域波形
            IF_signal_f = abs(fftshift(fft(deBFSK_signal)));
            w = 1:length(IF_signal_f);
            w = w*2*pi/length(IF_signal_f);
            figure(888)
            plot(w,IF_signal_f)
            xticks([0,pi/2,pi,3*pi/2,2*pi]);    
            xticklabels({'0','\pi/2','\pi','3\pi/2','2\pi'});
            xlim([0 2*pi])
            xlabel("w/rad")
            ylabel("Amplitude")
            title("解BPSK时域")

            
            display(receiver_message)


        otherwise
            mode_error_message = "illegal choice, please input again";
            disp(mode_error_message);
            
    end

```