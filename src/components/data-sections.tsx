"use client";

import { useEffect, useRef, useMemo } from "react";
import { Reveal } from "@/components/motion";
import { useLanguage } from "@/lib/i18n";

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
const DEFAULT_QUESTIONS = ["Which branch grew fastest?", "Compare Q1 and Q2 deposits", "Who is behind on repayments?"];
function TypeLine({ questions = DEFAULT_QUESTIONS }: { questions?: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const list = questions.length ? questions : DEFAULT_QUESTIONS;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = list[0];
      return;
    }
    let q = 0;
    let n = 0;
    let hold = 0;
    const id = setInterval(() => {
      const full = list[q % list.length];
      if (n < full.length) {
        n++;
        el.textContent = full.slice(0, n);
      } else if (++hold > 22) {
        hold = 0;
        n = 0;
        q = (q + 1) % list.length;
        el.textContent = "";
      }
    }, 65);
    return () => clearInterval(id);
  }, [questions]);
  return <span className="tl-text" ref={ref} />;
}

export function TeamTiles() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const pendingRef = useRef(0);

  const tiles = useMemo(() => [
    {
      t: t.teamTiles.d1_title,
      d: t.teamTiles.d1_desc,
      hue: "linear-gradient(165deg, #A9C3B4 0%, #6FA287 42%, #23392F 100%)",
      card: (
        <div className="glass gl-stat">
          <span>{t.teamTiles.cards.activeMembers}</span>
          <b><CountLoop /></b>
          <i className="pos">+4.7%</i>
        </div>
      ),
    },
    {
      t: t.teamTiles.d2_title,
      d: t.teamTiles.d2_desc,
      hue: "linear-gradient(160deg, #D9C89A 0%, #B98F45 48%, #2B2417 100%)",
      card: (
        <div className="glass gl-chat">
          <span className="q">✦ <TypeLine questions={t.teamTiles.questions} /><i className="caret" /></span>
          <span className="foot">🖇 Bruh Tech AI</span>
        </div>
      ),
    },
    {
      t: t.teamTiles.d3_title,
      d: t.teamTiles.d3_desc,
      hue: "linear-gradient(150deg, #B9C7BE 0%, #7E9B8C 45%, #1D2B25 100%)",
      card: (
        <div className="glass gl-rep">
          <span className="head">{t.teamTiles.cards.recentReports}</span>
          <div className="r-row"><span>{t.teamTiles.cards.nbePack}</span><i className="ok">{t.teamTiles.cards.completed}</i></div>
          <div className="r-row"><span>{t.teamTiles.cards.dividendForecast}</span><i className="rev">{t.teamTiles.cards.inReview}</i></div>
        </div>
      ),
    },
    {
      t: t.teamTiles.d4_title,
      d: t.teamTiles.d4_desc,
      hue: "linear-gradient(155deg, #D8B49A 0%, #C9603B 55%, #2A1D15 100%)",
      card: (
        <div className="glass gl-alert">
          <span className="bell">🔔</span>
          <span>{t.teamTiles.cards.alertMsg}</span>
        </div>
      ),
    },
    {
      t: t.teamTiles.d5_title,
      d: t.teamTiles.d5_desc,
      hue: "linear-gradient(160deg, #9DB3A7 0%, #52796B 50%, #16211C 100%)",
      card: (
        <div className="glass gl-team">
          {[[t.teamTiles.cards.branches, "+12"], [t.teamTiles.cards.creditCommittee, "+3"], [t.teamTiles.cards.auditors, "+1"]].map(([t2, n]) => (
            <div key={t2} className="t-row2"><span>{t2}</span><span className="avs"><em className="av a1" /><em className="av a2" /><i>{n}</i></span></div>
          ))}
        </div>
      ),
    },
  ], [t.teamTiles]);

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
          <h2 className="display">{t.teamTiles.title}</h2>
        </Reveal>
        <div className="tt-arrows">
          <button onClick={() => nudge(-1)} aria-label={t.common.prev}>‹</button>
          <button onClick={() => nudge(1)} aria-label={t.common.next}>›</button>
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
