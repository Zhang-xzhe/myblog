---
title: Statistical signal processing(1)
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

# Lecture 1:
This lecture introduces this class and puts forward four problem: Detection, Parameter Estimation, Signal estimation and Learning.

# Lecture 2:
In this lecture, some basic concepts is reviewed.
I list some that I feel a little unfamiliar with and some new terminnology:
## 1. three properties of probability: 
1.  \> 0
2. sum = 1
3. P(AUB) <= P(A)+P(B)  (union bound)
## 2. pmf
(probability mass function) is the discrete form of pdf
## 3. multivariate Gaussian density 
$p(x) = \frac{1}{\sqrt{(2\pi^d)|\sum|}}e^{-\frac{1}{2}(x-\mu)^T\sum(x-\mu)}$

$\sum$ is covariance matrix $\sum_{ij} = E[(x_i-\mu_i)(x_j-\mu_j)]$, d is the dimension of x.
## 4. characteristic function:
$\phi(w) = E(exp(-iwx))$ it is useful when demonstrate something
## 5. inequality
1. markov inequality

z is non-negative random variable, t is a constant and t>0.

$p(z>t) < \frac{E(z)}{t}$

2. chebyshev inequality

$p(|z-E(z)|>t) = p(|z-E(z)|^2>t^2) < \frac{E[|z-E(z)|^2]}{t^2} = \frac{Var(z)}{t^2}$

3. Hoeffding inequality (chernoff bound)

$x_i$ is independent random variable, $x_i \in [a_i,b_i]$, $s_n = \sum^{n}_{i} x_i$, t is constant, t > 0.

$p(|s_n-E(s_n)|>=t) =< 2e^{\frac{2t^2}{\sum(b_i-a_i)}}$

proof:

X can be any random variable, s > 0

$p(x>t) = p(e^{sx}>e^{st}) < e^{-st}E(e^{sx})$

$p(s_n-E(s_n)>=t) = p(\sum [x_i-E(x_i)]>=t) < e^{-st}E(e^{s\sum[x_i-E(x_i)]}) = e^{-st}\prod{E[e^{s(x_i-E(x_i))}]}$

next proof: $E[e^{sz}] < e^\frac{s^2(a-b)^2}{8}$ ,among which z is a random variable, E(z) = 0, $z \in [a,b]$

due to  exponential function is convexity:

$\frac{e^{sb}-e^{sa}}{b-a}(z-a) > e^{sz}-e^{sa}$

$e^{sb}\frac{z-a}{b-a}+e^{sa}\frac{b-z}{b-a} > e^{sz}$

to simplify the formula we introduce $\lambda = \frac{-a}{b-a}$

$E[e^{sz}] < E[ e^{sb}\frac{z-a}{b-a}+e^{sa}\frac{b-z}{b-a}]$

$E[e^{sz}] < e^{sb}\frac{-a}{b-a}+e^{sa}\frac{b}{b-a}$

$E[e^{sz}] < e^{sb}\lambda+e^{sa}(1-\lambda)$

$E[e^{sz}] < e^{s((1-\lambda)(b-a)}\lambda+e^{-s\lambda(b-a)}(1-\lambda)$

$E[e^{sz}] < e^{-s\lambda(b-a)}(1-\lambda+\lambda e^{(s(b-a))})$

Then simplify again: let u = s(b-a)

$E[e^{sz}] < e^{-\lambda u}(\lambda e^{u}+1-\lambda) = e^{\phi(u)}$

do a taylar unfold:

$\phi(u) < 1 + u\phi'(u) +\frac{u^2}{2}\phi''(u)$

$\phi(u) < \frac{s^2(b-a)^2}{8}$

So,

$E[e^{sz}] < e^{\frac{s^2(b-a)^2}{8}}$

if $s = \frac{4t}{\sum (b_i-a_i)}$

$p(s_n-E(s_n)>=t) =< 2e^{\frac{2t^2}{\sum(b_i-a_i)}}$

denmonstrate is finished.

when $s_n-E(s_n)<0$, we can do the similar proof, so get $p(|s_n-E(s_n)|>=t) =< 2e^{\frac{2t^2}{\sum(b_i-a_i)}}$

4. For Guassian distribution

$\frac{1}{\sqrt{2\pi}}\int_{t}e^{\frac{-x^2}{2}}dx <= min\{\frac{1}{2}e^{\frac{t^2}{2}},\frac{1}{\sqrt{2\pi}t^2}e^{\frac{-t^2}{2}}\}$

the proof is simple

5. 