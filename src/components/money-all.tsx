"use client";

import { useEffect, useRef } from "react";
import { FlowCore, FlowTeller, FlowPay, FlowAudit } from "@/components/flow-mocks";
import { useLanguage } from "@/lib/i18n";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const flows = [<FlowCore key="core" />, <FlowTeller key="teller" />, <FlowPay key="pay" />, <FlowAudit key="audit" />];

export function MoneyAll() {
  const { t } = useLanguage();
  const wrapRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const visRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  const items = t.platform.items.map((it, i) => ({
    t: it.t,
    d: it.d,
    flow: flows[i] || flows[0],
  }));

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

      /* 4 items split the scroll range from p=0.12 to p=0.98 */
      const start = 0.12;
      const slice = (0.98 - start) / 4;
      const rawIdx = Math.floor((p - start) / slice);
      const idx = p < start ? 0 : Math.min(3, Math.max(0, rawIdx));

      if (idx !== cur) {
        cur = idx;
        rows.forEach((row, i) => {
          if (i === idx) row.classList.add("on");
          else row.classList.remove("on");
        });
        panels.forEach((pan, i) => {
          if (i === idx) pan.classList.add("on");
          else pan.classList.remove("on");
        });
      }

      /* progress rail inside the active item fills linearly with its slice */
      rows.forEach((row, i) => {
        const fill = row.querySelector(".ma-fill") as HTMLElement | null;
        if (!fill) return;
        if (i < idx) fill.style.transform = "scaleX(1)";
        else if (i > idx) fill.style.transform = "scaleX(0)";
        else {
          const sub = clamp01((p - (start + i * slice)) / slice);
          fill.style.transform = `scaleX(${sub})`;
        }
      });

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
              {t.platform.title}
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
              {t.nav.requestDemo}
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
