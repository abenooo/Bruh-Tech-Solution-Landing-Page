"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Precept-style pinned process scene.
 * The left "ruler" is a rotating dial: a huge circle whose center sits far
 * off-screen to the left, so only its right edge shows as a curved, ticked
 * arc. Step numbers 01–05 and degree labels ride the arc; scroll rotates the
 * dial so the active number lands at the fixed marker dot mid-screen, where
 * the step copy (counter, scramble-decoded title, description) sits beside it.
 */

const steps = [
  { t: "Understand", d: "We start in your branches, not in a slide deck — learning how members save, where the paper piles up, and what your committee actually needs to see." },
  { t: "Plan", d: "The work becomes a written specification first: modules, business rules and audit requirements your board can read and sign before we build." },
  { t: "Build", d: "One core, built module by module against the spec — membership, savings, loans, shares and accounting on a single ledger." },
  { t: "Integrate", d: "Telebirr, CBE, Chapa, USSD and your existing records come onto the same rails, reconciled end to end with nothing re-keyed." },
  { t: "Support", d: "We stay after go-live — training tellers, watching the ledger, and evolving the platform as your cooperative grows." },
];

const STEP_ANGLE = 0.42; /* radians between numbers on the dial */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+=";
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const glyph = (i: number, f: number) => GLYPHS[(i * 31 + f * 17) % GLYPHS.length];

function scramble(target: string, p: number, frame: number) {
  const settled = Math.floor(p * (target.length + 3));
  let out = "";
  for (let i = 0; i < target.length; i++) {
    out += i < settled ? target[i] : glyph(i, frame);
  }
  return out;
}

type Geo = { w: number; h: number; R: number; dotX: number; cx: number; cy: number };
const measure = (): Geo => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  /* half-moon: the circle's center sits ON the left edge at mid-height, so
     the arc starts exactly at the top-left corner, bulges right to the
     marker dot at mid-height, and lands back at the bottom-left corner. */
  const cx = 0;
  const R = Math.min(h / 2, w * 0.45);
  return { w, h, R, dotX: cx + R, cx, cy: h / 2 };
};

