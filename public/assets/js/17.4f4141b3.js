(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{579:function(s,t,a){"use strict";a.r(t);var n=a(13),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"_1-tcp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-tcp"}},[s._v("#")]),s._v(" 1 TCP")]),s._v(" "),a("h2",{attrs:{id:"_1-1-建立连接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-建立连接"}},[s._v("#")]),s._v(" 1.1 建立连接")]),s._v(" "),a("h3",{attrs:{id:"服务器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#服务器"}},[s._v("#")]),s._v(" "),a("strong",[s._v("服务器")])]),s._v(" "),a("div",{staticClass:"language-Java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step1.创建套接字")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Socket")]),s._v(" tcpServer "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Socket")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("AddressFamily"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("InterNetwork")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SocketType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Stream")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ProtocolType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Tcp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step2.绑定ip地址和端口号")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPAddress")]),s._v(" ipAddress "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPAddress")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("byte")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("127")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPEndPoint")]),s._v(" ipEndPoint "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPEndPoint")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ipAddress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8888")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step3.绑定套接字")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("tcpServer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),s._v("Bind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ipEndPoint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step4.监听端口")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("tcpServer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),s._v("Listen")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Socket")]),s._v(" client "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("tcpServer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),s._v("Accept")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("br"),s._v(" "),a("h3",{attrs:{id:"客户端"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#客户端"}},[s._v("#")]),s._v(" "),a("strong",[s._v("客户端")])]),s._v(" "),a("div",{staticClass:"language-Java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step1.创建套接字")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Socket")]),s._v(" client "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Socket")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("AddressFamily"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("InterNetwork")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SocketType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Stream")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ProtocolType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Tcp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step2.绑定ip地址和端口号")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPAddress")]),s._v(" ipAddress "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPAddress")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("byte")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("127")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPEndPoint")]),s._v(" ipEndPoint "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPEndPoint")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ipAddress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8888")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step3.连接服务器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("client"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),s._v("Connect")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ipEndPoint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("br"),s._v(" "),a("h2",{attrs:{id:"_1-2-交换数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-交换数据"}},[s._v("#")]),s._v(" 1.2 交换数据")]),s._v(" "),a("p",[a("code",[s._v("服务器")]),s._v("和"),a("code",[s._v("客户端")]),s._v("收发数据的方式是一样的。")]),s._v(" "),a("br"),s._v(" "),a("h3",{attrs:{id:"发送数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#发送数据"}},[s._v("#")]),s._v(" "),a("strong",[s._v("发送数据")])]),s._v(" "),a("p",[a("code",[s._v("Tcp")]),s._v("传输的数据均为"),a("code",[s._v("字节形式")]),s._v("，因此常常需要和"),a("code",[s._v("字符串")]),s._v("进行格式转换。")]),s._v(" "),a("div",{staticClass:"language-Java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[s._v("string message "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Hello, tcp!"')]),s._v("\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step1.将字符串以UTF8格式编码，并转换为字节形式")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("byte")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" packet "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Encoding"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("UTF8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("GetBytes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("message"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step2.发送数据")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("client"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),s._v("Send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("packet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("br"),s._v(" "),a("h3",{attrs:{id:"接收数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#接收数据"}},[s._v("#")]),s._v(" "),a("strong",[s._v("接收数据")])]),s._v(" "),a("div",{staticClass:"language-Java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("byte")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" packet "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("byte")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1024")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step1.接收数据")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" len "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" client"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("receive")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("packet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step2.将字节转换为字符串，并编码为UTF8")]),s._v("\nstring message "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Encoding"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("UTF8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("GetString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("packet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" len"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("br"),s._v(" "),a("h1",{attrs:{id:"_2-udp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-udp"}},[s._v("#")]),s._v(" 2 UDP")]),s._v(" "),a("h2",{attrs:{id:"_2-1-建立连接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-建立连接"}},[s._v("#")]),s._v(" 2.1 建立连接")]),s._v(" "),a("h3",{attrs:{id:"服务器-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#服务器-2"}},[s._v("#")]),s._v(" "),a("strong",[s._v("服务器")])]),s._v(" "),a("div",{staticClass:"language-Java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step1.创建套接字")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Socket")]),s._v(" udpServer "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Socket")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("AddressFamily"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("InterNetwork")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SocketType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Dgram")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ProtocolType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Udp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step2.绑定ip和端口号")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPAddress")]),s._v(" ipAddress "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPAddress")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("byte")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("127")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPEndPoint")]),s._v(" ipEndPoint "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPEndPoint")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ipAddress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8888")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("udpServer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),s._v("Bind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ipEndPoint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("br"),s._v(" "),a("h3",{attrs:{id:"客户端-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#客户端-2"}},[s._v("#")]),s._v(" "),a("strong",[s._v("客户端")])]),s._v(" "),a("div",{staticClass:"language-Java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step1.创建套接字")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Socket")]),s._v(" udpClient "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Socket")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("AddressFamily"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("InterNetwork")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SocketType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Dgram")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ProtocolType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Udp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("br"),s._v(" "),a("h2",{attrs:{id:"_2-2-交换数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-交换数据"}},[s._v("#")]),s._v(" 2.2 交换数据")]),s._v(" "),a("h3",{attrs:{id:"发送数据-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#发送数据-2"}},[s._v("#")]),s._v(" "),a("strong",[s._v("发送数据")])]),s._v(" "),a("div",{staticClass:"language-Java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step1.指定接收方的ip和端口号")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPAddress")]),s._v(" ipAddress "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPAddress")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("byte")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("127")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPEndPoint")]),s._v(" ipEndPoint "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPEndPoint")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ipAddress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8888")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("EndPoint")]),s._v(" endPoint "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("EndPoint")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" ipEndPoint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step3.发送数据")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("udpClient"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),s._v("SendTo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Encoding"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("UTF8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("GetBytes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Hello"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" endPoint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("br"),s._v(" "),a("h3",{attrs:{id:"接收数据-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#接收数据-2"}},[s._v("#")]),s._v(" "),a("strong",[s._v("接收数据")])]),s._v(" "),a("div",{staticClass:"language-Java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Step1.设置发送方ip和端口号")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// IPAddress.Any表示接收任意ip发来的数据")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 0表示不限制端口号")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPEndPoint")]),s._v(" ipEndPoint "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPEndPoint")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPAddress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Any")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("EndPoint")]),s._v(" endPoint "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("EndPoint")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("ipEndPoint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("byte")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" packet "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("byte")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1024")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" len "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("udpServer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),s._v("ReceiveFrom")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("packet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" ref endPoint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("WriteLine")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Encoding"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("UTF8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("GetString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("packet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("len"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);