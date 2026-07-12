import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { Navbar } from "@/components/navbar";
import { SmoothScroll, Reveal } from "@/components/motion";
import { ServiceGallery } from "@/components/service-gallery";

/*
 * Service detail page — listing-style layout: back link, title header with
 * tag chips, description + key-feature tags in the main column, and a
 * sticky at-a-glance card with the CTA in the sidebar.
 */

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: `${s.title} — Bruh Tech Solution`,
    description: s.summary,
  };
}

export default async function ServicePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const i = services.indexOf(s);
  const prev = services[(i - 1 + services.length) % services.length];
  const next = services[(i + 1) % services.length];

  return (
    <>
      <SmoothScroll />
      <Navbar />

      <main className="sd container">
        <Reveal>
          <Link className="sd-back" href="/#modules">← All modules</Link>
          <div className="sd-head">
            <div>
              <div className="eyebrow">( Module {s.no} / 15 )</div>
              <h1 className="display">{s.title}</h1>
              <p className="sd-summary">{s.summary}</p>
            </div>
          </div>
        </Reveal>

        <div className="sd-grid">
          <div className="sd-main">
            <Reveal as="div">
              <ServiceGallery slug={s.slug} title={s.title} />
            </Reveal>

            <Reveal as="div">
              <p className="sd-intro">{s.intro}</p>
            </Reveal>

            <Reveal as="div">
              <h2 className="sd-sub">Key features</h2>
              <ul className="sd-tags">
                {s.features.map((f) => (
                  <li key={f} className="sd-tag">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="div" className="sd-nav">
              <Link href={`/services/${prev.slug}`} className="sd-nav-card">
                <span>← Previous</span>
                <b>{prev.title}</b>
              </Link>
              <Link href={`/services/${next.slug}`} className="sd-nav-card sd-nav-next">
                <span>Next →</span>
                <b>{next.title}</b>
              </Link>
            </Reveal>
          </div>

          <aside className="sd-side">
            <Reveal as="div" className="sd-card">
              <span className="sd-card-no">{s.no}</span>
              <h3>At a glance</h3>
              <dl>
                <div><dt>Module</dt><dd>{s.no} of 15</dd></div>
                <div><dt>Capabilities</dt><dd>{s.features.length} features</dd></div>
                <div><dt>Part of</dt><dd>Ethio SACCO core</dd></div>
                <div><dt>Channels</dt><dd>Web · Mobile · USSD</dd></div>
              </dl>
              <a className="btn btn-gold sd-cta" href="/#contact">Request a demo</a>
              <Link className="sd-all" href="/#modules">Browse all modules</Link>
            </Reveal>
          </aside>
        </div>
      </main>

      <footer className="rule-t">
        <div className="container sd-footer">
          <span>© 2026 Bruh Tech Solution — Addis Ababa, Ethiopia</span>
          <span className="sd-footer-links">
            <Link href="/#modules">Modules</Link>
            <Link href="/#platform">Platform</Link>
            <a href="mailto:hello@bruhtech.example">hello@bruhtech.example</a>
          </span>
        </div>
      </footer>
    </>
  );
}
