"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion";

/*
 * Nexura-style audience section: centered heading, a plain-text scrollspy
 * rail on the left (active link underlined), and per-audience blocks — big
 * headline + gray copy in the middle, a light visual tile on the right.
 * The first tile is a vertical feed of channel cards that scrolls by itself,
 * with whichever card passes the middle popping forward.
 */

/* --- visual 1: auto-scrolling channel feed --- */

const feedCards = [
  { icon: "₸", tint: "#E8F4EC", t: "Telebirr", d: "Deposit confirmed · ETB 4,500" },
  { icon: "◍", tint: "#FDF3DC", t: "ROI on savings", d: "8.2% dividend capacity this year" },
  { icon: "🏦", tint: "#EAF0FA", t: "CBE Birr", d: "142 postings reconciled today" },
  { icon: "#", tint: "#F4EAFA", t: "USSD", d: "38 member sessions live now" },
  { icon: "⚡", tint: "#FDF3DC", t: "Top branch", d: "Adama leading deposits this week" },
  { icon: "∞", tint: "#EAF0FA", t: "Passbook sync", d: "Every channel, updated once" },
];

function AutoFeed() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(track.children) as HTMLElement[];
    let off = 0;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;
      off += dt * 0.022; /* ~22px per second */
      const half = track.scrollHeight / 2;
      if (half > 0 && off >= half) off -= half;
      track.style.transform = `translateY(${-off}px)`;

      const box = track.parentElement!.getBoundingClientRect();
      const mid = box.top + box.height / 2;
      cards.forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid) / box.height;
        const act = Math.max(0, 1 - d * 2.6);
        c.style.opacity = String(0.35 + 0.65 * act);
        c.style.transform = `scale(${0.94 + 0.08 * act})`;
        /* neutral shadows so the same values read correctly in both themes */
        c.style.boxShadow = act > 0.7
          ? "0 18px 44px rgba(0, 0, 0, 0.2)"
          : "0 4px 14px rgba(0, 0, 0, 0.07)";
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const list = [...feedCards, ...feedCards]; /* doubled for the seamless loop */
  return (
    <div className="vfeed">
      <div className="vfeed-track" ref={trackRef}>
        {list.map((c, i) => (
          <div className="vfeed-card" key={i}>
            <span className="ic" style={{ background: c.tint }}>{c.icon}</span>
            <span className="tx"><b>{c.t}</b><i>{c.d}</i></span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- visual 2: workflow diagram --- */

function Workflow() {
  return (
    <div className="wf">
      <div className="wf-pill"><b>Loan LN-2039</b><span>Input</span></div>
      <span className="wf-line" />
      <span className="wf-core">
        <svg width="26" height="26" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
          <rect x="14" y="14" width="30" height="30" rx="9" />
          <rect x="54" y="24" width="32" height="32" rx="10" />
          <rect x="24" y="56" width="30" height="30" rx="9" />
        </svg>
      </span>
      <span className="wf-line" />
      <div className="wf-pill out"><b>Disbursement</b><span>Signed 3/3</span></div>
    </div>
  );
}

/* --- visual 3: tilted analytics cards --- */

function TiltCards() {
  return (
    <div className="tilt">
      <div className="tilt-card back">
        <b>Branch mix</b>
        <i>April 2026</i>
        <svg viewBox="0 0 42 42" className="donut" aria-hidden>
          <circle cx="21" cy="21" r="15.9" fill="none" stroke="#F0E4CC" strokeWidth="7" />
          <circle className="seg-gold" cx="21" cy="21" r="15.9" fill="none" stroke="#E8B54A" strokeWidth="7"
            strokeDasharray="55 45" strokeDashoffset="25" />
          <circle className="seg-green" cx="21" cy="21" r="15.9" fill="none" stroke="#3FA275" strokeWidth="7"
            strokeDasharray="20 80" strokeDashoffset="70" />
        </svg>
      </div>
      <div className="tilt-card front">
        <b>Savings trend</b>
        <i>Last 6 months</i>
        <svg viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden>
          <path d="M0,40 C12,36 20,38 30,30 C40,22 48,26 58,20 C68,14 78,18 88,10 L100,6 L100,44 L0,44 Z"
            fill="rgba(63, 162, 117, 0.16)" />
          <path className="draw" pathLength="1" d="M0,40 C12,36 20,38 30,30 C40,22 48,26 58,20 C68,14 78,18 88,10 L100,6"
            fill="none" stroke="#3FA275" strokeWidth="1.6" />
          <circle cx="58" cy="20" r="2.2" fill="#3FA275" />
        </svg>
      </div>
    </div>
  );
}

/* --- the section --- */

const groups = [
  {
    id: "team-tellers",
    tab: "For branch tellers",
    h: "Stop re-keying entries across systems.",
    d: "The core connects every channel — teller, Telebirr, CBE, USSD — and posts each transaction once, everywhere.",
    visual: <AutoFeed />,
  },
  {
    id: "team-committees",
    tab: "For loan committees",
    h: "Do more with a lean credit committee.",
    d: "Set your approval chains once and let the workflow route, remind and record every signature in the audit trail.",
    visual: <Workflow />,
  },
  {
    id: "team-executives",
    tab: "For executives",
    h: "Manage every branch from one intelligent core.",
    d: "Trend flags and scheduled regulator packs, delivered without the manual overhead.",
    visual: <TiltCards />,
  },
];

export function TeamsTabs() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const panels = groups
      .map((g) => document.getElementById(g.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            const i = panels.indexOf(e.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  return (
    <section className="tabs">
      <Reveal as="div" className="tabs-head container">
        <h2 className="display">Built for every SACCO team.</h2>
        <p>Whether you run one branch or a federation, the platform adapts to the way your people work.</p>
      </Reveal>
      <div className="tabs-body container">
        <nav className="tabs-rail" aria-label="Teams">
          {groups.map((g, i) => (
            <a key={g.id} href={`#${g.id}`} className={i === active ? "on" : ""}>
              {g.tab}
            </a>
          ))}
        </nav>
        <div className="tabs-panels">
          {groups.map((g) => (
            <Reveal key={g.id} as="div" className="tabs-block">
              <div id={g.id} className="tabs-anchor" aria-hidden />
              <div className="tabs-copy">
                <h3 className="display">{g.h}</h3>
                <p>{g.d}</p>
              </div>
              <div className="tabs-visual">{g.visual}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
