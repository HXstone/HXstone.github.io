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

整站遵循 **Swiss International Style（瑞士国际风格）**，规则写在
`assets/css/base.css` 顶部的注释里，改样式前请先读：

- 网格：12 列（桌面）/ 6 列（平板）/ 4 列（手机），严格对齐，大量负空间
- 字体：Helvetica 及同类无衬线，只用一个字族，靠字号 / 字重 / 字距建立层级
- 配色：仅 `#000000` `#ffffff` `#ff0000`（强调）`#0057b8`（次要强调）
- 几何：直角（`border-radius: 0`）、无阴影、无渐变、无装饰性元素
- 交互：只改 `color` / `border-color` / `background-color`，过渡统一
  `150ms ease-out`；唯一允许的位移是按钮里的 `→` 箭头
- 结构线：列表与卡片的左侧引导线在悬停时由灰变红，同时底色变浅灰
- 无障碍：正文对比度 ≥ 4.5:1，有 `:focus-visible` 焦点样式和
  `prefers-reduced-motion` 降级

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
| `assets/js/i18n.js` | 中文文案表与语言切换 |
| `assets/js/main.js` | 语言切换、手机菜单、笔记筛选、页脚年份 |
| `assets/img/` | 头像、favicon、分享图 |

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
