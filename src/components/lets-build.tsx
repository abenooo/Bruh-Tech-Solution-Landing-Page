"use client";

import { useEffect, useRef } from "react";

/*
 * Pinned scroll scene: "Let's" and "build" fly in from opposite screen edges,
 * lock together, then the assembled headline shatters into clip-path shards
 * that scatter outward from a point just left of center.
 */

const CENTER: [number, number] = [52, 46];
/* perimeter points, clockwise from top-left area — each consecutive pair + center = one shard */
const PERIM: [number, number][] = [
  [18, 0], [48, 0], [78, 0], [100, 0], [100, 20], [100, 75], [100, 100],
  [85, 100], [55, 100], [22, 100], [0, 100], [0, 70], [0, 25], [0, 0],
];

const SHARDS = PERIM.map((pt, i) => {
  const nxt = PERIM[(i + 1) % PERIM.length];
  const poly = `polygon(${CENTER[0]}% ${CENTER[1]}%, ${pt[0]}% ${pt[1]}%, ${nxt[0]}% ${nxt[1]}%)`;
  const cx = (CENTER[0] + pt[0] + nxt[0]) / 3;
  const cy = (CENTER[1] + pt[1] + nxt[1]) / 3;
  const ang = Math.atan2(cy - CENTER[1], cx - CENTER[0]);
  return {
    poly,
    dx: Math.cos(ang),
    dy: Math.sin(ang),
    rot: (i % 2 ? -1 : 1) * (8 + ((i * 7) % 18)),
  };
});

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function LetsBuild() {
  const wrapRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLParagraphElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const title = titleRef.current;
    const shards = shardsRef.current;
    const eye = eyeRef.current;
    const hint = hintRef.current;
    if (!wrap || !left || !right || !title || !shards || !eye || !hint) return;

    const settle = () => {
      left.style.transform = "none";
      right.style.transform = "none";
      eye.style.opacity = "1";
      eye.style.transform = "none";
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settle();
      return;
    }

    const pieces = Array.from(shards.children) as HTMLElement[];
    let raf = 0;
    const tick = () => {
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = clamp01(-r.top / total);

      /* phase 1 — fly in from the edges */
      const fly = easeOut(clamp01(p / 0.42));
      left.style.transform = `translateX(${-58 * (1 - fly)}vw) skewX(${-12 * (1 - fly)}deg)`;
      right.style.transform = `translateX(${58 * (1 - fly)}vw) skewX(${12 * (1 - fly)}deg)`;

      /* eyebrow rises once the words lock */
      const eyeIn = easeOut(clamp01((p - 0.38) / 0.12));
      const eyeOut = clamp01((p - 0.88) / 0.1);
      eye.style.opacity = String(eyeIn * (1 - eyeOut));
      eye.style.transform = `translateY(${14 * (1 - eyeIn)}px)`;

      /* phase 2 — shatter */
      const s = easeOut(clamp01((p - 0.58) / 0.38));
      title.style.opacity = s > 0.01 ? "0" : "1";
      const fade = 1 - clamp01((s - 0.35) / 0.65);
      pieces.forEach((el, i) => {
        const { dx, dy, rot } = SHARDS[i];
        el.style.opacity = s > 0.01 ? String(fade) : "0";
        el.style.transform = `translate(${dx * s * 34}vmin, ${dy * s * 34}vmin) rotate(${rot * s}deg)`;
      });

      hint.style.opacity = String(1 - clamp01((p - 0.5) / 0.25));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const headline = (
    <>
      Let&rsquo;s <span className="gold">build</span>
    </>
  );

  return (
    <section className="lb-wrap" ref={wrapRef} aria-label="Let's build">
      <div className="lb-sticky">
        <div>
          <div className="lb-title-box">
            <h2 className="lb-title" ref={titleRef}>
              <span className="w" ref={leftRef}>Let&rsquo;s</span>{" "}
              <span className="w gold" ref={rightRef}>build</span>
            </h2>
            <div ref={shardsRef}>
              {SHARDS.map((sh, i) => (
                <div key={i} className="lb-shard" style={{ clipPath: sh.poly }} aria-hidden>
                  <div className="lb-title">{headline}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="eyebrow lb-eyebrow" ref={eyeRef}>( Where discipline meets delivery )</p>
        </div>
        <p className="lb-hint" ref={hintRef} aria-hidden>( Keep scrolling )</p>
      </div>
    </section>
  );
}
