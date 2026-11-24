"use client";

import { Reveal } from "@/components/motion";
import { useLanguage } from "@/lib/i18n";

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="rule-t" id="contact" style={{ padding: "12vh 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <Reveal>
          <div className="eyebrow">{t.contact.eyebrow}</div>
          <h2 className="display" style={{ fontSize: "clamp(2.25rem, 1.85rem + 2vw, 3.5rem)", lineHeight: 1.15, margin: "18px auto 16px", maxWidth: 860 }}>
            {t.contact.title}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)", maxWidth: 540, margin: "0 auto 32px", lineHeight: 1.65 }}>
            {t.contact.desc}
          </p>
          <a className="btn btn-gold" href={`mailto:${t.contact.email}`}>
            {t.contact.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
