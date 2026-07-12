"use client";

import { useState } from "react";

/*
 * Detail-page gallery: one large featured image with a grid of thumbnails
 * beside it — clicking a thumbnail features it. Each slot looks for a real
 * screenshot at public/service-shots/{slug}-{n}.png first and falls back to
 * the shared Unsplash placeholder (placeholder-{n}.jpg) until one exists.
 */

const SLOTS = [1, 2, 3, 4];

export function ServiceGallery({ slug, title }: { slug: string; title: string }) {
  const [active, setActive] = useState(0);
  const [srcs, setSrcs] = useState<string[]>(
    SLOTS.map((n) => `/service-shots/${slug}-${n}.png`)
  );

  const fallback = (i: number) =>
    setSrcs((prev) => {
      const ph = `/service-shots/placeholder-${SLOTS[i]}.jpg`;
      if (prev[i] === ph) return prev;
      const next = [...prev];
      next[i] = ph;
      return next;
    });

  return (
    <div>
      <div className="sg">
        <div className="sg-main">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={srcs[active]}
            src={srcs[active]}
            alt={`${title} — screenshot ${active + 1}`}
            onError={() => fallback(active)}
          />
        </div>
        <div className="sg-thumbs">
          {SLOTS.map((n, i) => (
            <button
              key={n}
              className={`sg-thumb ${i === active ? "on" : ""}`}
              aria-label={`Show screenshot ${n}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={srcs[i]} alt="" onError={() => fallback(i)} />
            </button>
          ))}
        </div>
      </div>
      <p className="sg-note">
        Placeholder imagery — replace with product screenshots at{" "}
        <code>public/service-shots/{slug}-1.png … {slug}-4.png</code>
      </p>
    </div>
  );
}
