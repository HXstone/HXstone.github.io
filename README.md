# H 的小站(个人网站)

纯静态的中英双语个人网站:**主页 + 作品集 + 博客 + 在线简历**。
不需要安装任何东西,双击 `index.html` 即可在浏览器里预览。

## 目录结构

```
mywebsite/
├── index.html            首页
├── projects.html         作品集
├── blog.html             博客列表
├── about.html            关于我 + 简历(可打印为 PDF)
├── 404.html              错误页(GitHub Pages 会自动使用)
├── blog/
│   ├── _template.html            文章模板(复制它来写新文章)
│   ├── 2026-09-25-hello.html     示例文章(中文)
│   └── 2026-09-18-tiny-games.html 示例文章(英文)
├── projects/
│   ├── minesweeper.html  扫雷(从旧目录复制进来)
│   └── dino-run.html     恐龙快跑(从旧目录复制进来)
└── assets/
    ├── style.css         全站样式
    ├── i18n.js           中英文案对照表
    ├── main.js           交互脚本
    └── img/
        ├── favicon.svg   网站图标
        └── avatar.jpg    头像图片
```

## 把占位内容换成你自己的

| 想改什么 | 去哪里改 |
|---|---|
| 名字、标语、简介 | 首页 `index.html` 的 hero 区域 + `assets/i18n.js` 里的 `home.name`、`home.role`、`home.bio` |
| 网站名(左上角、页脚) | `assets/i18n.js` 里的 `site.name` |
| 头像图片 | 替换 `assets/img/avatar.jpg`(建议用正方形图片,改完刷新即可) |
| 邮箱 | `about.html` 最下面的“联系方式” |
| 学校、经历 | `about.html` 里的“经历”和“教育”区域 |
| 技能 / 爱好标签 | `about.html` 的“技能”“爱好”区域 |
| 主色 | `assets/style.css` 开头:改 `--accent` 和 `--accent-strong` 两个值 |

改中文文案时,记得同步改 `assets/i18n.js` 里对应的英文,否则英文界面会显示中文。

## 写一篇新博客

1. 复制 `blog/_template.html`,重命名为 `日期-短标题.html`(如 `2026-10-01-first-post.html`)
2. 修改标题、日期、语言标签(中文 / EN)和正文
3. 打开 `blog.html`,复制一张文章卡片,改成新文章的链接、标题和摘要
4. 如果它是最新一篇,可以顺手更新 `index.html` 里的"最新文章"

## 部署到 GitHub Pages

### 方式 A:网页上传(不用装任何软件)

1. 登录 GitHub,新建仓库,仓库名填 `你的用户名.github.io`(必须是这个名字)
2. 进入仓库 → **Add file → Upload files**,把 `mywebsite` 里的**所有文件和文件夹**拖进去,提交
3. 仓库 **Settings → Pages**,Source 选 `Deploy from a branch`,分支选 `main`,目录选 `/ (root)`,保存
4. 等一两分钟,访问 `https://你的用户名.github.io`

### 方式 B:命令行(需要先装 Git)

```bash
winget install Git.Git        # 安装 Git(只需一次)
cd E:\mywebsite
git init
git add .
git commit -m "first version"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

推送后,同样在 Settings → Pages 里开启即可。

## 小说明

- 全站使用相对路径,放在子目录(比如 `用户名.github.io/mywebsite/`)也能正常工作
- `blog/_template.html` 加了 `noindex`,不会被搜索引擎收录
- 打印"关于"页会自动隐藏导航和页脚,适合直接另存为 PDF
