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
    "nav.games": "游戏",

    "hero.statement": "用 AI 和技术,搭建我的未来。",
    "hero.bio": "我把好奇心做成一个个小东西——游戏、笔记和实验;和 AI 一起实现,再反复测到满意。",
    "hero.cta1": "看看作品",
    "hero.cta2": "读读笔记",
    "hero.p1": "学生",
    "hero.p4": "跑者",
    "hero.p2": "AI 探索者",

    "work.title": "作品",
    "work.link": "全部作品",
    "work.mine.title": "扫雷",
    "work.mine.desc": "经典扫雷:三档难度、计时器,第一下永远不会踩雷。",
    "work.dino.title": "恐龙快跑",
    "work.dino.desc": "带难度曲线的跑酷:昼夜循环,键盘和触屏都能玩。",
    "work.tank.title": "坦克大战",
    "work.tank.desc": "可破坏砖墙、敌方 AI 与本地最高分的街机坦克游戏。",
    "work.case": "进入",
    "work.play": "立即游玩",
    "work.2359.title": "23:59 ｜ 住宿生",
    "work.2359.desc": "扮演高中住宿生度过一个晚上：六小时、五项状态，每个选择都有代价。",
    "work.2359.index": "游戏",

    "notes.title": "笔记",
    "notes.lead": "学习记录、折腾日志,和零碎的想法。",
    "notes.all": "全部笔记",
    "notes.f.all": "全部",
    "notes.f.ai": "AI",
    "notes.f.science": "科学",
    "notes.f.learning": "学习",
    "notes.f.ideas": "想法",

    "projects.title": "作品",
    "projects.lead": "四个真实做过的东西。每个都从问题开始,到能玩、能用为止。",
    "case.play": "打开游戏",
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
    "case.tank.lead": "一局紧凑的街机坦克大战:击穿砖墙、避开敌方炮火,清空战场。",
    "case.tank.problem": "我想做一个访客几秒就能懂、但又愿意为了高分继续玩的小游戏。",
    "case.tank.thinking": "经典坦克操作几乎不需要说明;可破坏地形则让每一局的走位都不一样。",
    "case.tank.solution": "驾驶、开火、利用掩体,在越来越密集的敌方巡逻中守住三条生命。",
    "case.tank.tech": "一个自适应 Canvas 游戏,音效和触屏操作都内置,不需要素材或第三方库。",
    "case.tank.result": "电脑和手机都能玩,并会把最高分保存在本地,下次回来还能继续挑战。",

    "case.new": "新",
    "case.2359.lead": "一款终端风格的住宿生活模拟器:一个晚上、六个小时、五项状态,以及要撑过去的十四天。",
    "case.2359.problem": "我想做一个真正需要取舍的游戏,而不只是比反应——一个没办法什么都拿满的局。",
    "case.2359.thinking": "每个小时只能花一次。如果好好学习永远有回报,游戏就不成立了——张力来自代价。",
    "case.2359.solution": "七个行动、五项可视状态,状态告急时会告警并限制选择;再加上加权随机事件,以及每 14 天一结算的评级。",
    "case.2359.tech": "手写 HTML、CSS 和 JavaScript,事件库与引擎分离;存档和档案存在 localStorage。",
    "case.2359.result": "总共约 90 KB,零依赖。打开浏览器就能玩,还会把你每一轮完成的周期记录下来。",

    "step.problem": "问题",
    "step.thinking": "思考",
    "step.solution": "方案",
    "step.technology": "技术",
    "step.result": "结果",

    "about.title": "关于",
    "about.quote": "我用<em>好奇心</em>做东西。<br>AI 是我的<em>创造伙伴</em>。",
    "about.p1": "我是惠州的一名高中生。足球和长跑让我保持状态;好奇心主要在 AI 上,也一直看市场和世界新闻。",
    "about.p2": "我不像工程师那样写代码,所以我有自己的做法:先定下做什么、什么叫好,借 AI 抵达,再反复测试打磨到站得住。这个网站就是这么来的。",
    "about.contact.title": "联系方式",
    "about.sayhi": "打个招呼",
    "about.hello": "随时欢迎聊聊 AI、足球或跑步。",

    "footer.big.1": "一起做点",
    "footer.big.2": "有意思的。",
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

    "note.hello.title": "小站开张了 · HX STONE",
    "note.hello.h1": "小站开张了",
    "note.hello.card.desc": "为什么要做这个网站,以及我是怎么做出来的。",
    "note.hello.p0": "这个网站建好了。写这篇当作开张记录,说说它为什么存在,以及它是怎么做出来的。",
    "note.hello.h.why": "为什么做这个网站",
    "note.hello.p.why": "平时做了不少小东西:扫雷、恐龙快跑,还有那个住宿生小游戏。它们散落在电脑的各个文件夹里,想给别人看的时候总要翻半天。所以我需要一个固定的地方,把作品和笔记都放进来。",
    "note.hello.h.what": "这里会有什么",
    "note.hello.li1": "<strong>作品</strong>:小游戏和以后做的各种东西,大多能直接在浏览器里打开。",
    "note.hello.li2": "<strong>笔记</strong>:学习记录、折腾日志和一些零碎想法。",
    "note.hello.li3": "<strong>关于</strong>:我在做什么,以及怎么联系我。",
    "note.hello.h.how": "我是怎么做出来的",
    "note.hello.p.how1": "老实说,我不像工程师那样写代码。我的办法是:把想要的效果尽可能说清楚,让 AI 帮忙实现,自己在浏览器里反复试,哪里不对就继续提要求。",
    "note.hello.p.how2": "这个网站就是这样一点点调出来的。所以如果你觉得哪里好看,功劳有一大半是 AI 的;如果哪里看着别扭,那多半是我没描述清楚 :)",
    "note.hello.quote": "把东西做出来,再把它放到一个能被看见的地方——这本身就是一种完成。",
    "note.hello.h.next": "接下来",
    "note.hello.p.next": "之后会继续做新的小东西,也会在这里记录过程。如果有什么想聊的,欢迎发邮件给我。",

    "page.home.title": "HX STONE — 学生 × 跑者 × AI 探索者",
    "page.projects.title": "作品 · HX STONE",
    "page.notes.title": "笔记 · HX STONE",
    "page.about.title": "关于 · HX STONE",
    "page.notfound.title": "页面走丢了 · HX STONE",

    "work.dino.index": "游戏",
    "work.tank.index": "游戏",
    "work.mine.index": "游戏"
  }
};

/** 首次运行时,把页面上的英文原文缓存到 data-en */
function cacheEnglishText() {
  var root = document.documentElement;
  if (root.getAttribute("data-i18n-cached")) return;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.setAttribute("data-en", el.textContent);
  });

  document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
    el.setAttribute("data-en-html", el.innerHTML);
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

  /* 带行内标签(如 <em> / <strong> / <br>)的文案走 innerHTML,避免结构被抹掉 */
  document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
    var key = el.getAttribute("data-i18n-html");

    if (lang === "zh") {
      var value = I18N.zh[key];
      if (value != null) el.innerHTML = value;
    } else {
      var en = el.getAttribute("data-en-html");
      if (en != null) el.innerHTML = en;
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
