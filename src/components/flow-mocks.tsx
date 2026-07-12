"use client";

import { useEffect, useRef } from "react";

/*
 * Flow-style panel animations for the "Everything you do with money" section:
 * clean product screens whose elements cascade in, hold, and loop — built
 * live in CSS/DOM so they stay crisp at any size and are easy to re-skin
 * when the final SACCO content lands. Elements share one looping keyframe
 * (fm-seq) phased per element via --i; panels that aren't active pause via
 * animation-play-state.
 */

/* looping count-up used inside the core-banking flow */
function CountTick({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = prefix + to.toLocaleString() + suffix;
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const loop = (t: number) => {
      const c = (t - t0) % 8000;
      const p = Math.min(1, c / 2200);
      const v = Math.round(to * (1 - Math.pow(1 - p, 3)));
      el.textContent = prefix + v.toLocaleString() + suffix;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [to, prefix, suffix]);
  return <span ref={ref}>{prefix}{to.toLocaleString()}{suffix}</span>;
}

const CHART = "M0,46 C10,42 18,44 28,36 C38,28 46,32 56,24 C66,16 74,20 84,12 L100,8";

/* 1 — core banking overview */
export function FlowCore() {
  return (
    <div className="fm">
      <aside className="fm-side" style={{ "--i": 0 } as React.CSSProperties}>
        <span className="dot" />
        {["Dashboard", "Members", "Savings", "Loans", "Shares", "Reports"].map((x, i) => (
          <i key={x} className={i === 0 ? "on" : ""}>{x}</i>
        ))}
      </aside>
      <div className="fm-main">
        <div className="fm-hero" style={{ "--i": 1 } as React.CSSProperties}>
          <span>Total savings</span>
          <b><CountTick to={148.2 * 10} prefix="ETB " suffix="M" /></b>
          <i className="up">▲ 12.4% this quarter</i>
        </div>
        <div className="fm-row3">
          <div className="fm-stat" style={{ "--i": 2 } as React.CSSProperties}><b>23,412</b><span>Members</span></div>
          <div className="fm-stat" style={{ "--i": 3 } as React.CSSProperties}><b>8,540</b><span>Active loans</span></div>
          <div className="fm-stat" style={{ "--i": 4 } as React.CSSProperties}><b>2.4%</b><span>PAR 30</span></div>
        </div>
        <div className="fm-chart" style={{ "--i": 5 } as React.CSSProperties}>
          <span>Portfolio growth</span>
          <svg viewBox="0 0 100 50" preserveAspectRatio="none">
            <path d={`${CHART} L100,50 L0,50 Z`} fill="rgba(63,162,117,0.14)" />
            <path className="fm-draw" pathLength="1" d={CHART} fill="none" stroke="#3FA275" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* 2 — teller & branch operations */
export function FlowTeller() {
  return (
    <div className="fm fm-col">
      <div className="fm-title" style={{ "--i": 0 } as React.CSSProperties}>Teller queue — Adama branch</div>
      {[
        ["SV-1180 · Deposit", "ETB 4,500"],
        ["LN-1902 · Repayment", "ETB 2,150"],
        ["SH-0042 · 12 shares", "ETB 1,200"],
      ].map(([t, v], i) => (
        <div key={t} className="fm-qrow" style={{ "--i": i + 1 } as React.CSSProperties}>
          <span>{t}</span>
          <b>{v}</b>
          <span className="fm-swap">
            <i className="a">Post</i>
            <i className="b">Posted ✓</i>
          </span>
        </div>
      ))}
      <div className="fm-eod" style={{ "--i": 4 } as React.CSSProperties}>
        <span>End-of-day close</span>
        <b className="ok">Reconciled ✓ · 0 exceptions</b>
      </div>
    </div>
  );
}

/* 3 — payments & channels */
export function FlowPay() {
  return (
    <div className="fm fm-col fm-pay">
      <div className="fm-title" style={{ "--i": 0 } as React.CSSProperties}>Channels — posted once</div>
      <div className="fm-paygrid">
        <div className="fm-chs">
          {["Telebirr", "CBE Birr", "USSD *889#"].map((c, i) => (
            <div key={c} className="fm-ch" style={{ "--i": i + 1 } as React.CSSProperties}>{c}</div>
          ))}
        </div>
        <div className="fm-wire" style={{ "--i": 4 } as React.CSSProperties} aria-hidden>
          <span className="fm-dot" />
        </div>
        <div className="fm-ledger" style={{ "--i": 5 } as React.CSSProperties}>
          <span>One ledger</span>
          <b>ETB 2.4M today</b>
          <i className="ok">Reconciled live</i>
        </div>
      </div>
    </div>
  );
}

/* 4 — reports & audit */
export function FlowAudit() {
  return (
    <div className="fm fm-col">
      <div className="fm-title" style={{ "--i": 0 } as React.CSSProperties}>Reports & audit trail</div>
      <div className="fm-row3">
        <div className="fm-rep" style={{ "--i": 1 } as React.CSSProperties}><b>Monthly NBE pack</b><i className="ok">Generated</i></div>
        <div className="fm-rep" style={{ "--i": 2 } as React.CSSProperties}><b>Dividend model</b><i className="ok">Generated</i></div>
        <div className="fm-rep" style={{ "--i": 3 } as React.CSSProperties}><b>Branch P&L</b><i className="rev">Scheduled</i></div>
      </div>
      {[
        "09:41 · Teller posted SV-1180 — signed",
        "09:42 · Ledger entry LN-1902 — dual control",
        "09:44 · Report pack sealed — hash recorded",
      ].map((t, i) => (
        <div key={t} className="fm-log" style={{ "--i": i + 4 } as React.CSSProperties}>
          <em /> {t}
        </div>
      ))}
    </div>
  );
}
