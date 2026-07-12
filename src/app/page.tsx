import { SmoothScroll, Reveal } from "@/components/motion";
import { LetsBuild } from "@/components/lets-build";
import { Navbar } from "@/components/navbar";
import { MercuryHero } from "@/components/mercury-hero";
import { MoneyAll } from "@/components/money-all";
import { ProductPhone } from "@/components/product-phone";
import { TeamTiles } from "@/components/data-sections";
import { TeamsTabs } from "@/components/teams-tabs";
import { ProcessSteps } from "@/components/process-steps";
import { ThenNow } from "@/components/then-now";
import { Products } from "@/components/products";

const modules = [
  { icon: "👥", t: "Member Management", d: "Member registration, KYC, profiles, beneficiary management, lifecycle management." },
  { icon: "💰", t: "Savings Management", d: "Savings products, deposits, withdrawals, interest calculation, passbook management." },
  { icon: "🏦", t: "Loan Management", d: "Loan applications, approvals, disbursement, repayment, restructuring, collections." },
  { icon: "📈", t: "Share Management", d: "Share purchase, transfer, redemption, member equity tracking." },
  { icon: "🎁", t: "Dividend Management", d: "Dividend calculation, approval, allocation, and distribution to members." },
  { icon: "📒", t: "Accounting Engine", d: "Double-entry accounting, general ledger, journal entries, and financial postings." },
  { icon: "📊", t: "Financial Reporting", d: "Financial statements, operational reports, dashboards, and analytics." },
  { icon: "✅", t: "Approval Workflow Engine", d: "Configurable multi-level approvals for financial and administrative operations." },
  { icon: "🌐", t: "Integration Layer", d: "APIs for core banking, mobile money, payment gateways, SMS, email, and third-party services." },
  { icon: "🏢", t: "Branch Management", d: "Multi-branch operations, branch performance, users, and cash management." },
  { icon: "👨\u200D💼", t: "Human Resource Management", d: "Staff management, roles, attendance, payroll, and performance tracking." },
  { icon: "🔐", t: "Security & Access Control", d: "Authentication, authorization, MFA, permissions, and role-based access control." },
  { icon: "📜", t: "Audit & Compliance", d: "Audit logs, compliance monitoring, regulatory reporting, and risk management." },
  { icon: "⚙\uFE0F", t: "System Administration", d: "Configuration, product setup, parameters, notifications, backups, and maintenance." },
  { icon: "📱", t: "Digital Channels", d: "Mobile app, web portal, USSD, agent banking, self-service, and customer engagement." },
];


export default function Home() {
  return (
    <>
      <SmoothScroll />

      {/* nav — floating pill */}
      <Navbar />

      {/* hero — scroll-scrubbed video scene */}
      <MercuryHero />

      {/* 5-step delivery process (Precept-style) */}
      <ProcessSteps />

      {/* everything you do with money — pinned dark section */}
      <MoneyAll />

      {/* let's build — pinned shatter scene */}
      <LetsBuild />

      {/* three products — core, mobile, USSD */}
      <Products />

      {/* modules — full-stack digital growth */}
      <section id="modules" style={{ padding: "10vh 0 6vh" }}>
        <div className="container">
          <Reveal className="svc-head" as="div">
            <div>
              <div className="eyebrow">( Our SACCO Platform )</div>
              <h2 className="display" style={{ fontSize: "clamp(2.5rem, 7.5vw, 7rem)", margin: "20px 0 0" }}>
                Every SACCO module,<br />one core
              </h2>
            </div>
            <a className="svc-btn" href="#contact">Request a demo</a>
          </Reveal>
        </div>
        <Reveal as="div">
          <ul className="svc-list">
            {modules.map((m, index) => (
              <li key={m.t}>
                <a className="svc-row" href="#contact">
                  <span className="left">
                    <span className="no">{String(index + 1).padStart(2, '0')}</span>
                    <span className="t">{m.t}</span>
                  </span>
                  <span className="right">
                    <span className="d">{m.d} <strong>→ View Details</strong></span>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* the mobile app — story, live mock, and screenshot demo in one place */}
      <ProductPhone />

      {/* data sections (Selene-style) */}
      <TeamTiles />

      {/* audience tabs (Nexura-style) */}
      <TeamsTabs />


      {/* then / now — the old way vs the modern way */}
      <ThenNow />

      {/* CTA */}
      <section className="rule-t" id="contact" style={{ padding: "12vh 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="eyebrow">Start the conversation</div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 6.6vw, 84px)", margin: "20px auto 18px", maxWidth: 900 }}>
              Digitize your SACCO.
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.65 }}>
              A working platform, a written specification, and a team in Addis Ababa that answers the phone.
              Bring your hardest question.
            </p>
            <a className="btn btn-gold" href="mailto:hello@bruhtech.example">Request a demo</a>
          </Reveal>
        </div>
      </section>

      {/* footer */}
      <footer className="rule-t">
        <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", padding: "34px 24px", fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)" }}>
          <span>© 2026 Bruh Tech Solution — Addis Ababa, Ethiopia</span>
          <span style={{ display: "flex", gap: 22 }}>
            <a href="#modules">Modules</a>
            <a href="#platform">Platform</a>
            <a href="mailto:hello@bruhtech.example">hello@bruhtech.example</a>
          </span>
        </div>
      </footer>
    </>
  );
}
