# HX STONE

个人网站：记录 AI、代码与跑步。
Student × Runner × AI Explorer.

线上地址：https://hxstone.github.io

## 关于

- 主站是纯静态站点：手写 HTML / CSS / JavaScript，零构建步骤，托管在 GitHub Pages
- 内容：作品、笔记、关于，以及可以直接在浏览器里玩的小游戏，包括 **PROJECT: PHANTOM** 3D FPS
- 双语：默认英文，可切换中文（用 `data-i18n` 键，见 `assets/js/i18n.js`）
- 没有账号系统、统计脚本或第三方追踪
- 主站零外部依赖：字体、图标、样式、脚本全部本地或系统自带，不请求任何 CDN
- 3D 游戏使用 Vite + Three.js；构建产物提交在 `phantom/dist/`，部署时不需要额外构建步骤

## 设计风格

整站采用 **Titanium Field Manual / Tactical Editorial** 视觉系统：借用战术 HUD 的
信息纪律（精确网格、索引、状态、细线、等宽读数），但始终按个人作品集与编辑式排版
来组织。规则写在 `assets/css/base.css` 顶部的注释里，改样式前请先读：

- 网格：12 列（桌面）/ 6 列（平板）/ 4 列（手机）；内容宽 1240px，
  桌面 56px 页边距，留白服务于信息层级
- 字体：Archivo（标题 / 正文）+ IBM Plex Mono（索引、状态、数据），
  本地 `assets/fonts/`，无 CDN；中文回退到系统 CJK
- 配色：石墨黑底 `#070a0c`，冷冰蓝交互色 `#a8d0e0`，橙色 `#e79473`
  仅用于状态 / 异常；分隔线使用低对比度细线
- 几何：8px 面板、5px 按钮、3px 标签，1px 细边框、分层深色表面、几乎不用阴影
- 排版：Archivo 540/550 字重的大标题，正文 16–17px / 行高 1.7，
  微标签 11.5–12px 等宽；中文单独收紧字距、放宽行高
- PHANTOM UI：菜单 / HUD 的微标签提高到 11–13px，并用 `clamp()` 随视口
  放大到 12.5–18.5px；正文与按钮 14–16px，保留 HUD 密度但优先保证可读性
- 布局：首页为“一个主推项目 + 四个等宽项目”的非对称节奏；
  Work 页面采用左右交替的案例版式；Notes 为编号细线列表
- 交互：hover 160ms，入场 480–560ms，只改变颜色、边框、透明度和 ≤12px 位移；
  焦点状态始终清晰可见
- 状态：`LIVE` / `EXPERIMENTAL` / `ARCHIVED` 同时用文字、圆点和颜色表达；
  只有压在图片上时才使用低透明度小底板
- 动效：首屏轻微淡入、折叠线以下由 `main.js` 分步显现、顶栏滚动状态、
  图片轻微缩放；全部在 `prefers-reduced-motion: reduce` 下退化为静态
- 无障碍：44px 点击区域、跳转链接、`:focus-visible`、图片 alt、语义标题、
  过滤结果计数 / 空状态播报，以及不依赖 hover 的关键操作

## 目录概览

| 路径 | 内容 |
|---|---|
| `index.html` | 首页 |
| `projects.html` | 作品列表与案例 |
| `notes.html`、`notes/` | 笔记列表与正文（`_template.html` 是新文章模板） |
| `about.html` | 关于 |
| `404.html` | 404 页 |
| `games/`、`projects/*.html` | 网页小游戏（各自独立样式，不受站点样式影响） |
| `phantom/` | **PROJECT: PHANTOM** 的 Vite + Three.js 源码 |
| `phantom/dist/` | 可直接静态部署的游戏构建产物 |
| `assets/css/base.css` | 设计系统：token + 组件 + 页面样式 |
| `assets/js/i18n.js` | 中文文案表、无障碍文案与语言切换 |
| `assets/js/main.js` | 语言切换、手机菜单、笔记筛选与空状态、顶栏滚动状态、入场动效、页脚年份 |
| `assets/fonts/` | 本地 Archivo / IBM Plex Mono 字体文件 |
| `assets/img/` | 头像、favicon、分享图 |
| `assets/img/work/` | 项目的真实游戏截图（项目卡片缩略图） |

## 本地预览

下载后直接双击 `index.html` 即可，无需服务器。
想要更接近线上环境（绝对路径、404 页）时：

```bash
py -m http.server 8123
# 然后访问 http://localhost:8123
```

**PROJECT: PHANTOM** 的独立开发与构建：

```bash
cd phantom
npm install
npm run dev       # http://localhost:5178
npm run build     # 输出到 phantom/dist
```

游戏详细说明见 [`phantom/README.md`](phantom/README.md)。

## 写一篇新笔记

1. 复制 `notes/_template.html`，命名为 `日期-英文短标题.html`
2. 改标题、日期、分类和正文（正文写在 `<div class="prose">` 里）
3. 到 `notes.html` 的列表里复制一行，改成新文章的链接与摘要，并填上 `data-cat`
4. 如果它是最新一篇，顺手更新 `index.html` 的 Notes 区块
5. 需要中文时，在 `assets/js/i18n.js` 的 `zh` 表里补上对应键

## 说明

本站是个人作品与笔记的归档。文章与代码欢迎阅读和参考，请勿整站搬运或用于商业用途。
