"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion";

/*
 * Then / Now split: the old way of gathering and paying on the left
 * (the paper-era village scene), the modern way on the right (video),
 * with a gold arrow bridging the two.
 */

export function ThenNow() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    /* React doesn't always render the muted attribute — set it directly so autoplay is allowed */
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, []);

  return (
    <section className="tn" id="then-now">
      <div className="container">
        <Reveal>
          <div className="eyebrow">( Then → Now )</div>
          <h2 className="display" style={{ fontSize: "clamp(28px, 4.2vw, 50px)", maxWidth: 760, margin: "18px 0 0" }}>
            The gathering is the same. The ledger isn&apos;t.
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: 560, lineHeight: 1.65, margin: "16px 0 0" }}>
            For generations, members met under the tree, paid in cash, and trusted a locked box and
            a paper book. The meeting stays. The box becomes a core.
          </p>
        </Reveal>
      </div>

      <div className="tn-grid">
        <Reveal as="div" className="tn-card tn-new">
          <video
            ref={videoRef}
            src="/modern-way.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="The modern way — paying digitally through the SACCO platform"
          />
          <span className="tn-label">( The modern way )</span>
          <div className="tn-chips">
            <span className="tn-chip">Telebirr deposit in seconds</span>
            <span className="tn-chip">Posted once, visible everywhere</span>
            <span className="tn-chip">Reconciled to the birr, live</span>
          </div>
        </Reveal>

        <Reveal as="div" className="tn-card tn-old">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/then-old.webp" alt="Isometric village scene — the paper-era cooperative" />
          <span className="tn-label">( The old way )</span>
          <div className="tn-chips">
            <span className="tn-chip">Cash in a locked wooden box</span>
            <span className="tn-chip">Paper passbooks, hand totals</span>
            <span className="tn-chip">One meeting a month to reconcile</span>
          </div>
        </Reveal>


        <span className="tn-arrow" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </span>
      </div>
    </section>
  );
}
