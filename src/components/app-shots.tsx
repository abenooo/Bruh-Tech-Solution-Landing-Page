"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion";

/*
 * Phone-scroll carousel: one glowing phone on the left, per-screen copy on
 * the right. Advancing slides the next screenshot up inside the frame while
 * the text crossfades, with bar pagination below. Auto-advances, pauses on
 * hover; screens live at public/app-screens/shot-N.png.
 */

const screens = [
  { src: "/app-screens/shot-1.png", t: "Everything on the home screen", d: "Balance card, quick actions and every service a member needs — savings, loans, shares and payments in one place." },
  { src: "/app-screens/shot-2.png", t: "Membership, in full detail", d: "Member card, share capital, contributions and benefits — the cooperative relationship, made visible." },
  { src: "/app-screens/shot-3.png", t: "Loans at a glance", d: "Balances, interest and repayment progress for every active loan, updated the moment a payment posts." },
  { src: "/app-screens/shot-4.png", t: "A calculator that shows its work", d: "The full amortization schedule before you apply — monthly payment, total interest and the exact pay-off date." },
  { src: "/app-screens/shot-5.png", t: "Speaks your language", d: "English, Amharic, Afan Oromo, Tigrigna and Af-Soomaali — members bank in the language they think in." },
];

export function AppShots() {
  const [[active, prev], setPair] = useState<[number, number]>([0, -1]);
  const hoverRef = useRef(false);
  const touchedRef = useRef(0);
  const downRef = useRef<{ x: number; y: number } | null>(null);

  const go = (i: number) => {
    touchedRef.current = Date.now();
    setPair(([a]) => (i === a ? [a, -1] : [((i % screens.length) + screens.length) % screens.length, a]));
  };
  const next = () => setPairManual(1);
  const back = () => setPairManual(-1);
  const setPairManual = (dir: number) => {
    touchedRef.current = Date.now();
    setPair(([a]) => [(a + dir + screens.length) % screens.length, a]);
  };

  /* moves by itself — pauses on hover and right after manual control */
  useEffect(() => {
    const id = setInterval(() => {
      if (hoverRef.current) return;
      if (Date.now() - touchedRef.current < 3500) return;
      setPair(([a]) => [(a + 1) % screens.length, a]);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  /* manual: swipe / drag left-right on the phone */
  const onDown = (e: React.PointerEvent) => { downRef.current = { x: e.clientX, y: e.clientY }; };
  const onUp = (e: React.PointerEvent) => {
    const d = downRef.current;
    downRef.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next(); else back();
    }
  };

  const s = screens[active];
  return (
    <section className="as" id="app">
      <Reveal as="div" className="as-head">
        <div className="eyebrow">( App demo )</div>
        <h2 className="display">The member app, screen by screen.</h2>
      </Reveal>
      <div
        onMouseEnter={() => { hoverRef.current = true; }}
        onMouseLeave={() => { hoverRef.current = false; }}
      >
      <Reveal as="div" className="asc">
        <div className="asc-vis" onPointerDown={onDown} onPointerUp={onUp}>
          <span className="asc-glow" aria-hidden />
          <div className="phone as-phone">
            <div className="phone-screen as-screen">
              {screens.map((x, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={x.src}
                  src={x.src}
                  alt={`Member app — ${x.t}`}
                  draggable={false}
                  className={i === active ? "on" : i === prev ? "was" : ""}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="asc-copy" key={active}>
          <span className="asc-count">{String(active + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}</span>
          <h3 className="display">{s.t}</h3>
          <p>{s.d}</p>
        </div>
      </Reveal>
      </div>
      <div className="asc-dots" role="tablist" aria-label="App screens">
        <button className="asc-arrow" aria-label="Previous screen" onClick={back}>‹</button>
        {screens.map((x, i) => (
          <button
            key={x.src}
            role="tab"
            aria-selected={i === active}
            aria-label={x.t}
            className={`asc-dot ${i === active ? "on" : ""}`}
            onClick={() => go(i)}
          />
        ))}
        <button className="asc-arrow" aria-label="Next screen" onClick={next}>›</button>
      </div>
    </section>
  );
}
