"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage, LANGUAGES, Language } from "@/lib/i18n";

/*
 * Floating pill navbar: fixed, centered and always solid white with a
 * frosted blur. Slides down on load. Collapses to a burger menu on mobile.
 * Includes interactive language switcher supporting English, Amharic,
 * Afaan Oromoo, Somali, and Tigrinya.
 */

const Arrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export function Navbar() {
  const { t, language, setLanguage, currentLanguageInfo } = useLanguage();
  const [open, setOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  /* Updated navbar items matching page sections */
  const links = [
    { label: t.nav.process, href: "/#process" },
    { label: t.nav.platform, href: "/#platform" },
    { label: t.nav.products, href: "/#products" },
    { label: t.nav.modules, href: "/#modules" },
    { label: t.nav.app, href: "/#app" },
    { label: t.nav.team, href: "/#team" },
    { label: t.nav.impact, href: "/#then-now" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  const sectionIds = links.map((l) => l.href.split("#")[1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Close language dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    if (langMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langMenuOpen]);

  /* scrollspy — highlight the link whose section sits under the viewport center */
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.45;
      let cur: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) { cur = id; break; }
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return (
    <header className="nb-fix">
      <nav className={`nb nb-solid ${mounted ? "nb-in" : ""}`}>
        <a className="nb-logo" href="/" aria-label={`${t.nav.brand} home`}>
          <span className="nb-mark" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 100 100" fill="currentColor">
              <rect x="14" y="14" width="30" height="30" rx="9" />
              <rect x="54" y="24" width="32" height="32" rx="10" />
              <rect x="24" y="56" width="30" height="30" rx="9" />
              <path d="M40 36 L58 44 M46 54 L58 48 M46 66 L60 54" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" />
            </svg>
          </span>
          <span className="nb-name">{t.nav.brand}</span>
        </a>

        <div className="nb-links">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href.split("#")[1] ? "on" : undefined}
              aria-current={active === l.href.split("#")[1] ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="nb-right">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setLangMenuOpen((prev) => !prev)}
              className="flex items-center gap-1.5 h-11 px-3 rounded-full border border-[rgba(27,36,31,0.2)] dark:border-[rgba(246,239,227,0.25)] text-[#1B241F] dark:text-[#F6EFE3] hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs font-semibold cursor-pointer"
              aria-label="Select language"
              aria-expanded={langMenuOpen}
            >
              <GlobeIcon />
              <span>{currentLanguageInfo.shortLabel}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-200 ${langMenuOpen ? "rotate-180" : ""}`}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 top-13 mt-1 w-48 py-1.5 bg-white dark:bg-[#141618] rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 z-50 overflow-hidden backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-white/5">
                  Languages / ቋንቋዎች
                </div>
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                      language === item.code
                        ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className="flex flex-col">
                      <span className="font-medium">{item.nativeName}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">{item.name}</span>
                    </span>
                    {language === item.code && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ThemeToggle />

          <a className="nb-cta" href="/#contact">
            <span>{t.nav.requestDemo}</span>
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

      {/* Mobile drawer */}
      <div className={`nb-menu ${open ? "open" : ""}`}>
        {/* Mobile language bar */}
        <div className="flex items-center gap-1.5 p-2 mb-2 bg-black/5 dark:bg-white/5 rounded-xl overflow-x-auto">
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              onClick={() => setLanguage(item.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                language === item.code
                  ? "bg-amber-500 text-black font-bold shadow-sm"
                  : "text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              {item.nativeName}
            </button>
          ))}
        </div>

        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a className="nb-cta nb-cta-menu" href="/#contact" onClick={() => setOpen(false)}>
          <span>{t.nav.requestDemo}</span>
          <Arrow />
        </a>
      </div>
    </header>
  );
}
