"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

/*
 * Floating pill navbar: fixed, centered and always solid white with a
 * frosted blur. Slides down on load. Collapses to a burger menu on mobile.
 */

const links = [
  { label: "Process", href: "#process" },
  { label: "Platform", href: "#platform" },
  { label: "Products", href: "#products" },
  { label: "Modules", href: "#modules" },
  { label: "App", href: "#app" },
  { label: "Then & now", href: "#then-now" },
];

const Arrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="nb-fix">
      <nav className={`nb nb-solid ${mounted ? "nb-in" : ""}`}>
        <a className="nb-logo" href="/" aria-label="Bruh Tech Solution home">
          <span className="nb-mark" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 100 100" fill="currentColor">
              <rect x="14" y="14" width="30" height="30" rx="9" />
              <rect x="54" y="24" width="32" height="32" rx="10" />
              <rect x="24" y="56" width="30" height="30" rx="9" />
              <path d="M40 36 L58 44 M46 54 L58 48 M46 66 L60 54" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" />
            </svg>
          </span>
          <span className="nb-name">Bruh Tech</span>
        </a>

        <div className="nb-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>

        <div className="nb-right">
          <ThemeToggle />
          <a className="nb-cta" href="#contact">
            <span>Request a demo</span>
            <Arrow />
          </a>
          <button className="nb-burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {open ? (
                <>
                  <path d="M6 6 18 18" />
                  <path d="M18 6 6 18" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div className={`nb-menu ${open ? "open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a className="nb-cta nb-cta-menu" href="#contact" onClick={() => setOpen(false)}>
          <span>Request a demo</span>
          <Arrow />
        </a>
      </div>
    </header>
  );
}
