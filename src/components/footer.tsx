"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg)] transition-colors">
      <div className="max-w-[1240px] mx-auto rounded-[2rem] sm:rounded-[2.75rem] p-8 sm:p-12 md:p-16 relative overflow-hidden bg-gradient-to-br from-[#1C1517] via-[#17161A] to-[#131915] text-white border border-white/10 shadow-2xl">
        {/* Subtle warm atmospheric glow in the top right corner matching reference */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(168,127,36,0.45) 0%, rgba(201,96,59,0.2) 50%, transparent 75%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Brand, Tagline, Bio, Copyright */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand Logo & Name */}
              <Link href="/" className="inline-flex items-center gap-3.5 group">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--terra)] p-2 flex items-center justify-center text-[#16211C] shadow-md group-hover:scale-105 transition-transform">
                  <svg width="22" height="22" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="14" y="14" width="30" height="30" rx="9" />
                    <rect x="54" y="24" width="32" height="32" rx="10" />
                    <rect x="24" y="56" width="30" height="30" rx="9" />
                    <path
                      d="M40 36 L58 44 M46 54 L58 48 M46 66 L60 54"
                      stroke="currentColor"
                      strokeWidth="7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#F6EFE3] block leading-none">
                    BRUH TECH
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.24em] text-[var(--gold)] uppercase block mt-1">
                    SOLUTION TECHNOLOGY
                  </span>
                </div>
              </Link>

              {/* Tagline */}
              <p className="mt-6 text-sm font-medium text-white/90">
                {t.footer.tagline}
              </p>

              {/* Company Bio */}
              <p className="mt-4 text-xs sm:text-sm text-white/65 leading-relaxed max-w-sm">
                {t.footer.bio}
              </p>
            </div>

            {/* Copyright */}
            <div className="pt-4 sm:pt-8 text-[11px] sm:text-xs text-white/40">
              © 2026 {t.footer.rights}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wide">
              {t.footer.home}
            </h4>
            <nav className="space-y-3 flex flex-col" aria-label="Footer navigation">
              <a
                href="#products"
                className="text-xs sm:text-sm text-white/60 hover:text-[var(--gold)] transition-colors"
              >
                {t.footer.products}
              </a>
              <a
                href="#platform"
                className="text-xs sm:text-sm text-white/60 hover:text-[var(--gold)] transition-colors"
              >
                {t.footer.platform}
              </a>
              <a
                href="#modules"
                className="text-xs sm:text-sm text-white/60 hover:text-[var(--gold)] transition-colors"
              >
                {t.footer.modules}
              </a>
              <a
                href="#process"
                className="text-xs sm:text-sm text-white/60 hover:text-[var(--gold)] transition-colors"
              >
                {t.footer.process}
              </a>
              <a
                href="#team"
                className="text-xs sm:text-sm text-white/60 hover:text-[var(--gold)] transition-colors"
              >
                {t.footer.aboutUs}
              </a>
            </nav>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="md:col-span-4 space-y-6">
            {/* Call Center */}
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide mb-2.5">
                {t.footer.callCenter}
              </h4>
              <div className="space-y-1 text-xs sm:text-sm font-mono text-white/70">
                <a
                  href={`tel:${t.footer.phone1.replace(/\s+/g, "")}`}
                  className="block hover:text-[var(--gold)] transition-colors"
                >
                  {t.footer.phone1}
                </a>
                <a
                  href={`tel:${t.footer.phone2.replace(/\s+/g, "")}`}
                  className="block hover:text-[var(--gold)] transition-colors"
                >
                  {t.footer.phone3}
                </a>
                <a
                  href={`tel:${t.footer.phone3.replace(/\s+/g, "")}`}
                  className="block hover:text-[var(--gold)] transition-colors"
                >
                  {t.footer.phone3}
                </a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide mb-2.5">
                {t.footer.locationTitle}
              </h4>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xs">
                {t.footer.address}
              </p>
            </div>
          </div>

          {/* Column 4: Social Icon Buttons */}
          <div className="md:col-span-1 flex md:flex-col items-center justify-start gap-3.5 pt-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/5"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37z" />
              </svg>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/5"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
              </svg>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/5"
              aria-label="X (formerly Twitter)"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/5"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

