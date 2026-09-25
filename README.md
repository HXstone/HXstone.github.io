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
| 背景 | Canvas 2D 粒子场 + 网格微视差 + 鼠标柔光 |
| 交互 | 自定义光标、磁吸按钮、头像玻璃球(鼠标跟随)、HX OS 面板动画 |
| 转场 | View Transitions API;不支持的浏览器降级为黑金遮罩 |
| 双语 | 默认英文(HTML 原文),中文对照在 `assets/js/i18n.js` |

**没有任何构建步骤**:改完文件直接刷新即可,`git push` 后 1 分钟左右线上更新。

## 目录结构

```
├── index.html            首页:Hero / HX OS / Case Studies / Notes
├── projects.html         三个项目的完整案例(问题→思考→方案→技术→结果)
├── notes.html            笔记列表(可按分类筛选)
├── about.html            关于(理念 + 简介 + 联系方式)
├── 404.html              自定义错误页
├── notes/
│   ├── _template.html          新笔记模板(复制它来写)
│   ├── 2026-09-25-hello-world.html 笔记:你好,世界:我的个人数字空间(中英双语)
│   └── 2026-09-25-hello.html   笔记:小站开张了
├── projects/
│   ├── minesweeper.html  扫雷(可玩)
│   └── dino-run.html     恐龙快跑(可玩)
└── assets/
    ├── css/  base.css · site.css
    ├── js/   main.js(语言/菜单)· motion.js(动效)· background.js(粒子)
    │         cursor.js(光标+磁吸)· orb.js(玻璃球)· hxos.js(面板)
    │         transition.js(转场)· i18n.js(中文对照)
    │         vendor/gsap.min.js · vendor/ScrollTrigger.min.js
    ├── fonts/ Plus Jakarta Sans(正文变量字体)· JetBrains Mono(小字等宽)
    └── img/  avatar.jpg(头像)· favicon.svg · og-cover.jpg(分享封面)
```

## 常见修改

| 想改什么 | 去哪里改 |
|---|---|
| 页面英文文案 | 直接改对应 HTML 里的文字(默认语言) |
| 对应的中文文案 | `assets/js/i18n.js` 里同 `data-i18n` 键的值 |
| HX OS 的指标与百分比 | `index.html` 搜 `data-value`(同时改旁边的 `--v:` 和数字) |
| 头像 | 替换 `assets/img/avatar.jpg`(建议正方形;同时会用于导航与首页玻璃球) |
| 分享封面 | 替换 `assets/img/og-cover.jpg`(建议 1200×630) |
| 主色 | `assets/css/base.css` 顶部的 `--gold` / `--gold-hi` / `--gold-lo` |
| 正文字体 | `assets/css/base.css` 里 `--font`(正文)/ `--mono`(小字);文件在 `assets/fonts/` |
| 案例内容 | `projects.html` 里对应的 `.step` 文本 |
| 写一篇新笔记 | 复制 `notes/_template.html` → 改内容 → 在 `notes.html` 加一张卡片(`data-cat` 填 ai/science/learning/ideas) |

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

- **入场**:标题逐字上浮、副标题逐词、其余元素错峰淡入(0.8s,expo 曲线)
- **滚动**:卡片/面板进入视野时淡入上浮,图片轻微视差,顶部金色进度条
- **交互**:桌面端有自定义光标(悬停放大)与按钮磁吸;头像玻璃球跟随鼠标倾斜
- **性能**:只动画 `transform` / `opacity`;移动端关闭粒子与自定义光标;系统开启「减少动态效果」时全部动效关闭
- **降级**:JS 未加载时内容完整可读(HX OS 显示真实数字,笔记列表可筛选由 JS 增强)

## 字体

自托管、离线可用(`file://` 也能跑),没有外部字体请求:

| 用途 | 字体 | 文件 |
|---|---|---|
| 正文 | Plus Jakarta Sans(变量) | `plus-jakarta-sans-latin-wght-normal.woff2` |
| 小字 / 等宽 | JetBrains Mono(变量) | `jetbrains-mono-latin-wght-normal.woff2` |

- 两款都是 SIL OFL 1.1 的拉丁变量字体,由 `@font-face` 的 `unicode-range` 限定在拉丁字符;中文自动回落到系统字体(`--cjk`)。
- **标题沿用系统字体**(`base.css` 的 `--font-title`,即改动前的观感),不额外加载字体。
- 质感:全站叠了一层极淡的 `feTurbulence` 噪点(`base.css` 的 `body::before`),用来消除大面积深色渐变的色带;大标题渐变上有一道一次性扫光,减少动态效果时自动关闭。
