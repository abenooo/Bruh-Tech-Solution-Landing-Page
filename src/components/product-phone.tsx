"use client";

import { useEffect, useRef } from "react";
import { AppShots } from "@/components/app-shots";

/*
 * Mubly-style product section: headline + copy on the left, an iPhone mockup
 * of the BruhTech member app on the right. The app UI inside the phone is a
 * tall feed that scrolls within the frame as the page scrolls past, and mini
 * app-cards float around the device.
 */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function PhoneMock({ trackRef }: { trackRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="phone" aria-hidden>
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="app-track" ref={trackRef}>
          <div className="app-head">
            <span className="hello">Selam, Meseret 👋</span>
            <span className="bell" />
          </div>
          <div className="app-balance">
            <span>Total savings</span>
            <b>ETB 12,480.50</b>
            <i>Passbook SV-1180 · Updated just now</i>
          </div>
          <div className="app-actions">
            {["Deposit", "Withdraw", "Loan", "Shares"].map((a) => (
              <span key={a}><em /> {a}</span>
            ))}
          </div>
          <div className="app-card">
            <div className="c-title">Nominees</div>
            <div className="c-row"><span className="av a1" /><span className="av a2" /><span className="av a3" /><i>Shared with 3 people</i></div>
          </div>
          <div className="app-goal">
            <div className="g-top"><span>Ox-fattening goal</span><b>80%</b></div>
            <div className="g-bar"><i style={{ width: "80%" }} /></div>
          </div>
          <div className="app-list">
            <div className="c-title">Recent activity</div>
            {[
              ["Deposit — Telebirr", "+ 500.00"],
              ["Loan repayment", "− 850.00"],
              ["Dividend posted", "+ 1,024.00"],
              ["Share purchase", "− 1,200.00"],
            ].map(([t, v]) => (
              <div key={t} className="a-row"><span>{t}</span><b className={v.startsWith("+") ? "pos" : ""}>{v}</b></div>
            ))}
          </div>
          <div className="app-card">
            <div className="c-title">My products</div>
            {["Voluntary savings", "Fixed deposit · 12 mo", "Share account"].map((p) => (
              <div key={p} className="p-row"><em />{p}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductPhone() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* the app feed scrolls inside the phone as the section moves through the viewport */
  useEffect(() => {
    const el = ref.current;
    const track = trackRef.current;
    if (!el || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ps = 0;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp01((vh - r.top) / (vh + r.height));
      ps += (p - ps) * 0.09;
      const screen = track.parentElement as HTMLElement;
      const range = Math.max(0, track.scrollHeight - screen.clientHeight + 40);
      track.style.transform = `translateY(${-ps * range}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="pp" ref={ref} id="app">
      <div className="container pp-grid">
        <div className="pp-text">
          <div className="eyebrow pp-eyebrow">( The member app )</div>
          <h2 className="display">Improving your productivity is now on your hand.</h2>
          <p>
            The same audit-grade core, in every member&apos;s pocket — balances, deposits,
            loan repayments and share statements, synced with the branch the moment they happen.
          </p>
          <div className="pp-btns">
            <a className="btn pp-dark" href="#contact">Get the app</a>
            <a className="btn pp-ghost" href="#modules">Explore all modules</a>
          </div>
        </div>
        <div className="pp-visual">
          <span className="pp-glow" aria-hidden />
          <PhoneMock trackRef={trackRef} />
          <div className="pp-card pp-card-1" aria-hidden>
            <b>Goal reached</b>
            <span>Ox-fattening · 80% saved</span>
          </div>
          <div className="pp-card pp-card-2" aria-hidden>
            <b>Repayment due Friday</b>
            <span>LN-2039 · ETB 850.00</span>
          </div>
        </div>
      </div>

      {/* the app demo lives inside the same mobile-app section */}
      <AppShots />
    </section>
  );
}
