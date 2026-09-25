/* =========================================================
   中英文案对照表 + 语言应用逻辑
   ---------------------------------------------------------
   页面上的文字用 data-i18n="键名" 标记,
   切换语言时自动替换 textContent。
   某个键在英文里没有时,会自动回退显示中文。
   ========================================================= */

var I18N = {
  zh: {
    "site.name": "Hexun 的小站",

    "nav.home": "首页",
    "nav.projects": "作品",
    "nav.blog": "博客",
    "nav.about": "关于",

    "footer.built": "基于 GitHub Pages",
    "footer.contact": "联系我",

    "home.hello": "你好,我是",
    "home.name": "Hexun",
    "home.role": "学生 · 足球与长跑 · 编程新手",
    "home.bio": "这个网站放着我的小作品、学习笔记和平时的一些想法。我不太会写代码,页面主要是在 AI 帮助下做出来的(vibe coding),我负责想点子、提要求和测试。",
    "home.viewProjects": "看看我的作品",
    "home.readBlog": "读读博客",
    "home.featured": "精选作品",
    "home.allProjects": "全部作品 →",
    "home.latest": "最新文章",
    "home.allPosts": "全部文章 →",

    "projects.title": "作品集",
    "projects.subtitle": "我做的一些小东西(AI 帮了不少忙),大多可以直接在浏览器里打开玩。",
    "proj.mine.title": "扫雷",
    "proj.mine.desc": "经典扫雷游戏,支持初级、中级、高级三种难度,带计时器和深色界面。",
    "proj.dino.title": "恐龙快跑",
    "proj.dino.desc": "点击或按空格开始,支持跳跃、下蹲和昼夜交替,键盘和触屏都能玩。",
    "proj.notes.title": "错题本",
    "proj.notes.desc": "整理的数学、物理、化学错题与知识点合集,正在持续更新。",
    "projects.open": "打开玩玩 →",
    "projects.soon": "整理中,敬请期待",
    "projects.note": "更多作品还在路上。",

    "blog.title": "博客",
    "blog.subtitle": "学习笔记、折腾记录和一些零碎想法。",
    "blog.readMore": "阅读全文 →",
    "blog.back": "← 返回博客",

    "about.title": "关于我",
    "about.subtitle": "一点自我介绍,以及一份可以打印的简历。",
    "about.intro1": "我是 Hexun,一个编程新手。我不太会写代码,主要靠 vibe coding——把想法描述清楚,让 AI 帮我写,自己负责测试和提修改。这个网站就是这么来的。",
    "about.intro2": "平时爱踢足球、长跑,也喜欢折腾计算机。如果你对我的作品感兴趣,欢迎发邮件给我。",
    "about.print": "打印 / 保存为 PDF",
    "about.resume": "简历",
    "about.method": "我的做法",
    "about.method.p": "我不写代码。我的流程是:把想要的效果尽量说清楚 → 让 AI 帮忙写 → 在浏览器里自己试 → 哪里不对就继续提要求,直到满意为止。",
    "about.hobbies": "爱好",
    "hobby.football": "足球",
    "hobby.running": "长跑",
    "hobby.computer": "计算机",
    "about.experience": "经历",
    "about.education": "教育",
    "about.contact": "联系方式",
    "about.exp1.when": "2026",
    "about.exp1.title": "开始做个人项目",
    "about.exp1.desc": "在 AI 的帮助下做了扫雷、恐龙快跑等小游戏,并开始整理错题笔记。",
    "about.exp2.when": "2026",
    "about.exp2.title": "搭建这个网站",
    "about.exp2.desc": "借助 AI 做了一个中英双语的个人网站,发布在 GitHub Pages 上。",
    "about.edu1.title": "惠南学校",
    "about.edu2.title": "惠州中学",

    "notfound.title": "页面走丢了",
    "notfound.desc": "你要找的页面不存在,或者已经被移走了。",
    "notfound.home": "回到首页"
  },

  en: {
    "site.name": "Hexun's Corner",

    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.about": "About",

    "footer.built": "Hosted on GitHub Pages",
    "footer.contact": "Contact",

    "home.hello": "Hi, I'm",
    "home.name": "Hexun",
    "home.role": "Student · Football & running · Coding beginner",
    "home.bio": "This site holds my small projects, study notes and random thoughts. I'm not much of a coder — the pages are mostly built with AI help (vibe coding); I bring the ideas, the requests and the testing.",
    "home.viewProjects": "View my projects",
    "home.readBlog": "Read the blog",
    "home.featured": "Featured projects",
    "home.allProjects": "All projects →",
    "home.latest": "Latest posts",
    "home.allPosts": "All posts →",

    "projects.title": "Projects",
    "projects.subtitle": "Small things I've made (with a lot of AI help). Most of them run right in your browser.",
    "proj.mine.title": "Minesweeper",
    "proj.mine.desc": "Classic Minesweeper with beginner, intermediate and expert levels, a timer and a dark UI.",
    "proj.dino.title": "Dino Run",
    "proj.dino.desc": "Click or press Space to start. Jump, duck and run through day and night — keyboard or touch.",
    "proj.notes.title": "Mistake Notebook",
    "proj.notes.desc": "A collection of mistakes and key points for math, physics and chemistry. Work in progress.",
    "projects.open": "Open and play →",
    "projects.soon": "Coming soon",
    "projects.note": "More projects on the way.",

    "blog.title": "Blog",
    "blog.subtitle": "Study notes, tinkering logs and scattered thoughts.",
    "blog.readMore": "Read more →",
    "blog.back": "← Back to blog",

    "about.title": "About",
    "about.subtitle": "A short introduction, plus a print-friendly résumé.",
    "about.intro1": "I'm Hexun, a coding beginner. I don't really write code — I do 'vibe coding': I describe what I want, AI writes it, and I test and polish. That's how this site was made.",
    "about.intro2": "I play football, run long distances and tinker with computers. If anything here interests you, feel free to email me.",
    "about.print": "Print / Save as PDF",
    "about.resume": "Résumé",
    "about.method": "How I work",
    "about.method.p": "I don't write code. My process: describe what I want as clearly as I can → let AI build it → test it in the browser → keep asking for changes until it feels right.",
    "about.hobbies": "Hobbies",
    "hobby.football": "Football",
    "hobby.running": "Distance running",
    "hobby.computer": "Computers",
    "about.experience": "Experience",
    "about.education": "Education",
    "about.contact": "Contact",
    "about.exp1.when": "2026",
    "about.exp1.title": "Started building personal projects",
    "about.exp1.desc": "Made small games like Minesweeper and Dino Run with AI help, and started organizing study notes.",
    "about.exp2.when": "2026",
    "about.exp2.title": "Built this website",
    "about.exp2.desc": "Built a bilingual personal website with AI help, published on GitHub Pages.",
    "about.edu1.title": "Huinan School",
    "about.edu2.title": "Huizhou High School",

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

/* 兜底:如果 main.js 没能运行(标记 data-enhanced 不出现),
   3 秒后强制显示所有动效元素,避免页面空白。 */
window.setTimeout(function () {
  if (document.documentElement.getAttribute("data-enhanced")) return;
  document.querySelectorAll(".reveal").forEach(function (el) {
    el.classList.add("is-visible");
  });
}, 3000);
