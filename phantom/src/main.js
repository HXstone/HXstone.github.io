import './styles/base.css';
import './styles/hud.css';
import './styles/menus.css';
import { Game } from './core/Game.js';

const canvas = document.getElementById('scene');
const bootStatus = document.getElementById('boot-status');

function supportsWebGL2() {
  try {
    const probe = document.createElement('canvas');
    return Boolean(window.WebGL2RenderingContext && probe.getContext('webgl2'));
  } catch {
    return false;
  }
}

function isTouchOnlyDevice() {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const noFinePointer = !window.matchMedia('(pointer: fine)').matches;
  const narrowTouch = navigator.maxTouchPoints > 0 && window.innerWidth < 820;
  return (coarse && noFinePointer) || narrowTouch;
}

function showFatal(message) {
  const fatal = document.getElementById('webgl-error');
  const boot = document.getElementById('boot');
  if (boot) boot.hidden = true;
  if (fatal) {
    const copy = fatal.querySelector('p');
    if (copy && message) copy.textContent = message;
    fatal.hidden = false;
  }
}

function showMobileFallback() {
  const notice = document.getElementById('mobile-notice');
  const menu = document.getElementById('menu');
  const hud = document.getElementById('hud');
  const boot = document.getElementById('boot');
  if (notice) notice.hidden = false;
  if (menu) menu.hidden = true;
  if (hud) hud.classList.add('is-hidden');
  if (boot) boot.hidden = true;
  canvas.style.display = 'none';
}

function boot() {
  if (isTouchOnlyDevice()) {
    showMobileFallback();
    return;
  }

  if (!supportsWebGL2()) {
    showFatal('WebGL 2 is not available on this device. Enable hardware acceleration or use a recent desktop browser.');
    return;
  }

  if (bootStatus) bootStatus.textContent = 'BUILDING SITE-09';

  try {
    const game = new Game(canvas);
    window.__PHANTOM_GAME__ = game;
    if (import.meta.env.DEV) {
      // The Vite dev server hosts only the game, not the parent portfolio.
      // Keep the exit links useful by pointing them at the published index.
      const liveIndex = 'https://hxstone.github.io/projects.html';
      const exit = document.querySelector('.menu__exit');
      const brand = document.querySelector('.brand-lockup');
      if (exit) exit.href = liveIndex;
      if (brand) brand.href = liveIndex;
    }
    if (bootStatus) bootStatus.textContent = 'NEURAL LINK ESTABLISHED';
    console.info(
      '%cPROJECT: PHANTOM%c  //  SITE-09 tactical simulation online',
      'color:#6be7ff;font-weight:700;letter-spacing:.12em',
      'color:#778894',
    );
  } catch (error) {
    console.error(error);
    showFatal(
      'The renderer failed to initialize. This is commonly caused by disabled hardware acceleration or a lost WebGL context.',
    );
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
