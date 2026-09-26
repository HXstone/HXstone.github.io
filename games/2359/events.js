/* =========================================================
   23:59 | Boarding School Simulator — Event Library
   Data only. Loaded before game.js.

   Schema
   ------
   {
     id, category, title, prompt,
     trigger:   { from, to, dayMin }      // minutes-of-day window (optional)
     condition: { maxEnergy, minStress, maxGrade, ... }  // hard filter (optional)
     boost:     { condition: {...}, weight }             // weight override when met
     weight,                                            // 1..10
     lifecycle: 'daily' | 'once' | 'cooldown',
     cooldownDays,
     queued:    true,                    // only fired from a cross-day queue
     options: [{
       label, time, stats,
       requires,   // action id — disabled if that action is locked
       setFlag,    // write a persistent flag
       queue,      // push an event id onto tomorrow's queue
       endDay      // immediately end the night
     }]
   }

   Effects use: energy / focus / mood / stress / grade
   Time is in minutes.
   ========================================================= */

window.G2359_EVENTS = [

  /* ================= Academic ================= */
  {
    id: 'math_homework_reminder',
    category: 'academic',
    title: '数学作业没写',
    prompt: '你突然想起：\n数学作业还没写。',
    weight: 10,
    lifecycle: 'daily',
    options: [
      { label: '现在写', time: 60, stats: { energy: -8, focus: -3, stress: 5, grade: 2 } },
      { label: '明天再说', time: 0, stats: { mood: -3, stress: 6, grade: -1 } }
    ]
  },
  {
    id: 'tomorrow_quiz',
    category: 'academic',
    title: '明天有小测',
    prompt: '你翻了翻课本，\n想起明天有一场小测。',
    condition: { maxGrade: 60 },
    weight: 4,
    boost: { condition: { maxGrade: 45 }, weight: 6 },
    lifecycle: 'cooldown',
    cooldownDays: 2,
    options: [
      { label: '复习一下', time: 60, stats: { energy: -10, focus: -5, stress: 4, grade: 1 }, queue: 'quiz_result_prepared' },
      { label: '直接睡', time: 0, stats: { stress: -3, mood: 2, grade: -1 }, queue: 'quiz_result_unprepared', endDay: true }
    ]
  },
  {
    id: 'teacher_notice',
    category: 'academic',
    title: '老师临时通知',
    prompt: '老师在小群里发了条通知：\n明天要交一张表。',
    weight: 5,
    lifecycle: 'daily',
    options: [
      { label: '现在记下来', time: 10, stats: { stress: 2 }, setFlag: 'notice' },
      { label: '先放着', time: 0, stats: { mood: 1 } }
    ]
  },
  {
    id: 'classmate_question',
    category: 'academic',
    title: '同学来问问题',
    prompt: '同学把题本递过来：\n“这题你怎么看？”',
    condition: { minFocus: 30 },
    weight: 8,
    lifecycle: 'daily',
    options: [
      { label: '给他讲一下', time: 30, stats: { energy: -5, focus: -3, mood: 4, grade: 1 } },
      { label: '现在不方便', time: 0, stats: { mood: -2, stress: 2 } }
    ]
  },
  {
    id: 'knowledge_gap',
    category: 'academic',
    title: '发现知识漏洞',
    prompt: '做题时你发现，\n有一个知识点一直没真正弄懂。',
    condition: { maxGrade: 50 },
    weight: 3,
    boost: { condition: { maxGrade: 35 }, weight: 6 },
    lifecycle: 'daily',
    options: [
      { label: '现在补上', time: 60, stats: { energy: -10, focus: -5, stress: 3, grade: 1 } },
      { label: '先记下来', time: 10, stats: { stress: 2, grade: 1 } }
    ]
  },
  {
    id: 'focus_slip',
    category: 'academic',
    title: '学不进去',
    prompt: '你盯着同一页看了很久，\n却没有真正读进去。',
    condition: { maxFocus: 35 },
    weight: 4,
    boost: { condition: { maxFocus: 25 }, weight: 8 },
    lifecycle: 'daily',
    options: [
      { label: '继续硬看', time: 30, stats: { focus: -3, stress: 3, grade: 1 } },
      { label: '换个简单任务', time: 30, stats: { focus: 2, mood: 2 } },
      { label: '休息一下', time: 30, stats: { energy: 3, focus: 4, stress: -3 } }
    ]
  },
  {
    id: 'exam_talk',
    category: 'academic',
    title: '同学聊考试',
    prompt: '走廊上有人在聊最近的考试，\n声音不小。',
    weight: 6,
    lifecycle: 'daily',
    options: [
      { label: '插几句', time: 30, stats: { focus: -2, stress: 4, grade: 1, mood: 2 } },
      { label: '先走开', time: 0, stats: { stress: -2, mood: -1 } }
    ]
  },

  /* ================= Dormitory ================= */
  {
    id: 'roommate_chat',
    category: 'dormitory',
    title: '室友突然聊天',
    prompt: '室友忽然打开了话匣子，\n说个不停。',
    weight: 10,
    lifecycle: 'daily',
    options: [
      { label: '聊一会儿', time: 30, stats: { mood: 6, energy: -3, focus: -3 } },
      { label: '继续手上的事', time: 0, stats: { mood: -2, focus: 2 } }
    ]
  },
  {
    id: 'roommate_borrow',
    category: 'dormitory',
    title: '室友借东西',
    prompt: '室友探过头来：\n“你的充电线借我用下？”',
    weight: 8,
    lifecycle: 'daily',
    options: [
      { label: '借给他', time: 0, stats: { mood: 2 }, setFlag: 'lent' },
      { label: '自己还要用', time: 0, stats: { mood: -3, stress: 2 } }
    ]
  },
  {
    id: 'dorm_noise',
    category: 'dormitory',
    title: '宿舍变吵',
    prompt: '宿舍里的声音\n渐渐大了起来。',
    weight: 9,
    lifecycle: 'daily',
    options: [
      { label: '戴上耳机', time: 0, stats: { focus: 2, mood: -1 } },
      { label: '提醒一声', time: 0, stats: { mood: -2, stress: 2, focus: 2 } },
      { label: '忍一忍', time: 0, stats: { focus: -4, stress: 4 } }
    ]
  },
  {
    id: 'hot_water_last',
    category: 'dormitory',
    title: '热水快停了',
    prompt: '宿舍广播：\n热水供应将在半小时后结束。',
    trigger: { from: 1200, to: 1380 },
    weight: 8,
    lifecycle: 'daily',
    options: [
      { label: '现在去洗', time: 30, stats: { energy: -2, focus: 3, mood: 5, stress: -5 } },
      { label: '明早再洗', time: 0, stats: { focus: -2, mood: -3, stress: 4 } }
    ]
  },
  {
    id: 'dorm_inspection',
    category: 'dormitory',
    title: '宿舍卫生检查',
    prompt: '楼下贴了通知：\n明天有卫生检查。',
    weight: 5,
    lifecycle: 'daily',
    options: [
      { label: '现在收拾', time: 30, stats: { energy: -6, stress: -2, mood: 2 } },
      { label: '先不管', time: 0, stats: { stress: 4 }, setFlag: 'risk' }
    ]
  },
  {
    id: 'lights_out',
    category: 'dormitory',
    title: '有人准备睡了',
    prompt: '有人已经把自己那侧的灯\n关掉了。',
    trigger: { from: 1320 },
    weight: 7,
    lifecycle: 'daily',
    options: [
      { label: '配合关灯', time: 0, stats: { mood: 2, stress: -2 } },
      { label: '开小灯继续', time: 0, stats: { focus: -2, mood: -2, stress: 2 } }
    ]
  },
  {
    id: 'lost_item',
    category: 'dormitory',
    title: '找不到东西',
    prompt: '你要用的时候，\n发现那样东西不见了。',
    weight: 6,
    lifecycle: 'daily',
    options: [
      { label: '翻一翻', time: 30, stats: { stress: 4, mood: -2 } },
      { label: '先不找了', time: 0, stats: { mood: -3, stress: 2 } }
    ]
  },

  /* ================= Social ================= */
  {
    id: 'friend_invitation',
    category: 'social',
    title: '朋友邀踢球',
    prompt: '朋友发来消息：\n“去操场踢一会儿吗？”',
    trigger: { to: 1260 },
    weight: 10,
    lifecycle: 'daily',
    options: [
      { label: '去', time: 60, stats: { energy: -10, mood: 10 }, requires: 'exercise' },
      { label: '不去', time: 0, stats: { mood: -5, stress: 3 } }
    ]
  },
  {
    id: 'friend_message',
    category: 'social',
    title: '朋友发消息',
    prompt: '手机亮了一下，\n是朋友发来的消息。',
    weight: 9,
    lifecycle: 'daily',
    options: [
      { label: '回他', time: 15, stats: { mood: 4 } },
      { label: '先不回', time: 0, stats: { focus: 2, mood: -2 } }
    ]
  },
  {
    id: 'class_discussion',
    category: 'social',
    title: '班级临时讨论',
    prompt: '群里突然热闹起来，\n有人在组织讨论。',
    trigger: { to: 1260 },
    weight: 6,
    lifecycle: 'daily',
    options: [
      { label: '参与一下', time: 30, stats: { mood: 5, focus: -2 } },
      { label: '不参与', time: 0, stats: { mood: -2 } }
    ]
  },
  {
    id: 'friend_game',
    category: 'social',
    title: '朋友邀玩游戏',
    prompt: '朋友问你：\n“来一局？”',
    trigger: { from: 1140, to: 1380 },
    weight: 9,
    lifecycle: 'daily',
    options: [
      { label: '玩一会儿', time: 60, stats: { energy: -5, mood: 10, focus: -5 } },
      { label: '拒绝', time: 0, stats: { mood: -3, focus: 2 } }
    ]
  },
  {
    id: 'want_to_be_alone',
    category: 'social',
    title: '不太想说话',
    prompt: '你今天\n不太想和人说话。',
    condition: { maxMood: 35 },
    weight: 4,
    boost: { condition: { maxMood: 25 }, weight: 8 },
    lifecycle: 'daily',
    options: [
      { label: '一个人待着', time: 30, stats: { mood: 3, stress: -2 } },
      { label: '找朋友聊聊', time: 60, stats: { mood: 8, energy: -4 } }
    ]
  },
  {
    id: 'group_invite',
    category: 'social',
    title: '群里喊人',
    prompt: '群里有人喊：\n“谁现在有空？”',
    weight: 6,
    lifecycle: 'daily',
    options: [
      { label: '去', time: 60, stats: { mood: 8, energy: -5 } },
      { label: '不去', time: 0, stats: { mood: -2 } }
    ]
  },
  {
    id: 'senior_advice',
    category: 'social',
    title: '有人分享经验',
    prompt: '有人聊起自己的学习方法，\n听起来挺实在。',
    condition: { maxGrade: 60 },
    weight: 3,
    boost: { condition: { maxGrade: 60 }, weight: 5 },
    lifecycle: 'daily',
    options: [
      { label: '听一听', time: 30, stats: { mood: 3, grade: 1, focus: 1 } },
      { label: '先忙自己的', time: 0, stats: { focus: 2 } }
    ]
  },
  {
    id: 'friend_promise',
    category: 'social',
    title: '朋友约明天',
    prompt: '朋友说：\n“明天晚上一起走一段？”',
    weight: 5,
    lifecycle: 'daily',
    options: [
      { label: '答应他', time: 0, stats: { mood: 4 }, queue: 'promise_keep' },
      { label: '先不确定', time: 0, stats: { mood: -1 }, queue: 'promise_miss' }
    ]
  },

  /* ================= Entertainment ================= */
  {
    id: 'video_popup',
    category: 'entertainment',
    title: '手机弹出视频',
    prompt: '手机弹出一条推送，\n是个看起来挺有趣的视频。',
    weight: 10,
    lifecycle: 'daily',
    options: [
      { label: '看一会儿', time: 30, stats: { energy: -2, mood: 6, focus: -4 } },
      { label: '划掉', time: 0, stats: { focus: 3, mood: -2 } }
    ]
  },
  {
    id: 'social_media_urge',
    category: 'entertainment',
    title: '想刷社交媒体',
    prompt: '手指不由自主地\n点开了那个熟悉的图标。',
    condition: { maxFocus: 50 },
    weight: 4,
    boost: { condition: { maxFocus: 40 }, weight: 9 },
    lifecycle: 'daily',
    options: [
      { label: '刷一会儿', time: 30, stats: { mood: 6, focus: -5, stress: -3 } },
      { label: '忍住', time: 0, stats: { focus: 3, mood: -3 } }
    ]
  },
  {
    id: 'want_music',
    category: 'entertainment',
    title: '想听音乐',
    prompt: '你有点想戴上耳机，\n先听一会儿。',
    weight: 8,
    lifecycle: 'daily',
    options: [
      { label: '听一会儿', time: 30, stats: { mood: 7, stress: -4, focus: -2 } },
      { label: '继续手上的事', time: 0, stats: { focus: 2 } }
    ]
  },
  {
    id: 'interesting_video',
    category: 'entertainment',
    title: '看到感兴趣的视频',
    prompt: '你刷到一个视频，\n正好是你一直感兴趣的话题。',
    weight: 5,
    lifecycle: 'daily',
    options: [
      { label: '看完', time: 30, stats: { mood: 5, energy: -2 } },
      { label: '先收藏', time: 0, stats: { mood: 2 }, setFlag: 'saved' }
    ]
  },
  {
    id: 'game_group_alive',
    category: 'entertainment',
    title: '游戏群热闹了',
    prompt: '那个很久没动静的群，\n今晚突然刷了上百条消息。',
    trigger: { from: 1140, to: 1380 },
    weight: 6,
    lifecycle: 'daily',
    options: [
      { label: '加入', time: 60, stats: { mood: 8, focus: -5, energy: -3 } },
      { label: '暂时屏蔽', time: 0, stats: { focus: 2, mood: -3 } }
    ]
  },

  /* ================= Health / State ================= */
  {
    id: 'fatigue',
    category: 'health',
    title: '有点累了',
    prompt: '你突然发现，\n今天已经消耗了不少体力。',
    condition: { maxEnergy: 40 },
    weight: 4,
    boost: { condition: { maxEnergy: 25 }, weight: 8 },
    lifecycle: 'daily',
    options: [
      { label: '继续原计划', time: 60, stats: { energy: -10, stress: 4 } },
      { label: '先歇一会', time: 30, stats: { energy: 5, focus: 3, stress: -3 } },
      { label: '直接准备睡', time: 0, stats: { stress: -4, mood: 3 }, endDay: true }
    ]
  },
  {
    id: 'drowsy',
    category: 'health',
    title: '犯困了',
    prompt: '坐着的时候，\n你的眼皮开始打架。',
    condition: { maxEnergy: 20 },
    weight: 4,
    boost: { condition: { maxEnergy: 10 }, weight: 9 },
    lifecycle: 'daily',
    options: [
      { label: '去洗把脸', time: 30, stats: { energy: 2, focus: 3, mood: 3 } },
      { label: '靠着歇一会儿', time: 30, stats: { energy: 6, focus: 2 } },
      { label: '硬撑', time: 60, stats: { energy: -8, focus: -5, stress: 5 } }
    ]
  },
  {
    id: 'overwork',
    category: 'health',
    title: '事情有点多',
    prompt: '你看了一眼剩余的时间，\n还有几件事没完成。',
    condition: { minStress: 60 },
    weight: 4,
    boost: { condition: { minStress: 75 }, weight: 8 },
    lifecycle: 'daily',
    options: [
      { label: '继续推进', time: 60, stats: { stress: 5, grade: 2 } },
      { label: '放弃其中一项', time: 0, stats: { stress: -6, mood: -2, grade: -1 } },
      { label: '先休息', time: 30, stats: { stress: -8, mood: 4, focus: 2 } }
    ]
  },
  {
    id: 'stress_edge',
    category: 'health',
    title: '快到临界',
    prompt: '你能感觉到，\n自己已经绷得很紧了。',
    condition: { minStress: 80 },
    weight: 4,
    boost: { condition: { minStress: 90 }, weight: 9 },
    lifecycle: 'daily',
    options: [
      { label: '继续推进', time: 60, stats: { stress: 4, grade: 1 } },
      { label: '停下来缓一缓', time: 30, stats: { stress: -10, mood: 5 } },
      { label: '准备睡觉', time: 0, stats: { stress: -8, mood: 4 }, endDay: true }
    ]
  },
  {
    id: 'nothing_matters',
    category: 'health',
    title: '什么都不想做',
    prompt: '今晚好像\n做什么都提不起劲。',
    condition: { maxMood: 35 },
    weight: 4,
    boost: { condition: { maxMood: 25 }, weight: 8 },
    lifecycle: 'daily',
    options: [
      { label: '去洗个澡', time: 30, stats: { mood: 5, stress: -4 } },
      { label: '听会儿音乐', time: 30, stats: { mood: 6, stress: -3 } },
      { label: '直接睡', time: 0, stats: { stress: -3, mood: 2 }, endDay: true }
    ]
  },

  /* ================= Campus ================= */
  {
    id: 'campus_broadcast',
    category: 'campus',
    title: '校园广播',
    prompt: '广播里\n在念一段通知。',
    trigger: { to: 1260 },
    weight: 5,
    lifecycle: 'daily',
    options: [
      { label: '听一下', time: 10, stats: { mood: 3 } },
      { label: '没在意', time: 0 }
    ]
  },
  {
    id: 'tomorrow_activity',
    category: 'campus',
    title: '明天有活动',
    prompt: '有人提醒你：\n明天有个活动。',
    weight: 4,
    lifecycle: 'daily',
    options: [
      { label: '了解一下', time: 10, stats: { mood: 2 }, setFlag: 'activity', queue: 'activity_day' },
      { label: '先略过', time: 0 }
    ]
  },
  {
    id: 'teacher_patrol',
    category: 'campus',
    title: '老师巡查',
    prompt: '门口有人在走动，\n像是巡查。',
    trigger: { from: 1140, to: 1320 },
    weight: 5,
    lifecycle: 'daily',
    options: [
      { label: '装作在忙', time: 0, stats: { focus: 2, stress: 2, mood: -1 } },
      { label: '无所谓', time: 0, stats: { mood: 1 } }
    ]
  },
  {
    id: 'studyroom_closed',
    category: 'campus',
    title: '自习室关门',
    prompt: '自习室的门\n已经锁上了。',
    trigger: { from: 1260 },
    weight: 4,
    lifecycle: 'daily',
    options: [
      { label: '回宿舍', time: 15, stats: { mood: -1 } },
      { label: '换个地方', time: 30, stats: { stress: 3 } }
    ]
  },

  /* ================= Weather ================= */
  {
    id: 'rain',
    category: 'weather',
    title: '下雨了',
    prompt: '窗外的雨声\n比刚才大了一些。',
    weight: 3,
    lifecycle: 'daily',
    options: [
      { label: '站着看一会儿', time: 15, stats: { mood: 4, stress: -2 } },
      { label: '没在意', time: 0 }
    ]
  },
  {
    id: 'cold_night',
    category: 'weather',
    title: '降温了',
    prompt: '晚风比傍晚\n凉了不少。',
    trigger: { from: 1200 },
    weight: 3,
    lifecycle: 'daily',
    options: [
      { label: '加件衣服', time: 10, stats: { mood: 2, stress: -1 } },
      { label: '先不管', time: 0, stats: { stress: 2 }, setFlag: 'chilly', queue: 'chilly_result' }
    ]
  },

  /* ================= Reflection ================= */
  {
    id: 'look_back',
    category: 'reflection',
    title: '回顾今天',
    prompt: '你停了一下，\n想起今天做过的几件事。',
    trigger: { from: 1260 },
    weight: 4,
    lifecycle: 'daily',
    options: [
      { label: '想一想', time: 15, stats: { stress: -2, mood: 2 } },
      { label: '不想了', time: 0 }
    ]
  },
  {
    id: 'tomorrow_plan',
    category: 'reflection',
    title: '想想明天',
    prompt: '明天还有明天的事。',
    trigger: { from: 1260 },
    weight: 4,
    lifecycle: 'daily',
    options: [
      { label: '简单安排一下', time: 15, stats: { stress: -2 }, setFlag: 'planned', queue: 'planned_bonus' },
      { label: '明天再说', time: 0 }
    ]
  },

  /* ================= Special (rare / once) ================= */
  {
    id: 'good_news',
    category: 'special',
    title: '意外好消息',
    prompt: '一个你没想到的消息传来了，\n是件好事。',
    weight: 1,
    lifecycle: 'once',
    options: [
      { label: '告诉别人', time: 15, stats: { mood: 8 } },
      { label: '自己高兴一会儿', time: 0, stats: { mood: 6, focus: 2 } }
    ]
  },
  {
    id: 'free_time',
    category: 'special',
    title: '一段完整空闲',
    prompt: '原本安排好的事\n临时取消了。\n你多出一整段时间。',
    weight: 1,
    lifecycle: 'once',
    options: [
      { label: '拿来做点正事', time: 60, stats: { grade: 2 } },
      { label: '好好休息', time: 60, stats: { energy: 8, stress: -6 } },
      { label: '留给自己', time: 60, stats: { mood: 10 } }
    ]
  },
  {
    id: 'old_friend',
    category: 'special',
    title: '很久没联系的人',
    prompt: '一个很久没说过话的名字\n突然发来了消息。',
    weight: 1,
    lifecycle: 'once',
    options: [
      { label: '聊几句', time: 30, stats: { mood: 7 } },
      { label: '先不回复', time: 0, stats: { mood: -2 } }
    ]
  },
  {
    id: 'ai_news',
    category: 'special',
    title: '感兴趣的新东西',
    prompt: '你看到一条关于新技术的消息，\n正好是你感兴趣的。',
    weight: 1,
    lifecycle: 'once',
    options: [
      { label: '深入了解', time: 45, stats: { mood: 5, focus: 3 }, setFlag: 'curious' },
      { label: '先收藏', time: 0, stats: { mood: 2 }, setFlag: 'saved' }
    ]
  },

  /* ================= Combined state ================= */
  {
    id: 'exhausted_deadline',
    category: 'health',
    title: '还有事没完成',
    prompt: '今晚还有事情没完成，\n但你已经明显感觉累了。',
    condition: { maxEnergy: 30, minStress: 60 },
    weight: 3,
    boost: { condition: { maxEnergy: 25, minStress: 75 }, weight: 9 },
    lifecycle: 'daily',
    options: [
      { label: '硬撑', time: 60, stats: { energy: -10, stress: 5, grade: 2 } },
      { label: '放弃一项', time: 0, stats: { stress: -6, grade: -1 } },
      { label: '先去睡', time: 0, stats: { stress: -5 }, endDay: true }
    ]
  },
  {
    id: 'empty_both',
    category: 'health',
    title: '什么都不太想做',
    prompt: '今天似乎\n什么都不太想做。',
    condition: { maxEnergy: 30, maxMood: 35 },
    weight: 3,
    boost: { condition: { maxEnergy: 25, maxMood: 25 }, weight: 9 },
    lifecycle: 'daily',
    options: [
      { label: '洗个澡', time: 30, stats: { mood: 5, energy: 2 } },
      { label: '听会儿音乐', time: 30, stats: { mood: 6 } },
      { label: '直接睡', time: 0, stats: { mood: 2 }, endDay: true }
    ]
  },
  {
    id: 'scattered_pressure',
    category: 'health',
    title: '越想快越乱',
    prompt: '越想快点做完，\n越难集中注意力。',
    condition: { maxFocus: 30, minStress: 60 },
    weight: 3,
    boost: { condition: { maxFocus: 25, minStress: 75 }, weight: 9 },
    lifecycle: 'daily',
    options: [
      { label: '继续硬做', time: 30, stats: { focus: -4, stress: 4 } },
      { label: '停下来调整', time: 30, stats: { focus: 5, stress: -6 } }
    ]
  },
  {
    id: 'late_grade_push',
    category: 'academic',
    title: '时间不多了',
    prompt: '剩余时间不多，\n但还有学习任务。',
    condition: { maxGrade: 50 },
    trigger: { from: 1320 },
    weight: 4,
    lifecycle: 'daily',
    options: [
      { label: '补救一下', time: 60, stats: { energy: -10, grade: 2, stress: 3 } },
      { label: '睡觉', time: 0, stats: { stress: -3 }, endDay: true }
    ]
  },

  /* ================= Delayed results (queue only) ================= */
  {
    id: 'quiz_result_prepared',
    category: 'academic',
    title: '小测结果',
    prompt: '昨天的小测发下来了，\n你之前看过的那部分做得很顺。',
    queued: true,
    options: [
      { label: '知道了', time: 0, stats: { grade: 1, mood: 3 } }
    ]
  },
  {
    id: 'quiz_result_unprepared',
    category: 'academic',
    title: '小测结果',
    prompt: '昨天的小测发下来了，\n有几道题你完全没印象。',
    queued: true,
    options: [
      { label: '知道了', time: 0, stats: { grade: -1, stress: 3 } }
    ]
  },
  {
    id: 'activity_day',
    category: 'campus',
    title: '今天的活动',
    prompt: '你昨天了解的那个活动，\n今天真的开始了。',
    queued: true,
    options: [
      { label: '去参与', time: 0, stats: { mood: 3 } }
    ]
  },
  {
    id: 'promise_keep',
    category: 'social',
    title: '一起走一段',
    prompt: '昨天答应的事，\n今天兑现了。',
    queued: true,
    options: [
      { label: '挺好', time: 0, stats: { mood: 5 } }
    ]
  },
  {
    id: 'promise_miss',
    category: 'social',
    title: '昨天的事',
    prompt: '昨天没答应的事，\n今天也就过去了。',
    queued: true,
    options: [
      { label: '知道了', time: 0, stats: { mood: -1 } }
    ]
  },
  {
    id: 'planned_bonus',
    category: 'reflection',
    title: '按计划开始',
    prompt: '因为昨晚简单安排过，\n今天上手快了一些。',
    queued: true,
    options: [
      { label: '开始', time: 0, stats: { focus: 3 } }
    ]
  },
  {
    id: 'chilly_result',
    category: 'weather',
    title: '昨晚有点凉',
    prompt: '昨晚没加衣服，\n今天起来有点没精神。',
    queued: true,
    options: [
      { label: '知道了', time: 0, stats: { energy: -5 } }
    ]
  },

  /* ================= Flag-driven follow-ups ================= */
  {
    id: 'notice_return',
    category: 'academic',
    title: '该交的表',
    prompt: '你之前记下的那张表，\n明天就要交了。',
    condition: { flag: 'notice' },
    weight: 6,
    lifecycle: 'cooldown',
    cooldownDays: 2,
    options: [
      { label: '现在就填', time: 30, stats: { focus: -2, stress: 3, grade: 1 } },
      { label: '再拖一会儿', time: 0, stats: { stress: 5 } }
    ]
  },
  {
    id: 'lent_return',
    category: 'dormitory',
    title: '室友还东西',
    prompt: '你之前借出去的东西，\n被放回了桌上。',
    condition: { flag: 'lent' },
    weight: 5,
    lifecycle: 'once',
    options: [
      { label: '挺好', time: 0, stats: { mood: 3 } }
    ]
  },
  {
    id: 'saved_revisit',
    category: 'entertainment',
    title: '收藏的东西',
    prompt: '你想起了前几天\n收藏的那个内容。',
    condition: { flag: 'saved' },
    weight: 5,
    lifecycle: 'cooldown',
    cooldownDays: 3,
    options: [
      { label: '现在看看', time: 30, stats: { mood: 5, energy: -2 } },
      { label: '继续放着', time: 0, stats: { focus: 2 } }
    ]
  },
  {
    id: 'risk_check',
    category: 'dormitory',
    title: '卫生检查结果',
    prompt: '上次没收拾的结果，\n今天有了反馈。',
    condition: { flag: 'risk' },
    weight: 5,
    lifecycle: 'cooldown',
    cooldownDays: 3,
    options: [
      { label: '接受结果', time: 0, stats: { stress: 4, mood: -2 } }
    ]
  },
  {
    id: 'curious_more',
    category: 'special',
    title: '顺着看下去',
    prompt: '因为之前了解过一点，\n这次你很快就看懂了。',
    condition: { flag: 'curious' },
    weight: 4,
    lifecycle: 'cooldown',
    cooldownDays: 3,
    options: [
      { label: '继续深入', time: 45, stats: { mood: 5, focus: 2 } },
      { label: '先到这里', time: 0, stats: { mood: 2 } }
    ]
  },

  /* ================= Everyday life ================= */
  {
    id: 'missed_dinner',
    category: 'health',
    title: '还没吃晚饭',
    prompt: '忙到现在，\n你才想起来晚饭还没吃。',
    trigger: { to: 1200 },
    weight: 8,
    lifecycle: 'daily',
    options: [
      { label: '去吃点东西', time: 30, stats: { energy: 6, mood: 4, focus: 1 } },
      { label: '忍到明天', time: 0, stats: { energy: -4, stress: 3, focus: -2 } }
    ]
  },
  {
    id: 'phone_battery',
    category: 'dormitory',
    title: '手机快没电了',
    prompt: '屏幕右上角\n只剩下一点电。',
    trigger: { from: 1260 },
    weight: 4,
    lifecycle: 'daily',
    options: [
      { label: '现在充上', time: 10, stats: { stress: -1 } },
      { label: '先不管', time: 0, stats: { stress: 2 } }
    ]
  },

  /* ================= Weekend ================= */
  {
    id: 'weekend_relax',
    category: 'entertainment',
    title: '周末的晚上',
    prompt: '没有晚自习的晚上，\n时间像是慢了下来。',
    condition: { weekend: true },
    weight: 9,
    lifecycle: 'daily',
    options: [
      { label: '慢慢放松', time: 60, stats: { mood: 8, stress: -6 } },
      { label: '还是做点事', time: 60, stats: { energy: -6, focus: 3, grade: 1 } }
    ]
  },
  {
    id: 'weekend_homework',
    category: 'academic',
    title: '周末的作业',
    prompt: '周末的作业\n比平时更多一些。',
    condition: { weekend: true },
    weight: 7,
    lifecycle: 'daily',
    options: [
      { label: '先做一部分', time: 60, stats: { energy: -8, focus: -3, stress: 3, grade: 1 } },
      { label: '留到明天', time: 0, stats: { stress: 4 } }
    ]
  },

  /* ================= More cross-day chains ================= */
  {
    id: 'big_exam',
    category: 'academic',
    title: '明天大考',
    prompt: '有人在群里提醒：\n明天有一场大考。',
    condition: { maxGrade: 75 },
    weight: 5,
    lifecycle: 'cooldown',
    cooldownDays: 3,
    options: [
      { label: '认真准备', time: 90, stats: { energy: -12, focus: -6, stress: 6, grade: 2 }, queue: 'exam_result_prepared' },
      { label: '简单看看', time: 30, stats: { stress: 4, grade: 1 }, queue: 'exam_result_unprepared' },
      { label: '先不管',   time: 0,  stats: { stress: 5 }, queue: 'exam_result_unprepared' }
    ]
  },
  {
    id: 'homework_left',
    category: 'academic',
    title: '作业还剩一些',
    prompt: '你发现今晚的作业\n还剩最后一部分。',
    weight: 7,
    lifecycle: 'daily',
    options: [
      { label: '现在做完', time: 60, stats: { energy: -8, stress: 2, grade: 1 }, queue: 'homework_check' },
      { label: '留一部分', time: 0,  stats: { stress: 4 }, queue: 'homework_check' }
    ]
  },
  {
    id: 'friend_favor',
    category: 'social',
    title: '朋友托你带东西',
    prompt: '朋友说：\n“明天帮我带一下？”',
    weight: 5,
    lifecycle: 'cooldown',
    cooldownDays: 3,
    options: [
      { label: '答应',     time: 0, stats: { mood: 3 },  queue: 'favor_result' },
      { label: '不太方便', time: 0, stats: { mood: -2 } }
    ]
  },
  {
    id: 'exam_result_prepared',
    category: 'academic',
    title: '大考结果',
    prompt: '昨天复习过的那部分\n考得很顺。',
    queued: true,
    options: [
      { label: '知道了', time: 0, stats: { grade: 2, mood: 3 } }
    ]
  },
  {
    id: 'exam_result_unprepared',
    category: 'academic',
    title: '大考结果',
    prompt: '大考里有几道题\n你完全没见过。',
    queued: true,
    options: [
      { label: '知道了', time: 0, stats: { grade: -1, stress: 4 } }
    ]
  },
  {
    id: 'homework_check',
    category: 'academic',
    title: '作业收上去了',
    prompt: '作业收走之后，\n你看了看自己的那一份。',
    queued: true,
    options: [
      { label: '知道了', time: 0, stats: { stress: -2 } }
    ]
  },
  {
    id: 'favor_result',
    category: 'social',
    title: '帮了个忙',
    prompt: '昨天答应的事，\n今天顺手就办了。',
    queued: true,
    options: [
      { label: '挺好', time: 0, stats: { mood: 4 } }
    ]
  }
];
