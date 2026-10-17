# HX STONE

个人网站：记录 AI、代码与跑步。
Student × Runner × AI Explorer.

线上地址：https://hxstone.github.io

## 关于

- 纯静态站点：手写 HTML / CSS / JavaScript，零构建步骤，托管在 GitHub Pages
- 内容：作品、笔记、关于，以及几个可以直接在浏览器里玩的小游戏
- 双语：默认英文，可切换中文（用 `data-i18n` 键，见 `assets/js/i18n.js`）
- 没有账号系统、统计脚本或第三方追踪
- 零外部依赖：字体、图标、样式、脚本全部本地或系统自带，不请求任何 CDN

## 设计风格

整站采用 **Dark Titanium / Industrial Digital Lab** 视觉系统，规则写在
`assets/css/base.css` 顶部的注释里，改样式前请先读：

- 网格：12 列（桌面）/ 6 列（平板）/ 4 列（手机），对齐优先，留白服务于信息层级
- 字体：Archivo + IBM Plex Mono（本地 `assets/fonts/`，无 CDN）；中文回退到系统 CJK
- 配色：钛黑底 `#0a0d10`，冷蓝交互色 `#7da7ff`，橙色 `#ff7048` 仅用于状态 / 异常
- 几何：10–12px 圆角、1px 细边框、分层深色表面、克制的阴影
- 交互：只改变颜色、边框、透明度和 ≤2px 位移；焦点状态始终清晰可见
- 状态：`LIVE` / `EXPERIMENTAL` / `ARCHIVED` 同时用文字、圆点和颜色表达
- 导航：主站为 Home / Work / Notes / About；Games 在页脚并链接到可玩版本，
  Work 页面则保留完整的案例研究
- 无障碍：44px 点击区域、跳转链接、`:focus-visible`、`prefers-reduced-motion`，
  以及过滤结果计数 / 空状态播报

## 目录概览

| 路径 | 内容 |
|---|---|
| `index.html` | 首页 |
| `projects.html` | 作品列表与案例 |
| `notes.html`、`notes/` | 笔记列表与正文（`_template.html` 是新文章模板） |
| `about.html` | 关于 |
| `404.html` | 404 页 |
| `games/`、`projects/*.html` | 网页小游戏（各自独立样式，不受站点样式影响） |
| `assets/css/base.css` | 设计系统：token + 组件 + 页面样式 |
| `assets/js/i18n.js` | 中文文案表、无障碍文案与语言切换 |
| `assets/js/main.js` | 语言切换、手机菜单、笔记筛选与空状态、页脚年份 |
| `assets/fonts/` | 本地 Archivo / IBM Plex Mono 字体文件 |
| `assets/img/` | 头像、favicon、分享图 |
| `assets/img/work/` | 四个项目的真实游戏截图（项目卡片缩略图） |

## 本地预览

下载后直接双击 `index.html` 即可，无需服务器。
想要更接近线上环境（绝对路径、404 页）时：

```bash
py -m http.server 8123
# 然后访问 http://localhost:8123
```

## 写一篇新笔记

1. 复制 `notes/_template.html`，命名为 `日期-英文短标题.html`
2. 改标题、日期、分类和正文（正文写在 `<div class="prose">` 里）
3. 到 `notes.html` 的列表里复制一行，改成新文章的链接与摘要，并填上 `data-cat`
4. 如果它是最新一篇，顺手更新 `index.html` 的 Notes 区块
5. 需要中文时，在 `assets/js/i18n.js` 的 `zh` 表里补上对应键

## 说明

本站是个人作品与笔记的归档。文章与代码欢迎阅读和参考，请勿整站搬运或用于商业用途。
