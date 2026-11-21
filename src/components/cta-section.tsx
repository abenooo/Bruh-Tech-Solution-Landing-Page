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
          <h2 className="display" style={{ fontSize: "clamp(36px, 6.6vw, 84px)", margin: "20px auto 18px", maxWidth: 900 }}>
            {t.contact.title}
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.65 }}>
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
