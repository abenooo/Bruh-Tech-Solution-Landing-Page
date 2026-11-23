import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { ServiceDetailView } from "@/components/service-detail-view";

/*
 * Service detail page — server entry with generateStaticParams and generateMetadata,
 * delegating to client ServiceDetailView for full localization and theme support.
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
    <ServiceDetailView
      slug={s.slug}
      prevSlug={prev.slug}
      nextSlug={next.slug}
    />
  );
}