export function ProcessSteps() {
  const wrapRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const rotRef = useRef<SVGGElement>(null);
  const numsRef = useRef<HTMLDivElement>(null);
  const degsRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const geoRef = useRef<Geo | null>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    const on = () => {
      geoRef.current = measure();
      setGeo(geoRef.current);
    };
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bg = bgRef.current;
    const count = countRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    if (!wrap || !bg || !count || !title || !desc) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ps = 0;
    let frame = 0;
    let raf = 0;
    let curIdx = -1;
    let seen = false;
    let decodeStart = 0;
    const tick = () => {
      frame++;
      const g = geoRef.current;
      const rot = rotRef.current;
      const nums = numsRef.current;
      const degs = degsRef.current;
      const now = performance.now();
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = clamp01(-r.top / total);
      ps += (p - ps) * 0.1;
      if (Math.abs(p - ps) < 0.0004) ps = p;

      const f = Math.min(ps * steps.length, steps.length - 0.0001);
      const idx = Math.floor(f);

      /* the decode runs on a clock, not on scroll — it always settles */
      const visible = r.top < window.innerHeight && r.bottom > 0;
      if (visible && !seen) {
        seen = true;
        decodeStart = now;
      }
      if (idx !== curIdx) {
        curIdx = idx;
        if (seen) decodeStart = now;
      }

      /* backdrop: slow zoom-out as the section plays */
      bg.style.transform = `scale(${1.14 - ps * 0.1}) translateX(${ps * -2}%)`;

      /* the dial rotates; numbers and labels ride the arc, staying upright */
      if (g && rot && nums && degs) {
        rot.setAttribute("transform", `rotate(${(-f * STEP_ANGLE * 180) / Math.PI} ${g.cx} ${g.cy})`);
        (Array.from(nums.children) as HTMLElement[]).forEach((el, i) => {
          const a = (i - f) * STEP_ANGLE;
          const act = Math.max(0, 1 - Math.abs(i - f));
          const rr = g.R + (-72 + 156 * act); /* ghosts sit inside the arc, the active one outside */
          const x = g.cx + rr * Math.cos(a);
          const y = g.cy + rr * Math.sin(a);
          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.68 + 0.32 * act})`;
          el.style.opacity = String(Math.max(0.2, act));
          el.style.setProperty("--dash", String(1 - act));
        });
        (Array.from(degs.children) as HTMLElement[]).forEach((el, k) => {
          const a = (k + 0.5 - f) * STEP_ANGLE;
          const x = g.cx + (g.R + 30) * Math.cos(a);
          const y = g.cy + (g.R + 30) * Math.sin(a);
          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
      }

      /* step copy */
      count.textContent = `${idx + 1} / ${steps.length}`;
      const decode = clamp01((now - decodeStart) / 550);
      title.textContent = decode >= 1 ? steps[idx].t : scramble(steps[idx].t, decode, Math.floor(frame / 3));
      desc.textContent = steps[idx].d;
      const din = clamp01((now - decodeStart) / 450);
      desc.style.opacity = String(din);
      desc.style.transform = `translateY(${(1 - din) * 12}px)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* arc tick marks: radial dashes along the visible sweep of the dial */
  const ticks: React.ReactNode[] = [];
  if (geo) {
    /* cover the full visible sweep (±90°) plus everything that rotates
       into view across the five steps */
    for (let k = 0; Math.PI / 240 * k <= 5.1; k++) {
      const a = -1.68 + (Math.PI / 240) * k;
      const long = k % 5 === 0;
      const len = long ? 13 : 6;
      ticks.push(
        <line
          key={k}
          x1={geo.cx + (geo.R - len) * Math.cos(a)}
          y1={geo.cy + (geo.R - len) * Math.sin(a)}
          x2={geo.cx + geo.R * Math.cos(a)}
          y2={geo.cy + geo.R * Math.sin(a)}
          stroke={`rgba(246, 239, 227, ${long ? 0.55 : 0.3})`}
          strokeWidth="1"
        />
      );
    }
  }

  return (
    <section className="ps-wrap" ref={wrapRef} aria-label="How we deliver">
      {/* static version for screen readers and reduced motion */}
      <ol className="sr-steps">
        {steps.map((s, i) => (
          <li key={s.t}>{String(i + 1).padStart(2, "0")} — {s.t}: {s.d}</li>
        ))}
      </ol>

      <div className="ps-sticky" aria-hidden>
        {/* backdrop — exploded product render (Precept template asset; licensed with the template) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ps-bg" ref={bgRef} src="/process-bg.webp" alt="" loading="lazy" />
        <div className="ps-shade" />

        {/* frame */}
        <span className="ps-corner tl" /><span className="ps-corner tr" />
        <span className="ps-corner bl" /><span className="ps-corner br" />
        <div className="eyebrow ps-eyebrow">( How we deliver )</div>

        {/* the dial */}
        <div className="ps-dial">
          {geo && (
            <svg width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
              <g ref={rotRef}>
                <circle cx={geo.cx} cy={geo.cy} r={geo.R} fill="none"
                  stroke="rgba(246, 239, 227, 0.28)" strokeWidth="1" />
                {ticks}
              </g>
            </svg>
          )}
          <i className="ps-dot" style={geo ? { left: geo.dotX } : undefined} />
          <div className="ps-gnums" ref={numsRef}>
            {steps.map((s, i) => (
              <span key={s.t} className="ps-gnum">{String(i + 1).padStart(2, "0")}</span>
            ))}
          </div>
          <div className="ps-degs" ref={degsRef}>
            {steps.map((s, k) => (
              <span key={s.t} className="ps-deg">{(k + 1) * 25}°</span>
            ))}
          </div>
        </div>

        {/* active step copy */}
        <div className="ps-copy">
          <span className="ps-count" ref={countRef}>1 / 5</span>
          <h3 className="ps-title display" ref={titleRef}>Understand</h3>
          <p className="ps-desc" ref={descRef}>{steps[0].d}</p>
        </div>
      </div>
    </section>
  );
}
