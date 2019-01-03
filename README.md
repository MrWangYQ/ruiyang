# ruiyang

# bootstrap

# jquery + bootstrap

# 启动
```bash
  node server   启动服务
```

## 目录结构

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- components                   // 组件
	|       |-- common                   // 公共组件
	|           |-- bus.js           	 // Event Bus
	|           |-- Header.vue           // 公共头部
	|           |-- Home.vue           	 // 公共路由入口
	|           |-- IframeContent.vue    // 左侧菜单公共页面
	|           |-- Sidebar.vue          // 公共左边栏下拉框
	|           |-- Sidebarlist.vue      // 公共左边栏每一项列表
	|           |-- Tags.vue           	 // 页面切换标签组件
	|       |-- page                   	 // 主要路由页面
	|           |-- 403.vue
	|           |-- 404.vue
	|           |-- Login.vue          	 // 登录
	|           |-- Premission.vue       // 权限测试组件
	|           |-- Upload.vue           // 图片上传
	|       |-- CCWorkBoard              // CC 工作看板
	|           |-- topHalf              // 页面上半部目录，包含业绩区、工单与通知区
	|           	|-- TimeList.vue     // 左上模块业绩区、进度条区域
	|           	|-- topHalf.vue      // 页面上半部文件，包含业绩区、工单与通知区
	|           	|-- WorkOrder.vue 	 // 右上模块工单(通知) 区域
	|           |-- bottomHalf           // 页面下半部目录（包含 SOP 与 DIY 学生分布表、学员信息表）
	|           	|-- bottomHalf.vue   // 页面下半部文件入口，包含 SOP 与 DIY 学生分布表、学员信息表
	|           	|-- DIYList.vue   	 // DIY 模块（筛选后的学生列表 左下区域）
	|           	|-- DIYTable.vue   	 // DIY 模块（历史搜索记录模块 右下区域）
	|           	|-- Follow.vue   	 // CC 公共 follow 页、即需要备注的学生弹框页
	|       |-- SSWorkBoard              // SS 工作看板
	|           |-- topHalf              // 页面上半部，包含业绩区、工单与通知区
	|           	|-- TimeList.vue     // 左上模块业绩区、进度条区域
	|           	|-- topHalf.vue      // 页面上半部文件，包含业绩区、工单与通知区
	|           	|-- WorkOrder.vue 	 // 右上模块任务 (重点关注) 区域
	|           |-- bottomHalf           // 页面下半部，包含营销 SOP、服务 SOP 与 DIY 学生分布表、学员信息表
	|           	|-- bottomHalf.vue   // 页面下半部文件入口，包含 SOP 与 DIY 学生分布表、学员信息表
	|           	|-- DIYList.vue   	 // DIY 模块（筛选后的学生列表 左下区域）（后续会开发）
	|           	|-- DIYTable.vue   	 // DIY 模块（历史搜索记录模块 右下区域）
	|           	|-- Follow.vue   	 // SS 公共 follow 页、即需要备注的学生弹框页
	|           	|-- Follow.vue   	 // SS 公共 follow 页、即需要备注的学生弹框页
	|   |-- http                         // 请求配置目录
	|       |-- http.js                  // 请求配置文件 (拦截、超时)
	|   |-- router                       // 路由配置目录
	|       |-- index.js                 // 路由配置文件
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- static                         	 // 静态文件目录 (css、image、font、js)
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 入口html文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明


## 参考 ##

模板参考：https://github.com/lin-xin/vue-manage-system


持续开发