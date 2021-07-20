# vue-admin-2.0

> 基于vue.js框架+Element UI实现的后台管理系统的二次开发说明，
> 提供一个demo脚手架，封装好部分公用CRUD方法、公用工具、公共UI组件等，并介绍使用方法

## 技术栈要求：

- html/CSS
- javascript--ES6：JavaScript | MDN (mozilla.org)
- 前端框架--vue.js：介绍 — Vue.js (vuejs.org)
- 状态管理--vuex:：Vuex 是什么？ | Vuex (vuejs.org)
- 前端路由–vue router：安装 | Vue Router (vuejs.org)
- http请求--axios：axios中文网|axios API 中文文档 | axios (axios-js.com)
- UI框架–Element UI: Element - 网站快速成型工具


## 环境准备

- 安装 node.js：Node.js (nodejs.org)

## 安装

 提供一个demo做脚手架

- 克隆项目
  git clone 。。。（还没准备好）
- 进入项目目录
  cd vue-demo
- 安装依赖
  npm install
- 本地开发 启动项目
  npm run dev

## 启动

- 启动完成后会自动打开浏览器访问 http://localhost:9527


## 目录结构

```bash
├── build // 构建相关  
├── config // 配置相关
├── src // 源代码
│   ├── api // 所有请求
│   ├── assets // 主题 字体等静态资源
│   ├── components // 全局公用组件
│   ├── filtres // 全局 filter
│   ├── icons // 项目所有 svg icons
│   ├── mock // 项目mock 模拟数据
│   ├── router // 路由
│   ├── store // 全局 store管理
│   ├── styles // 全局样式
│   ├── utils // 全局公用方法
│   ├── views // 页面视图
│   ├── App.vue // 入口页面
│   ├── main.js // 入口 加载组件 初始化等
│   └── permission.js // 权限管理
├── .babelrc // babel-loader 配置
├── eslintrc.js // eslint 配置项
├── .gitignore // git 忽略项
├── favicon.ico // favicon图标
├── index.html // html模板
└── package.json // package.json
```


# 新增页面

## 新增页面分为4步：

- 添加路由
- 新增view页面
- 新增api
- 实现CRUD


## 添加路由

首先在 @/router/index.js 中增加你需要添加的路由。

如：新增一个 user页面

```bash
.... 
 {
    path: '/system/user',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: '系统管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index'),
        meta: { title: '角色管理', icon: 'role' }
      }
    ]
  }
....
```

这样侧边栏就会出现如图所示的用户管理和角色管理了













