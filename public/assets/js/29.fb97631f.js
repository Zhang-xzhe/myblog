(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{570:function(t,s,a){"use strict";a.r(s);var n=a(12),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"基础知识"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础知识"}},[t._v("#")]),t._v(" 基础知识")]),t._v(" "),a("h5",{attrs:{id:"systick"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#systick"}},[t._v("#")]),t._v(" SysTick")]),t._v(" "),a("ul",[a("li",[t._v("集成在Cortex M3内核中的定时器，不属于芯片厂商的外设")]),t._v(" "),a("li",[t._v("主要为RTOS提供时钟节拍")])]),t._v(" "),a("h5",{attrs:{id:"定时器分类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#定时器分类"}},[t._v("#")]),t._v(" 定时器分类")]),t._v(" "),a("p",[a("code",[t._v("基本定时器")]),t._v("：TIM6、TIM7")]),t._v(" "),a("p",[a("code",[t._v("通用定时器")]),t._v("：TIM2、TIM3、TIM4、TIM5")]),t._v(" "),a("p",[a("code",[t._v("高级定时器")]),t._v("：TIM1、TIM8")]),t._v(" "),a("h5",{attrs:{id:"⭐通用定时器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#⭐通用定时器"}},[t._v("#")]),t._v(" ⭐通用定时器")]),t._v(" "),a("ul",[a("li",[t._v("通过"),a("code",[t._v("可编程预分频器(Prescaler)")]),t._v("驱动的16位自动重装"),a("code",[t._v("主计数器(Counter Period)")]),t._v("构成，可对内部时钟（或触发源）、外部时钟（或触发源）进行计数")]),t._v(" "),a("li",[t._v("定时器的基本原理为：时钟信号送入 Prescaler 中 (0 ~ 65535)，Prescaler 溢出后会向 Counter Period 发出一个脉冲信号")]),t._v(" "),a("li",[t._v("tim_time = (Prescaler + 1) * (Counter Period + 1) / tim_frq")])]),t._v(" "),a("h5",{attrs:{id:"计数模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#计数模式"}},[t._v("#")]),t._v(" 计数模式")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/majrkpbNZ2RSgVH.png",alt:"image-20211220164747221"}})]),t._v(" "),a("h3",{attrs:{id:"api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" API")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n * @Descript\t定时器服务函数\n * @param\t\thtim\t\t\t相关定时器指针\t\n * @return\t\tvoid\n*/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_TIM_PeriodElapsedCallback")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("TIM_HandleTypeDef"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" htim"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n * @Descript\t定时器启动函数\n * @param\t\thtimx\t\t\t相关定时器指针\t\n * @return\t\tvoid\n*/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_TIM_Base_Start_IT")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n * @Descript\tPWM启动函数\n * @param\t\thtimx\t\t\t相关定时器指针\t\n * @param\t\tTIM_CHANNEL_x\t相关PWM通道\n * @return\t\tvoid\n*/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_TIM_PWM_Start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" TIM_CHANNEL_x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n * @Descript\tPWM占空比更改\n * @param\t\thtimx\t\t\t相关定时器指针\t\n * @param\t\tTIM_CHANNEL_x\t相关PWM通道\n * @param\t\tPulse\t\t\tDuty_cycle = Pulse / Counter Period \n * @return\t\tvoid\n*/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__HAL_TIM_SET_COMPARE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" TIM_CHANNEL_x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Pulse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n * @Descript\tPWM频率更改\n * @param\t\thtimx\t\t\t相关定时器指针\t\n * @param\t\tCounter_Period\tPWM_fre = TIM_frq / ( Prescaler + 1 ) / ( Counter Period + 1 )\n * @return\t\tvoid\n*/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__HAL_TIM_SET_AUTORELOAD")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Counter_Period"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_TIM_Encoder_Start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" TIM_CHANNEL_ALL"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ncount "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__HAL_TIM_GET_COUNTER")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndirection "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__HAL_TIM_IS_TIM_COUNTING_DOWN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__HAL_TIM_SET_COUNTER")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br"),a("span",{staticClass:"line-number"},[t._v("27")]),a("br"),a("span",{staticClass:"line-number"},[t._v("28")]),a("br"),a("span",{staticClass:"line-number"},[t._v("29")]),a("br"),a("span",{staticClass:"line-number"},[t._v("30")]),a("br"),a("span",{staticClass:"line-number"},[t._v("31")]),a("br"),a("span",{staticClass:"line-number"},[t._v("32")]),a("br"),a("span",{staticClass:"line-number"},[t._v("33")]),a("br"),a("span",{staticClass:"line-number"},[t._v("34")]),a("br"),a("span",{staticClass:"line-number"},[t._v("35")]),a("br"),a("span",{staticClass:"line-number"},[t._v("36")]),a("br"),a("span",{staticClass:"line-number"},[t._v("37")]),a("br"),a("span",{staticClass:"line-number"},[t._v("38")]),a("br"),a("span",{staticClass:"line-number"},[t._v("39")]),a("br"),a("span",{staticClass:"line-number"},[t._v("40")]),a("br"),a("span",{staticClass:"line-number"},[t._v("41")]),a("br"),a("span",{staticClass:"line-number"},[t._v("42")]),a("br"),a("span",{staticClass:"line-number"},[t._v("43")]),a("br"),a("span",{staticClass:"line-number"},[t._v("44")]),a("br"),a("span",{staticClass:"line-number"},[t._v("45")]),a("br"),a("span",{staticClass:"line-number"},[t._v("46")]),a("br"),a("span",{staticClass:"line-number"},[t._v("47")]),a("br"),a("span",{staticClass:"line-number"},[t._v("48")]),a("br")])]),a("h3",{attrs:{id:"demo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[t._v("#")]),t._v(" Demo")]),t._v(" "),a("h5",{attrs:{id:"普通定时器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#普通定时器"}},[t._v("#")]),t._v(" 普通定时器")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("通过STM32Cube配置时钟树，确定定时器的频率（如果使用内部时钟触发的话）")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/HmGcsr795vVl3j6.png",alt:"image-20211220164759847"}})])]),t._v(" "),a("li",[a("p",[t._v("在左侧的Timer中选择对应的定时器")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/UbkINC621uLtgoS.png",alt:"image-20211220164806501"}})])]),t._v(" "),a("li",[a("p",[t._v("选择时钟源Internal Clock，并在下方的 Parameter Settings 中设置参数Prescaler、Counter Mode、Count Period")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/jLeu7grDXdKqEhU.png",alt:"image-20211220164825023"}})]),t._v(" "),a("p",[a("img",{attrs:{src:"Image/image-20210906222940548.png",alt:"image-20210906222940548"}})])]),t._v(" "),a("li",[a("p",[t._v("在NVIC Settings中使能定时器")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/IYVCDHO2N38MUQK.png",alt:"image-20211220164833854"}})])]),t._v(" "),a("li",[a("p",[t._v("在main中重写函数")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_TIM_PeriodElapsedCallback")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("TIM_HandleTypeDef"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" htim"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("htim"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("Instance"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" TIMx"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//what you want to do")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...    ")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])])]),t._v(" "),a("li",[a("p",[t._v("在初始化定时器后打开定时器使能，否则定时器无法运行！！！！！")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_TIM_Base_Start_IT")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimxx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])])]),t._v(" "),a("li",[a("p",[t._v("若要修改定时器相关参数，可直接修改代码，先进入定时器初始化函数")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/51taNPdALUKqcER.png",alt:"image-20211220164845014"}})]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/ChJve2wTQUPaFVg.png",alt:"image-20211220164856540"}})])])]),t._v(" "),a("h5",{attrs:{id:"输出比较"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#输出比较"}},[t._v("#")]),t._v(" 输出比较")]),t._v(" "),a("h5",{attrs:{id:"pwm生成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pwm生成"}},[t._v("#")]),t._v(" PWM生成")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("利用 STM32Cube 设置引脚为 PWM输出")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/thg2dy9ZpW3sKTN.png",alt:"image-20211220164908033"}})])]),t._v(" "),a("li",[a("p",[t._v("配置相关的通道为PWM Generation")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/32qakirG5m7KL9t.png",alt:"image-20211220164919947"}})])]),t._v(" "),a("li",[a("p",[t._v("设置频率和占空比（同一个定时器不同通道的PWM频率只能相等）")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/H48XxbE6Zah59SL.png",alt:"image-20211220165019220"}})]),t._v(" "),a("ul",[a("li",[t._v("PWM_fre = TIM_frq / ( Prescaler + 1 ) / ( Counter Period + 1 )")]),t._v(" "),a("li",[t._v("Duty_cycle = Pulse / Counter Period")])])]),t._v(" "),a("li",[a("p",[t._v("将 Count Mode 设置为UP（向上计数）")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/g93kwhnSlMCqcBs.png",alt:"image-20211220165028476"}})])]),t._v(" "),a("li",[a("p",[t._v("设置通道极性，High 代表 Pulse 对应的时间段为高电平")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/mlqB1wuKjJDo2F6.png",alt:"image-20211220165038159"}})])]),t._v(" "),a("li",[a("p",[t._v("点击 NVIC Settings 使能定时器")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/AzafX12vUwG9CZQ.png",alt:"image-20211220165048859"}})])]),t._v(" "),a("li",[a("p",[t._v("打开对应PWM通道")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_TIM_PWM_Start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" TIM_CHANNEL_x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])])])]),t._v(" "),a("h5",{attrs:{id:"编码器模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编码器模式"}},[t._v("#")]),t._v(" 编码器模式")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("选择要使用的定时器，设置为Encoder模式，此时默认channel 1和channel 2为输入")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/MIuAch2Kk1FomaV.png",alt:"image-20211220165100336"}})]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/hfTeDYRkno8NiWj.png",alt:"image-20211220165109190"}})])]),t._v(" "),a("li",[a("p",[t._v("设置相关参数")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/AOWMfBNQsxDozGJ.png",alt:"image-20211220165119742"}})]),t._v(" "),a("p",[a("code",[t._v("Prescaler")]),t._v("：分频系数，例如A的频率为f，如果采用上升沿和下降沿同时计数，那么在1s内编码器计数为4*f / ( Prescaler + 1 )")]),t._v(" "),a("p",[a("code",[t._v("Count Mode")]),t._v("：计数模式，UP为向上计数（正转时COUNT++）")]),t._v(" "),a("p",[a("code",[t._v("Counter Period")]),t._v("：达到该设定值后编码器计数值会溢出为0，一般设为65535（最大），防止溢出")]),t._v(" "),a("p",[a("code",[t._v("Encoder Mode")]),t._v("：编码器模式")]),t._v(" "),a("ul",[a("li",[t._v("T1：上升沿计数")]),t._v(" "),a("li",[t._v("T2：下降沿计数")]),t._v(" "),a("li",[t._v("T1 and T2：上升沿、下降沿同时计数")])]),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[a("p",[t._v("点击 NVIC Settings 使能定时器")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://s2.loli.net/2021/12/20/cnM7ghS9FZdHiLp.png",alt:"image-20211220165130811"}})])]),t._v(" "),a("li",[a("p",[t._v("在主函数中打开定时器模式")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("HAL_TIM_Encoder_Start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" TIM_CHANNEL_ALL"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])])]),t._v(" "),a("li",[a("p",[t._v("调用相关函数获得计数值和方向")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[t._v("count "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__HAL_TIM_GET_COUNTER")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndirection "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__HAL_TIM_IS_TIM_COUNTING_DOWN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])])]),t._v(" "),a("li",[a("p",[t._v("在打印完COUNT后记得清除COUNT")]),t._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__HAL_TIM_SET_COUNTER")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("htimx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])])])])])])])}),[],!1,null,null,null);s.default=e.exports}}]);