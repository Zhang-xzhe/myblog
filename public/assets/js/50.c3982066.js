(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{615:function(e,n,a){"use strict";a.r(n);var t=a(13),s=Object(t.a)({},(function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h2",{attrs:{id:"sqltabledependency"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sqltabledependency"}},[e._v("#")]),e._v(" SqlTableDependency")]),e._v(" "),a("h3",{attrs:{id:"_1-简介"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-简介"}},[e._v("#")]),e._v(" 1 简介")]),e._v(" "),a("p",[e._v("在很多场景下，我们需要将数据库中的部分数据显示出来，但不及时的显示可能会引发很多问题。例如，在某个用户不刷新浏览器界面的情况下，他将无法看到数据库的最新数据，而频繁的刷新不仅增加了服务器的负担，还降低了用户的使用体验。因此，我们有如下需求：")]),e._v(" "),a("ul",[a("li",[e._v("数据库数据更新时，自动将数据更新至页面而不需要手动刷新")]),e._v(" "),a("li",[e._v("用户在页面修改数据后，自动提交至数据库")])]),e._v(" "),a("p",[e._v("当前 "),a("code",[e._v("Ajax")]),e._v(" 实现了上述功能，其实际上是通过 "),a("code",[e._v("定时查询")]),e._v(" 的方式实现的，即每隔一段时间查询 "),a("code",[e._v("数据库")]),e._v(" 数据然后更新界面。在 "),a("code",[e._v("C#")]),e._v(" 中，"),a("code",[e._v("SqlTableDependency")]),e._v(" 亦可实现上述功能，下面将介绍其如何使用。")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img1.imgtp.com/2022/03/14/R7cuIWaq.png",alt:"uqh12or6fd"}})]),e._v(" "),a("p",[e._v("从框图中不难看出，"),a("code",[e._v("SqlTableDependency")]),e._v(" 实际上在 "),a("code",[e._v("数据库")]),e._v(" 和 "),a("code",[e._v("Web Server")]),e._v(" 之间建立了一条连接，当任何一方发生变动时，其都会向另一方发出 "),a("code",[e._v("通知")]),e._v("，进而使得两者同步。")]),e._v(" "),a("h3",{attrs:{id:"_2-相关代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-相关代码"}},[e._v("#")]),e._v(" 2 相关代码")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("创建 "),a("code",[e._v("Service")]),e._v(" 类，用于创建 "),a("code",[e._v("SqlTableDependency")]),e._v(" 并执行相关操作")]),e._v(" "),a("div",{staticClass:"language-c# extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('using Microsoft.EntityFrameworkCore;\nusing TableDependency.SqlClient;\nusing TableDependency.SqlClient.Base.Enums;\nusing TableDependency.SqlClient.Base.EventArgs;\n\nnamespace KC114.WebServer.Data.Access\n{\n    /// <summary>\n    /// 当数据库数据更新时，将调用该类型的委托\n    /// </summary>\n    public delegate void EntityChangedDelegate<T>(object sender, EntityChangedEventArgs<T> e);\n\n    \n    /// <summary>\n    /// 当数据库数据更新时，将向回调函数传递该参数\n    /// </summary>\n    public class EntityChangedEventArgs<T> : EventArgs\n    {\n        public ChangeType ChangeType { get; set; } \t\t// 操作类型，Delete、Update、...\n        public T OldValue { get; set; }\t\t\t\t\t// 数据库实体旧值\n        public T NewValue { get; set; }\t\t\t\t\t// 数据库实体新的值\n\n        public EntityChangedEventArgs(T newValue, T oldValue, ChangeType changeType)\n        {\n            OldValue = oldValue;\n            NewValue = newValue;\n            ChangeType = changeType;\n        }\n    }\n\n\n    /// <summary>\n    /// 该接口实际上是为了DI注入，若不想使用注入可直接让TableChangeBroadcastService实现IDisposable\n    /// </summary>\n    public interface ITableChangedBroadcastService<T> : IDisposable\n    {\n        event EntityChangedDelegate<T> OnEntityChanged;\n        List<T> GetCurrentValues();\n    }\n\n\n    /// <summary>\n    /// 1.该类将创建SqlTableDependency实例并绑定相关操作\n    /// 2.SqlTableDependency要求实例必须为引用类型，所以泛型类型T需要加以限制\n    /// 3.GetCurrentValues方法实际上是为了在初始化界面时，获取数据库中的数据，该方法可用Adapter/DbContext实现\n    /// </summary>\n    public class TableChangedBroadcastService<T> : ITableChangedBroadcastService<T> where T : class, new()\n    {\n        private string _connStr;                                    // 数据库连接字符串\n        private string _tableName;                                  // 表名\n        private SqlTableDependency<T> _notifyer;    \n\n        public event EntityChangedDelegate<T> OnEntityChanged;      // 数据表刷新处理事件\n\n\n        /// <summary>\n        /// 初始化数据库依赖项\n        /// </summary>\n        /// <param name="connStr">数据库连接字符串</param>\n        /// <param name="tableName">数据表名</param>\n        public TableChangedBroadcastService(string connStr, string tableName)\n        {\n            _connStr = connStr;\n            _tableName = tableName;\n\n            // 初始化依赖对象\n            _notifyer = new SqlTableDependency<T>(_connStr, _tableName);\n            _notifyer.OnChanged += TableChanged;\n            _notifyer.Start();\n        }\n        \n\n        /// <summary>\n        /// 数据表内容刷新触发事件\n        /// </summary>\n        /// <param name="sender"></param>\n        /// <param name="e"></param>\n        private void TableChanged(object sender, RecordChangedEventArgs<T> e)\n        {\n            OnEntityChanged(this, new EntityChangedEventArgs<T>(e.Entity, e.EntityOldValues, e.ChangeType));\n        }\n\n\n        /// <summary>\n        /// 释放服务资源\n        /// </summary>\n        public void Dispose()\n        {\n            _notifyer.Stop();\n            _notifyer.Dispose();\n            GC.SuppressFinalize(this);\n        }\n\n\n        /// <summary>\n        /// 获取数据表中的所有数据\n        /// </summary>\n        /// <returns></returns>\n        public List<T> GetCurrentValues()\n        {\n            using var context = new OurDbContext();\n            List<T> values = new();\n            try\n            {\n                if ((context != null) && (context.GetType().GetProperty(_tableName).GetValue(context, null) is DbSet<T> table))\n                {\n                    values = table.ToList();\n                }\n            }\n            catch (Exception)\n            {\n\n            }\n            return values;\n        }\n    }\n}\n')])])])]),e._v(" "),a("li",[a("p",[e._v("若要使用 "),a("code",[e._v("DI注入")]),e._v("，请注册服务")]),e._v(" "),a("div",{staticClass:"language-c# extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('string connStr = "";\nstring tableName = "";\nbuilder.Services.AddScoped<ITableChangedBroadcastService<YourEntity>(_ => new TableChangedBroadcastService<YourEntity>(connStr, tableName));\n')])])])]),e._v(" "),a("li",[a("p",[e._v("在代码中引用该服务，这里以 "),a("code",[e._v("Blazor Server Side")]),e._v(" 为例，实体类型为 "),a("code",[e._v("ComponentEntity")])]),e._v(" "),a("div",{staticClass:"language-c# extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('// 若不使用DI注入，不需要引用ITableChangeBroadcastService，直接创建TableChangeBroadcastService实例\n@inject ITableChangedBroadcastService<ComponentEntity> ComponentService\n@implements IDisposable\n    \n/// <summary>\n/// 页面初始化函数\n/// </summary>\n/// <returns></returns>\nprotected override async Task OnInitializedAsync()\n{\n    // 绑定更新事件\n    ComponentService.OnEntityChanged += ComponentChanged;\n    \n    // _componentsAll用户存储数据库中的所有componentEntity实体\n    _componentsAll = ComponentService.GetCurrentValues();\n}\n\n\n/// <summary>\n/// 页面刷新函数\n/// </summary>\n/// <param name="sender"></param>\n/// <param name="args"></param>\nprivate async void ComponentChanged(object sender, EntityChangedEventArgs<ComponentEntity> args)\n{\n    // 查找本地中是否存在操作的实体，实际上这是在隐性地判断数据库操作类型（增、删、查、改），同时也可更新本地的数据\n    // 判断数据库操作类型也可直接读取args中的ChangeType字段，其取值类型为TableDependency.SqlClient.Base.Enums.ChangeType\n    var newComponent = _componentsAll.FirstOrDefault(x => x.Id == args.NewValue.Id);\n    \n    // 若在本地查找到了参数中的NewValue实体，则不可能是“增加”操作\n    // 实际测试中，当操作为“删除”时，理论上NewValue为null，OldValue为新的实体，但发现NewValue为待删除的实体，而OldValue为null\n    // 因此，直接使用ChangeType判断数据库操作，若为Delete操作，则直接移除NewValue\n    if(newComponent != null)\n    {\n        if(args.ChangeType == TableDependency.SqlClient.Base.Enums.ChangeType.Delete)\n        {\n            _componentsAll.Remove(newComponent);\n        }\n        else\n        {\n            _componentsAll.Remove(newComponent);\n            _componentsAll.Add(args.NewValue);\n        }\n    }\n    else\n    {\n        _componentsAll.Add(args.NewValue);\n    }\n\n    // 修改本地数据后，需调用StateHasChabged方法强制刷新界面\n    await InvokeAsync(() => StateHasChanged());\n}\n')])])])])]),e._v(" "),a("h3",{attrs:{id:"_3-数据库修改"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-数据库修改"}},[e._v("#")]),e._v(" 3 数据库修改")]),e._v(" "),a("p",[e._v("要正常运行 "),a("code",[e._v("SqlTableDependency")]),e._v(" ，我们还需要修改数据库用户权限，若不修改则可能出现以下错误")]),e._v(" "),a("div",{staticClass:"language-c# extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// 【错误类型】无法获取数据\nsql server Could not obtain information about Windows NT group/user,error code 0x534\n    \n// 【解决方法】\nalter database [<dbname>] set enable_broker with rollback immediate;\n")])])]),a("div",{staticClass:"language-c# extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// 【错误类型】缺少权限\nTableDependency.SqlClient.Exceptions.UserWithNoPermissionException:“User without permissions.\n    \n// 【解决方法】\n// 更改用户数据库权限，目前笔者也不清楚SqlTableDependency究竟需要哪些权限，因此全部打开\n")])])]),a("p",[e._v("下面将演示具体怎样修改：")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("选中要操作的数据库，右键 - 属性")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img1.imgtp.com/2022/03/14/sz4SMJLg.png",alt:"image-20220314212657739"}})])]),e._v(" "),a("li",[a("p",[e._v("选中权限，设置 "),a("code",[e._v("用户或角色")]),e._v(" 为连接字符串中的 "),a("code",[e._v("用户")]),e._v("，并打开所有权限")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img1.imgtp.com/2022/03/14/0jcosBoT.png",alt:"image-20220314212936941"}})])]),e._v(" "),a("li",[a("p",[e._v("选中安全性 - 登录名 - 要操作的数据库，右键属性")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img1.imgtp.com/2022/03/14/4PqzSttS.png",alt:"image-20220314213113303"}})])]),e._v(" "),a("li",[a("p",[e._v("设置服务器角色")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img1.imgtp.com/2022/03/14/PT3bbB2P.png",alt:"image-20220314213135518"}})])]),e._v(" "),a("li",[a("p",[e._v("选中用户映射，修改相关设置（不要勾选 db_owner，否则可能无法在 SMSS 中直接修改数据表）")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img1.imgtp.com/2022/03/14/FlY0fvHm.png",alt:"image-20220314213217945"}})])]),e._v(" "),a("li",[a("p",[e._v("选中安全对象，勾选所有权限")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img1.imgtp.com/2022/03/14/7EfT9Oep.png",alt:"image-20220314213345569"}})])]),e._v(" "),a("li",[a("p",[e._v("尝试在 "),a("code",[e._v("SMSS")]),e._v(" 上直接修改数据库表，若无法修改请返回步骤1，选中文件，确保所有者为 "),a("code",[e._v("sa")])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img1.imgtp.com/2022/03/14/OURERRsW.png",alt:"image-20220314213558040"}})])])])])}),[],!1,null,null,null);n.default=s.exports}}]);