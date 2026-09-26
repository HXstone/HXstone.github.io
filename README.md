# HX STONE

个人网站:**一个 AI 时代高中生的个人科技实验室**。
Student × AI Explorer × Future CS Builder.

纯静态站点,零构建步骤,托管在 GitHub Pages。
线上地址:https://hxstone.github.io

## 技术构成

| 部分 | 说明 |
|---|---|
| 结构 | 手写 HTML(4 个主页面 + 笔记 + 404) |
| 样式 | `assets/css/base.css`(设计变量 / 基础组件)+ `assets/css/site.css`(各区块) |
| 动效 | GSAP + ScrollTrigger(本地内置,`assets/js/vendor/`),仅在支持时启用 |
| 背景 | Canvas 2D 粒子场 + 网格微视差 |
| 交互 | 自定义光标、磁吸按钮、头像玻璃球(鼠标跟随) |
| 转场 | View Transitions API;不支持的浏览器降级为黑金遮罩 |
| 双语 | 默认英文(HTML 原文),中文对照在 `assets/js/i18n.js` |

**没有任何构建步骤**:改完文件直接刷新即可,`git push` 后 1 分钟左右线上更新。

## 目录结构

```
├── index.html            首页:Hero / Case Studies / Notes
├── projects.html         五个项目的完整案例(问题→思考→方案→技术→结果)
├── notes.html            笔记列表(可按分类筛选)
├── about.html            关于(理念 + 简介 + 联系方式)
├── 404.html              自定义错误页
├── notes/
│   ├── _template.html          新笔记模板(复制它来写)
│   ├── 2026-09-25-hello-world.html 笔记:你好,世界:我的个人数字空间(中英双语)
│   └── 2026-09-25-hello.html   笔记:小站开张了
├── projects/
│   ├── minesweeper.html  扫雷(可玩)
│   ├── dino-run.html     恐龙快跑(可玩)
│   └── tank-battle.html   坦克大战(可玩)
├── games/
│   └── 2359/
│       ├── index.html    23:59｜住宿生(可玩 · 终端风格 · 14 天周期模拟)
│       ├── style.css     游戏样式(独立作用域,不污染全站)
│       ├── game.js       游戏引擎(状态 / 事件 / 存档 / 评级)
│       └── events.js     事件库(56+ 条,数据与引擎分离)
└── assets/
    ├── css/  base.css · site.css
    ├── js/   main.js(语言/菜单)· motion.js(动效)· background.js(粒子)
    │         cursor.js(光标+磁吸)· orb.js(玻璃球)
    │         transition.js(转场)· i18n.js(中文对照)
    │         vendor/gsap.min.js · vendor/ScrollTrigger.min.js
    ├── fonts/ Plus Jakarta Sans(正文变量字体)· JetBrains Mono(小字等宽)
    └── img/  avatar.jpg(头像)· favicon.svg · og-cover.jpg(分享封面)
```

## 常见修改

| 想改什么 | 去哪里改 |
|---|---|
| 页面英文文案 | 直接改对应 HTML 里的文字(默认语言) |
| 对应的中文文案 | `assets/js/i18n.js` 里同 `data-i18n` 键的值(含行内标签的文案用 `data-i18n-html`) |
| 头像 | 替换 `assets/img/avatar.jpg`(建议正方形;同时会用于导航与首页玻璃球) |
| 分享封面 | 替换 `assets/img/og-cover.jpg`(建议 1200×630) |
| 主色 | `assets/css/base.css` 顶部的 `--gold` / `--gold-hi` / `--gold-lo` |
| 正文字体 | `assets/css/base.css` 里 `--font` / `--font-read-cjk`(中文正文)/ `--mono`;拉丁文件在 `assets/fonts/` |
| 案例内容 | `projects.html` 里对应的 `.step` 文本 |
| 写一篇新笔记 | 复制 `notes/_template.html` → 改内容 → 在 `notes.html` 加一张卡片(`data-cat` 填 ai/science/learning/ideas) |

## 网页小游戏:《23:59｜住宿生》

`games/2359/` 是一个独立可玩的小游戏:CLI 终端风格的高中住宿生活模拟器。

- **玩法**:一晚 6 小时(18:00–23:59),用 7 个行动(学习 / 运动 / 娱乐 / 社交 / 洗澡 / 吃饭 / 睡觉)分配时间;14 天为一个周期,周期结束给出评级并存入档案。
- **系统**:5 项状态(体力 / 专注 / 心情 / 压力 / 成绩)、状态告警与行动限制、加权条件事件库、跨天事件链、`localStorage` 存档与档案。
- **独立性**:只引入本站字体文件,所有样式限定在 `.g2359` 作用域内,不污染全站;自带返回入口。
- **入口**:`projects.html` 第 01 个案例(标题旁带金色「新」标签 `.badge-new`),导航栏 `Games` 指向该案例锚点;首页 Case Studies 第 01 条(同样带「新」标签)直达游戏。
- **扩展**:改数值看 `game.js` 顶部常量(`ACTIONS` / `DIMINISH` / 各类阈值);加事件只需在 `events.js` 追加一条对象,引擎会自动纳入加权抽取。

