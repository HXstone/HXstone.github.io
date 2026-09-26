/* =========================================================
   23:59 | Boarding School Simulator
   Engine — 14-day cycle + weighted/conditional event library

   The event content lives in events.js (window.G2359_EVENTS).

   Confirmed design:
   - one cycle = 14 days, each day is 18:00 -> 23:59
   - night recovery: energy +30, focus +20, stress -10, mood +5, grade unchanged
   - events are weighted, condition-driven, and lifecycled
     (daily / once / cooldown)
   - an event option can be locked by the Action Lock system (requires)
   - options can set flags, queue a next-day event, or end the night
   - rating = grade*.40 + mood*.25 + energy*.15 + (100-stress)*.20
   ========================================================= */

(function () {
  'use strict';

  /* ---------- config ---------- */
  var DAY_START = 18 * 60;
  var DAY_END   = 24 * 60;
  var HOUR      = 60;
  var BAR_CELLS = 18;
  var STAT_MIN  = 0;
  var STAT_MAX  = 100;

  var TOTAL_DAYS = 14;

  var NIGHT_RECOVERY = { energy: 30, focus: 20, stress: -10, mood: 5 };

  var EVENT_CHANCE   = 0.55;   // per action, since the pool is now much larger
  var MAX_EVENTS     = 3;
  var GUARANTEE_TIME = 21 * 60;

  var SAVE_KEY    = 'g2359.save.v1';
  var ARCHIVE_KEY = 'g2359.archive.v1';

  var STAT_KEYS = ['energy', 'focus', 'mood', 'stress', 'grade'];

  var DEFAULT_STATS = { energy: 70, focus: 60, mood: 70, stress: 30, grade: 50 };

  var RATING_ORDER = { D: 1, C: 2, B: 3, A: 4, S: 5 };

  var WARN_LOW  = 0;
  var WARN_HIGH = 100;

  // coasting: a full day at zero stress costs grade, and the hit grows each day
  var ZERO_STRESS_BASE = 2;
  var ZERO_STRESS_MAX  = 10;

  // real-student tuning
  var LATE_NIGHT        = 22 * 60;   // after 22:00 studying is much less effective
  var LATE_STUDY_FACTOR = 0.6;
  var NO_STUDY_PENALTY  = 1;         // a whole evening with no books slips the grade

  // grade is settled once, at the end of the night (not instantly)
  var STUDY_GAIN_MAX    = 3;         // most grade a single evening can add
  var STRESS_GOOD_LOW   = 40;        // a moderate amount of stress actually helps
  var STRESS_GOOD_HIGH  = 70;
  var GOOD_STRESS_BONUS = 1;

  // weekend days inside the 14-day cycle
  function isWeekend(day) {
    return day === 6 || day === 7 || day === 13 || day === 14;
  }

  var STATE_LOCKS = {
    energy: { low: true,  block: ['exercise', 'study', 'social'], label: 'energy depleted' },
    focus:  { low: true,  block: ['study'],                       label: 'focus depleted' },
    mood:   { low: true,  block: ['study', 'exercise'],           label: 'mood depleted' },
    stress: { low: false, block: ['study'],                       label: 'stress overloaded' },
    grade:  { low: true,  block: [],                              label: 'grade collapsed' }
  };

  var HALF = 30;

  var ACTIONS = {
    study:         { time: HOUR, stats: { energy: -10, focus: -5, stress: 5,  mood: -2 } },      // grade settled at day end
    exercise:      { time: HOUR, stats: { energy: -12, focus: 5,  stress: -8, mood: 10 } },
    entertainment: { time: HOUR, stats: { energy: -4,  focus: -3, stress: -6, mood: 10 } },
    social:        { time: HOUR, stats: { energy: -5,  focus: 0,  stress: -4, mood: 8 } },
    shower:        { time: HALF, stats: { energy: -2,  focus: 3,  stress: -5, mood: 5 } },
    eat:           { time: HALF, stats: { energy: 8,   focus: 1,  stress: -2, mood: 4 } },
    out:           { time: 2 * HOUR, weekendOnly: true,
                     stats: { energy: -10, focus: -5, stress: -10, mood: 15 } },
    sleep:         { end: true }
  };

  // repeating the same action in one day gives diminishing returns on its
  // benefits (mood up / stress down); the costs stay at full price
  var DIMINISH = [1, 1, 0.6, 0.5, 0.4, 0.3, 0.25];

  var ACTION_ORDER = ['study', 'exercise', 'entertainment', 'social', 'shower', 'eat', 'out', 'sleep'];

  var EVENT_LIB = (window.G2359_EVENTS || []);
  var ACH_LIB   = (window.G2359_ACHIEVEMENTS || []);
  var ACH_KEY   = 'g2359.ach.v1';

  /* ---------- state ---------- */
  var state = {
    day: 1,
    time: DAY_START,
    energy: DEFAULT_STATS.energy,
    focus: DEFAULT_STATS.focus,
    mood: DEFAULT_STATS.mood,
    stress: DEFAULT_STATS.stress,
    grade: DEFAULT_STATS.grade,

    dayStartStats:   copyStats(DEFAULT_STATS),
    cycleStartStats: copyStats(DEFAULT_STATS),

    activityStats: zeroActivity(),
    cycleActivity: zeroActivity(),

    eventsSeen: 0,
    cycleEvents: 0,
    seenIds: {},

    zeroStressDays: 0,
    consecLateDays: 0,
    actionCount: {},
    sleepTime: null,
    dayStudy: 0,

    flags: {},
    onceUsed: {},
    cooldowns: {},
    pendingEvents: [],

    ended: false,
    cycleComplete: false,
    cycleRating: null,
    activeEvent: null,
    confirmingRestart: false
  };

  var pendingFlash = {};
  var archiveOpen = false;
  var activeAlerts = {};

  /* ---------- dom ---------- */
  var elClock, elBest, elBoot, elLog, elTimes, elButtons, elStats = {};
  var elActionTitle, elActionList, elEventList;
  var elArchBtn, elArchiveView, elArchiveBody, elArchiveClose;

  function cacheDom() {
    elClock        = document.querySelector('.g2359-clock');
    elBest         = document.getElementById('best-rating');
    elBoot         = document.getElementById('boot');
    elLog          = document.getElementById('log');
    elTimes        = document.querySelectorAll('.g2359-time');
    elButtons      = document.querySelectorAll('.g2359-btn[data-action]');
    elActionTitle  = document.getElementById('action-title');
    elActionList   = document.getElementById('action-list');
    elEventList    = document.getElementById('event-list');
    elArchBtn      = document.getElementById('archive-btn');
    elArchiveView  = document.getElementById('archive-view');
    elArchiveBody  = document.getElementById('archive-body');
    elArchiveClose = document.getElementById('archive-close');

    Array.prototype.forEach.call(document.querySelectorAll('[data-stat]'), function (row) {
      elStats[row.getAttribute('data-stat')] = {
        row:   row,
        meter: row.querySelector('[data-meter]'),
        val:   row.querySelector('[data-val]')
      };
    });
  }

  /* ---------- helpers ---------- */
  function clamp(v) {
    return v < STAT_MIN ? STAT_MIN : (v > STAT_MAX ? STAT_MAX : v);
  }

  function copyStats(src) {
    var out = {};
    STAT_KEYS.forEach(function (key) { out[key] = src[key]; });
    return out;
  }

  function zeroActivity() {
    var out = {};
    ACTION_ORDER.forEach(function (key) { out[key] = 0; });
    return out;
  }

  function fmtDay(d) { return d < 10 ? '0' + d : '' + d; }

  function fmtTime(min) {
    if (min >= DAY_END) return '23:59';
    var h = Math.floor(min / 60);
    var m = min % 60;
    return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m);
  }

  function fmtDelta(min) {
    var h = Math.floor(min / 60);
    var m = min % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  function todayString() {
    var d = new Date();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' + m : m) + '-' + (day < 10 ? '0' + day : day);
  }

  function bar(value) {
    var filled = Math.round(value / STAT_MAX * BAR_CELLS);
    if (filled > BAR_CELLS) filled = BAR_CELLS;
    if (filled < 0) filled = 0;
    return {
      fill: new Array(filled + 1).join('█'),
      empty: new Array(BAR_CELLS - filled + 1).join('░')
    };
  }

  function statLine() {
    return 'energy ' + state.energy +
           ' · focus ' + state.focus +
           ' · mood ' + state.mood +
           ' · stress ' + state.stress +
           ' · grade ' + state.grade;
  }

  function padRight(str, len) {
    str = String(str);
    while (str.length < len) str += '\u00A0';
    return str;
  }

  function padLeft(str, len) {
    str = String(str);
    while (str.length < len) str = '\u00A0' + str;
    return str;
  }

  function rule() { return new Array(21).join('━'); }

  /* ---------- storage ---------- */
  function save() {
    if (!(state.time > DAY_START || state.day > 1 || state.ended ||
          state.cycleComplete || state.cycleEvents > 0)) return;

    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        day:             state.day,
        time:            state.time,
        energy:          state.energy,
        focus:           state.focus,
        mood:            state.mood,
        stress:          state.stress,
        grade:           state.grade,
        dayStartStats:   state.dayStartStats,
        cycleStartStats: state.cycleStartStats,
        activityStats:   state.activityStats,
        cycleActivity:   state.cycleActivity,
        actionCount:     state.actionCount,
        sleepTime:       state.sleepTime,
        dayStudy:        state.dayStudy,
        eventsSeen:      state.eventsSeen,
        cycleEvents:     state.cycleEvents,
        seenIds:         state.seenIds,
        zeroStressDays:  state.zeroStressDays,
        consecLateDays:  state.consecLateDays,
        flags:           state.flags,
        onceUsed:        state.onceUsed,
        cooldowns:       state.cooldowns,
        pendingEvents:   state.pendingEvents,
        ended:           state.ended,
        cycleComplete:   state.cycleComplete,
        cycleRating:     state.cycleRating
      }));
    } catch (e) {
      /* ignore */
    }
  }

  function readActivity(src) {
    var out = zeroActivity();
    if (src && typeof src === 'object') {
      ACTION_ORDER.forEach(function (key) {
        var v = Number(src[key]);
        if (isFinite(v) && v >= 0) out[key] = v;
      });
    }
    return out;
  }

  function readStats(src, fallback) {
    var out = copyStats(fallback);
    if (src && typeof src === 'object') {
      STAT_KEYS.forEach(function (key) {
        var v = Number(src[key]);
        if (isFinite(v)) out[key] = clamp(Math.round(v));
      });
    }
    return out;
  }

  function loadSave() {
    var raw;
    try {
      raw = localStorage.getItem(SAVE_KEY);
    } catch (e) {
      return false;
    }
    if (!raw) return false;

    var data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      return false;
    }
    if (!data || typeof data !== 'object') return false;

    var t = Number(data.time);
    if (!isFinite(t) || t < DAY_START || t > DAY_END) return false;

    state.time = t;

    STAT_KEYS.forEach(function (key) {
      var v = Number(data[key]);
      if (isFinite(v)) state[key] = clamp(Math.round(v));
    });

    var d = Number(data.day);
    state.day = (isFinite(d) && d >= 1 && d <= TOTAL_DAYS) ? Math.round(d) : 1;

    state.ended         = !!data.ended;
    state.cycleComplete = !!data.cycleComplete;
    state.cycleRating   = data.cycleRating || null;

    state.eventsSeen = Number(data.eventsSeen) || 0;
    state.cycleEvents = Number(data.cycleEvents) || 0;

    state.seenIds       = (data.seenIds && typeof data.seenIds === 'object') ? data.seenIds : {};
    state.zeroStressDays = Number(data.zeroStressDays) || 0;
    state.consecLateDays = Number(data.consecLateDays) || 0;
    state.flags         = (data.flags && typeof data.flags === 'object') ? data.flags : {};
    state.onceUsed      = (data.onceUsed && typeof data.onceUsed === 'object') ? data.onceUsed : {};
    state.cooldowns     = (data.cooldowns && typeof data.cooldowns === 'object') ? data.cooldowns : {};
    state.pendingEvents = Array.isArray(data.pendingEvents) ? data.pendingEvents : [];

    var dayFallbackSrc = data.dayStartStats || data.initialState;
    state.dayStartStats = dayFallbackSrc ? readStats(dayFallbackSrc, state) : copyStats(state);
    state.cycleStartStats = data.cycleStartStats ? readStats(data.cycleStartStats, state) : copyStats(state);

    state.activityStats = readActivity(data.activityStats);
    state.cycleActivity = readActivity(data.cycleActivity);
    state.actionCount   = (data.actionCount && typeof data.actionCount === 'object') ? data.actionCount : {};
    state.sleepTime     = (data.sleepTime == null) ? null : Number(data.sleepTime);
    state.dayStudy      = Number(data.dayStudy) || 0;

    return true;
  }

  function clearSave() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (e) {
      /* ignore */
    }
  }

  function loadArchive() {
    try {
      var raw = localStorage.getItem(ARCHIVE_KEY);
      if (!raw) return [];
      var list = JSON.parse(raw);
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function saveArchiveRecord(record) {
    var list = loadArchive();
    record.id = list.length + 1;
    list.push(record);
    try {
      localStorage.setItem(ARCHIVE_KEY, JSON.stringify(list));
    } catch (e) {
      /* ignore */
    }
  }

  function loadUnlocked() {
    try {
      var raw = localStorage.getItem(ACH_KEY);
      var data = raw ? JSON.parse(raw) : null;
      return (data && typeof data === 'object') ? data : {};
    } catch (e) {
      return {};
    }
  }

  function saveUnlocked(map) {
    try {
      localStorage.setItem(ACH_KEY, JSON.stringify(map));
    } catch (e) {
      /* ignore */
    }
  }

  function countDistinctActions(activity) {
    var n = 0;
    ACTION_ORDER.forEach(function (key) {
      if (key !== 'sleep' && (activity[key] || 0) > 0) n++;
    });
    return n;
  }

  // check every milestone against the current run + archive; unlock newly met ones
  function checkAchievements() {
    if (!ACH_LIB.length) return;

    var unlocked = loadUnlocked();
    var ctx = {
      state:           state,
      archive:         loadArchive(),
      activity:        state.activityStats,
      distinctActions: countDistinctActions(state.activityStats)
    };

    ACH_LIB.forEach(function (ach) {
      if (unlocked[ach.id]) return;

      var ok = false;
      try { ok = !!ach.check(ctx); } catch (e) { ok = false; }
      if (!ok) return;

      unlocked[ach.id] = true;
      appendLine('> ACHIEVEMENT · ' + ach.title, 'g2359-log-ach');
      appendLine('> ' + ach.desc, 'g2359-log-ach');
    });

    saveUnlocked(unlocked);
  }

  /* ---------- log ---------- */
  function buildLine(text) {
    var line = document.createElement('div');
    line.className = 'g2359-log-line';

    if (text.indexOf('> ') === 0) {
      var prompt = document.createElement('span');
      prompt.className = 'g2359-prompt';
      prompt.textContent = '> ';
      line.appendChild(prompt);
      line.appendChild(document.createTextNode(text.slice(2)));
    } else if (text === '') {
      line.innerHTML = '&nbsp;';
    } else {
      line.textContent = text;
    }

    return line;
  }

  function buildCursorLine() {
    var line = document.createElement('div');
    line.className = 'g2359-log-line';

    var prompt = document.createElement('span');
    prompt.className = 'g2359-prompt';
    prompt.textContent = '> ';

    var cursor = document.createElement('span');
    cursor.className = 'g2359-cursor';

    line.appendChild(prompt);
    line.appendChild(cursor);

    return line;
  }

  function appendLine(text, cls) {
    if (!elLog) return;
    var line = buildLine(text);
    if (cls) line.className += ' ' + cls;
    elLog.insertBefore(line, elLog.lastElementChild);
    elLog.scrollTop = elLog.scrollHeight;
  }

  function appendLog(text) {
    if (!elLog) return;
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      appendLine(lines[i]);
    }
  }

  function resetLog(lines) {
    if (!elLog) return;
    elLog.innerHTML = '';
    lines.forEach(function (text) {
      elLog.appendChild(buildLine(text));
    });
    elLog.appendChild(buildCursorLine());
  }

  /* ---------- status alerts / locks ---------- */
  function isAlert(key) {
    var cfg = STATE_LOCKS[key];
    if (!cfg) return false;
    return cfg.low ? state[key] <= WARN_LOW : state[key] >= WARN_HIGH;
  }

  function isLocked(action) {
    for (var key in STATE_LOCKS) {
      if (!Object.prototype.hasOwnProperty.call(STATE_LOCKS, key)) continue;
      if (isAlert(key) && STATE_LOCKS[key].block.indexOf(action) >= 0) return true;
    }
    return false;
  }

  function updateAlerts() {
    Object.keys(STATE_LOCKS).forEach(function (key) {
      var alert = isAlert(key);
      if (alert && !activeAlerts[key]) {
        appendLine('> WARNING · ' + STATE_LOCKS[key].label, 'g2359-log-warn');
        if (STATE_LOCKS[key].block.length) {
          appendLine('> locked: ' + STATE_LOCKS[key].block.join(' · '), 'g2359-log-warn');
        }
      }
      activeAlerts[key] = alert;
    });
  }

  /* ---------- event matching ---------- */
  function matchesCondition(cond) {
    if (!cond) return true;
    if (cond.maxEnergy != null && state.energy > cond.maxEnergy) return false;
    if (cond.minEnergy != null && state.energy < cond.minEnergy) return false;
    if (cond.maxFocus  != null && state.focus  > cond.maxFocus)  return false;
    if (cond.minFocus  != null && state.focus  < cond.minFocus)  return false;
    if (cond.maxMood   != null && state.mood   > cond.maxMood)   return false;
    if (cond.minMood   != null && state.mood   < cond.minMood)   return false;
    if (cond.maxStress != null && state.stress > cond.maxStress) return false;
    if (cond.minStress != null && state.stress < cond.minStress) return false;
    if (cond.maxGrade  != null && state.grade  > cond.maxGrade)  return false;
    if (cond.minGrade  != null && state.grade  < cond.minGrade)  return false;
    if (cond.minDay    != null && state.day    < cond.minDay)    return false;
    if (cond.weekend   && !isWeekend(state.day)) return false;
    if (cond.weekday   &&  isWeekend(state.day)) return false;
    if (cond.minTime   != null && state.time   < cond.minTime)   return false;
    if (cond.maxTime   != null && state.time   > cond.maxTime)   return false;
    if (cond.flag      && !state.flags[cond.flag]) return false;
    if (cond.noFlag    &&  state.flags[cond.noFlag]) return false;
    return true;
  }

  function matchesTrigger(trigger) {
    if (!trigger) return true;
    if (trigger.from   != null && state.time < trigger.from) return false;
    if (trigger.to     != null && state.time > trigger.to)   return false;
    if (trigger.dayMin != null && state.day  < trigger.dayMin) return false;
    return true;
  }

  function eventWeight(ev) {
    var w = ev.weight || 1;
    if (ev.boost && matchesCondition(ev.boost.condition)) w = ev.boost.weight;
    return w;
  }

  function pickEvent() {
    var pool = EVENT_LIB.filter(function (ev) {
      if (ev.queued) return false;
      if (state.seenIds[ev.id]) return false;
      if (ev.lifecycle === 'once' && state.onceUsed[ev.id]) return false;
      if (ev.lifecycle === 'cooldown') {
        var last = state.cooldowns[ev.id];
        if (last != null && (state.day - last) < (ev.cooldownDays || 1)) return false;
      }
      if (!matchesTrigger(ev.trigger)) return false;
      if (!matchesCondition(ev.condition)) return false;
      return true;
    });

    if (!pool.length) return null;

    var total = 0;
    var weights = pool.map(function (ev) {
      var w = eventWeight(ev);
      total += w;
      return w;
    });

    var r = Math.random() * total;
    for (var i = 0; i < pool.length; i++) {
      r -= weights[i];
      if (r <= 0) return pool[i];
    }
    return pool[pool.length - 1];
  }

  function findEvent(id) {
    for (var i = 0; i < EVENT_LIB.length; i++) {
      if (EVENT_LIB[i].id === id) return EVENT_LIB[i];
    }
    return null;
  }

  /* ---------- rules ---------- */
  function timeLeft() { return DAY_END - state.time; }

  function canAct(action) {
    if (state.ended || state.cycleComplete || state.confirmingRestart || state.activeEvent) return false;
    var cfg = ACTIONS[action];
    if (!cfg) return false;
    if (cfg.end) return true;
    if (cfg.weekendOnly && !isWeekend(state.day)) return false;
    if (isLocked(action)) return false;
    return timeLeft() >= cfg.time;
  }

  function applyStats(delta) {
    if (!delta) return;
    STAT_KEYS.forEach(function (key) {
      if (delta[key]) {
        state[key] = clamp(state[key] + delta[key]);
        pendingFlash[key] = true;
      }
    });
  }

  function applyActionStats(action, stats) {
    var n = state.actionCount[action] || 0;
    var factor = DIMINISH[Math.min(n, DIMINISH.length - 1)];
    state.actionCount[action] = n + 1;

    // late-night studying is much less effective
    if (action === 'study' && state.time >= LATE_NIGHT) factor *= LATE_STUDY_FACTOR;

    STAT_KEYS.forEach(function (key) {
      var d = stats[key];
      if (!d) return;
      var isBenefit = (key === 'stress') ? (d < 0) : (d > 0);
      var v = isBenefit ? Math.round(d * factor) : d;
      if (v) {
        state[key] = clamp(state[key] + v);
        pendingFlash[key] = true;
      }
    });
  }

  function doAction(action) {
    if (state.ended || state.cycleComplete || state.confirmingRestart || state.activeEvent) return;

    var cfg = ACTIONS[action];
    if (!cfg) return;

    if (!canAct(action)) {
      if (isLocked(action)) appendLog('> ' + action + '\n> 现在做不了这个。');
      else appendLog('> ' + action + '\n> 时间不够了，今晚就到这吧。');
      return;
    }

    if (cfg.end) {
      appendLog('> sleep\n> 算了，今晚就到这吧。');
      state.sleepTime = state.time;
      state.time = DAY_END;
      endDay();
      return;
    }

    state.time = Math.min(DAY_END, state.time + cfg.time);
    state.activityStats[action] += cfg.time;
    if (action === 'study') state.dayStudy++;
    applyActionStats(action, cfg.stats);

    appendLog('> ' + action + '\n> ' + fmtTime(state.time) + ' · ' + statLine());
    render();

    if (state.time >= DAY_END) {
      endDay();
      return;
    }

    maybeTriggerEvent();
  }

  // no stress all day means coasting; the longer it lasts, the bigger the grade hit
  function applyZeroStressPenalty() {
    if (state.stress > 0) {
      state.zeroStressDays = 0;
      return;
    }

    state.zeroStressDays++;
    var penalty = Math.min(ZERO_STRESS_BASE * state.zeroStressDays, ZERO_STRESS_MAX);
    var before = state.grade;
    state.grade = clamp(state.grade - penalty);
    var real = before - state.grade;

    if (real > 0) {
      pendingFlash.grade = true;
      appendLine('> WARNING · 连续 ' + state.zeroStressDays + ' 天没有压力', 'g2359-log-warn');
      appendLine('> 有点松懈。grade -' + real, 'g2359-log-warn');
    }
  }

  // grade is settled once, at the end of the night
  function applyStudyOutcome() {
    var n = state.dayStudy || 0;
    var gain;

    if (n === 0) {
      gain = -NO_STUDY_PENALTY;
    } else {
      gain = Math.min(n, STUDY_GAIN_MAX);
      if (state.stress >= STRESS_GOOD_LOW && state.stress <= STRESS_GOOD_HIGH) {
        gain += GOOD_STRESS_BONUS;   // a bit of pressure keeps you sharp
      }
    }

    if (!gain) return;

    var before = state.grade;
    state.grade = clamp(state.grade + gain);
    var real = state.grade - before;
    if (!real) return;

    pendingFlash.grade = true;

    if (n === 0) {
      appendLine('> 今晚没碰书本。grade -' + Math.abs(real), 'g2359-log-warn');
    } else {
      appendLine('> 今天学了 ' + n + ' 次。grade +' + real, 'g2359-log-warn');
    }
  }

  function endDay() {
    if (state.ended) return;

    state.ended = true;
    state.activeEvent = null;
    state.confirmingRestart = false;

    ACTION_ORDER.forEach(function (key) {
      state.cycleActivity[key] += state.activityStats[key];
    });
    state.cycleEvents += state.eventsSeen;

    if (state.sleepTime == null) state.sleepTime = state.time;
    applyZeroStressPenalty();
    applyStudyOutcome();

    appendLog('> ' + fmtTime(state.time) + '\n> 今天就到这里。晚安。');
    checkAchievements();
    render();
    showDayReport(false);
  }

  /* ---------- events ---------- */
  function maybeTriggerEvent() {
    if (state.ended || state.cycleComplete || state.activeEvent) return;
    if (state.eventsSeen >= MAX_EVENTS) return;
    if (state.time >= DAY_END) return;

    var forced = null;

    if (state.eventsSeen === 0 && state.time >= GUARANTEE_TIME) {
      forced = pickEvent();
    } else if (Math.random() < EVENT_CHANCE) {
      forced = pickEvent();
    }

    if (forced) startEvent(forced);
  }

  function startEvent(ev) {
    state.activeEvent = ev;
    state.seenIds[ev.id] = true;
    state.eventsSeen++;

    if (ev.lifecycle === 'once') state.onceUsed[ev.id] = true;
    if (ev.lifecycle === 'cooldown') state.cooldowns[ev.id] = state.day;

    appendLine('> EVENT DETECTED', 'g2359-log-event');
    appendLine('', 'g2359-log-event');
    ev.prompt.split('\n').forEach(function (t) {
      appendLine(t, 'g2359-log-event');
    });
    appendLine('', 'g2359-log-event');
    appendLine('当前时间：' + fmtTime(state.time), 'g2359-log-event');

    render();
  }

  function chooseOption(index) {
    var ev = state.activeEvent;
    if (!ev) return;

    var opt = ev.options[index];
    if (!opt) return;

    // an option tied to a locked action can never be taken (no bypassing the lock)
    if (opt.requires && isLocked(opt.requires)) {
      appendLog('> ' + opt.label + '\n> 现在做不了这个。');
      return;
    }

    state.activeEvent = null;

    if (opt.setFlag) state.flags[opt.setFlag] = true;
    if (opt.queue) state.pendingEvents.push(opt.queue);

    var cost = opt.time || 0;
    state.time = Math.min(DAY_END, state.time + cost);
    applyStats(opt.stats);

    var out = ['> choice: ' + (index + 1), '> ' + ev.id + ' accepted.'];

    var deltas = [];
    if (cost) deltas.push('time -' + fmtDelta(cost));
    STAT_KEYS.forEach(function (key) {
      var d = opt.stats && opt.stats[key];
      if (d) deltas.push(key + ' ' + (d > 0 ? '+' : '') + d);
    });
    if (deltas.length) out.push('> ' + deltas.join(' · '));
    out.push('> current time: ' + fmtTime(state.time));

    appendLog(out.join('\n'));
    render();

    if (opt.endDay || state.time >= DAY_END) {
      state.time = DAY_END;
      endDay();
    }
  }

  /* ---------- day / cycle ---------- */
  // sleeping early restores more; staying up to midnight restores much less
  function nightRecoveryFactor(sleepTime) {
    var t = (sleepTime == null) ? DAY_END : sleepTime;
    if (t <= 21 * 60)      return 1.35;
    if (t <= 22 * 60 + 30) return 1.0;
    if (t < DAY_END)       return 0.7;
    return 0.4;
  }

  function nextDay() {
    if (!state.ended || state.cycleComplete || state.day >= TOTAL_DAYS) return;

    state.day++;

    if (state.sleepTime != null && state.sleepTime >= 23 * 60) state.consecLateDays++;
    else state.consecLateDays = 0;

    var recoveryFactor = nightRecoveryFactor(state.sleepTime);
    STAT_KEYS.forEach(function (key) {
      var d = NIGHT_RECOVERY[key];
      if (d) state[key] = clamp(state[key] + Math.round(d * recoveryFactor));
    });

    // weekend nights are less draining
    if (isWeekend(state.day)) state.stress = clamp(state.stress - 5);

    state.sleepTime = null;
    state.time = DAY_START;
    state.activityStats = zeroActivity();
    state.actionCount = {};
    state.dayStudy = 0;
    state.eventsSeen = 0;
    state.seenIds = {};
    state.ended = false;
    state.activeEvent = null;
    state.confirmingRestart = false;
    state.dayStartStats = copyStats(state);
    activeAlerts = {};

    // resolve any cross-day queued event
    var queued = state.pendingEvents.slice();
    state.pendingEvents = [];

    resetLog([
      '> day ' + fmtDay(state.day) + ' / ' + TOTAL_DAYS,
      '',
      '> 晚自习结束了。',
      '',
      '> 你准备做什么？'
    ]);

    render();

    if (queued.length) {
      var ev = findEvent(queued[0]);
      if (ev) startEvent(ev);
    }
  }

  function computeRating() {
    var score = state.grade * 0.40 +
                state.mood * 0.25 +
                state.energy * 0.15 +
                (100 - state.stress) * 0.20;

    if (score >= 90) return 'S';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  }

  function finishCycle() {
    if (!state.ended || state.cycleComplete || state.day < TOTAL_DAYS) return;

    state.cycleComplete = true;
    state.cycleRating = computeRating();

    saveArchiveRecord({
      finishedAt:    todayString(),
      rating:        state.cycleRating,
      finalStats:    copyStats(state),
      totalActivity: state.cycleActivity,
      totalEvents:   state.cycleEvents
    });

    checkAchievements();
    render();
    showCycleReport(false);
    updateBestRating();
  }

  function newCycle() {
    clearSave();
    resetGame();
  }

  /* ---------- reports ---------- */
  function statChangeItems(statsFrom) {
    var items = [];
    STAT_KEYS.forEach(function (key) {
      var from  = statsFrom[key];
      var to    = state[key];
      var delta = to - from;
      var sign  = delta > 0 ? '+' : '';
      items.push({
        text: padRight(key, 8) + from + ' → ' + to + '   ' + padLeft(sign + delta, 4)
      });
    });
    return items;
  }

  function buildDayReportBody() {
    var items = [];

    items.push({ text: rule(), cls: 'g2359-report-rule' });
    items.push({ text: 'DAY COMPLETE · ' + fmtDay(state.day) + ' / ' + TOTAL_DAYS, cls: 'g2359-report-title' });
    items.push({ text: rule(), cls: 'g2359-report-rule' });
    items.push({ text: '' });

    items.push({ text: 'TIME USED' });
    items.push({ text: '' });
    ACTION_ORDER.forEach(function (key) {
      items.push({ text: padRight(key, 15) + fmtDelta(state.activityStats[key] || 0) });
    });
    items.push({ text: '' });

    items.push({ text: 'TIME REMAINING' });
    items.push({ text: '' });
    items.push({ text: fmtDelta(timeLeft()) });
    items.push({ text: '' });

    items.push({ text: 'EVENTS' });
    items.push({ text: '' });
    items.push({ text: padRight('triggered', 15) + state.eventsSeen });
    items.push({ text: '' });

    items.push({ text: 'STAT CHANGES' });
    items.push({ text: '' });
    statChangeItems(state.dayStartStats).forEach(function (it) { items.push(it); });
    items.push({ text: '' });

    items.push({ text: '> "明天，你会做出不同的选择吗？"' });

    return items;
  }

  function buildCycleReportBody() {
    var items = [];
    var total = 0;

    items.push({ text: rule(), cls: 'g2359-report-rule' });
    items.push({ text: 'CYCLE COMPLETE · ' + TOTAL_DAYS + ' DAYS', cls: 'g2359-report-title' });
    items.push({ text: rule(), cls: 'g2359-report-rule' });
    items.push({ text: '' });

    items.push({ text: 'TIME USED (total)' });
    items.push({ text: '' });
    ACTION_ORDER.forEach(function (key) {
      var v = state.cycleActivity[key] || 0;
      total += v;
      items.push({ text: padRight(key, 15) + fmtDelta(v) });
    });
    items.push({ text: padRight('TOTAL', 15) + fmtDelta(total) });
    items.push({ text: '' });

    items.push({ text: 'EVENTS' });
    items.push({ text: '' });
    items.push({ text: padRight('triggered', 15) + state.cycleEvents });
    items.push({ text: '' });

    items.push({ text: 'FINAL STATS' });
    items.push({ text: '' });
    statChangeItems(state.cycleStartStats).forEach(function (it) { items.push(it); });
    items.push({ text: '' });

    items.push({ text: 'RATING' });
    items.push({ text: '' });
    items.push({
      text: state.cycleRating || '--',
      cls: 'g2359-report-rating' + (state.cycleRating === 'S' ? ' g2359-rating-s' : '')
    });
    items.push({ text: '' });

    // how this cycle compares with everything before it
    var list = loadArchive();
    var better = 0;
    list.forEach(function (rec) {
      if ((RATING_ORDER[rec.rating] || 0) > (RATING_ORDER[state.cycleRating] || 0)) better++;
    });
    items.push({ text: 'VS EARLIER CYCLES' });
    items.push({ text: '' });
    items.push({ text: better === 0 ? 'best so far' : (better + ' cycle(s) rated higher') });
    items.push({ text: '' });

    items.push({ text: '> cycle saved to archive. [archive] to review.' });

    return items;
  }

  function showReport(body, instant) {
    var head = [
      '> system.session.complete',
      '',
      '> generating report...',
      '> calculating activity statistics...',
      '> calculating state changes...',
      '> done.'
    ];

    function paint() {
      body.forEach(function (item) { appendLine(item.text, item.cls); });
    }

    if (instant) {
      head.forEach(function (t) { appendLine(t); });
      paint();
      return;
    }

    var i = 0;
    (function step() {
      if (i >= head.length) { paint(); return; }
      appendLine(head[i]);
      i++;
      setTimeout(step, 140);
    })();
  }

  function showDayReport(instant)   { showReport(buildDayReportBody(),  instant); }
  function showCycleReport(instant) { showReport(buildCycleReportBody(), instant); }

  /* ---------- restart ---------- */
  function requestRestart() {
    if (!state.ended || state.cycleComplete || state.confirmingRestart) return;
    state.confirmingRestart = true;
    appendLog('> WARNING\n\nCurrent session will be deleted.\n\nThis action cannot be undone.');
    render();
  }

  function cancelRestart() {
    if (!state.confirmingRestart) return;
    state.confirmingRestart = false;
    appendLog('> cancelled.');
    render();
  }

  function confirmRestart() {
    if (!state.confirmingRestart) return;
    clearSave();
    resetGame();
  }

  function resetGame() {
    state.day = 1;
    state.time = DAY_START;
    STAT_KEYS.forEach(function (key) { state[key] = DEFAULT_STATS[key]; });

    state.dayStartStats   = copyStats(DEFAULT_STATS);
    state.cycleStartStats = copyStats(DEFAULT_STATS);
    state.activityStats   = zeroActivity();
    state.cycleActivity   = zeroActivity();
    state.actionCount     = {};
    state.sleepTime       = null;
    state.dayStudy        = 0;
    state.eventsSeen      = 0;
    state.cycleEvents     = 0;
    state.seenIds         = {};
    state.zeroStressDays  = 0;
    state.consecLateDays  = 0;

    state.flags         = {};
    state.onceUsed      = {};
    state.cooldowns     = {};
    state.pendingEvents = [];

    state.ended             = false;
    state.cycleComplete     = false;
    state.cycleRating       = null;
    state.activeEvent       = null;
    state.confirmingRestart = false;

    pendingFlash = {};
    activeAlerts = {};
    closeArchive();

    resetLog(['> 晚自习结束了。', '', '> 你准备做什么？']);
    render();
  }

  /* ---------- archive view ---------- */
  function rank(rating) { return RATING_ORDER[rating] || 0; }

  function updateBestRating() {
    if (!elBest) return;
    var list = loadArchive();
    var best = '--';
    list.forEach(function (rec) {
      if (rank(rec.rating) > rank(best)) best = rec.rating;
    });
    if (best === 'S') {
      elBest.innerHTML = 'BEST <span class="g2359-rating-s">S</span>';
    } else {
      elBest.textContent = 'BEST ' + best;
    }
  }

  function buildArchiveLine(rec) {
    var line = document.createElement('div');
    line.className = 'g2359-log-line';

    var stats = rec.finalStats || {};

    line.appendChild(document.createTextNode(
      '#' + padLeft(rec.id, 2) +
      '  ' + (rec.finishedAt || '----------') +
      '   RATING '
    ));

    var rating = rec.rating || '--';
    var span = document.createElement('span');
    if (rating === 'S') span.className = 'g2359-rating-s';
    span.textContent = rating;
    line.appendChild(span);

    line.appendChild(document.createTextNode(
      '   grade ' + (stats.grade != null ? stats.grade : '--')
    ));

    return line;
  }

  function renderArchive() {
    if (!elArchiveBody) return;
    var list = loadArchive();
    elArchiveBody.innerHTML = '';

    if (!list.length) {
      elArchiveBody.appendChild(buildLine('no completed cycles yet.'));
      return;
    }

    var counts = { S: 0, A: 0, B: 0, C: 0, D: 0 };
    list.forEach(function (rec) {
      if (counts[rec.rating] != null) counts[rec.rating]++;
    });

    elArchiveBody.appendChild(buildLine('records ' + list.length));
    elArchiveBody.appendChild(buildLine(
      'ratings  S ' + counts.S + '  A ' + counts.A + '  B ' + counts.B +
      '  C ' + counts.C + '  D ' + counts.D
    ));
    elArchiveBody.appendChild(buildLine(''));

    list.slice().reverse().forEach(function (rec) {
      elArchiveBody.appendChild(buildArchiveLine(rec));
    });

    // achievements
    var unlocked = loadUnlocked();
    var done = ACH_LIB.filter(function (a) { return unlocked[a.id]; }).length;

    elArchiveBody.appendChild(buildLine(''));
    elArchiveBody.appendChild(buildLine('ACHIEVEMENTS  ' + done + ' / ' + ACH_LIB.length));
    ACH_LIB.forEach(function (ach) {
      var got = !!unlocked[ach.id];
      elArchiveBody.appendChild(buildLine((got ? '[x] ' : '[ ] ') + ach.title));
    });
  }

  function openArchive() {
    archiveOpen = true;
    renderArchive();
    if (elArchiveView) elArchiveView.hidden = false;
  }

  function closeArchive() {
    archiveOpen = false;
    if (elArchiveView) elArchiveView.hidden = true;
  }

  /* ---------- render ---------- */
  function makeOptionButton(label, keyIndex, fn, disabled) {
    var btn = document.createElement('button');
    btn.className = 'g2359-btn';

    var key = document.createElement('span');
    key.className = 'g2359-key';
    key.textContent = '[' + (keyIndex + 1) + ']';

    btn.appendChild(key);
    btn.appendChild(document.createTextNode(' ' + label));
    btn.setAttribute('aria-label', label);

    if (disabled) {
      btn.disabled = true;
      btn.title = 'locked';
    } else {
      btn.addEventListener('click', fn);
    }

    return btn;
  }

  function renderActionsUi() {
    if (!elActionList || !elEventList) return;

    var title = 'ACTIONS';
    var options = null;

    if (state.confirmingRestart) {
      title = 'CONFIRM';
      options = [
        { label: 'confirm', fn: confirmRestart },
        { label: 'cancel',  fn: cancelRestart }
      ];
    } else if (state.cycleComplete) {
      title = 'CYCLE COMPLETE';
      options = [
        { label: 'new cycle', fn: newCycle },
        { label: 'archive',   fn: openArchive }
      ];
    } else if (state.ended) {
      title = 'DAY COMPLETE';
      options = (state.day >= TOTAL_DAYS)
        ? [{ label: 'finish cycle', fn: finishCycle }]
        : [{ label: 'next day',     fn: nextDay }];
    } else if (state.activeEvent) {
      title = 'EVENT';
      options = state.activeEvent.options.map(function (opt, i) {
        return {
          label: opt.label,
          fn: function () { chooseOption(i); },
          disabled: opt.requires ? isLocked(opt.requires) : false
        };
      });
    }

    if (options) {
      elActionList.hidden = true;
      elEventList.hidden = false;
      elEventList.innerHTML = '';

      options.forEach(function (opt, i) {
        elEventList.appendChild(makeOptionButton(opt.label, i, opt.fn, opt.disabled));
      });
    } else {
      elEventList.hidden = true;
      elEventList.innerHTML = '';
      elActionList.hidden = false;
    }

    if (elActionTitle) elActionTitle.textContent = title;
  }

  function render() {
    if (elClock) {
      var wknd = isWeekend(state.day) ? ' · weekend' : '';
      elClock.textContent = 'DAY ' + fmtDay(state.day) + '/' + TOTAL_DAYS + wknd +
                            ' · ' + fmtTime(state.time);
    }

    STAT_KEYS.forEach(function (key) {
      var cell = elStats[key];
      if (!cell) return;

      var b = bar(state[key]);
      cell.meter.innerHTML = '<span class="g2359-meter-fill">' + b.fill + '</span>' + b.empty;
      cell.val.textContent = state[key];
      cell.row.setAttribute('aria-valuenow', state[key]);

      if (pendingFlash[key]) {
        cell.val.classList.remove('g2359-flash');
        void cell.val.offsetWidth;
        cell.val.classList.add('g2359-flash');
        pendingFlash[key] = false;
      }

      if (STATE_LOCKS[key]) {
        cell.row.classList.toggle('is-warn', isAlert(key));
      }
    });

    var activeIndex = Math.floor(state.time / 60) - 18;
    if (activeIndex < 0) activeIndex = 0;
    if (activeIndex > elTimes.length - 1) activeIndex = elTimes.length - 1;
    Array.prototype.forEach.call(elTimes, function (el, i) {
      el.classList.toggle('is-active', i === activeIndex);
    });

    Array.prototype.forEach.call(elButtons, function (btn) {
      btn.disabled = !canAct(btn.getAttribute('data-action'));
    });

    renderActionsUi();
    updateAlerts();
    save();
  }

  /* ---------- init ---------- */
  function handleKey(e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

    if (archiveOpen) {
      if (e.key === '1') closeArchive();
      return;
    }

    if (state.confirmingRestart) {
      if (e.key === '1') confirmRestart();
      else if (e.key === '2') cancelRestart();
      return;
    }

    if (state.cycleComplete) {
      if (e.key === '1') newCycle();
      else if (e.key === '2') openArchive();
      return;
    }

    if (state.ended) {
      if (e.key === '1') {
        if (state.day >= TOTAL_DAYS) finishCycle();
        else nextDay();
      } else if (e.key >= '2' && e.key <= '8') {
        appendLog('> session has ended.');
      }
      return;
    }

    if (state.activeEvent) {
      var n = state.activeEvent.options.length;
      var idx = parseInt(e.key, 10) - 1;
      if (idx >= 0 && idx < n) chooseOption(idx);
      return;
    }

    if (e.key >= '1' && e.key <= '8') {
      doAction(ACTION_ORDER[parseInt(e.key, 10) - 1]);
    }
  }

  function init() {
    cacheDom();

    var restored = loadSave();

    Array.prototype.forEach.call(elButtons, function (btn) {
      btn.addEventListener('click', function () {
        doAction(btn.getAttribute('data-action'));
      });
    });

    if (elBoot) {
      elBoot.addEventListener('click', function () {
        elBoot.hidden = true;
      });
    }

    if (elArchBtn) elArchBtn.addEventListener('click', openArchive);
    if (elArchiveClose) elArchiveClose.addEventListener('click', closeArchive);

    document.addEventListener('keydown', handleKey);

    if (restored) {
      var lines = ['> save found. session restored.', '> current time: ' + fmtTime(state.time)];
      if (state.cycleComplete) {
        lines.push('> cycle complete.');
        resetLog(lines);
        showCycleReport(true);
      } else if (state.ended) {
        lines.push('> 今天就到这里。晚安。');
        resetLog(lines);
        showDayReport(true);
      } else {
        lines.push('> ' + statLine());
        resetLog(lines);
      }
    }

    render();
    updateBestRating();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
