/* =========================================================
   HX STONE · main.js
   Language · mobile navigation · note filtering · footer year
   ---------------------------------------------------------
   No framework, no animation library. State changes are kept
   explicit so keyboard and screen-reader users get the same
   information as pointer users.
   ========================================================= */

(function () {
  "use strict";

  document.documentElement.setAttribute("data-enhanced", "1");

  /* ---------- Language ---------- */

  var STORAGE_KEY = "site-lang";
  var lang = "en";

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "zh" || saved === "en") lang = saved;
  } catch (e) {
    /* Private browsing can block storage; the page still works. */
  }

  var langBtn = document.querySelector(".lang-toggle");

  function refreshLangButton() {
    if (!langBtn) return;

    var isZh = lang === "zh";
    langBtn.textContent = isZh ? "EN" : "中文";
    langBtn.setAttribute(
      "aria-label",
      t(isZh ? "lang.switchEn" : "lang.switchZh")
    );
    /* The button is a two-state switch, so expose its state as well. */
    langBtn.setAttribute("aria-pressed", isZh ? "true" : "false");
  }

  if (typeof cacheEnglishText === "function" && typeof applyLang === "function") {
    cacheEnglishText();
    applyLang(lang);
    refreshLangButton();
  }

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      lang = lang === "zh" ? "en" : "zh";

      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        /* Ignore blocked storage. */
      }

      applyLang(lang);
      refreshLangButton();
      refreshMenuButton();
      refreshNotesUI();
    });
  }

  /* ---------- Mobile navigation ---------- */

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");

  function menuIsOpen() {
    return !!header && header.classList.contains("nav-open");
  }

  function refreshMenuButton() {
    if (!navToggle) return;

    var open = menuIsOpen();
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute(
      "aria-label",
      t(open ? "nav.closeMenu" : "nav.openMenu")
    );
  }

  function closeMenu(moveFocus) {
    if (!header) return;

    header.classList.remove("nav-open");
    refreshMenuButton();

    if (moveFocus && navToggle) navToggle.focus();
  }

  function openMenu() {
    if (!header) return;

    header.classList.add("nav-open");
    refreshMenuButton();
  }

  if (header && navToggle) {
    navToggle.addEventListener("click", function () {
      if (menuIsOpen()) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    /* A navigation choice closes the disclosure on small screens. */
    header.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) closeMenu(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 767 && menuIsOpen()) closeMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuIsOpen()) {
        e.preventDefault();
        closeMenu(true);
      }
    });

    refreshMenuButton();
  }

  /* ---------- Note category filter ---------- */

  var filters = Array.prototype.slice.call(
    document.querySelectorAll("[data-filter]")
  );
  var notes = Array.prototype.slice.call(
    document.querySelectorAll("[data-cat]")
  );
  var notesList = document.getElementById("notes-list");
  var notesCount = document.getElementById("notes-count");
  var notesEmpty = document.getElementById("notes-empty");
  var notesTotal = document.querySelectorAll("[data-notes-total]");
  var currentFilter = "all";

  function setFilterState(value) {
    filters.forEach(function (btn) {
      btn.setAttribute(
        "aria-pressed",
        btn.getAttribute("data-filter") === value ? "true" : "false"
      );
    });
  }

  function refreshNotesUI() {
    if (!notes.length) return;

    var shown = 0;

    notes.forEach(function (note) {
      var match =
        currentFilter === "all" ||
        note.getAttribute("data-cat") === currentFilter;

      note.hidden = !match;
      if (match) shown += 1;
    });

    if (notesCount) {
      notesCount.textContent = t("notes.count", {
        shown: shown,
        total: notes.length
      });
    }

    if (notesEmpty) notesEmpty.hidden = shown !== 0;
    if (notesList) notesList.hidden = shown === 0;

    notesTotal.forEach(function (el) {
      el.textContent = String(notes.length).padStart(2, "0");
    });
  }

  if (filters.length && notes.length) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentFilter = btn.getAttribute("data-filter") || "all";
        setFilterState(currentFilter);
        refreshNotesUI();
      });
    });

    document.querySelectorAll("[data-filter-reset]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentFilter = "all";
        setFilterState(currentFilter);
        refreshNotesUI();
        var all = document.querySelector('[data-filter="all"]');
        if (all) all.focus();
      });
    });

    setFilterState(currentFilter);
    refreshNotesUI();
  }

  /* ---------- Footer year ---------- */

  var year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = year;
  });
})();
