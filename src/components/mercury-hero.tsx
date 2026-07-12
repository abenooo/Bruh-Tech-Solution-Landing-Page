"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Mercury-style hero, per spec:
 *  - full-bleed video scrubbed by scroll (currentTime = progress * duration),
 *    gated on readyState >= 2, driven through rAF with lerped progress
 *  - touch devices fall back to a gently autoplaying loop; reduced-motion
 *    users get a paused first frame
 *  - headline → subhead → form stagger in on load (~100ms apart)
 *  - frosted 48px capture pill (Mercury's exact geometry), microcopy and a
 *    bottom regulatory-style disclaimer
 */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function MercuryHero() {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  /* staggered entrance once mounted (SSR renders the pre-animation state) */
  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const v = videoRef.current;
    const content = contentRef.current;
    const dim = dimRef.current;
    const fin = finalRef.current;
    if (!wrap || !v || !content || !dim || !fin) return;

    v.muted = true; /* React doesn't always render the muted attribute */

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }

    /* touch devices: seeking on scroll is janky — autoplay a gentle loop instead */
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) {
      v.loop = true;
      v.play().catch(() => {});
    }

    let ps = 0;
    let raf = 0;
    const tick = () => {
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = clamp01(-r.top / total);
      ps += (p - ps) * 0.06;
      if (Math.abs(p - ps) < 0.0004) ps = p;

      /* scrub across the whole pin — the film ends close on the laptop's
         dashboard. Never queue a seek on top of one still in flight;
         seek pile-up is what makes scrubbing stutter. */
      if (!coarse && !v.seeking && v.readyState >= 2 && v.duration && isFinite(v.duration)) {
        const t = ps * Math.max(0, v.duration - 0.05);
        if (Math.abs(v.currentTime - t) > 0.008) v.currentTime = t;
      }

      /* content ghosts away as the camera dives toward the screen */
      const out = clamp01((ps - 0.15) / 0.4);
      content.style.opacity = String(1 - out);
      content.style.transform = `translateY(${-24 * out}px)`;
      content.style.pointerEvents = out > 0.5 ? "none" : "auto";

      /* as the camera lands on the laptop, dissolve to the real admin
         dashboard — a wide window with an ease-in-out curve so the fade
         starts imperceptibly and settles gently */
      const ft = clamp01((ps - 0.68) / 0.29);
      fin.style.opacity = String(ft * ft * (3 - 2 * ft));

      /* deepen toward the next section's ink so the handoff is a dissolve */
      dim.style.opacity = String(0.7 * easeOut(clamp01((ps - 0.84) / 0.16)));

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="mh-wrap" ref={wrapRef}>
      <div className="mh-sticky">
        <video
          className="mh-video"
          ref={videoRef}
          src="/hero-scrub.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mh-final" ref={finalRef} src="/hero-admin.png" alt="" aria-hidden />
        <span className="mh-edge left" aria-hidden />
        <span className="mh-edge right" aria-hidden />
        <div className="mh-dim" ref={dimRef} aria-hidden />
        <div className={`mh-content ${loaded ? "mh-in" : ""}`} ref={contentRef}>
          <span className="mh-blur" aria-hidden />
          <h1 className="display mh-stagger">The ledger moves from the savings box to the core.</h1>
          <p className="mh-sub mh-stagger">
            The Ethio SACCO Platform digitizes Ethiopia&apos;s savings and credit cooperatives
            end to end — one audit-grade core for membership, savings, loans, shares and payments.
          </p>
        </div>
      </div>
    </section>
  );
}
