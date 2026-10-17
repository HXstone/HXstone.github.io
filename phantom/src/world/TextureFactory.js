import * as THREE from 'three';
import { mulberry32 } from '../utils/math.js';

function canvas2d(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return { canvas, ctx: canvas.getContext('2d') };
}

function finishTexture(canvas, { repeat = [1, 1], srgb = true, anisotropy = 4 } = {}) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat[0], repeat[1]);
  texture.anisotropy = anisotropy;
  texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Concrete uses large tonal stains, aggregate speckle and control joints.
 * A second grayscale canvas supplies the bump map so lighting breaks up
 * large floor planes even at a distance.
 */
export function createConcreteTexture(anisotropy = 4) {
  const size = 512;
  const { canvas, ctx } = canvas2d(size, size);
  const { canvas: bumpCanvas, ctx: bctx } = canvas2d(size, size);
  const rand = mulberry32(9001);

  ctx.fillStyle = '#6d7377';
  ctx.fillRect(0, 0, size, size);
  bctx.fillStyle = '#808080';
  bctx.fillRect(0, 0, size, size);

  // Broad stains.
  for (let i = 0; i < 30; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    const radius = 18 + rand() * 90;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const dark = 45 + Math.floor(rand() * 25);
    gradient.addColorStop(0, `rgba(${dark},${dark + 3},${dark + 5},${0.035 + rand() * 0.06})`);
    gradient.addColorStop(1, 'rgba(50,54,57,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);

    const bg = bctx.createRadialGradient(x, y, 0, x, y, radius);
    bg.addColorStop(0, `rgba(110,110,110,${0.04 + rand() * 0.06})`);
    bg.addColorStop(1, 'rgba(128,128,128,0)');
    bctx.fillStyle = bg;
    bctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  // Aggregate.
  for (let i = 0; i < 16000; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    const value = 80 + Math.floor(rand() * 90);
    const alpha = 0.03 + rand() * 0.1;
    ctx.fillStyle = `rgba(${value},${value + 2},${value + 3},${alpha})`;
    const r = rand() * 1.7;
    ctx.fillRect(x, y, r, r);
    bctx.fillStyle = `rgba(${value},${value},${value},${alpha})`;
    bctx.fillRect(x, y, r, r);
  }

  // Hairline cracks.
  ctx.strokeStyle = 'rgba(32,35,37,0.4)';
  ctx.lineWidth = 0.7;
  for (let i = 0; i < 8; i += 1) {
    let x = rand() * size;
    let y = rand() * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let j = 0; j < 8; j += 1) {
      x += (rand() - 0.5) * 44;
      y += (rand() - 0.3) * 36;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Expansion joints, four panels per texture.
  const drawJoint = (x, y, w, h) => {
    ctx.fillStyle = 'rgba(33,37,40,0.72)';
    ctx.fillRect(x, y, w, h);
    bctx.fillStyle = 'rgba(38,38,38,0.7)';
    bctx.fillRect(x, y, w, h);
  };
  drawJoint(0, 0, size, 3);
  drawJoint(0, 0, 3, size);
  drawJoint(0, size / 2, size, 2);
  drawJoint(size / 2, 0, 2, size);

  const edge = ctx.createLinearGradient(0, 0, 0, 12);
  edge.addColorStop(0, 'rgba(255,255,255,0.05)');
  edge.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = edge;
  ctx.fillRect(0, 3, size, 9);

  return {
    map: finishTexture(canvas, { repeat: [7, 8], anisotropy }),
    bumpMap: finishTexture(bumpCanvas, { repeat: [7, 8], srgb: false, anisotropy }),
  };
}

/**
 * Brushed steel wall panels with rivets, seams and horizontal wear.
 */
export function createMetalTexture(anisotropy = 4) {
  const size = 512;
  const { canvas, ctx } = canvas2d(size, size);
  const { canvas: bumpCanvas, ctx: bctx } = canvas2d(size, size);
  const rand = mulberry32(4407);

  const base = ctx.createLinearGradient(0, 0, size, size);
  base.addColorStop(0, '#62686c');
  base.addColorStop(0.45, '#555c61');
  base.addColorStop(1, '#60666a');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  bctx.fillStyle = '#808080';
  bctx.fillRect(0, 0, size, size);

  // Brushed grain.
  for (let i = 0; i < 2600; i += 1) {
    const y = rand() * size;
    const x = rand() * size;
    const len = 8 + rand() * 90;
    const alpha = 0.015 + rand() * 0.055;
    ctx.strokeStyle = rand() > 0.5 ? `rgba(225,230,232,${alpha})` : `rgba(24,28,31,${alpha})`;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len, y + (rand() - 0.5) * 1.2);
    ctx.stroke();
    bctx.strokeStyle = `rgba(${rand() > 0.5 ? 148 : 90},${rand() > 0.5 ? 148 : 90},${rand() > 0.5 ? 148 : 90},${alpha * 2})`;
    bctx.beginPath();
    bctx.moveTo(x, y);
    bctx.lineTo(x + len, y);
    bctx.stroke();
  }

  // Stain runs.
  for (let i = 0; i < 9; i += 1) {
    const x = rand() * size;
    const width = 2 + rand() * 11;
    const gradient = ctx.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, `rgba(28,32,35,${0.05 + rand() * 0.08})`);
    gradient.addColorStop(0.7, 'rgba(28,32,35,0.02)');
    gradient.addColorStop(1, 'rgba(28,32,35,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, 0, width, size);
  }

  // Panel seams.
  ctx.fillStyle = 'rgba(23,27,30,0.7)';
  ctx.fillRect(0, 0, size, 3);
  ctx.fillRect(0, size - 3, size, 3);
  ctx.fillRect(0, 0, 3, size);
  ctx.fillRect(size - 3, 0, 3, size);
  ctx.fillStyle = 'rgba(200,210,214,0.08)';
  ctx.fillRect(0, 3, size, 1);
  ctx.fillRect(3, 0, 1, size);
  bctx.fillStyle = 'rgba(32,32,32,0.8)';
  bctx.fillRect(0, 0, size, 3);
  bctx.fillRect(0, 0, 3, size);

  // Rivets / bolts.
  const rivet = (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(24,28,31,0.72)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - 0.8, y - 0.8, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(190,199,203,0.2)';
    ctx.fill();
    bctx.beginPath();
    bctx.arc(x, y, 3.5, 0, Math.PI * 2);
    bctx.fillStyle = 'rgba(160,160,160,0.9)';
    bctx.fill();
  };
  for (let i = 0; i < 2; i += 1) {
    for (let j = 0; j < 2; j += 1) {
      rivet(26 + i * (size - 52), 26 + j * (size - 52));
    }
  }

  return {
    map: finishTexture(canvas, { repeat: [3, 2], anisotropy }),
    bumpMap: finishTexture(bumpCanvas, { repeat: [3, 2], srgb: false, anisotropy }),
  };
}

export function createHazardTexture(anisotropy = 4) {
  const { canvas, ctx } = canvas2d(512, 128);
  ctx.fillStyle = '#1b1d1e';
  ctx.fillRect(0, 0, 512, 128);
  ctx.save();
  ctx.translate(0, 0);
  ctx.fillStyle = '#b7893a';
  for (let x = -160; x < 640; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 128);
    ctx.lineTo(x + 32, 128);
    ctx.lineTo(x + 96, 0);
    ctx.lineTo(x + 64, 0);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  ctx.fillStyle = 'rgba(20,22,23,0.68)';
  for (let i = 0; i < 24; i += 1) {
    ctx.fillRect(Math.random() * 512, Math.random() * 128, 1 + Math.random() * 5, 1 + Math.random() * 3);
  }

  const texture = finishTexture(canvas, { repeat: [2, 1], anisotropy });
  return texture;
}

export function createScreenTexture(title = 'SITE-09', subtitle = 'CORE LINK', accent = '#6be7ff', anisotropy = 4) {
  const { canvas, ctx } = canvas2d(512, 256);
  ctx.fillStyle = '#02080b';
  ctx.fillRect(0, 0, 512, 256);

  const glow = ctx.createRadialGradient(280, 110, 0, 280, 110, 220);
  glow.addColorStop(0, 'rgba(33,92,106,0.32)');
  glow.addColorStop(1, 'rgba(3,10,12,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = 'rgba(107,231,255,0.12)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 512; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }
  for (let y = 0; y < 256; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(2,8,11,0.76)';
  ctx.fillRect(0, 0, 512, 35);
  ctx.fillStyle = accent;
  ctx.font = '500 14px monospace';
  ctx.fillText('FACILITY CONTROL / SECURE CHANNEL', 20, 24);
  ctx.fillStyle = 'rgba(107,231,255,0.45)';
  ctx.font = '10px monospace';
  ctx.fillText('SYS 04•17', 414, 23);

  ctx.fillStyle = '#dff8ff';
  ctx.font = '600 52px monospace';
  ctx.fillText(title, 22, 108);
  ctx.fillStyle = accent;
  ctx.font = '500 16px monospace';
  ctx.fillText(subtitle, 24, 140);

  ctx.strokeStyle = 'rgba(107,231,255,0.4)';
  ctx.beginPath();
  ctx.moveTo(24, 170);
  ctx.lineTo(488, 170);
  ctx.stroke();

  ctx.fillStyle = 'rgba(107,231,255,0.55)';
  ctx.font = '11px monospace';
  ctx.fillText('REACTOR OUTPUT  87.2%', 24, 196);
  ctx.fillText('PRESSURE         1.04', 24, 215);
  ctx.fillText('HOSTILE TRACE    08', 300, 196);
  ctx.fillText('CONTAINMENT      OPEN', 300, 215);

  // Random-ish telemetry bars.
  for (let i = 0; i < 12; i += 1) {
    const h = 4 + ((i * 37) % 20);
    ctx.fillStyle = i === 9 ? 'rgba(255,77,88,0.65)' : 'rgba(107,231,255,0.35)';
    ctx.fillRect(24 + i * 17, 238 - h, 9, h);
  }

  const texture = finishTexture(canvas, { repeat: [1, 1], anisotropy });
  return texture;
}

export function createSignTexture(lines, { accent = '#6be7ff', align = 'left' } = {}, anisotropy = 4) {
  const { canvas, ctx } = canvas2d(512, 160);
  ctx.clearRect(0, 0, 512, 160);
  ctx.fillStyle = 'rgba(3,8,11,0.84)';
  ctx.fillRect(0, 0, 512, 160);
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 7, 160);

  const y = 32;
  ctx.textAlign = align;
  const x = align === 'center' ? 256 : 28;
  ctx.font = '600 46px sans-serif';
  ctx.fillStyle = '#e6f4f7';
  ctx.fillText(lines[0] || '', x, y + 34);
  ctx.font = '16px monospace';
  ctx.fillStyle = accent;
  ctx.fillText(lines[1] || '', x, y + 70);
  ctx.font = '11px monospace';
  ctx.fillStyle = 'rgba(180,200,208,0.48)';
  ctx.fillText(lines[2] || '', x, y + 98);

  return finishTexture(canvas, { repeat: [1, 1], anisotropy });
}

export function createGlowTexture() {
  const { canvas, ctx } = canvas2d(128, 128);
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.12, 'rgba(220,250,255,0.95)');
  gradient.addColorStop(0.35, 'rgba(110,220,245,0.35)');
  gradient.addColorStop(1, 'rgba(50,150,190,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createGratingTexture(anisotropy = 4) {
  const { canvas, ctx } = canvas2d(256, 256);
  ctx.fillStyle = '#252a2d';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = 'rgba(104,114,119,0.55)';
  ctx.lineWidth = 4;
  for (let x = 0; x <= 256; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(35,40,43,0.7)';
  ctx.lineWidth = 8;
  for (let y = 0; y <= 256; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }
  return finishTexture(canvas, { repeat: [2, 6], anisotropy });
}
