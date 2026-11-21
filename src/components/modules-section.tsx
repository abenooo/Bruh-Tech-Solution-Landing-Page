"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion";
import { services } from "@/lib/services";
import { useLanguage } from "@/lib/i18n";

export function ModulesSection() {
  const { t } = useLanguage();

  return (
    <section id="modules" style={{ padding: "10vh 0 6vh" }}>
      <div className="container">
        <Reveal className="svc-head" as="div">
          <div>
            <div className="eyebrow">{t.modules.eyebrow}</div>
            <h2 className="display" style={{ fontSize: "clamp(2.5rem, 7.5vw, 7rem)", margin: "20px 0 0" }}>
              {t.modules.title}
            </h2>
          </div>
          <a className="svc-btn" href="#contact">{t.modules.requestDemo}</a>
        </Reveal>
      </div>
      <Reveal as="div">
        <ul className="svc-list">
          {services.map((m) => (
            <li key={m.slug}>
              <Link className="svc-row" href={`/services/${m.slug}`}>
                <span className="left">
                  <span className="no">{m.no}</span>
                  <span className="t">{m.title}</span>
                </span>
                <span className="right">
                  <span className="d">{m.summary} <strong>→ {t.modules.viewDetails}</strong></span>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
