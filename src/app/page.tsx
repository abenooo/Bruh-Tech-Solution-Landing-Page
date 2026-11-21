import { SmoothScroll } from "@/components/motion";
import { LetsBuild } from "@/components/lets-build";
import { Navbar } from "@/components/navbar";
import { MercuryHero } from "@/components/mercury-hero";
import { MoneyAll } from "@/components/money-all";
import { AppShots } from "@/components/app-shots";
import { TeamTiles } from "@/components/data-sections";
import { TeamsTabs } from "@/components/teams-tabs";
import { ProcessTimeline } from "@/components/process-timeline";
import { TeamSection } from "@/components/team-section";
import { ThenNow } from "@/components/then-now";
import { Products } from "@/components/products";
import { ModulesSection } from "@/components/modules-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />

      {/* nav — floating pill with language switcher */}
      <Navbar />

      {/* hero — scroll-scrubbed video scene */}
      <MercuryHero />

      {/* 4-step fintech delivery process */}
      <ProcessTimeline />

      {/* everything you do with money — pinned dark section */}
      <MoneyAll />

      {/* let's build — pinned shatter scene */}
      <LetsBuild />

      {/* three products — core, mobile, USSD */}
      <Products />

      {/* modules — full-stack digital growth */}
      <ModulesSection />

      {/* the member app — screen-by-screen demo */}
      <AppShots />

      {/* data sections (Selene-style) */}
      <TeamTiles />

      {/* audience tabs (Nexura-style) */}
      <TeamsTabs />

      {/* meet the experts team carousel */}
      <TeamSection />

      {/* then / now — the old way vs the modern way */}
      <ThenNow />

      {/* CTA */}
      <CtaSection />

      {/* footer */}
      <Footer />
    </>
  );
}
