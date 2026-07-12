"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion";
import { FlowCore } from "@/components/flow-mocks";

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
  return (
    <div className="phone pr-phone" aria-hidden>
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="app-track pr-cascade">
          <div className="app-head" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="hello">Selam, Meseret 👋</span><span className="bell" />
          </div>
          <div className="app-balance" style={{ "--i": 1 } as React.CSSProperties}>
            <span>Total savings</span>
            <b>ETB 12,480.50</b>
            <i>Passbook SV-1180 · Updated just now</i>
          </div>
          <div className="app-actions" style={{ "--i": 2 } as React.CSSProperties}>
            {["Deposit", "Withdraw", "Loan", "Shares"].map((a) => (
              <span key={a}><em /> {a}</span>
            ))}
          </div>
          <div className="app-goal" style={{ "--i": 3 } as React.CSSProperties}>
            <div className="g-top"><span>Ox-fattening goal</span><b>80%</b></div>
            <div className="g-bar"><i style={{ width: "80%" }} /></div>
          </div>
          <div className="app-list" style={{ "--i": 4 } as React.CSSProperties}>
            {[["Deposit — Telebirr", "+ 500.00"], ["Loan repayment", "− 850.00"]].map(([t, v], j) => (
              <div key={t} className="a-row" style={{ "--i": 5 + j } as React.CSSProperties}>
                <span>{t}</span><b className={v.startsWith("+") ? "pos" : ""}>{v}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UssdVisual() {
  return (
    <div className="phone pr-phone" aria-hidden>
      <div className="phone-notch" />
      <div className="phone-screen ussd">
        <div className="ussd-head">*889# · Ethio SACCO</div>
        {["1. Balance inquiry", "2. Deposit (Telebirr)", "3. Withdraw", "4. Transfer to member", "5. Loan status", "6. Buy shares", "7. Mini statement", "0. Help"].map((l, i) => (
          <div key={l} className="ussd-line" style={{ "--i": i } as React.CSSProperties}>{l}</div>
        ))}
        <div className="ussd-reply">Reply: 1<i className="caret" /></div>
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
  const [active, setActive] = useState(0);
  const hoverRef = useRef(false);

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
        <div className="eyebrow">( Our products )</div>
        <h2 className="display">One core. Three ways in.</h2>
        <p>Web administration for the office, a mobile app for smartphones, and USSD for every other phone — the same ledger behind all three.</p>
      </Reveal>

      <div className="pr-stage container">
        {products.map((p, i) => (
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
        {products.map((p, i) => (
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
