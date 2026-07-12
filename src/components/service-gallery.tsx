"use client";

import { useState } from "react";

/*
 * Screenshot gallery for a service detail page. Looks for images at
 * public/service-shots/{slug}-1.png and {slug}-2.png — drop files there and
 * they appear automatically; missing slots show a labeled placeholder.
 */

function Frame({ src, label, slug, n }: { src: string; label: string; slug: string; n: number }) {
  const [missing, setMissing] = useState(false);
  return (
    <figure className="sg-frame">
      <span className="sg-bar" aria-hidden><i /><i /><i /></span>
      {missing ? (
        <div className="sg-slot">
          <b>{label}</b>
          <span>Drop a screenshot at<br /><code>public/service-shots/{slug}-{n}.png</code></span>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={src} alt={label} onError={() => setMissing(true)} />
      )}
    </figure>
  );
}

export function ServiceGallery({ slug, title }: { slug: string; title: string }) {
  return (
    <div className="sg">
      <Frame src={`/service-shots/${slug}-1.png`} label={`${title} — overview`} slug={slug} n={1} />
      <Frame src={`/service-shots/${slug}-2.png`} label={`${title} — in action`} slug={slug} n={2} />
    </div>
  );
}
