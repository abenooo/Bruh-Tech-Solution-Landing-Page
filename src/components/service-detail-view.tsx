"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { SmoothScroll, Reveal } from "@/components/motion";
import { ServiceGallery } from "@/components/service-gallery";
import { useLanguage } from "@/lib/i18n";
import { getLocalizedService } from "@/lib/i18n-modules";

interface ServiceDetailViewProps {
  slug: string;
  prevSlug: string;
  nextSlug: string;
}

export function ServiceDetailView({ slug, prevSlug, nextSlug }: ServiceDetailViewProps) {
  const { t, language } = useLanguage();

  const current = getLocalizedService(slug, language);
  const prev = getLocalizedService(prevSlug, language);
  const next = getLocalizedService(nextSlug, language);

  return (
    <>
      <SmoothScroll />
      <Navbar />

      <main className="sd container">
        <Reveal>
          <Link className="sd-back" href="/#modules">
            ← {t.serviceDetail.backToModules}
          </Link>
          <div className="sd-head">
            <div>
              <div className="eyebrow">( {t.serviceDetail.moduleLabel} {current.no} / 15 )</div>
              <h1 className="display">{current.title}</h1>
              <p className="sd-summary">{current.summary}</p>
            </div>
          </div>
        </Reveal>

        <div className="sd-grid">
          <div className="sd-main">
            <Reveal as="div">
              <ServiceGallery slug={current.slug} title={current.title} />
            </Reveal>

            <Reveal as="div">
              <p className="sd-intro">{current.intro}</p>
            </Reveal>

            <Reveal as="div">
              <h2 className="sd-sub">{t.serviceDetail.keyFeatures}</h2>
              <ul className="sd-tags">
                {current.features.map((f) => (
                  <li key={f} className="sd-tag">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="div" className="sd-nav">
              <Link href={`/services/${prev.slug}`} className="sd-nav-card">
                <span>← {t.serviceDetail.previous}</span>
                <b>{prev.title}</b>
              </Link>
              <Link href={`/services/${next.slug}`} className="sd-nav-card sd-nav-next">
                <span>{t.serviceDetail.next} →</span>
                <b>{next.title}</b>
              </Link>
            </Reveal>
          </div>

          <aside className="sd-side">
            <Reveal as="div" className="sd-card">
              <span className="sd-card-no">{current.no}</span>
              <h3>{t.serviceDetail.atAGlance}</h3>
              <dl>
                <div>
                  <dt>{t.serviceDetail.moduleLabel}</dt>
                  <dd>{current.no} {t.serviceDetail.of15}</dd>
                </div>
                <div>
                  <dt>{t.serviceDetail.capabilitiesLabel}</dt>
                  <dd>{current.features.length} {t.serviceDetail.featuresCount}</dd>
                </div>
                <div>
                  <dt>{t.serviceDetail.partOfLabel}</dt>
                  <dd>{t.serviceDetail.partOfValue}</dd>
                </div>
                <div>
                  <dt>{t.serviceDetail.channelsLabel}</dt>
                  <dd>{t.serviceDetail.channelsValue}</dd>
                </div>
              </dl>
              <Link className="btn btn-gold sd-cta" href="/#contact">
                {t.serviceDetail.requestDemo}
              </Link>
              <Link className="sd-all" href="/#modules">
                {t.serviceDetail.browseAll}
              </Link>
            </Reveal>
          </aside>
        </div>
      </main>

      <footer className="rule-t">
        <div className="container sd-footer">
          <span>© 2026 {t.serviceDetail.footerCopyright}</span>
          <span className="sd-footer-links">
            <Link href="/#modules">{t.nav.modules}</Link>
            <Link href="/#platform">{t.nav.platform}</Link>
            <a href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
          </span>
        </div>
      </footer>
    </>
  );
}
