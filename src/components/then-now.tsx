"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion";
import { useLanguage } from "@/lib/i18n";

/*
 * Then / Now split: the old way of gathering and paying on the left
 * (the paper-era village scene), the modern way on the right (video),
 * with a gold arrow bridging the two.
 */

export function ThenNow() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
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
          <div className="eyebrow">{t.thenNow.eyebrow}</div>
          <h2 className="display" style={{ fontSize: "clamp(28px, 4.2vw, 50px)", maxWidth: 760, margin: "18px 0 0" }}>
            {t.thenNow.title}
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: 560, lineHeight: 1.65, margin: "16px 0 0" }}>
            {t.thenNow.desc}
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
            aria-label={t.thenNow.modernAria}
          />
          <span className="tn-label">( {t.thenNow.newTag} )</span>
          <div className="tn-chips">
            {t.thenNow.newChips.map((chip, idx) => (
              <span key={idx} className="tn-chip">{chip}</span>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" className="tn-card tn-old">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/then-old.webp" alt={t.thenNow.tradAlt} />
          <span className="tn-label">( {t.thenNow.oldTag} )</span>
          <div className="tn-chips">
            {t.thenNow.oldChips.map((chip, idx) => (
              <span key={idx} className="tn-chip">{chip}</span>
            ))}
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
