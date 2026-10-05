/**
 * ============================================================
 *  watsonx Orchestrate — Control Plane Click-Through Demo
 *  Story Engine
 * ============================================================
 *
 *  Reads window.DEMO_CONFIG from config.js.
 *  Logic: splash → step loop → end screen.
 *  Hotspot + bubble are positioned in % relative to the
 *  screen image dimensions, so they scale with the window.
 * ============================================================
 */

(function () {
  'use strict';

  /* ── References ─────────────────────────────────────────── */
  const cfg        = window.DEMO_CONFIG;
  const steps      = cfg.steps;
  const total      = steps.length;

  const splash     = document.getElementById('splash');
  const splashCta  = document.getElementById('splash-cta');
  const topTitle   = document.getElementById('topbar-title');
  const stage      = document.getElementById('stage');
  const screenWrap = document.getElementById('screen-wrap');
  const screenImg  = document.getElementById('screen-img');
  const hotspot    = document.getElementById('hotspot');
  const hotLabel   = document.getElementById('hotspot-label');
  const bubble     = document.getElementById('bubble');
  const bTitle     = document.getElementById('bubble-title');
  const bBody      = document.getElementById('bubble-body');
  const bClose     = document.getElementById('bubble-close');
  const bBadge     = document.getElementById('bubble-step-badge');
  const bPrev      = document.getElementById('btn-prev');
  const bNext      = document.getElementById('btn-next');
  const dimOverlay = document.getElementById('dim-overlay');
  const endscreen  = document.getElementById('endscreen');
  const btnRestart = document.getElementById('btn-restart');
  const pSteps     = document.querySelectorAll('.p-step');
  const pLabel     = document.getElementById('progress-label');

  /* ── State ──────────────────────────────────────────────── */
  let current = 0;

  /* ── Helpers ────────────────────────────────────────────── */

  /** Natural image dimensions (read once per step) */
  let imgNaturalW = 0;
  let imgNaturalH = 0;

  function scaleWrap() {
    const stageW = stage.clientWidth;
    const stageH = stage.clientHeight;
    const imgRatio = imgNaturalW / imgNaturalH;
    const stageRatio = stageW / stageH;

    let w, h;
    if (stageRatio > imgRatio) {
      // stage is wider → constrain by height
      h = stageH;
      w = h * imgRatio;
    } else {
      w = stageW;
      h = w / imgRatio;
    }

    screenWrap.style.width  = w + 'px';
    screenWrap.style.height = h + 'px';
  }

  /** Convert percent coords to px inside screenWrap */
  function pctToPx(xPct, yPct) {
    const w = screenWrap.clientWidth;
    const h = screenWrap.clientHeight;
    return {
      x: (xPct / 100) * w,
      y: (yPct / 100) * h
    };
  }

  /* ── Position bubble ────────────────────────────────────── */
  function positionBubble(step) {
    const pos    = step.bubble.pos;
    const W      = screenWrap.clientWidth;
    const H      = screenWrap.clientHeight;
    const bW     = parseInt(getComputedStyle(document.documentElement)
                             .getPropertyValue('--bubble-w')) || 380;
    const bH     = bubble.offsetHeight || 180;
    const MARGIN = 8;

    // remove old arrow classes
    bubble.classList.remove('arrow-right','arrow-left','arrow-top','arrow-bottom');

    let left, top;

    // ── EXACT mode: pos = { x: %, y: % } ──────────────────
    if (typeof pos.x === 'number' && typeof pos.y === 'number') {
      left = (pos.x / 100) * W;
      top  = (pos.y / 100) * H;
      // clamp so bubble stays within the image
      left = Math.max(MARGIN, Math.min(left, W - bW - MARGIN));
      top  = Math.max(MARGIN, Math.min(top,  H - bH - MARGIN));
      bubble.style.left  = left + 'px';
      bubble.style.top   = top  + 'px';
      bubble.style.width = bW   + 'px';
      return;
    }

    // ── SIDE mode: pos = { side, align } ──────────────────
    const side  = pos.side  || 'bottom';
    const align = pos.align || 'start';

    if (side === 'bottom') {
      top = H - bH - MARGIN;
      bubble.classList.add('arrow-bottom');
    } else if (side === 'top') {
      top = MARGIN;
      bubble.classList.add('arrow-top');
    } else if (side === 'right') {
      top = Math.max(MARGIN, H / 2 - bH / 2);
      bubble.classList.add('arrow-right');
    } else {
      top = MARGIN;
      bubble.classList.add('arrow-left');
    }

    if (align === 'start') {
      left = MARGIN;
    } else if (align === 'end') {
      left = W - bW - MARGIN;
    } else {
      left = (W - bW) / 2;
    }

    // clamp
    left = Math.max(MARGIN, Math.min(left, W - bW - MARGIN));
    top  = Math.max(MARGIN, Math.min(top,  H - bH - MARGIN));

    bubble.style.left  = left + 'px';
    bubble.style.top   = top  + 'px';
    bubble.style.width = bW   + 'px';
  }

  /* ── Position hotspot ───────────────────────────────────── */
  function positionHotspot(step) {
    if (!step.hotspot) {
      hotspot.classList.add('hidden');
      return;
    }
    hotspot.classList.remove('hidden');
    const { x, y, label } = step.hotspot;
    const px = pctToPx(x, y);
    hotspot.style.left = px.x + 'px';
    hotspot.style.top  = px.y + 'px';
    hotLabel.textContent = label || 'Click here';
  }

  /* ── Update progress bar ────────────────────────────────── */
  function updateProgress(idx) {
    pSteps.forEach((el, i) => {
      el.classList.toggle('active', i === idx);
      el.classList.toggle('done',   i < idx);
    });
    pLabel.textContent = `Step ${idx + 1} of ${total}`;
  }

  /* ── Render a step ──────────────────────────────────────── */
  function showStep(idx, direction) {
    if (idx < 0 || idx >= total) return;
    current = idx;
    const step = steps[idx];

    /* image swap — no flicker:
       pre-load the new src into a hidden Image object so it's in the
       browser cache, then do an instant src swap with zero opacity change */
    const preload = new Image();
    preload.src = step.screen;

    const doSwap = () => {
      // disable any transition so the swap is a single paint frame
      screenImg.style.transition = 'none';
      screenImg.src = step.screen;

      // force reflow so the new src is committed before re-enabling transition
      void screenImg.offsetWidth;

      imgNaturalW = preload.naturalWidth  || screenImg.naturalWidth  || 1532;
      imgNaturalH = preload.naturalHeight || screenImg.naturalHeight || 782;
      scaleWrap();
      positionHotspot(step);
      positionBubble(step);
    };

    if (preload.complete && preload.naturalWidth) {
      doSwap();
    } else {
      preload.onload  = doSwap;
      preload.onerror = doSwap;
    }

    /* bubble content */
    bTitle.innerHTML = step.bubble.title;
    bBody.innerHTML  = step.bubble.text;
    bBadge.textContent = `${idx + 1} / ${total}`;

    /* next button */
    const isLast = idx === total - 1;
    bNext.textContent = step.nextLabel || (isLast ? '✓ End of tour' : 'Next →');
    bNext.classList.toggle('end-state', isLast);

    /* prev button */
    bPrev.disabled = idx === 0;

    /* dim overlay – never dim; overlay is only used to restore a hidden bubble */
    dimOverlay.classList.remove('active');

    /* bubble: ensure visible */
    bubble.classList.remove('hidden');

    /* progress */
    updateProgress(idx);
  }

  /* ── Navigation ─────────────────────────────────────────── */
  function goNext() {
    if (current === total - 1) {
      endscreen.classList.add('visible');
      bubble.classList.add('hidden');
      hotspot.classList.add('hidden');
      return;
    }
    showStep(current + 1, 1);
  }

  function goPrev() {
    if (current > 0) showStep(current - 1, -1);
  }

  /* ── Event listeners ────────────────────────────────────── */
  splashCta.addEventListener('click', () => {
    splash.classList.add('hidden');
    setTimeout(() => { splash.style.display = 'none'; }, 500);
    showStep(0, 0);
  });

  bNext.addEventListener('click', goNext);
  bPrev.addEventListener('click', goPrev);

  /* clicking the hotspot also advances */
  hotspot.addEventListener('click', goNext);

  /* close hides bubble (not advance) */
  bClose.addEventListener('click', () => {
    bubble.classList.add('hidden');
    dimOverlay.classList.remove('active');
  });

  /* clicking dim overlay restores bubble */
  dimOverlay.addEventListener('click', () => {
    bubble.classList.remove('hidden');
    dimOverlay.classList.remove('active');
  });

  /* progress step pills */
  pSteps.forEach((el, i) => {
    el.addEventListener('click', () => showStep(i, i > current ? 1 : -1));
  });

  /* keyboard */
  document.addEventListener('keydown', e => {
    if (splash.style.display !== 'none') return;
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') goNext();
    if (e.key === 'ArrowLeft')  goPrev();
    if (e.key === 'Escape') {
      // toggle bubble visibility
      bubble.classList.toggle('hidden');
    }
  });

  btnRestart.addEventListener('click', () => {
    endscreen.classList.remove('visible');
    showStep(0, 0);
  });

  /* resize – reposition bubble & hotspot */
  window.addEventListener('resize', () => {
    if (current >= 0 && current < total) {
      scaleWrap();
      positionHotspot(steps[current]);
      positionBubble(steps[current]);
    }
  });

  /* ── Init: populate title & progress pills ──────────────── */
  topTitle.textContent = cfg.title;
  document.title = cfg.title;

})();
