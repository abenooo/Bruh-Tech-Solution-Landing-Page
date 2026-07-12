"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion";

/*
 * TeamTiles — "Built to work the way your team thinks": a self-drifting
 * row of product tiles, each with a live glass card over a gradient scene.
 */

/* --- live internals for the tiles --- */

/* count-up that replays on a loop */
function CountLoop() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now();
    const loop = (t: number) => {
      const c = (t - t0) % 4200;
      const p = Math.min(1, c / 1700);
      el.textContent = Math.round(23412 * (1 - Math.pow(1 - p, 3))).toLocaleString();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <span ref={ref}>23,412</span>;
}

/* typing prompt that cycles through questions */
const QUESTIONS = ["Which branch grew fastest?", "Compare Q1 and Q2 deposits", "Who is behind on repayments?"];
function TypeLine() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = QUESTIONS[0];
      return;
    }
    let q = 0;
    let n = 0;
    let hold = 0;
    const id = setInterval(() => {
      const full = QUESTIONS[q];
      if (n < full.length) {
        n++;
        el.textContent = full.slice(0, n);
      } else if (++hold > 22) {
        hold = 0;
        n = 0;
        q = (q + 1) % QUESTIONS.length;
        el.textContent = "";
      }
    }, 65);
    return () => clearInterval(id);
  }, []);
  return <span className="tl-text" ref={ref} />;
}

const tiles = [
  {
    t: "Real-time dashboards",
    d: "Branch and portfolio dashboards that update the moment a teller posts — no stale numbers in committee.",
    hue: "linear-gradient(165deg, #A9C3B4 0%, #6FA287 42%, #23392F 100%)",
    card: (
      <div className="glass gl-stat">
        <span>Active members</span>
        <b><CountLoop /></b>
        <i className="pos">+4.7%</i>
      </div>
    ),
  },
  {
    t: "AI assistant",
    d: "Ask a question in plain language and get the ledger's answer, with the report behind it.",
    hue: "linear-gradient(160deg, #D9C89A 0%, #B98F45 48%, #2B2417 100%)",
    card: (
      <div className="glass gl-chat">
        <span className="q">✦ <TypeLine /><i className="caret" /></span>
        <span className="foot">🖇 Add attachment</span>
      </div>
    ),
  },
  {
    t: "One-click reports",
    d: "Regulator and committee packs generated, stamped and shared in seconds — not the night before.",
    hue: "linear-gradient(150deg, #B9C7BE 0%, #7E9B8C 45%, #1D2B25 100%)",
    card: (
      <div className="glass gl-rep">
        <span className="head">Recent reports</span>
        <div className="r-row"><span>Monthly NBE pack</span><i className="ok">Completed</i></div>
        <div className="r-row"><span>Dividend forecast</span><i className="rev">In review</i></div>
      </div>
    ),
  },
  {
    t: "Smart alerts",
    d: "Get flagged the moment something unusual happens — a PAR spike, a stalled approval, a branch gone quiet.",
    hue: "linear-gradient(155deg, #D8B49A 0%, #C9603B 55%, #2A1D15 100%)",
    card: (
      <div className="glass gl-alert">
        <span className="bell">🔔</span>
        <span>PAR 30 rose 0.6% in Adama<br />— review 4 loans</span>
      </div>
    ),
  },
  {
    t: "Team collaboration",
    d: "Branches, committees and auditors work from the same ledger — share views, comment, assign follow-ups.",
    hue: "linear-gradient(160deg, #9DB3A7 0%, #52796B 50%, #16211C 100%)",
    card: (
      <div className="glass gl-team">
        {[["Branches", "+12"], ["Credit committee", "+3"], ["Auditors", "+1"]].map(([t2, n]) => (
          <div key={t2} className="t-row2"><span>{t2}</span><span className="avs"><em className="av a1" /><em className="av a2" /><i>{n}</i></span></div>
        ))}
      </div>
    ),
  },
];

export function TeamTiles() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const pendingRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let off = 0;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;
      if (!hoverRef.current) off += dt * 0.032; /* the row drifts right → left on its own */
      const step = pendingRef.current * 0.1; /* arrow nudges ease in */
      off += step;
      pendingRef.current -= step;
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (off >= half) off -= half;
        if (off < 0) off += half;
      }
      track.style.transform = `translateX(${-off}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const nudge = (dir: number) => {
    pendingRef.current += dir * 368; /* one card + gap */
  };

  const list = [...tiles, ...tiles]; /* doubled for the seamless loop */
  return (
    <section className="tt">
      <div className="container tt-head">
        <Reveal as="div">
          <h2 className="display">Built to work the way<br />your team thinks</h2>
        </Reveal>
        <div className="tt-arrows">
          <button onClick={() => nudge(-1)} aria-label="Previous">‹</button>
          <button onClick={() => nudge(1)} aria-label="Next">›</button>
        </div>
      </div>
      <div
        className="tt-row"
        onMouseEnter={() => { hoverRef.current = true; }}
        onMouseLeave={() => { hoverRef.current = false; }}
      >
        <div className="tt-track" ref={trackRef}>
          {list.map((x, i) => (
            <article className="tile" key={i} aria-hidden={i >= tiles.length}>
              <div className="tile-img" style={{ background: x.hue }}>
                <span className="tile-hill" />
                {x.card}
              </div>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
