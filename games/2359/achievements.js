/* =========================================================
   23:59 | Boarding School Simulator — Achievements
   Data only. Loaded before game.js.

   Each entry: { id, title, desc, check(ctx) }
   ctx = { state, archive, activity, distinctActions }
   A check returns true when the milestone is met.
   ========================================================= */

window.G2359_ACHIEVEMENTS = [
  {
    id: 'first_night',
    title: '第一晚',
    desc: '完整度过一个晚上。',
    check: function (c) { return c.state.ended && c.state.day >= 1; }
  },
  {
    id: 'first_cycle',
    title: '一个周期',
    desc: '完成 14 天的周期。',
    check: function (c) { return c.state.cycleComplete || c.archive.length >= 1; }
  },
  {
    id: 'grind',
    title: '埋头苦学',
    desc: '一晚学习 5 次以上。',
    check: function (c) { return c.state.dayStudy >= 5; }
  },
  {
    id: 'early_sleeper',
    title: '早睡',
    desc: '在 21:00 之前入睡。',
    check: function (c) {
      return c.state.sleepTime != null && c.state.sleepTime <= 21 * 60;
    }
  },
  {
    id: 'night_owl',
    title: '夜猫子',
    desc: '连续三天熬到午夜。',
    check: function (c) { return c.state.consecLateDays >= 3; }
  },
  {
    id: 'social_day',
    title: '社交之夜',
    desc: '一晚社交 3 次。',
    check: function (c) { return (c.activity.social || 0) >= 180; }
  },
  {
    id: 'all_rounder',
    title: '什么都试过',
    desc: '一晚体验 6 种不同的行动。',
    check: function (c) { return c.distinctActions >= 6; }
  },
  {
    id: 'top_grade',
    title: '满分',
    desc: '成绩达到 100。',
    check: function (c) { return c.state.grade >= 100; }
  },
  {
    id: 's_rank',
    title: 'S 级周期',
    desc: '周期评级拿到 S。',
    check: function (c) { return c.state.cycleRating === 'S'; }
  },
  {
    id: 'veteran',
    title: '老住校生',
    desc: '完成 3 个周期。',
    check: function (c) { return c.archive.length >= 3; }
  }
];
