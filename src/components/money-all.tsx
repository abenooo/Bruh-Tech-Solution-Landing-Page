"use client";

import { useEffect, useRef } from "react";
import { FlowCore, FlowTeller, FlowPay, FlowAudit } from "@/components/flow-mocks";

/*
 * Mercury-style "Everything you do with money. All in one place." section:
 * a dark stage pinned over a 500vh range. The heading rides above a list of
 * four areas on the left — the active one expands its subtitle and fills a
 * thin progress rail as its slice of scroll plays — while the right-side
 * visual crossfades per item. Items are clickable to jump the scroll.
 * Placeholder titles/videos — swap for final SACCO content later.
 */

const items = [
  { t: "Core banking & more", d: "Membership, savings, shares and double-entry accounting on one ledger — with branch cash management built in.", flow: <FlowCore /> },
  { t: "Teller & branch operations", d: "Front-office queues, passbooks and an end-of-day close that reconciles itself.", flow: <FlowTeller /> },
  { t: "Payments & channels", d: "Telebirr, CBE and USSD on the same rails — posted once, visible everywhere.", flow: <FlowPay /> },
  { t: "Reports & audit", d: "Regulator packs and a 245-requirement audit trail, generated on schedule.", flow: <FlowAudit /> },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function MoneyAll() {
  const wrapRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const visRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const list = listRef.current;
    const vis = visRef.current;
    const head = headRef.current;
    if (!wrap || !list || !vis || !head) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = Array.from(list.children) as HTMLElement[];
    const panels = Array.from(vis.children) as HTMLElement[];
    let cur = -1;
    let raf = 0;
    const tick = () => {
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = clamp01(-r.top / total);

      /* heading eases in over the first slice */
      const hin = clamp01(p / 0.1);
      head.style.opacity = String(0.25 + 0.75 * hin);

      /* 4 items share the remaining range */
      const f = clamp01((p - 0.1) / 0.86) * items.length;
      const idx = Math.min(items.length - 1, Math.floor(f));
      const local = clamp01(f - idx);

      if (idx !== cur) {
        cur = idx;
        rows.forEach((row, i) => row.classList.toggle("on", i === idx));
        panels.forEach((panel, i) => panel.classList.toggle("on", i === idx));
      }
      const fill = rows[idx]?.querySelector(".ma-fill") as HTMLElement | null;
      if (fill) fill.style.height = `${local * 100}%`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const jump = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    const total = wrap.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + total * (0.12 + (i + 0.5) * 0.215), behavior: "smooth" });
  };

  return (
    <section className="ma-wrap" ref={wrapRef} id="platform">
      <div className="ma-sticky">
        <div className="container ma-grid">
          <div className="ma-left">
            <h2 className="display ma-head" ref={headRef}>
              Everything you do with money.<br />All in one place.
            </h2>
            <div className="ma-items" ref={listRef}>
              {items.map((x, i) => (
                <button key={x.t} className={`ma-item ${i === 0 ? "on" : ""}`} onClick={() => jump(i)}>
                  <span className="ma-rail" aria-hidden><span className="ma-fill" /></span>
                  <span className="ma-body">
                    <b>{x.t}</b>
                    <i>{x.d}</i>
                  </span>
                </button>
              ))}
            </div>
            <a className="ma-demo" href="#contact">
              Request a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className="ma-vis" ref={visRef}>
            {items.map((x, i) => (
              <div key={x.t} className={`ma-panel ${i === 0 ? "on" : ""}`} aria-label={x.t}>
                {x.flow}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