## 本地预览

直接双击 `index.html` 即可(全部使用相对路径,不依赖服务器)。

小提示:`file://` 协议下**页面转场**与粒子背景的部分功能不会生效(浏览器安全限制),用本地服务器预览最完整:

```bash
py -m http.server 8123 --directory .
# 然后打开 http://localhost:8123
```

## 部署(GitHub Pages)

```bash
git add -A
git commit -m "update"
git push
```

推送后 GitHub Pages 自动发布,约 1 分钟生效。

> 如果直连 GitHub 被重置,本仓库已配置走本机代理:
> `git config --global http.https://github.com.proxy http://127.0.0.1:7890`
> 代理端口变了就改这一行;不想要了就 `git config --global --unset http.https://github.com.proxy`。

## 设计与动效说明

**视觉方向:「工作台日志」。** 不装成品网站,更像一张正在被测量、标注、迭代的台面——这也正是这个站真实的做事方式(人定方向、AI 实现、人反复测到满意)。

- **结构承担信息,不靠装饰**:区块标题不再配全大写的等宽眉标;作品是「目录序号 + 缩略图 + 内容」的划线行,笔记是「日期 + 内容」的日志行,两者刻意**不同构**;案例页的「问题→思考→方案→技术→结果」确实是序列,所以用 `counter()` 给出 01–05 编号
- **金色是重音不是底色**:全站只有少数几处用金色(主按钮、状态栏的指示与进度、「新」标签、作品行的 hover 规则线与序号);其余一律走中性色
- **状态栏**:底部一条 30px 的固定读数栏(由 `motion.js` 生成),左槽报告当前区块(悬停作品/笔记时改报那一条),中槽是滚动量,右槽是百分比。它取代了通用的顶部进度条;宽度不足 560px 时只留进度
- **入场**:标题逐字上浮、副标题逐词,球体与其余元素并入同一条时间线(0.8–1.2s,expo 曲线)
- **交互**:桌面端有自定义光标与按钮磁吸;头像玻璃球跟随鼠标倾斜(透视放在 `.orb-lift` 上,`.orb` 只由 JS 逐帧旋转);作品/笔记的 hover 让规则线、序号、日期回应,不做整卡抬起
- **性能**:常驻效果只有粒子场 + 网格视差(鼠标柔光、球体环绕粒子、标题扫光已移除)。除 `transform` / `opacity` 外,reveal 还会动画 `filter: blur()`——玻璃面板自带 `backdrop-filter`,所以 blur 入场只保留在少数元素上。跟随类动效(网格、光标、球体)统一用 `1 - exp(-λ·dt)` 做**帧率无关**平滑,指针静止后 rAF 自动停止;粒子与光标的循环有单实例守卫,不会叠加
- **转场**:支持 View Transitions 的浏览器走原生跨文档转场并套用品牌动画(`::view-transition-old/new(root)`);不支持的浏览器降级为黑金遮罩
- **降级**:JS 未加载时内容完整可读(笔记列表可筛选由 JS 增强);`prefers-reduced-motion` 下所有动画与 View Transition 动画关闭

## 字体

自托管、离线可用(`file://` 也能跑),没有外部字体请求:

| 用途 | 字体 | 来源 |
|---|---|---|
| 正文(拉丁) | Plus Jakarta Sans(变量) | 自托管 `assets/fonts/` |
| 正文(中文) | MiSans(小米,无衬线) | CDN 按需分包 |
| 小字 / 等宽 | JetBrains Mono(变量) | 自托管 `assets/fonts/` |
| 标题 | 系统字体 | — |

- 拉丁两款是 SIL OFL 1.1 变量字体,自托管 + `@font-face` 的 `unicode-range` 限定在拉丁字符,离线可用。
- 中文正文用 **MiSans**(小米开源,免费商用):各页 `<head>` 用 `<link>` 引入 `misans-vf-4web` 的 `result.css`(jsdelivr)。它把字体切成 375 个带 `unicode-range` 的小分包,浏览器只下载当前页面用到的切片并缓存;加载失败自动回落系统中文,且异步加载、不阻塞渲染。
- **标题和中文小字仍用系统字体**(`base.css` 的 `--font-title` / `--cjk`),不额外加载。
- 想换中文正文:改各页 `<head>` 里的 CDN 链接,并把 `base.css` 的 `--font-read-cjk` 里的字体名换成对应 `result.css` 中的 `font-family`。
- 质感:全站叠了一层极淡的 `feTurbulence` 噪点(`base.css` 的 `body::before`),用来消除大面积深色渐变的色带;大标题渐变上有一道一次性扫光,减少动态效果时自动关闭。
