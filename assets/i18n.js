/* =========================================================
   中英文案对照表 + 语言应用逻辑
   ---------------------------------------------------------
   页面上的文字用 data-i18n="键名" 标记,
   切换语言时自动替换 textContent。
   某个键在英文里没有时,会自动回退显示中文。
   ========================================================= */

var I18N = {
  zh: {
    "site.name": "H 的小站",

    "nav.home": "首页",
    "nav.projects": "作品",
    "nav.blog": "博客",
    "nav.about": "关于",

    "footer.built": "基于 GitHub Pages",
    "footer.contact": "联系我",

    "home.hello": "你好,我是",
    "home.name": "你的名字",
    "home.role": "学生 · 编程爱好者",
    "home.bio": "这个网站放着我的小作品、学习笔记和平时的一些想法。这里的每个页面,都是我用 HTML、CSS 和 JavaScript 一点点搭起来的。",
    "home.viewProjects": "看看我的作品",
    "home.readBlog": "读读博客",
    "home.featured": "精选作品",
    "home.allProjects": "全部作品 →",
    "home.latest": "最新文章",
    "home.allPosts": "全部文章 →",

    "projects.title": "作品集",
    "projects.subtitle": "我做的一些小东西,大多可以直接在浏览器里打开玩。",
    "proj.mine.title": "扫雷",
    "proj.mine.desc": "经典扫雷游戏,支持初级、中级、高级三种难度,带计时器和深色界面。",
    "proj.dino.title": "恐龙快跑",
    "proj.dino.desc": "点击或按空格开始,支持跳跃、下蹲和昼夜交替,键盘和触屏都能玩。",
    "proj.notes.title": "错题本",
    "proj.notes.desc": "用 Markdown 整理的数学、物理、化学错题与知识点合集,正在持续更新。",
    "projects.open": "打开玩玩 →",
    "projects.soon": "整理中,敬请期待",
    "projects.note": "更多作品还在路上。",

    "blog.title": "博客",
    "blog.subtitle": "学习笔记、折腾记录和一些零碎想法。",
    "blog.readMore": "阅读全文 →",
    "blog.back": "← 返回博客",

    "about.title": "关于我",
    "about.subtitle": "一点自我介绍,以及一份可以打印的简历。",
    "about.intro1": "我是一名编程爱好者,喜欢用 HTML、CSS 和 JavaScript 做各种小东西。做这个网站,是为了把作品和笔记都放在同一个地方。",
    "about.intro2": "平时写写小游戏,整理学习笔记。如果你对我的作品感兴趣,欢迎通过下面的方式联系我。",
    "about.print": "打印 / 保存为 PDF",
    "about.resume": "简历",
    "about.skills": "技能",
    "about.experience": "经历",
    "about.education": "教育",
    "about.contact": "联系方式",
    "about.todo": "待填写",
    "about.exp1.when": "2026",
    "about.exp1.title": "开始做个人项目",
    "about.exp1.desc": "用原生 HTML/CSS/JS 做了扫雷、恐龙快跑等小游戏,并开始整理错题笔记。",
    "about.exp2.when": "2026",
    "about.exp2.title": "搭建这个网站",
    "about.exp2.desc": "手写了一个纯静态的中英双语个人网站,计划发布在 GitHub Pages 上。",
    "about.edu1.title": "你的学校",
    "about.edu1.desc": "在这里填写专业与起止时间。",

    "notfound.title": "页面走丢了",
    "notfound.desc": "你要找的页面不存在,或者已经被移走了。",
    "notfound.home": "回到首页"
  },

  en: {
    "site.name": "H's Corner",

    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.about": "About",

    "footer.built": "Hosted on GitHub Pages",
    "footer.contact": "Contact",

    "home.hello": "Hi, I'm",
    "home.name": "Your Name",
    "home.role": "Student · Hobbyist developer",
    "home.bio": "This site holds my small projects, study notes and random thoughts. Every page here is hand-built with HTML, CSS and JavaScript.",
    "home.viewProjects": "View my projects",
    "home.readBlog": "Read the blog",
    "home.featured": "Featured projects",
    "home.allProjects": "All projects →",
    "home.latest": "Latest posts",
    "home.allPosts": "All posts →",

    "projects.title": "Projects",
    "projects.subtitle": "Small things I've made. Most of them run right in your browser.",
    "proj.mine.title": "Minesweeper",
    "proj.mine.desc": "Classic Minesweeper with beginner, intermediate and expert levels, a timer and a dark UI.",
    "proj.dino.title": "Dino Run",
    "proj.dino.desc": "Click or press Space to start. Jump, duck and run through day and night — keyboard or touch.",
    "proj.notes.title": "Mistake Notebook",
    "proj.notes.desc": "A Markdown knowledge base of mistakes and key points for math, physics and chemistry. Work in progress.",
    "projects.open": "Open and play →",
    "projects.soon": "Coming soon",
    "projects.note": "More projects on the way.",

    "blog.title": "Blog",
    "blog.subtitle": "Study notes, tinkering logs and scattered thoughts.",
    "blog.readMore": "Read more →",
    "blog.back": "← Back to blog",

    "about.title": "About",
    "about.subtitle": "A short introduction, plus a print-friendly résumé.",
    "about.intro1": "I'm a hobbyist developer who loves building little things with HTML, CSS and JavaScript. I made this site to keep my projects and notes in one place.",
    "about.intro2": "I build small games and organize study notes. If anything here interests you, feel free to reach out.",
    "about.print": "Print / Save as PDF",
    "about.resume": "Résumé",
    "about.skills": "Skills",
    "about.experience": "Experience",
    "about.education": "Education",
    "about.contact": "Contact",
    "about.todo": "To fill in",
    "about.exp1.when": "2026",
    "about.exp1.title": "Started building personal projects",
    "about.exp1.desc": "Built small games like Minesweeper and Dino Run with vanilla HTML/CSS/JS, and started organizing study notes.",
    "about.exp2.when": "2026",
    "about.exp2.title": "Built this website",
    "about.exp2.desc": "Hand-coded a static bilingual personal site, to be published on GitHub Pages.",
    "about.edu1.title": "Your school",
    "about.edu1.desc": "Add your major and dates here.",

    "notfound.title": "This page wandered off",
    "notfound.desc": "The page you're looking for doesn't exist, or it has been moved.",
    "notfound.home": "Back home"
  }
};

/**
 * 应用指定语言到当前页面。
 * @param {string} lang "zh" 或 "en"
 */
function applyLang(lang) {
  var dict = I18N[lang] || I18N.zh;
  var fallback = I18N.zh;

  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    var value = dict[key];
    if (value == null) value = fallback[key];
    if (value != null) el.textContent = value;
  });
}
