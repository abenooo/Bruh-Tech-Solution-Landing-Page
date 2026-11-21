"use client";

import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="rule-t">
      <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", padding: "34px 24px", fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)" }}>
        <span>© 2026 {t.footer.rights} — {t.footer.loc}</span>
        <span style={{ display: "flex", gap: 22 }}>
          <a href="#modules">{t.nav.modules}</a>
          <a href="#platform">{t.nav.platform}</a>
          <a href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
        </span>
      </div>
    </footer>
  );
}
