/* =========================================================
   HX STONE · i18n.js
   ---------------------------------------------------------
   页面默认语言是【英文】,HTML 里直接写英文原文。
   这里只维护【中文】对照表;切回英文时用元素上缓存的
   data-en(首次运行自动保存)。
   ========================================================= */

var I18N = {
  zh: {
    "nav.home": "首页",
    "nav.projects": "作品",
    "nav.notes": "笔记",
    "nav.about": "关于",

    "hero.bio": "我在探索如何用 AI 把好奇心变成真实的东西——小游戏、笔记,和各种实验。我负责方向,AI 帮我把它做出来。",
    "hero.cta1": "看看作品",
    "hero.cta2": "读读笔记",
    "hero.p1": "学生",
    "hero.p2": "AI 探索者",
    "hero.p3": "未来的计算机学生",

    "os.group": "追踪中",
    "os.m1": "学习",
    "os.m2": "人工智能",
    "os.m3": "编程",
    "os.m4": "长跑",

    "work.title": "案例研究",
    "work.link": "查看完整案例 →",
    "work.mine.title": "扫雷",
    "work.mine.desc": "经典扫雷:三档难度、计时器,第一下永远不会踩雷。",
    "work.dino.title": "恐龙快跑",
    "work.dino.desc": "带难度曲线的跑酷:昼夜循环,键盘和触屏都能玩。",
    "work.notes.title": "错题本",
    "work.notes.desc": "按学科和知识点整理的错题集,正在做成可检索的版本。",
    "work.case": "查看案例",

    "notes.title": "笔记",
    "notes.lead": "学习记录、折腾日志,和零碎的想法。",
    "notes.all": "全部笔记 →",
    "notes.readMore": "阅读全文",
    "notes.f.all": "全部",
    "notes.f.ai": "AI",
    "notes.f.science": "科学",
    "notes.f.learning": "学习",
    "notes.f.ideas": "想法",

    "projects.title": "精选作品",
    "projects.lead": "三个真实做过的东西。每个都从问题开始,到能玩、能用为止。",
    "case.demo": "试玩 Demo",
    "case.play": "打开游戏",
    "case.notesLink": "了解错题本",
    "case.mine.lead": "把 90 年代的经典搬到自己的手机上:深色棋盘、更安全的第一下、三档难度。",
    "case.mine.problem": "原版棋盘在手机上好难点,而且第一下点错就直接结束。",
    "case.mine.thinking": "我想要的是「熟悉但更友好」:规则不变,但棋盘对新手宽容一点。",
    "case.mine.solution": "三档难度 + 计时器 + 更大的点击区,并且保证第一下永远不会踩雷。",
    "case.mine.tech": "HTML、CSS、JavaScript。AI 当我的结对程序员,我负责每一局的试玩和提出修改。",
    "case.mine.result": "手机和电脑都跑得很顺。已经上线,点下面的按钮就能玩一局。",
    "case.dino.lead": "浏览器断网小恐龙,但我给它加上了难度曲线和真正的昼夜过渡。",
    "case.dino.problem": "原版好玩三十秒,之后永远一个样。",
    "case.dino.thinking": "我想要一局跟着玩家变强的跑酷:障碍越来越密,天黑过渡更自然。",
    "case.dino.solution": "跳跃、下蹲、速降三种动作,滚动式昼夜循环,键盘和触屏都能操作。",
    "case.dino.tech": "一个 HTML 文件 + 自适应画布,不用任何库,也不需要构建步骤。",
    "case.dino.result": "大约 27 KB,打开瞬间完成,旧手机上也不卡。",
    "case.notes.lead": "给自己做一个「第二大脑」,把反复做错的题按学科和知识点存下来。",
    "case.notes.problem": "错题都留在纸上:零散、搜不到,考前根本翻不完。",
    "case.notes.thinking": "如果一个笔记五秒钟找不到,它就不会被复习。",
    "case.notes.solution": "用 Markdown 按学科和知识点分类,每道题都标上错因。",
    "case.notes.tech": "纯文本 + Git 版本管理,每次修改都有记录。",
    "case.notes.result": "还在持续整理中,下一步是做成可以在线检索的版本。",

    "step.problem": "问题",
    "step.thinking": "思考",
    "step.solution": "方案",
    "step.technology": "技术",
    "step.result": "结果",

    "about.title": "关于",
    "about.p1": "我是惠州的一名高中生。足球和长跑让我保持状态,好奇心则都放在 AI 上。",
    "about.p2": "我不像工程师那样写代码。我定方向和标准,AI 负责实现,我负责一遍遍测试到满意——这个网站也是这么做出来的。",
    "about.contact.title": "联系方式",

    "footer.contact": "写信给我",

    "notfound.title": "这个页面走丢了",
    "notfound.desc": "你要找的页面不存在,或者已经被移走了。",
    "notfound.home": "回到首页",

    "article.back": "← 返回笔记",

    "note.helloWorld.title": "你好，世界：我的个人数字空间 · HX STONE",
    "note.helloWorld.h1": "你好，世界：我的个人数字空间",
    "note.helloWorld.card.desc": "记录成长、探索科技，并留下属于自己的声音。",
    "note.helloWorld.p0": "记录成长、探索科技，并留下属于自己的声音。",
    "note.helloWorld.h.about": "关于我",
    "note.helloWorld.p1": "你好，我是一名高中生。在成长的过程中，我逐渐发现自己对人工智能、金融、足球以及长跑等领域产生了浓厚的兴趣。这些兴趣不仅丰富了我的生活，也不断推动我去探索更广阔的世界。",
    "note.helloWorld.h.why": "为什么创建这个网站？",
    "note.helloWorld.p2": "在今天这个信息高度流动的时代，我们习惯通过微信、X、Douyin 等主流社交媒体表达自己，但这些平台往往受到算法、形式和传播规则的影响。因此，我希望建立一个属于自己的数字空间。这里不是简单的信息展示页，而是一个可以自由记录思考、分享观点、保存成长轨迹的地方。我希望通过 AI 与互联网技术，让自己的声音能够在社交媒体之外被记录和传播。",
    "note.helloWorld.h.share": "我会在这里分享什么？",
    "note.helloWorld.p3": "未来，我会在这个网站中分享关于 AI、科技、国际新闻以及个人成长的一些思考。这里可能会有我对新技术的观察，也可能会有学习过程中的总结、生活中的感悟，以及对世界变化的理解。我希望这些文字能够成为自己不断探索过程中的记录。",
    "note.helloWorld.h.future": "写给未来的自己",
    "note.helloWorld.p4": "未来几年，我不知道自己最终会走向哪里，也不知道会遇见怎样的挑战。但我希望自己能够始终保持好奇，持续学习，不断尝试新的事物，并在探索中逐渐成长。这个网站，就是我为未来留下的一份记录。希望多年以后再次打开它时，我能够看到一个不断进步、不断变化的自己。",

    "page.home.title": "HX STONE — 学生 × AI 探索者",
    "page.projects.title": "精选作品 · HX STONE",
    "page.notes.title": "笔记 · HX STONE",
    "page.about.title": "关于 · HX STONE",
    "page.notfound.title": "页面走丢了 · HX STONE",

    "work.dino.index": "游戏",
    "work.mine.index": "游戏",
    "work.notes.index": "知识库"
  }
};

/** 首次运行时,把页面上的英文原文缓存到 data-en */
function cacheEnglishText() {
  var root = document.documentElement;
  if (root.getAttribute("data-i18n-cached")) return;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.setAttribute("data-en", el.textContent);
  });

  root.setAttribute("data-i18n-cached", "1");
}

/**
 * 应用语言。默认英文(直接用页面原文),
 * 中文从 I18N.zh 取;缺少的键保持英文。
 */
function applyLang(lang) {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");

    if (lang === "zh") {
      var value = I18N.zh[key];
      if (value != null) el.textContent = value;
    } else {
      var en = el.getAttribute("data-en");
      if (en != null) el.textContent = en;
    }
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
