"use client";

import { useEffect, useState } from "react";

/*
 * Telegram-style theme switch: toggling sweeps a circle out from the button
 * (top-right) across the page to the bottom-left, revealing the other theme.
 * Uses the View Transitions API where available; falls back to an instant
 * swap elsewhere. Preference persists in localStorage ("theme").
 */

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !dark;
    const apply = () => {
      document.documentElement.classList.toggle("dark", next);
      try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
      setDark(next);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    type DocVT = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    const doc = document as DocVT;
    if (reduce || !doc.startViewTransition) {
      apply();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const vt = doc.startViewTransition(apply);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.22, 0.61, 0.21, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(() => {});
  };

  return (
    <button className="nb-theme" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={toggle}>
      {dark ? (
        /* sun */
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        /* moon */
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
