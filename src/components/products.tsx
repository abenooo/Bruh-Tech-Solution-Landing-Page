"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion";
import { FlowCore } from "@/components/flow-mocks";
import { useLanguage } from "@/lib/i18n";

/*
 * Three-product carousel (Toggle Pro-style): visual on the left with an
 * ambient glow, copy + module chips on the right, a giant ghost number
 * bottom-right, and bar-style pagination. Auto-advances, pauses on hover,
 * slides crossfade + drift with the site easing.
 */

const products = [
  {
    n: "01",
    tag: "Web / Admin",
    t: "Core SACCO System",
    d: "The web admin console your back office runs on — every ledger, approval and report in one audit-grade core.",
    chips: ["Members & KYC", "Savings & fixed deposits", "Shares & dividends", "Loans, guarantors & approvals", "General ledger & chart of accounts", "Teller, cash & branches", "Financial & regulatory reports", "Audit trail", "Roles & permissions", "Telebirr, M-Pesa & bank integration"],
    more: "40+ modules in the core",
    visual: "core" as const,
  },
  {
    n: "02",
    tag: "Android / iOS",
    t: "Mobile Banking App",
    d: "The member app — save, borrow, transfer and pay from the pocket, synced with the branch the moment it happens.",
    chips: ["Biometric login", "Balances & statements", "Deposit & withdraw", "Money transfer", "Loan application & repayment", "Guarantor requests", "Bills & airtime", "QR payments", "Notifications", "Chat support"],
    more: "30+ features in the app",
    visual: "mobile" as const,
  },
  {
    n: "03",
    tag: "Feature phones",
    t: "USSD Banking",
    d: "Dial *889# — full banking for any phone, no internet, no app. The same core answers every request.",
    chips: ["Register & PIN", "Balance & mini statement", "Deposit & withdraw", "Transfer to member or bank", "Loan apply, status & repay", "Shares & dividends", "Airtime & bills", "Locate branch"],
    more: "Works on any handset",
    visual: "ussd" as const,
  },
];

function MobileVisual() {
  const { t } = useLanguage();
  const m = t.productMocks.mobile;
  return (
    <div className="phone pr-phone" aria-hidden>
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="app-track pr-cascade">
          <div className="app-head" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="hello">{m.greeting}</span><span className="bell" />
          </div>
          <div className="app-balance" style={{ "--i": 1 } as React.CSSProperties}>
            <span>{m.totalSavings}</span>
            <b>ETB 12,480.50</b>
            <i>{m.passbookNotice}</i>
          </div>
          <div className="app-actions" style={{ "--i": 2 } as React.CSSProperties}>
            {m.actions.map((a) => (
              <span key={a}><em /> {a}</span>
            ))}
          </div>
          <div className="app-goal" style={{ "--i": 3 } as React.CSSProperties}>
            <div className="g-top"><span>{m.goalTitle}</span><b>80%</b></div>
            <div className="g-bar"><i style={{ width: "80%" }} /></div>
          </div>
          <div className="app-list" style={{ "--i": 4 } as React.CSSProperties}>
            {[[m.depositItem, "+ 500.00"], [m.loanRepayItem, "− 850.00"]].map(([title, v], j) => (
              <div key={title} className="a-row" style={{ "--i": 5 + j } as React.CSSProperties}>
                <span>{title}</span><b className={v.startsWith("+") ? "pos" : ""}>{v}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UssdVisual() {
  const { t } = useLanguage();
  const u = t.productMocks.ussd;
  return (
    <div className="phone pr-phone" aria-hidden>
      <div className="phone-notch" />
      <div className="phone-screen ussd">
        <div className="ussd-head">{u.head}</div>
        {u.menu.map((l, i) => (
          <div key={l} className="ussd-line" style={{ "--i": i } as React.CSSProperties}>{l}</div>
        ))}
        <div className="ussd-reply">{u.reply}<i className="caret" /></div>
      </div>
    </div>
  );
}

function CoreVisual() {
  return (
    <div className="pr-browser" aria-hidden>
      <FlowCore />
    </div>
  );
}

export function Products() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const hoverRef = useRef(false);

  const localizedProducts = [
    {
      ...products[0],
      tag: t.products.p1.tag,
      t: t.products.p1.title,
      d: t.products.p1.desc,
      more: t.products.p1.more,
      chips: t.products.p1.chips || products[0].chips,
    },
    {
      ...products[1],
      tag: t.products.p2.tag,
      t: t.products.p2.title,
      d: t.products.p2.desc,
      more: t.products.p2.more,
      chips: t.products.p2.chips || products[1].chips,
    },
    {
      ...products[2],
      tag: t.products.p3.tag,
      t: t.products.p3.title,
      d: t.products.p3.desc,
      more: t.products.p3.more,
      chips: t.products.p3.chips || products[2].chips,
    },
  ];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!hoverRef.current) setActive((a) => (a + 1) % products.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="pr"
      id="products"
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; }}
    >
      <Reveal as="div" className="pr-head container">
        <div className="eyebrow">{t.products.eyebrow}</div>
        <h2 className="display">{t.products.title}</h2>
        <p>{t.products.subhead}</p>
      </Reveal>

      <div className="pr-stage container">
        {localizedProducts.map((p, i) => (
          <div key={p.n} className={`pr-slide ${i === active ? "on" : i < active ? "prev" : ""}`} aria-hidden={i !== active}>
            <div className="pr-vis">
              <span className="pr-glow" />
              {p.visual === "core" ? <CoreVisual /> : p.visual === "mobile" ? <MobileVisual /> : <UssdVisual />}
            </div>
            <div className="pr-copy">
              <span className="pr-tag">{p.tag}</span>
              <h3 className="display">{p.t}</h3>
              <p>{p.d}</p>
              <div className="pr-chips">
                {p.chips.map((c) => <span key={c} className="pr-chip">{c}</span>)}
              </div>
              <span className="pr-more">{p.more}</span>
            </div>
            <span className="pr-num" aria-hidden>{p.n}</span>
          </div>
        ))}
      </div>

      <div className="pr-dots" role="tablist" aria-label="Products">
        {localizedProducts.map((p, i) => (
          <button
            key={p.n}
            role="tab"
            aria-selected={i === active}
            aria-label={p.t}
            className={`pr-dot ${i === active ? "on" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}
