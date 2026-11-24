"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore, useCallback, useRef } from "react";

export type Language = "en" | "am" | "om" | "so" | "ti";

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  shortLabel: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: "en", name: "English", nativeName: "English", shortLabel: "EN" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", shortLabel: "አማ" },
  { code: "om", name: "Afan Oromo", nativeName: "Afaan Oromoo", shortLabel: "OM" },
  { code: "so", name: "Somali", nativeName: "Af-Soomaali", shortLabel: "SO" },
  { code: "ti", name: "Tigrinya", nativeName: "ትግርኛ", shortLabel: "ትግ" },
];

export const translations = {
  en: {
    nav: {
      brand: "Bruh Tech Solution",
      process: "Process",
      platform: "Platform",
      products: "Products",
      modules: "Modules",
      app: "App",
      team: "Team",
      impact: "Impact",
      contact: "Contact",
      requestDemo: "Request a Demo",
    },
    hero: {
      headline: "Enterprise SACCO core banking — deployed on local PCs and in the cloud.",
      subhead:
        "Bruh Tech Solution equips Ethiopian savings and credit cooperatives with an audit-grade core banking platform. Installable locally on office PCs for offline branch resilience or deployed in the secure cloud — proven in production by client cooperatives like Maedot SACCO.",
    },
    process: {
      tag: "// Delivery & Deployment //",
      title: "Flexible SACCO deployment: On-premises PC & Cloud.",
      subhead:
        "Bruh Tech Solution deploys a turnkey SACCO fintech platform directly to your local office computers, configured to your cooperative bylaws, with seamless cloud synchronization.",
      steps: [
        {
          id: "01",
          number: "01",
          title: "Local PC & Cloud Setup",
          description:
            "We install the system directly on your SACCO's local branch PCs (with zero external dependencies) or provision a secure cloud instance with PostgreSQL and Redis.",
        },
        {
          id: "02",
          number: "02",
          title: "KYC & Member Registry Setup",
          description:
            "Activate sequential MEM00000001 generation, mandatory 16-digit Fayda national ID validation, heir allocation, and automated savings sub-accounts.",
        },
        {
          id: "03",
          number: "03",
          title: "Savings, Loans & Maker-Checker",
          description:
            "Configure mandatory (MS001) and voluntary (VS001) products, physical asset valuation, and the 3-tier gate: Loan Officer -> Manager -> Finance approval.",
        },
        {
          id: "04",
          number: "04",
          title: "Double-Entry Ledger & Training",
          description:
            "Auto-journalizing chart of accounts (COA), strict accounting period locking, 94+ RBAC permissions, and comprehensive on-site staff training.",
        },
      ],
    },
    platform: {
      title: "Four mission-critical subsystems. Local PC speed & Cloud scale.",
      items: [
        {
          t: "1. Member Management & Fayda KYC",
          d: "Thread-safe sequential MEM ID generation, 16-digit national Fayda validation, heir allocations, and automatic sub-account instantiation upon registry.",
        },
        {
          t: "2. Savings & In-Kind Assets Subsystem",
          d: "Mandatory (MS001) and Voluntary (VS001) savings, idempotent deposit/withdrawal protection, physical asset & gold valuation, and date-range statements.",
        },
        {
          t: "3. Loan Lifecycle & Maker-Checker Gates",
          d: "Enforced 3-tier workflow: Loan Officer -> Manager -> Finance disbursement, dynamic PMT principal/interest calculation, and partial repayment processing.",
        },
        {
          t: "4. Double-Entry Accounting Ledger",
          d: "Automated balanced journal entries across assets, liabilities, and equity, period-closing controls, and real-time regulatory compliance.",
        },
      ],
    },
    letsBuild: {
      left: "Let's",
      right: "build",
      eye: "( The Cooperative Future )",
      hint: "Scroll to assemble",
      subhead:
        "Ready to modernize your cooperative with Bruh Tech Solution? Whether you need a local PC installation or full cloud core, our engineering team in Addis Ababa is standing by.",
      cta: "Schedule a Local / Cloud Walkthrough",
    },
    products: {
      eyebrow: "( Three Products )",
      title: "Three enterprise interfaces. One continuous core ledger.",
      subhead: "An audit-grade SACCO core banking engine with native member apps and universal USSD access.",
      p1: {
        tag: "Local PC / Cloud Core",
        title: "Bruh Tech Core SACCO System",
        desc: "The secure core engine and web management console. Runs natively on branch PCs or hosted on cloud servers. Built with Spring Boot 3.3, Java 21, PostgreSQL 15, and 94+ RBAC permissions.",
        more: "Runs locally on branch PCs & in cloud",
        chips: ["Members & KYC", "Savings & fixed deposits", "Shares & dividends", "Loans, guarantors & approvals", "General ledger & chart of accounts", "Teller, cash & branches", "Financial & regulatory reports", "Audit trail", "Roles & permissions", "Telebirr, M-Pesa & bank integration"],
      },
      p2: {
        tag: "Android / iOS",
        title: "Member Mobile Banking App",
        desc: "Native member experience — check voluntary/mandatory balances, apply for loans, track guarantor status, and download statements in 5 languages.",
        more: "Available in 5 Ethiopian languages",
        chips: ["Biometric login", "Balances & statements", "Deposit & withdraw", "Money transfer", "Loan application & repayment", "Guarantor requests", "Bills & airtime", "QR payments", "Notifications", "Chat support"],
      },
      p3: {
        tag: "Feature Phones & Offline",
        title: "USSD Banking (*889#)",
        desc: "Universal banking on feature phones without internet. Access deposits, loan status, balances, and CBE/Telebirr transfers on any handset.",
        more: "Zero-data universal access",
        chips: ["Register & PIN", "Balance & mini statement", "Deposit & withdraw", "Transfer to member or bank", "Loan apply, status & repay", "Shares & dividends", "Airtime & bills", "Locate branch"],
      },
    },
    modules: {
      eyebrow: "( Bruh Tech Platform )",
      title: "Every SACCO module, engineered for PC & Cloud",
      requestDemo: "Schedule a Demo",
      viewDetails: "View Architecture",
    },
    appShots: {
      eyebrow: "Member Experience",
      title: "Enterprise cooperative banking in every member's hand.",
      s1: {
        t: "Real-time member dashboard",
        d: "Instant visibility of mandatory savings (MS001), voluntary savings (VS001), share capital holdings, and recent ledger activities.",
      },
      s2: {
        t: "Fayda KYC & membership profile",
        d: "Verified 16-digit Fayda profile, digital cooperative identity card, designated heirs, and official cooperative membership credentials.",
      },
      s3: {
        t: "Maker-checker loan status tracker",
        d: "Real-time transparency through Loan Officer review, Manager endorsement, and Finance disbursement approval gates.",
      },
      s4: {
        t: "Dynamic PMT loan amortization calculator",
        d: "Interactive calculator computing monthly PMT, principal breakdown, interest rates, and transparent repayment installment schedules.",
      },
      s5: {
        t: "Native multilingual experience",
        d: "Full interface and error messages pre-translated in English, Amharic, Afan Oromo, Somali, and Tigrinya.",
      },
    },
    team: {
      eyebrow: "Our team",
      title: "Meet the engineers behind Bruh Tech Solution",
      roles: {
        matyas: "Co-Founder • Business Analyst",
        abenezer: "Founder • Full-Stack Developer",
        mulisa: "Marketing Specialist",
        sarah: "Lead Consultant",
      },
      names: {
        matyas: "Matyas Abera",
        abenezer: "Abenezer Kifle",
        mulisa: "Mulisa Tadesse",
        sarah: "Sarah Mitchell",
      },
      aria: {
        prev: "Previous team member",
        next: "Next team member",
      },
    },
    thenNow: {
      eyebrow: "( Then → Now )",
      title: "Cooperative values remain. The ledger is transformed.",
      desc: "For decades, SACCOs operated with physical ledger notebooks and paper books. Bruh Tech Solution provides modern digital software running directly on branch PCs or in the cloud — trusted by cooperatives like Maedot SACCO.",
      oldTag: "Yesterday's Paper SACCO",
      modernAria: "The modern way — paying digitally through the SACCO platform",
      tradAlt: "Traditional paper-era cooperative",
      newTag: "Bruh Tech Digital Core",
      newChips: [
        "Runs on local branch PC or in cloud",
        "16-digit Fayda KYC verification",
        "Strict 3-tier maker-checker loan approval",
        "Instant double-entry general ledger",
      ],
      oldChips: [
        "Physical paper passbooks & manual sums",
        "Cash in wooden strongboxes without logs",
        "Weeks of delay for loan committee approvals",
        "Vulnerable to arithmetic & manual record errors",
      ],
    },
    teamsTabs: {
      title: "Built for every SACCO team.",
      subhead: "Whether you run one branch or a federation, the platform adapts to the way your people work.",
      tellers: {
        tab: "For branch tellers",
        h: "Stop re-keying entries across systems.",
        d: "The core connects every channel — teller, Telebirr, CBE, USSD — and posts each transaction once, everywhere.",
      },
      committees: {
        tab: "For loan committees",
        h: "Do more with a lean credit committee.",
        d: "Set your approval chains once and let the workflow route, remind and record every signature in the audit trail.",
      },
      executives: {
        tab: "For executives",
        h: "Manage every branch from one intelligent core.",
        d: "Trend flags and scheduled regulator packs, delivered without the manual overhead.",
      },
    },
    teamTiles: {
      title: "Built to work the way your team thinks.",
      d1_title: "Real-time dashboards",
      d1_desc: "Branch and portfolio dashboards that update the moment a teller posts — no stale numbers in committee.",
      d2_title: "AI assistant",
      d2_desc: "Ask a question in plain language and get the ledger's answer, with the report behind it.",
      d3_title: "One-click reports",
      d3_desc: "Regulator and committee packs generated, stamped and shared in seconds — not the night before.",
      d4_title: "Smart alerts",
      d4_desc: "Get flagged the moment something unusual happens — a PAR spike, a stalled approval, a branch gone quiet.",
      d5_title: "Team collaboration",
      d5_desc: "Branches, committees and auditors work from the same ledger — share views, comment, assign follow-ups.",
      cards: {
        activeMembers: "Active members",
        recentReports: "Recent reports",
        nbePack: "Monthly NBE pack",
        completed: "Completed",
        dividendForecast: "Dividend forecast",
        inReview: "In review",
        alertMsg: "PAR 30 rose 0.6% in Adama — review 4 loans",
        branches: "Branches",
        creditCommittee: "Credit committee",
        auditors: "Auditors",
      },
      questions: ["Which branch grew fastest?", "Compare Q1 and Q2 deposits", "Who is behind on repayments?"],
    },
    serviceDetail: {
      backToModules: "All modules",
      moduleLabel: "Module",
      of15: "of 15",
      keyFeatures: "Key features",
      previous: "Previous",
      next: "Next",
      atAGlance: "At a glance",
      capabilitiesLabel: "Capabilities",
      featuresCount: "features",
      partOfLabel: "Part of",
      partOfValue: "Ethio SACCO core",
      channelsLabel: "Channels",
      channelsValue: "Web · Mobile · USSD",
      requestDemo: "Request a demo",
      browseAll: "Browse all modules",
      screenshotNote: "Placeholder imagery — replace with product screenshots at",
      footerCopyright: "Bruh Tech Solution — Addis Ababa, Ethiopia",
    },
    contact: {
      eyebrow: "Get Started",
      title: "Digitize your SACCO today.",
      desc: "Contact Bruh Tech Solution in Addis Ababa for an on-premise PC setup or cloud deployment demo. We configure the entire platform to your cooperative.",
      cta: "Schedule a Free Demo",
      email: "hello@bruhtech.com",
    },
    footer: {
      rights: "Bruh Tech Solution. All rights reserved.",
      loc: "Addis Ababa, Ethiopia",
      tagline: "Ethiopian company!",
      bio: "Bruh Tech Solution builds secure, intelligent financial systems to modernize Ethiopia's cooperative and SACCO ecosystem. Empowering financial unions with offline-first PC branch systems and resilient cloud core banking.",
      home: "Home",
      products: "Products",
      platform: "Platform",
      modules: "Modules",
      aboutUs: "About us",
      process: "Process",
      callCenter: "Call Center",
      phone1: "+251 910 979060",
      phone2: "+251 946 642299",
      phone3: "+251 911 487246",
      locationTitle: "Our Location",
      address: "Sarbet | Beside Addis Ababa City Roads Authority | Elilta Apartment 3rd Floor, Office No. 301",
    },
    flowMocks: {
      core: {
        nav: ["Dashboard", "Members", "Savings", "Loans", "Shares", "Reports"],
        totalSavings: "Total savings",
        quarterGrowth: "▲ 12.4% this quarter",
        members: "Members",
        activeLoans: "Active loans",
        par30: "PAR 30",
        growth: "Portfolio growth",
      },
      teller: {
        title: "Teller queue — Adama branch",
        deposit: "SV-1180 · Deposit",
        repayment: "LN-1902 · Repayment",
        shares: "SH-0042 · 12 shares",
        post: "Post",
        posted: "Posted ✓",
        eod: "End-of-day close",
        reconciled: "Reconciled ✓ · 0 exceptions",
      },
      pay: {
        title: "Channels — posted once",
        channels: ["Telebirr", "CBE Birr", "USSD *889#"],
        oneLedger: "One ledger",
        todayVol: "ETB 2.4M today",
        live: "Reconciled live",
      },
      audit: {
        title: "Reports & audit trail",
        nbe: "Monthly NBE pack",
        dividend: "Dividend model",
        pl: "Branch P&L",
        generated: "Generated",
        scheduled: "Scheduled",
        log1: "09:41 · Teller posted SV-1180 — signed",
        log2: "09:42 · Ledger entry LN-1902 — dual control",
        log3: "09:44 · Report pack sealed — hash recorded",
      },
    },
    productMocks: {
      mobile: {
        greeting: "Selam, Meseret 👋",
        totalSavings: "Total savings",
        passbookNotice: "Passbook SV-1180 · Updated just now",
        actions: ["Deposit", "Withdraw", "Loan", "Shares"],
        goalTitle: "Ox-fattening goal",
        depositItem: "Deposit — Telebirr",
        loanRepayItem: "Loan repayment",
      },
      ussd: {
        head: "*889# · Maedot SACCO",
        menu: [
          "1. Balance inquiry",
          "2. Deposit (Telebirr)",
          "3. Withdraw",
          "4. Transfer to member",
          "5. Loan status",
          "6. Buy shares",
          "7. Mini statement",
          "0. Help",
        ],
        reply: "Reply: 1",
      },
    },
    teamsTabsMocks: {
      feed: [
        { icon: "₸", tint: "#E8F4EC", t: "Telebirr", d: "Deposit confirmed · ETB 4,500" },
        { icon: "◍", tint: "#FDF3DC", t: "ROI on savings", d: "8.2% dividend capacity this year" },
        { icon: "🏦", tint: "#EAF0FA", t: "CBE Birr", d: "142 postings reconciled today" },
        { icon: "#", tint: "#F4EAFA", t: "USSD", d: "38 member sessions live now" },
        { icon: "⚡", tint: "#FDF3DC", t: "Top branch", d: "Adama leading deposits this week" },
        { icon: "∞", tint: "#EAF0FA", t: "Passbook sync", d: "Every channel, updated once" },
      ],
      workflow: {
        loan: "Loan LN-2039",
        input: "Input",
        disbursement: "Disbursement",
        signed: "Signed 3/3",
      },
      analytics: {
        branchMix: "Branch mix",
        month: "April 2026",
        savingsTrend: "Savings trend",
        timeframe: "Last 6 months",
      },
    },
    serviceGallery: {
      note: "Placeholder imagery — replace with product screenshots at",
      ariaShow: "Show screenshot",
      screenshotAlt: "screenshot",
    },
    common: {
      prev: "Previous",
      next: "Next",
      appScreens: "App screens",
      prevScreen: "Previous screen",
      nextScreen: "Next screen",
      themeLight: "Switch to light mode",
      themeDark: "Switch to dark mode",
      selectLanguage: "Select language",
      languagesHeader: "Languages / ቋንቋዎች",
    },
  },

  am: {
    nav: {
      brand: "ብሩህ ቴክ",
      process: "የአሰራር ሂደት",
      platform: "ፕላትፎርም",
      products: "ምርቶች",
      modules: "ሞጁሎች",
      app: "መተግበሪያ",
      team: "ቡድናችን",
      impact: "ለውጡ",
      contact: "አግኙን",
      requestDemo: "ሙከራ ይጠይቁ",
    },
    hero: {
      headline: "የሳኮ ኮር ባንኪንግ ሲስተም — በቢሮ ኮምፒውተር (PC) እና በክላውድ (Cloud) የሚሰራ።",
      subhead:
        "ብሩህ ቴክ ሶሉሽን የቁጠባና ብድር ህብረት ስራ ማህበራትን በዘመናዊ ኮር ባንኪንግ ቴክኖሎጂ ያጎለብታል። በቢሮዎ ፒሲ ላይ በቀጥታ ያለ ኢንተርኔት መስራት የሚችል ወይም በክላውድ የሚዘረጋ — እንደ ማዕዶት ሳኮ ባሉ ፈር-ቀዳጅ ማህበራት በተግባር የተረጋገጠ።",
    },
    process: {
      tag: "// የማስረከቢያ ሂደት //",
      title: "ምቹ የመዘርጊያ አማራጭ፦ በቢሮ ፒሲ (Local PC) እና በክላውድ።",
      subhead:
        "ብሩህ ቴክ ሶሉሽን የሳኮ ፕላትፎርሙን በማህበሩ የቢሮ ኮምፒውተሮች ላይ በቀጥታ በመጫን ወይም በክላውድ ላይ በማዋቀር በፍጥነት ያስረክባል።",
      steps: [
        {
          id: "01",
          number: "01",
          title: "በቢሮ ፒሲ ወይም በክላውድ መጫን",
          description:
            "ሲስተሙን በማህበሩ የቢሮ ዴስክቶፕ/ላፕቶፕ ኮምፒውተር ላይ በቀጥታ መጫን ወይም ደህንነቱ በተጠበቀ የክላውድ ሰርቨር ላይ ማዋቀር።",
        },
        {
          id: "02",
          number: "02",
          title: "የአባላት ምዝገባ እና ፋይዳ ኬዋይሲ",
          description:
            "ተከታታይ የ MEM00000001 መለያ ቁጥር በራስ-ሰር ማመንጨት፣ ባለ 16-ዲጂት የፋይዳ ብሔራዊ መታወቂያ ማረጋገጥ እና የወራሾች መረጃ ምዝገባ።",
        },
        {
          id: "03",
          number: "03",
          title: "የቁጠባ፣ ብድር እና ባለ 3-ደረጃ ማረጋገጫ",
          description:
            "የግዴታ (MS001) እና የፍላጎት (VS001) ቁጠባዎችን፣ የንብረት ግመታ እና የብድር ኦፊሰር -> ስራ አስኪያጅ -> ፋይናንስ የክፍያ ማረጋገጫ።",
        },
        {
          id: "04",
          number: "04",
          title: "ድርብ መዝገብ ሂሳብ እና የስልጠና ድጋፍ",
          description:
            "በራስ-ሰር የተመጣጠነ ጆርናል የሚያስቀምጥ የሂሳብ መደብ (COA)፣ የሂሳብ ዘመን መዝጊያ መቆጣጠሪያ እና ለሰራተኞች ሙሉ ስልጠና መስጠት።",
        },
      ],
    },
    platform: {
      title: "አራት ወሳኝ ንዑስ ስርዓቶች። የቢሮ ፒሲ ፍጥነት እና የክላውድ ጥንካሬ።",
      items: [
        {
          t: "1. የአባላት አስተዳደር እና ፋይዳ ማረጋገጫ",
          d: "ደህንነቱ የተጠበቀ ተከታታይ MEM መለያ ቁጥር ማመንጫ፣ የ16-ዲጂት ፋይዳ ማረጋገጫ፣ የወራሽ ድልድል እና በምዝገባ ወቅት አውቶማቲክ ቁጠባ ሂሳብ መክፈቻ።",
        },
        {
          t: "2. የቁጠባና የተቀማጭ ንዑስ ስርዓት",
          d: "የግዴታ (MS001) እና የፍቃደኝነት (VS001) ቁጠባዎች፣ አስተማማኝ የተቀማጭ/ወጪ ግብይት፣ የዓይነት ንብረትና ወርቅ ምዝገባ እና የሂሳብ መግለጫ።",
        },
        {
          t: "3. የብድር ህይወት ዑደት እና ባለብዙ ደረጃ ማረጋገጫ",
          d: "የብድር ኦፊሰር -> ስራ አስኪያጅ -> ፋይናንስ ማረጋገጫ ቅደም ተከተል፣ ተለዋዋጭ የ PMT ክፍያ ቀመር ስሌት እና ከፊል ክፍያ አሰራር።",
        },
        {
          t: "4. ድርብ መዝገብ አጠቃላይ የሂሳብ መዝገብ",
          d: "ለእያንዳንዱ ግብይት በራስ-ሰር የተመጣጠነ የዴቢትና ክሬዲት ጆርናል ምዝገባ፣ የሂሳብ ወቅት መዝጊያ ቁጥጥር እና የቁጥጥር ተቋማት ሪፖርቶች።",
        },
      ],
    },
    letsBuild: {
      left: "አብረን",
      right: "እንገንባ",
      eye: "( የህብረት ስራ ማህበራት ወደፊት )",
      hint: "ለማየት ወደ ታች ይሸብልሉ",
      subhead:
        "የቁጠባና ብድር ህብረት ስራ ማህበርዎን በብሩህ ቴክ ሶሉሽን ለማዘመን ዝግጁ ነዎት? በቢሮዎ ፒሲ ላይ ወይም በክላውድ ለመጫን በአዲስ አበባ የሚገኘው የኢንጂነሪንግ ቡድናችን ዝግጁ ነው።",
      cta: "የስርዓቱን ማሳያ ቀጠሮ ይያዙ",
    },
    products: {
      eyebrow: "( ሶስቱ ምርቶች )",
      title: "ሶስት ዘመናዊ መገናኛዎች። አንድ ወጥ የሆነ የሂሳብ መዝገብ።",
      subhead: "ለኦዲት ብቁ የሆነ የሳኮ ኮር ባንኪንግ ሲስተም ከአባላት የሞባይል መተግበሪያ እና ከUSSD አገልግሎት ጋር።",
      p1: {
        tag: "በቢሮ ፒሲ / በክላውድ",
        title: "የብሩህ ቴክ ኮር ሳኮ ሲስተም",
        desc: "በማህበሩ የቢሮ ኮምፒውተር ላይ በቀጥታ የሚሰራ ወይም በክላውድ የሚስተናገድ አስተማማኝ የኮር ባንኪንግ ስርዓት። በስፕሪንግ ቡት 3.3፣ ጃቫ 21፣ ፖስትግሬስኪውኤል እና 94+ ፈቃዶች የተገነባ።",
        more: "በቢሮ ፒሲ ላይ በቀጥታ እና በክላውድ ይሰራል",
        chips: ["የአባላት ምዝገባ እና ኬዋይሲ", "መደበኛ እና የጊዜ ገደብ ቁጠባ", "አክሲዮን እና የትርፍ ድርሻ", "ብድር፣ ዋሶች እና ማጽደቂያ", "ዋና መዝገብ እና የሒሳብ ሠንጠረዥ", "ቴለር፣ ጥሬ ገንዘብ እና ቅርንጫፎች", "የፋይናንስ እና የተቆጣጣሪ ሪፖርቶች", "የኦዲት ክትትል", "የተጠቃሚ ሚናዎች እና ፈቃዶች", "የቴሌብር፣ ኤም-ፔሳ እና የባንክ ትስስር"],
      },
      p2: {
        tag: "አንድሮይድ / አይኦኤስ",
        title: "የአባላት የሞባይል ባንኪንግ መተግበሪያ",
        desc: "የአባላት መተግበሪያ — የግዴታና ፍቃደኝነት ቁጠባ ሂሳብን መፈተሽ፣ ብድር መጠየቅ፣ የዋስ ሁኔታ መከታተል እና የሂሳብ መግለጫ በ5 ቋንቋዎች ማውረድ።",
        more: "በ5 የኢትዮጵያ ቋንቋዎች ይገኛል",
        chips: ["የጣት አሻራ መግቢያ", "ቀሪ ሂሳብ እና ስቴትመንት", "ገንዘብ ማስቀመጥ እና ማውጣት", "ገንዘብ ማስተላለፍ", "የብድር ማመልከቻ እና ክፍያ", "የዋስ ጥያቄዎች", "የቢል ክፍያ እና አየር ሰዓት", "የQR ክፍያዎች", "ፈጣን ማሳወቂያዎች", "የቀጥታ ድጋፍ"],
      },
      p3: {
        tag: "መሰረታዊ ስልኮች",
        title: "የዩኤስኤስዲ (USSD) ባንኪንግ (*889#)",
        desc: "ኢንተርኔት ሳያስፈልግ በማንኛውም ተራ ስልክ ባንክ መጠቀም። ቁጠባን ማየት፣ የብድር ሁኔታ መከታተል እና በቴሌብር/ሲቢኢ ማስተላለፍ።",
        more: "ያለ ኢንተርኔት በሁሉም ስልኮች ይሰራል",
        chips: ["ምዝገባ እና ፒን ኮድ", "ቀሪ ሂሳብ እና አጭር ስቴትመንት", "ማስቀመጥ እና ማውጣት", "ወደ አባል ወይም ባንክ ማስተላለፍ", "ብድር መጠየቅ እና መክፈል", "አክሲዮን እና የትርፍ ድርሻ", "አየር ሰዓት እና ቢል", "ቅርንጫፍ መፈለጊያ"],
      },
    },
    modules: {
      eyebrow: "( የብሩህ ቴክ ፕላትፎርም )",
      title: "ሙሉ የሳኮ ሞጁሎች፣ ለፒሲ እና ክላውድ የተገነቡ",
      requestDemo: "ሙከራ ይጠይቁ",
      viewDetails: "ዝርዝሩን ይመልከቱ",
    },
    appShots: {
      eyebrow: "የአባላት ተሞክሮ",
      title: "ዘመናዊ የህብረት ስራ ባንክ በእያንዳንዱ አባል እጅ።",
      s1: {
        t: "የአባላት የቀጥታ ዳሽቦርድ",
        d: "የግዴታ ቁጠባ (MS001)፣ የፍላጎት ቁጠባ (VS001)፣ የአክሲዮን ካፒታል እና የቅርብ ጊዜ የሂሳብ እንቅስቃሴዎች በአንድ ቦታ።",
      },
      s2: {
        t: "የፋይዳ ኬዋይሲ እና የአባልነት መገለጫ",
        d: "የተረጋገጠ ባለ 16-ዲጂት የፋይዳ መገለጫ፣ ዲጂታል የማህበር መታወቂያ ካርድ፣ የተመዘገቡ ወራሾች እና የአባልነት ማረጋገጫ።",
      },
      s3: {
        t: "የብድር ሂደት የቀጥታ መከታተያ",
        d: "የብድር ጥያቄ በብድር ኦፊሰር፣ ስራ አስኪያጅ እና ፋይናንስ ክፍል የደረሰበትን ደረጃ በግልጽ ማሳየት።",
      },
      s4: {
        t: "የብድር ክፍያ ስሌት ማሽን (PMT)",
        d: "ወርሃዊ የክፍያ መጠን፣ የዋና ገንዘብና የወለድ ዝርዝር እና ትክክለኛ የብድር መክፈያ የጊዜ ሰሌዳ።",
      },
      s5: {
        t: "በአፍ መፍቻ ቋንቋዎ ይሰራል",
        d: "አማርኛ፣ አፋን ኦሮሞ፣ ሶማሊኛ፣ ትግርኛ እና እንግሊዝኛ — አባላት በሚገባ በሚረዱት ቋንቋ ይጠቀማሉ።",
      },
    },
    team: {
      eyebrow: "ቡድናችን",
      title: "የብሩህ ቴክ ሶሉሽን መሃንዲሶችን ይወቁ",
      roles: {
        matyas: "ተባባሪ መስራች • የቢዝነስ አናሊስት",
        abenezer: "መስራች • ፉል-ስታክ ሶፍትዌር ኢንጂነር",
        mulisa: "የማርኬቲንግ ስፔሻሊስት",
        sarah: "ዋና አማካሪ",
      },
      names: {
        matyas: "ማትያስ አበራ",
        abenezer: "አቤኔዘር ክፍሌ",
        mulisa: "ሙሊሳ ታደሰ",
        sarah: "ሳራ ሚቼል",
      },
      aria: {
        prev: "ቀዳሚ የቡድን አባል",
        next: "ቀጣይ የቡድን አባል",
      },
    },
    thenNow: {
      eyebrow: "( ትናንት → ዛሬ )",
      title: "የማህበሩ አንድነት እንዳለ ነው። የሂሳብ አያያዙ ዘምኗል።",
      desc: "ለዓመታት አባላት በወረቀት ደብተርና በእንጨት ሳጥን ይሰሩ ነበር። ብሩህ ቴክ ሶሉሽን በቢሮ ፒሲ እና በክላውድ የሚሰራ ዘመናዊ የሳኮ ሲስተም ያቀርባል — እንደ ማዕዶት ሳኮ ባሉ ማህበራት በተግባር የተረጋገጠ።",
      oldTag: "የቀድሞው የወረቀት አሰራር",
      modernAria: "ዘመናዊው አሰራር — በሳኮ ፕላትፎርም ዲጂታል ክፍያ መፈጸም",
      tradAlt: "የድሮው የወረቀት ዘመን የህብረት ስራ ማህበር",
      newTag: "የብሩህ ቴክ ዲጂታል ኮር",
      newChips: [
        "በቢሮ ፒሲ (PC) ወይም በክላውድ ይሰራል",
        "ባለ 16-ዲጂት የፋይዳ ኬዋይሲ ማረጋገጫ",
        "ባለ 3-ደረጃ አስተማማኝ የብድር ማረጋገጫ",
        "የቀጥታ ድርብ መዝገብ አጠቃላይ ሂሳብ",
      ],
      oldChips: [
        "የወረቀት ደብተርና በእጅ የተሰሩ ድምሮች",
        "በእንጨት ሳጥን ውስጥ የተቆለፈ ጥሬ ገንዘብ",
        "ለብድር ውሳኔ ለሳምንታት መጠበቅ",
        "ለስህተትና ለመጥፋት የተጋለጠ አሰራር",
      ],
    },
    teamsTabs: {
      title: "ለሁሉም የሳኮ የሥራ ክፍሎች የተዘጋጀ",
      subhead: "አንድ ቅርንጫፍ ወይም በርካታ ማኅበራትን ቢመሩ፣ ሲስተሙ ከሠራተኞችዎ የሥራ ፍሰት ጋር ሙሉ በሙሉ ይጣጣማል።",
      tellers: {
        tab: "ለቅርንጫፍ ገንዘብ ተቀባዮች (ቴለሮች)",
        h: "በተለያዩ ሲስተሞች መረጃን ደጋግሞ ማስገባትን ያስቀሩ",
        d: "ኮር ባንኪንጉ ሁሉንም መስመሮች — ቴለር፣ ቴሌብር፣ ሲቢኢ እና ዩኤስኤስዲ ያገናኛል፤ እያንዳንዱን ግብይት ወዲያውኑ ይመዘግባል።",
      },
      committees: {
        tab: "ለብድር ኮሚቴዎች",
        h: "በቀላል የብድር ኮሚቴ የላቀ ሥራ ያከናውኑ",
        d: "የማጽደቂያ ቅደም ተከተሎችን አንድ ጊዜ ያዋቅሩ፤ ሲስተሙ ፊርማዎችን ይመዘግባል፣ ኦዲት ቁጥጥርን ያጠናክራል።",
      },
      executives: {
        tab: "ለሥራ አመራሮች",
        h: "ሁሉንም ቅርንጫፎች ከአንድ ብልህ ማዕከል ይምሩ",
        d: "የአፈጻጸም መረጃዎች እና የብሔራዊ ባንክ ሪፖርቶች ያለ ድካም ወዲያውኑ ይዘጋጃሉ።",
      },
    },
    teamTiles: {
      title: "ቡድንዎ በሚያስበው መንገድ እንዲሠራ ተገንብቷል።",
      d1_title: "የቀጥታ ዳሽቦርዶች",
      d1_desc: "ቴለሩ ግብይት ባስገባ ቅጽበት የሚዘምኑ የቅርንጫፍ እና የፖርትፎሊዮ ዳሽቦርዶች።",
      d2_title: "የኤአይ ረዳት",
      d2_desc: "በቀላል ቋንቋ ይጠይቁ፤ ከዋናው የሒሳብ መዝገብ የተረጋገጠ መልስ ከሙሉ ሪፖርት ጋር ያግኙ።",
      d3_title: "የአንድ ጠቅታ ሪፖርቶች",
      d3_desc: "ለብሔራዊ ባንክ እና ለኮሚቴ የሚቀርቡ ሪፖርቶች በሰከንዶች ውስጥ በሙሉ ማህተም ይዘጋጃሉ።",
      d4_title: "ብልህ ማስጠንቀቂያዎች",
      d4_desc: "ያልተለመደ ክስተት ሲፈጠር — የብድር አደጋ ጭማሪ ወይም የቆመ ማጽደቂያ ሲኖር ወዲያውኑ ማሳወቂያ ይደርሳል።",
      d5_title: "የጋራ የሥራ ትስስር",
      d5_desc: "ቅርንጫፎች፣ ኮሚቴዎች እና ኦዲተሮች በአንድ የጋራ መዝገብ ላይ በቅንጅት ይሠራሉ።",
      cards: {
        activeMembers: "ንቁ አባላት",
        recentReports: "የቅርብ ጊዜ ሪፖርቶች",
        nbePack: "የወርሀዊ ብሔራዊ ባንክ ሪፖርት",
        completed: "ተጠናቋል",
        dividendForecast: "የትርፍ ድርሻ ትንበያ",
        inReview: "በግምገማ ላይ",
        alertMsg: "በአዳማ ቅርንጫፍ PAR 30 በ 0.6% ጨምሯል — 4 ብድሮችን ይገምግሙ",
        branches: "ቅርንጫፎች",
        creditCommittee: "የብድር ኮሚቴ",
        auditors: "ኦዲተሮች",
      },
      questions: ["የትኛው ቅርንጫፍ በፍጥነት አደገ?", "የሩብ 1 እና 2 ቁጠባዎችን አወዳድር", "የብድር ክፍያ ያዘገዩት እነማን ናቸው?"],
    },
    serviceDetail: {
      backToModules: "ሁሉም ሞጁሎች",
      moduleLabel: "ሞጁል",
      of15: "ከ 15",
      keyFeatures: "ዋና ዋና ገጽታዎች",
      previous: "ቀዳሚ",
      next: "ቀጣይ",
      atAGlance: "በጨረፍታ",
      capabilitiesLabel: "አቅሞች",
      featuresCount: "ገጽታዎች",
      partOfLabel: "ክፍል",
      partOfValue: "የኢትዮ ሳኮ ኮር",
      channelsLabel: "መስመሮች",
      channelsValue: "ዌብ · ሞባይል · ዩኤስኤስዲ",
      requestDemo: "የሙከራ ማሳያ ይጠይቁ",
      browseAll: "ሁሉንም ሞጁሎች ይመልከቱ",
      screenshotNote: "ጊዜያዊ ምስል — በእውነተኛ የምርት ስክሪንሾት ይተኩ በ",
      footerCopyright: "ብሩህ ቴክ ሶሉሽን — አዲስ አበባ፣ ኢትዮጵያ",
    },
    contact: {
      eyebrow: "ውይይቱን ይጀምሩ",
      title: "ማህበርዎን ዛሬውኑ ዲጂታላይዝ ያድርጉ።",
      desc: "በአዲስ አበባ የሚገኘው የብሩህ ቴክ ሶሉሽን ቡድን በቢሮዎ ፒሲ ላይ ለመጫን ወይም በክላውድ ለማሳየት ዝግጁ ነው።",
      cta: "የነጻ ማሳያ ቀጠሮ ይያዙ",
      email: "hello@bruhtech.com",
    },
    footer: {
      rights: "ብሩህ ቴክ ሶሉሽን። መብቱ በህግ የተጠበቀ ነው።",
      loc: "አዲስ አበባ፣ ኢትዮጵያ",
      tagline: "የኢትዮጵያ የፋይናንስ ቴክኖሎጂ ኩባንያ!",
      bio: "ብሩህ ቴክ ሶሉሽን የኢትዮጵያን የህብረት ስራ እና የሳኮ ማህበራትን ለማዘመን አስተማማኝ እና ብልህ የፋይናንስ ስርዓቶችን ይገነባል። ማህበራትን በቢሮ ፒሲ እና በክላውድ ቴክኖሎጂ እናጠናክራለን።",
      home: "መነሻ",
      products: "ምርቶች",
      platform: "ፕላትፎርም",
      modules: "ሞጁሎች",
      aboutUs: "ስለ እኛ",
      process: "የአሰራር ሂደት",
      callCenter: "የጥሪ ማዕከል",
      phone1: "+251 910 979060",
      phone2: "+251 946 642299",
      phone3: "+251 911 487246",
      locationTitle: "አድራሻችን",
      address: "ሳርቤት | ከአዲስ አበባ ከተማ መንገዶች ባለስልጣን አጠገብ | ኤሊልታ አፓርትመንት 3ኛ ፎቅ፣ ቢሮ ቁጥር 301",
    },
    flowMocks: {
      core: {
        nav: ["ዳሽቦርድ", "አባላት", "ቁጠባ", "ብድር", "አክሲዮን", "ሪፖርቶች"],
        totalSavings: "አጠቃላይ ቁጠባ",
        quarterGrowth: "▲ 12.4% በዚህ ሩብ ዓመት",
        members: "አባላት",
        activeLoans: "ንቁ ብድሮች",
        par30: "PAR 30 (አደጋ ላይ ያለ)",
        growth: "የፖርትፎሊዮ ዕድገት",
      },
      teller: {
        title: "የቴለር ወረፋ — አዳማ ቅርንጫፍ",
        deposit: "SV-1180 · ተቀማጭ ቁጠባ",
        repayment: "LN-1902 · የብድር ክፍያ",
        shares: "SH-0042 · 12 አክሲዮኖች",
        post: "መዝግብ",
        posted: "ተመዝግቧል ✓",
        eod: "የዕለቱ ሂሳብ ማጠቃለያ",
        reconciled: "የተመሳከረ ✓ · 0 ልዩነት",
      },
      pay: {
        title: "የክፍያ መንገዶች — በአንድ ጊዜ የሚመዘገብ",
        channels: ["ቴሌብር", "ሲቢኢ ብር", "USSD *889#"],
        oneLedger: "አንድ ዋና መዝገብ",
        todayVol: "ዛሬ 2.4 ሚሊየን ብር",
        live: "በቀጥታ የተመሳከረ",
      },
      audit: {
        title: "ሪፖርቶች እና የኦዲት መከታተያ",
        nbe: "ወርሃዊ የብሔራዊ ባንክ ሪፖርት",
        dividend: "የትርፍ ድርሻ ሞዴል",
        pl: "የቅርንጫፍ ትርፍና ኪሳራ",
        generated: "ተዘጋጅቷል",
        scheduled: "ተይዟል",
        log1: "09:41 · ቴለር SV-1180 መዝግቧል — በፊርማ",
        log2: "09:42 · የሂሳብ መዝገብ LN-1902 — ባለሁለት ማረጋገጫ",
        log3: "09:44 · የሪፖርት ሰነድ ታትሟል — ሃሽ ተመዝግቧል",
      },
    },
    productMocks: {
      mobile: {
        greeting: "ሰላም፣ መሰረት 👋",
        totalSavings: "አጠቃላይ ቁጠባ",
        passbookNotice: "የቁጠባ ደብተር SV-1180 · አሁን የዘመነ",
        actions: ["ማስቀመጥ", "ማውጣት", "ብድር", "አክሲዮን"],
        goalTitle: "የበሬ ማደለብ ዕቅድ",
        depositItem: "ተቀማጭ — በቴሌብር",
        loanRepayItem: "የብድር ክፍያ",
      },
      ussd: {
        head: "*889# · ማዕዶት ሳኮ",
        menu: [
          "1. ቀሪ ሂሳብ መጠየቂያ",
          "2. ማስቀመጫ (ቴሌብር)",
          "3. ማውጫ",
          "4. ለአባል ማስተላለፊያ",
          "5. የብድር ሁኔታ",
          "6. አክሲዮን መግዣ",
          "7. አጭር መግለጫ",
          "0. እርዳታ",
        ],
        reply: "ምላሽ: 1",
      },
    },
    teamsTabsMocks: {
      feed: [
        { icon: "₸", tint: "#E8F4EC", t: "ቴሌብር", d: "ተቀማጭ ተረጋግጧል · 4,500 ብር" },
        { icon: "◍", tint: "#FDF3DC", t: "የቁጠባ ትርፋማነት", d: "8.2% የትርፍ ድርሻ አቅም በዚህ ዓመት" },
        { icon: "🏦", tint: "#EAF0FA", t: "ሲቢኢ ብር", d: "142 ግብይቶች ዛሬ ተመሳክረዋል" },
        { icon: "#", tint: "#F4EAFA", t: "USSD", d: "38 አባላት አሁን እየተጠቀሙ ነው" },
        { icon: "⚡", tint: "#FDF3DC", t: "ቀዳሚ ቅርንጫፍ", d: "አዳማ ቅርንጫፍ በቁጠባ እየመራ ነው" },
        { icon: "∞", tint: "#EAF0FA", t: "የደብተር ቅንጅት", d: "በሁሉም መንገዶች ወዲያውኑ የሚዘምን" },
      ],
      workflow: {
        loan: "ብድር LN-2039",
        input: "ማመልከቻ",
        disbursement: "ክፍያ መልቀቅ",
        signed: "የጸደቀ 3/3",
      },
      analytics: {
        branchMix: "የቅርንጫፎች ድርሻ",
        month: "ሚያዚያ 2018",
        savingsTrend: "የቁጠባ ዕድገት አዝማሚያ",
        timeframe: "ባለፉት 6 ወራት",
      },
    },
    serviceGallery: {
      note: "የምስል ማሳያ — በምርት ምስሎች ይተኩ በ",
      ariaShow: "ስክሪንሾት አሳይ",
      screenshotAlt: "ስክሪንሾት",
    },
    common: {
      prev: "ቀዳሚ",
      next: "ቀጣይ",
      appScreens: "የመተግበሪያ ገጾች",
      prevScreen: "ቀዳሚ ገጽ",
      nextScreen: "ቀጣይ ገጽ",
      themeLight: "ወደ ብሩህ ገጽታ ቀይር",
      themeDark: "ወደ ጨለማ ገጽታ ቀይር",
      selectLanguage: "ቋንቋ ይምረጡ",
      languagesHeader: "Languages / ቋንቋዎች",
    },
  },

  om: {
    nav: {
      brand: "Bruh Tech Solution",
      process: "Adeemsa",
      platform: "Pilaatfoormii",
      products: "Oomishoota",
      modules: "Moojuloota",
      app: "Appilikeeshinii",
      team: "Garee Keenya",
      impact: "Jijjiirama",
      contact: "Nu Qunnamaa",
      requestDemo: "Muuxannoo Gaafadhaa",
    },
    hero: {
      headline: "Sirna baankii bu'uuraa SACCO — kompiitara waajjiraa (PC) fi Kilaawudii irratti kan hojjetu.",
      subhead:
        "Bruh Tech Solution waldaalee qusannaa fi liqii Itoophiyaatiif sirna baankii bu'uuraa ammayyaa dhiyeessa. Kompiitara waajjiraa (PC) irratti interneetii malee hojjechuu kan danda'u yookiin kilaawudii irratti kan diriirfamu — waldaalee akka Maedot SACCOtiin hojiirra oolee kan mirkanaa'e.",
    },
    process: {
      tag: "// Adeemsa Diriirsuu //",
      title: "Filannoo diriirsuu mijataa: PC Waajjiraa fi Kilaawudii.",
      subhead:
        "Bruh Tech Solution sirna SACCO kallattiin kompiitara waajjira keessanii irratti fe'uun yookiin kilaawudii irratti qindeessuun saffisaan isiniif kenna.",
      steps: [
        {
          id: "01",
          number: "01",
          title: "PC Waajjiraa ykn Kilaawudii irratti Fe'uu",
          description:
            "Sirnichaa kallattiin kompiitara waajjiraa (desktop/laptop) irratti fe'uu yookiin sarvaraa kilaawudii amansiisaa irratti qindeessuu.",
        },
        {
          id: "02",
          number: "02",
          title: "Galmee Miseensotaa & Fayda KYC",
          description:
            "Lakkofsa eenyummaa MEM00000001 ofumaan maddisiisuu, mirkaneessa Faayidaa dijiitii 16 fi galmee dhaaltotaa guutuu.",
        },
        {
          id: "03",
          number: "03",
          title: "Qusannaa, Liqii & Mirkaneessa Sadarkaa 3",
          description:
            "Qusannaa dirqamaa (MS001) fi fedhii (VS001), shallaggii qabeenyaa, fi Oofisera -> Manajara -> Faayinaansii kaffaltii mirkaneessuu.",
        },
        {
          id: "04",
          number: "04",
          title: "Herreega Galmee Dachaa & Leenjii",
          description:
            "Galmee herreegaa (COA) ofumaan madaallii eegu, cufiinsa yeroo herreegaa fi hojjettootaaf leenjii guutuu kennuu.",
        },
      ],
    },
    platform: {
      title: "Sirnoota murteessoo afur. Saffisa PC waajjiraa fi humna Kilaawudii.",
      items: [
        {
          t: "1. Bulchiinsa Miseensaa & Fayda KYC",
          d: "Lakkofsa MEM ofumaan maddisiisuu, mirkaneessa Faayidaa dijiitii 16, dhaaltota galmeessuu fi kallaattidhaan herreega qusannaa banuu.",
        },
        {
          t: "2. Qusannaa & Qabeenya Gosaa",
          d: "Qusannaa dirqamaa (MS001) fi fedhii (VS001), baasii fi galii amansiisaa, herreega qabeenya gosaa fi ibsa herreegaa.",
        },
        {
          t: "3. Adeemsa Liqii & Mirkaneessa Sadarkaa Sadii",
          d: "Oofisera Liqii -> Manajara -> Faayinaansii, shallaggii liqii PMT ammayyaa fi kaffaltii gam-tokkee.",
        },
        {
          t: "4. Herreega Galmee Dachaa (Double-Entry)",
          d: "Galmee bu'uuraa deebitii fi kireeditii madaalawaa ofumaan galmeessu, to'annoo yeroo herreegaa fi gabaasa seeraa qulqulluu.",
        },
      ],
    },
    letsBuild: {
      left: "Kottaa",
      right: "haaijaarru",
      eye: "( Gara Fuuldura Hojii Gamtaa )",
      hint: "Ilaaluuf gara gadiitti dhiiba",
      subhead:
        "Waldaa qusannaa fi liqii keessan Bruh Tech Solution wajjin ammayyeessuuf qophiidhaa? PC waajjiraa irratti ykn kilaawudii irratti fe'uuf gareen keenya Finfinnee jiru qophiidha.",
      cta: "Qophii Agarsiisaa Qabadhaa",
    },
    products: {
      eyebrow: "( Oomishaalee Sadii )",
      title: "Tajaajiloota ammayyaa sadii. Galmee herreegaa tokko.",
      subhead: "Sirna baankii saakkoo qorannoo oodiitiif qophaa'e appii miseensotaafi USSD waliin.",
      p1: {
        tag: "PC Waajjiraa / Kilaawudii",
        title: "Bruh Tech Core SACCO System",
        desc: "Kompiitara waajjiraa irratti kallattiin kan hojjetu yookiin sarvarii kilaawudii irratti kan qindaa'e. Spring Boot 3.3, Java 21, PostgreSQL 15 fi eeyyamoota 94+ qaba.",
        more: "PC waajjiraa fi Kilaawudii irratti ni hojjeta",
        chips: ["Miseensota fi KYC", "Qusannoo fi Yeroo Dhaabbataa", "Aksiyoona fi Qooda Bu'aa", "Liqii, Wabii fi Hayyama", "Galmee Bu'uuraa fi Unka Herregaa", "Teellara, Maallaqa fi Dameewwan", "Gabaasa Faayinaansii fi To'annoo", "Hordoffii Odiitii", "Gahee fi Hayyama Hojii", "Walsimsiisa Telebirr, M-Pesa fi Baankii"],
      },
      p2: {
        tag: "Android / iOS",
        title: "Appilikeeshinii Baankii Miseensotaa",
        desc: "Appii miseensotaa — qusannaa ilaaluu, liqii gaafachuu, wabummaa hordofuu fi ibsa herreegaa afaan 5n buufachuu.",
        more: "Afaanota Itoophiyaa 5n jira",
        chips: ["Seensa Asxaa Qubaa", "Haftee fi Isteetmantii", "Qusachuu fi Baasuu", "Maallaqa Dabarsuu", "Iyyannoo fi Kaffaltii Liqii", "Gaaffii Wabii", "Kaffaltii Bilii fi Yeroo Qilleensaa", "Kaffaltii QR", "Beeksisa Battalaa", "Deeggarsa Kallattii"],
      },
      p3: {
        tag: "Bilbiloota Sasalphaa",
        title: "Baankii USSD (*889#)",
        desc: "Interneetii malee bilbila kamiyyuu irratti baankii fayyadamuu. Qusannaa, haala liqii fi dabarsa Telebirr/CBE.",
        more: "Interneetii malee bilbila hundarratti",
        chips: ["Galmee fi Koodii PIN", "Haftee fi Isteetmantii Gabaabaa", "Qusachuu fi Baasuu", "Gara Miseensaa ykn Baankiitti Dabarsuu", "Liqii Gaafachuu fi Kaffaluu", "Aksiyoona fi Qooda Bu'aa", "Bilii fi Yeroo Qilleensaa", "Damee Barbaaduu"],
      },
    },
    modules: {
      eyebrow: "( Pilaatfoormii Bruh Tech )",
      title: "Moojuloota SACCO guutuu, PC fi Kilaawudiif kan qophaa'e",
      requestDemo: "Muuxannoo Gaafadhaa",
      viewDetails: "Bal'ina Ilaalaa",
    },
    appShots: {
      eyebrow: "Muuxannoo Miseensaa",
      title: "Baankii ammayyaa harka miseensa hunda keessa.",
      s1: {
        t: "Daashboordii miseensaa battalaa",
        d: "Qusannaa dirqamaa (MS001), qusannaa fedhii (VS001), qooda aksiyoonaa fi soochii herreegaa dhiyoo hunda bakka tokkotti.",
      },
      s2: {
        t: "Fayda KYC & Piroofaayilii Miseensaa",
        d: "Piroofaayilii Faayidaa dijiitii 16 mirkanaa'e, kaardii eenyummaa waldaa dijitaalaa fi ragaalee dhaaltotaa.",
      },
      s3: {
        t: "Hordoffii adeemsa liqii battalaa",
        d: "Iyyanni liqii sadarkaa Oofiseraa, Manajaraa fi Faayinaansii irra gahe iftoominan hordofuu.",
      },
      s4: {
        t: "Shallaggii liqii PMT",
        d: "Hangi kaffaltii ji'aa, kaffaltii duraa fi dhala, akkasumas sagantaa kaffaltii ifa ta'e.",
      },
      s5: {
        t: "Afaan dhalootaa keessaniin hojjeta",
        d: "Afaan Oromoo, Amaariffa, Somaaliffa, Tigriffa fi Ingiliffa — miseensonni afaan yaadaniin itti fayyadamu.",
      },
    },
    team: {
      eyebrow: "Garee Keenya",
      title: "Injiinarota Bruh Tech Solution duuba jiran baruuf",
      roles: {
        matyas: "Miseensa Hundeeffamaa • Xinxalaa Daldalaa",
        abenezer: "Hundeeffamaa • Injiinara Sooftiweerii",
        mulisa: "Ogeessa Beeksisaa",
        sarah: "Gorsituu Olaantuu",
      },
      names: {
        matyas: "Maatiyoos Abaraa",
        abenezer: "Abenezer Kiflee",
        mulisa: "Mullisaa Taaddasaa",
        sarah: "Saaraa Miichell",
      },
      aria: {
        prev: "Miseensa garee duraa",
        next: "Miseensa garee itti aanu",
      },
    },
    thenNow: {
      eyebrow: "( Kaleessa → Har'a )",
      title: "Tokkummaan hojii gamtaa akkuma jirutti jira. Herreegni ammayyoomeera.",
      desc: "Waggoota hedduuf miseensonni dabtara waraqaatiin hojjechaa turan. Bruh Tech Solution sirna dijitaalaa PC waajjiraa fi kilaawudii irratti hojjetu dhiyeessa — waldaalee akka Maedot SACCOtiin kan mirkanaa'e.",
      oldTag: "Sirna Waraqaa Durii",
      modernAria: "Karaa ammayyaa — sirna saakkoo fayyadamuun dijitaalaan kaffaluu",
      tradAlt: "Hojii gamtaa karaan waraqaa durii",
      newTag: "Sirna Dijitaalaa Bruh Tech",
      newChips: [
        "PC Waajjiraa fi Kilaawudii irratti hojjeta",
        "Mirkaneessa Faayidaa dijiitii 16",
        "Mirkaneessa liqii sadarkaa sadii",
        "Herreega galmee dachaa battalaa",
      ],
      oldChips: [
        "Dabtara waraqaa fi ida'ama harkaa",
        "Qarshii saanduqa mukaatti cufame",
        "Murtii liqiitiif torbanoota eeguu",
        "Dogoggora herreegaatiif saaxilamuu",
      ],
    },
    teamsTabs: {
      title: "Garee SACCO hundaaf kan tolfame",
      subhead: "Damee tokko yookiin waldaa hedduu yoo hoggantan, sirnichi adeemsa hojii keessan wajjin guutummaatti walsima.",
      tellers: {
        tab: "Hojjattoota Qabduu (Tellersiif)",
        h: "Galmee irra deddeebiin galchuu hafeera",
        d: "Sirni bu'uuraa hunda walqunnamsiisa — Teellara, Telebirr, CBE fi USSD — daldala hunda yeroo tokkotti galmeessa.",
      },
      committees: {
        tab: "Koree Liqiif",
        h: "Koree liqii muraasaan hojii bal'aa hojjedhaa",
        d: "Ulaagaalee hayyamaa qindeessaa; sirnichi mallattoo hunda galmeessuun to'annoo odiitii cimsa.",
      },
      executives: {
        tab: "Hoggantootaaf",
        h: "Dameewwan hunda iddoo tokkoo to'adhaa",
        d: "Gabaasawwan sadarkaa fi NBE yeroo gabaabaa keessatti qophaa'u.",
      },
    },
    teamTiles: {
      title: "Akkaataa gareen keessan itti yaaduun kan hojjetame.",
      d1_title: "Daashboordii Yeroo Qabatamaa",
      d1_desc: "Daashboordiiwwan damee yeroo hojjataan galmeessu battalatti haaroman.",
      d2_title: "Gargaaraa AI",
      d2_desc: "Afaan salphaan gaafadhaa, deebii sirrii gabaasa waliin argadhaa.",
      d3_title: "Gabaasa Cuqaasa Tokkoo",
      d3_desc: "Gabaasni NBE fi koree sekondoota muraasa keessatti qophaa'a.",
      d4_title: "Akeekkachiisa Qaroomaa",
      d4_desc: "Yeroo wanti haaraan uumamu battalumatti beeksisa argadhaa.",
      d5_title: "Waliin Hojjechuu Garee",
      d5_desc: "Dameewwan, koreen fi odiitaroonni galmee tokkorra waliin hojjetu.",
      cards: {
        activeMembers: "Miseensota Nyaatan",
        recentReports: "Gabaasawwan Dhihoo",
        nbePack: "Gabaasa Ji'aa NBE",
        completed: "Xumurameera",
        dividendForecast: "Tilmaama Bu'aa",
        inReview: "Gamaaggama Irra",
        alertMsg: "Adamaatti PAR 30 0.6% dabale — liqii 4 gamaaggamaa",
        branches: "Dameewwan",
        creditCommittee: "Koree Liqii",
        auditors: "Odiitaroota",
      },
      questions: ["Dameen kam saffisaan guddise?", "Qusannoo Q1 fi Q2 walbira qabaa", "Kaffaltii liqii kan harkifate eenyu?"],
    },
    serviceDetail: {
      backToModules: "Moojuloota hunda",
      moduleLabel: "Moojulii",
      of15: "15 keessaa",
      keyFeatures: "Amaloota ijoo",
      previous: "Kan duraa",
      next: "Kan itti aanu",
      atAGlance: "Ilaalcha waliigalaa",
      capabilitiesLabel: "Dandeettiiwwan",
      featuresCount: "amaloota",
      partOfLabel: "Kutaa",
      partOfValue: "Ethio SACCO Core",
      channelsLabel: "Sararaalee",
      channelsValue: "Web · Moobaayila · USSD",
      requestDemo: "Muuxannoo gaafadhaa",
      browseAll: "Moojuloota hunda daawwadhaa",
      screenshotNote: "Fakkiilee eeggannoo — Iskiriinshootii dhugaan bakka buusaa",
      footerCopyright: "Bruh Tech Solution — Finfinnee, Itoophiyaa",
    },
    contact: {
      eyebrow: "Mariyachuuf qophiidha",
      title: "Waldaa keessan har'uma gara dijitaalaatti jijjiiraa.",
      desc: "Gareen Bruh Tech Solution Finfinnee jiru PC waajjira keessanii irratti fe'uuf yookiin kilaawudiin agarsiisuuf qophiidha.",
      cta: "Agarsiisa Bilisaa Qabadhaa",
      email: "hello@bruhtech.com",
    },
    footer: {
      rights: "Bruh Tech Solution. Mirgi hundi seeraan kan eegame.",
      loc: "Finfinnee, Itoophiyaa",
      tagline: "Kompanii teeknoolojii faayinaansii Itoophiyaa!",
      bio: "Bruh Tech Solution sirna faayinaansii ammayyaa ijaaruun waldaalee SACCO Itoophiyaa humneessa. Sirna baankii PC waajjiraa fi kilaawudii amansiisaa qopheessa.",
      home: "Fuula Duraa",
      products: "Oomishoota",
      platform: "Pilaatfoormii",
      modules: "Moojuloota",
      aboutUs: "Waa'ee Keenya",
      process: "Adeemsa",
      callCenter: "Wiirtuu Waamichaa",
      phone1: "+251 910 979060",
      phone2: "+251 946 642299",
      phone3: "+251 911 487246",
      locationTitle: "Bakka Keenya",
      address: "Saarbeet | Abbaa Taayitaa Daandiiwwan Magaalaa Finfinnee Bira | Gamoo Eliiltaa Darbii 3ffaa, Biiroo Lakkoofsa 301",
    },
    flowMocks: {
      core: {
        nav: ["Daashboordii", "Miseensota", "Qusannaa", "Liqaa", "Aksiyoona", "Gabaasaalee"],
        totalSavings: "Waliigala Qusannaa",
        quarterGrowth: "▲ 12.4% kurmaana kana",
        members: "Miseensota",
        activeLoans: "Liqaa Hojirra Jiru",
        par30: "PAR 30 (Balaarra Jiru)",
        growth: "Guddina Poortifooliyoo",
      },
      teller: {
        title: "Dabaree Teellarii — Damee Adaamaa",
        deposit: "SV-1180 · Qusannaa Kaawuu",
        repayment: "LN-1902 · Liqaa Deebisuu",
        shares: "SH-0042 · Aksiyoona 12",
        post: "Galchi",
        posted: "Galmaa’eera ✓",
        eod: "Cufiinsa Guyyaa",
        reconciled: "Walsimeera ✓ · Garaagarummaa 0",
      },
      pay: {
        title: "Kanneen Kaffaltii — Altokko Galmaa’u",
        channels: ["Telebirr", "CBE Birr", "USSD *889#"],
        oneLedger: "Galmee Guddaa Tokko",
        todayVol: "Har’a Qarshii Miiliyoona 2.4",
        live: "Kallattiin Walsimeera",
      },
      audit: {
        title: "Gabaasaafi Hordoffii Oodiitii",
        nbe: "Gabaasa Baankii Biyyooleessaa Ji’aa",
        dividend: "Moodeela Bu’aa Qoodinsaa",
        pl: "Bu’aafi Kasaaraa Damee",
        generated: "Qophaa’eera",
        scheduled: "Saganteeffameera",
        log1: "09:41 · Teellariin SV-1180 galcheera — mallattoodhaan",
        log2: "09:42 · Galmee herregaa LN-1902 — to’annoo dachaa",
        log3: "09:44 · Paakiin gabaasaa cufameera — haashiin galmaa’eera",
      },
    },
    productMocks: {
      mobile: {
        greeting: "Nagaa, Masarat 👋",
        totalSavings: "Waliigala Qusannaa",
        passbookNotice: "Dabtara Qusannaa SV-1180 · Amma Haarome",
        actions: ["Kaawwachuu", "Baasuu", "Liqaa", "Aksiyoona"],
        goalTitle: "Kaayyoo Sangaa Gabbisuu",
        depositItem: "Qusannaa — Telebirriin",
        loanRepayItem: "Liqaa Deebisuu",
      },
      ussd: {
        head: "*889# · Maaydoott Saakkoo",
        menu: [
          "1. Haala herregaa baruuf",
          "2. Qusannaa kaawwachuu (Telebirr)",
          "3. Qusannaa baafachuu",
          "4. Miseensaaf dabarsuu",
          "5. Sadarkaa liqaa",
          "6. Aksiyoona bituu",
          "7. Gabaasa gabaabaa",
          "0. Gargaarsa",
        ],
        reply: "Deebii: 1",
      },
    },
    teamsTabsMocks: {
      feed: [
        { icon: "₸", tint: "#E8F4EC", t: "Telebirr", d: "Qusannaan mirkanaa’eera · ETB 4,500" },
        { icon: "◍", tint: "#FDF3DC", t: "Bu’a-qabeessummaa Qusannaa", d: "Dandeettii qooda bu’aa 8.2% bara kana" },
        { icon: "🏦", tint: "#EAF0FA", t: "CBE Birr", d: "Kaffaltiiwwan 142 har’a walsimaniiru" },
        { icon: "#", tint: "#F4EAFA", t: "USSD", d: "Miseensonni 38 amma fayyadamaa jiru" },
        { icon: "⚡", tint: "#FDF3DC", t: "Damee Olaanaa", d: "Dameen Adaamaa qusannaan dursaa jira" },
        { icon: "∞", tint: "#EAF0FA", t: "Walsimsiisa Dabtaraa", d: "Karaa hundaan yeroo tokkotti kan haaromu" },
      ],
      workflow: {
        loan: "Liqaa LN-2039",
        input: "Galtee",
        disbursement: "Kaffaltii Gadhiisuu",
        signed: "Mallattaa’e 3/3",
      },
      analytics: {
        branchMix: "Qooda Dameewwanii",
        month: "Ebla 2026",
        savingsTrend: "Guddina Qusannaa",
        timeframe: "Ji’oota 6n Darban",
      },
    },
    serviceGallery: {
      note: "Fakkii mul’isaa — fakkiiwwan sirriin bakka buusaa keessatti",
      ariaShow: "Fakkii agarsiisi",
      screenshotAlt: "Fakkii agarsiisaa",
    },
    common: {
      prev: "Duraa",
      next: "Itti Aanu",
      appScreens: "Iskiriiniiwwan Appii",
      prevScreen: "Iskiriinii duraa",
      nextScreen: "Iskiriinii itti aanu",
      themeLight: "Haala ifaatti jijjiiri",
      themeDark: "Haala dukkanaatti jijjiiri",
      selectLanguage: "Afaan filadhaa",
      languagesHeader: "Afaanota / Languages",
    },
  },

  so: {
    nav: {
      brand: "Bruh Tech Solution",
      process: "Habka",
      platform: "Madalka",
      products: "Badeecadaha",
      modules: "Qaybaha",
      app: "App-ka",
      team: "Kooxda",
      impact: "Saameynta",
      contact: "Xiriir",
      requestDemo: "Codso Muuqaal",
    },
    hero: {
      headline: "Nidaamka bangiga dhexe ee SACCO — ku shaqeeya PC-ga xafiiska iyo Cloud-ka.",
      subhead:
        "Bruh Tech Solution waxay iskaashatooyinka kaydka iyo deynta Itoobiya siisaa nidaam bangi oo heer sare ah. Waxaa si toos ah loogu rakibi karaa kombuyuutarka PC-ga ee xafiiska ama waxaa lagu hawlgelin karaa Cloud-ka — iyadoo ay tijaabiyeen macaamiil sida Maedot SACCO.",
    },
    process: {
      tag: "// Habka Hirgelinta //",
      title: "Doorashooyin dabacsan: PC-ga Xafiiska & Cloud-ka.",
      subhead:
        "Bruh Tech Solution waxay nidaamka si toos ah ugu rakibtaa kumbuyuutarrada xafiiskaaga ama waxay ku habaysaa Cloud sugan oo si degdeg ah loo bilaabo.",
      steps: [
        {
          id: "01",
          number: "01",
          title: "Ku Rakibidda PC-ga ama Cloud-ka",
          description:
            "Nidaamka si toos ah ugu rakib kumbuyuutarka PC-ga xafiiska (bilaa internet) ama ku fur Cloud sugan oo leh PostgreSQL iyo Redis.",
        },
        {
          id: "02",
          number: "02",
          title: "Diiwaangelinta Xubnaha & Fayda KYC",
          description:
            "Soo saarista lambarka MEM00000001, xaqiijinta aqoonsiga qaranka Fayda ee 16-ka god ah, iyo diiwaangelinta dhaxalka.",
        },
        {
          id: "03",
          number: "03",
          title: "Kaydka, Deynta & Ansixinta 3-Heer",
          description:
            "Kaydka qasabka ah (MS001) iyo ikhtiyaariga ah (VS001), qiimeynta hantida, iyo habka: Sarkaalka Deynta -> Maareeyaha -> Maaliyadda.",
        },
        {
          id: "04",
          number: "04",
          title: "Xisaabinta Laba-Geesoodka ah & Tababarka",
          description:
            "Diiwaangelinta tooska ah ee xisaabaadka dheelitiran (COA), xiritaanka muddada xisaabta, iyo tababar buuxa oo la siiyo shaqaalaha.",
        },
      ],
    },
    platform: {
      title: "Afar nidaam oo muhiim ah. Xawaaraha PC-ga xafiiska iyo awoodda Cloud-ka.",
      items: [
        {
          t: "1. Maamulka Xubnaha & Fayda KYC",
          d: "Soo saarista lambarka MEM, xaqiijinta aqoonsiga Fayda 16-god, qoondaynta dhaxalka, iyo furitaanka tooska ah ee xisaabta kaydka.",
        },
        {
          t: "2. Nidaamka Kaydka & Dhigaalka",
          d: "Kaydka qasabka ah (MS001) iyo kan ikhtiyaariga ah (VS001), xisaabinta hantida iyo dahabka, iyo soo saarista warbixinnada xisaabta.",
        },
        {
          t: "3. Wareegga Deynta & Ansixinta Heerar Badan",
          d: "Habka 3-heer: Sarkaalka Deynta -> Maareeyaha -> Maaliyadda, xisaabinta deynta PMT ee firfircoon, iyo bixinta qayb-ka-mid ah.",
        },
        {
          t: "4. Diiwaanka Xisaabinta Laba-Geesoodka ah",
          d: "Diiwaangelinta tooska ah ee debit iyo credit dheellitiran, xakamaynta xilliyada xisaabta, iyo u hoggaansanaanta shuruucda maaliyadeed.",
        },
      ],
    },
    letsBuild: {
      left: "Aynu",
      right: "dhisno",
      eye: "( Mustaqbalka Iskaashatada )",
      hint: "Hoos u rogo si aad u aragto",
      subhead:
        "Diyaar ma u tahay inaad iskaashatadaada ku casriyayso Bruh Tech Solution? Haddii aad doonayso rakibaad PC xafiiseed ama Cloud buuxa, kooxdayada Addis Ababa waxay diyaar u tahay inay ku caawiso.",
      cta: "Ballanso Muuqaalka Nidaamka",
    },
    products: {
      eyebrow: "( Saddexda Badeecadood )",
      title: "Saddex xiriiriyeyaal casri ah. Hal diiwaan oo buuxa.",
      subhead: "Nidaamka bangiga dhexe ee SACCO oo leh barnaamijyada xubnaha iyo adeegga USSD.",
      p1: {
        tag: "PC Xafiiseed / Cloud Core",
        title: "Bruh Tech Core SACCO System",
        desc: "Matoorka bangiga dhexe ee sugan. Si toos ah ugu shaqeeya kumbuyuutarrada PC-ga xafiiska ama Cloud-ka. Waxaa lagu dhisay Spring Boot 3.3, Java 21, PostgreSQL iyo 94+ rukhsado.",
        more: "Ku shaqeeya PC-ga xafiiska iyo Cloud-ka",
        chips: ["Xubnaha iyo KYC", "Kaydka iyo Muddo Cayiman", "Saamiyada iyo Faa'iidada", "Deynta, Dammaanadaha iyo Oggolaanshaha", "Diiwaanka Guud iyo Xisaabaadka", "Khasnajiga, Lacagta Caddanka iyo Laamaha", "Warbixinada Maaliyadda iyo NBE", "Raad-raaca Hanti-dhowrka", "Doorka iyo Idanka", "Isku-xirka Telebirr, M-Pesa iyo Bangiyada"],
      },
      p2: {
        tag: "Android / iOS",
        title: "App-ka Bangiga ee Xubnaha",
        desc: "Khibradda xubinta — hubi xisaabta kaydka, codso deymo, la soco dammaanad-qaadayaasha, kuna soo degso bayaannada 5 luqadood.",
        more: "Waxaa lagu heli karaa 5 luqadood",
        chips: ["Galitaanka Faraha", "Haraaga iyo Warbixinta", "Dhigaalka iyo Lacag-bixinta", "Wareejinta Lacagta", "Codsiga Deynta iyo Dib-u-bixinta", "Codsiyada Dammaanadaha", "Biilasha iyo Hadalka", "Lacag-bixinta QR", "Ogeysiisyada Tooska ah", "Caawinta Tooska ah"],
      },
      p3: {
        tag: "Taleefannada Caadiga ah",
        title: "Bangiga USSD (*889#)",
        desc: "Banginimo buuxda oo bilaa internet ah taleefan kasta. Ka hel kaydka, xaaladda deynta, iyo wareejinta Telebirr/CBE.",
        more: "Wuxuu ku shaqeeyaa taleefan kasta",
        chips: ["Diiwaangelinta iyo PIN-ka", "Haraaga iyo Warbixin Kooban", "Dhigaalka iyo Bixinta", "U Wareejinta Xubin ama Bangi", "Codsiga iyo Bixinta Deynta", "Saamiyada iyo Faa'iidada", "Hadalka iyo Biilasha", "Raadinta Laanta"],
      },
    },
    modules: {
      eyebrow: "( Madalka Bruh Tech )",
      title: "Dhammaan qaybaha SACCO, loogu talagalay PC & Cloud",
      requestDemo: "Codso Muuqaal",
      viewDetails: "Faahfaahinta Eeg",
    },
    appShots: {
      eyebrow: "Khibradda Xubinta",
      title: "Bangi casri ah oo ku jira jeebka xubin kasta.",
      s1: {
        t: "Dashboard-ka tooska ah ee xubinta",
        d: "Muuqaalka kaydka qasabka ah (MS001), kaydka ikhtiyaariga ah (VS001), saamiyada, iyo dhaqdhaqaaqyadii ugu dambeeyay.",
      },
      s2: {
        t: "Fayda KYC & Xogta Xubinta",
        d: "Aqoonsiga Fayda 16-god ee la xaqiijiyay, kaarka aqoonsiga dhijitaalka ah, iyo xogta dhaxalka oo buuxda.",
      },
      s3: {
        t: "La socoshada ansixinta deynta",
        d: "Muuqaal toos ah oo muujinaya marxaladaha: Sarkaalka Deynta, Maareeyaha, iyo bixinta Maaliyadda.",
      },
      s4: {
        t: "Xisaabiyaha deynta ee PMT",
        d: "Xisaabinta bishiiba la bixinayo, dulsaarka, iyo jadwalka bixinta deynta oo cad.",
      },
      s5: {
        t: "Ku hadla luqaddaada",
        d: "Af-Soomaali, Afaan Oromoo, Amxaari, Tigrinya, iyo Ingiriis — xubnuhu waxay ku maamushaan luqadooda.",
      },
    },
    team: {
      eyebrow: "Kooxda",
      title: "La kulan injineerada Bruh Tech Solution",
      roles: {
        matyas: "Aasaase-wadaage • Falanqeeyaha Ganacsiga",
        abenezer: "Aasaasaha • Injineer Buuxa oo Software",
        mulisa: "Khabiirka Suuqgeynta",
        sarah: "La-taliyaha Guud",
      },
      names: {
        matyas: "Matyas Abera",
        abenezer: "Abenezer Kifle",
        mulisa: "Mulisa Tadesse",
        sarah: "Sarah Mitchell",
      },
      aria: {
        prev: "Xubinta kooxda ee hore",
        next: "Xubinta kooxda ee xigta",
      },
    },
    thenNow: {
      eyebrow: "( Shalay → Maanta )",
      title: "Qiimaha iskaashatadu waa sidii. Xisaabinta ayaa casriyowday.",
      desc: "Sanado badan, xubnuhu waxay ku shaqayn jireen buugaag warqad ah. Bruh Tech Solution waxay bixisaa nidaam casri ah oo ku shaqeeya PC-ga xafiiska iyo Cloud-ka — iyadoo ay aamineen iskaashatooyinka sida Maedot SACCO.",
      oldTag: "Nidaamkii Warqadda ee Hore",
      modernAria: "Habka casriga ah — bixinta lacagta dhijitaalka ah ee SACCO",
      tradAlt: "Wadashaqeyntii hore ee xilligii waraaqaha",
      newTag: "Nidaamka Dhijitaalka ah ee Bruh Tech",
      newChips: [
        "Ku shaqeeya PC-ga xafiiska iyo Cloud-ka",
        "Xaqiijinta Fayda KYC ee 16-god",
        "Ansixinta deynta ee 3-heer ah",
        "Xisaabinta tooska ah ee laba-geesoodka ah",
      ],
      oldChips: [
        "Buugaagta warqadda iyo isku-darka gacanta",
        "Lacag caddaan ah oo sanduuq ku xiran",
        "Toddobaadyo sugitaan go'aanka deynta",
        "U nuglaanshaha khaladaadka xisaabta",
      ],
    },
    teamsTabs: {
      title: "Loo dhisay dhammaan kooxaha SACCO",
      subhead: "Haddii aad leedahay hal laan ama federaal, madalku wuxuu la qabsanayaa qaabka shaqadaada.",
      tellers: {
        tab: "Khasnajiyada laamaha",
        h: "Jooji gelinta xogta dhowr jeer",
        d: "Nidaamku wuxuu isku xiraa kanaalada oo dhan — khasnajiga, Telebirr, CBE, USSD — hal marna wuu qoraa.",
      },
      committees: {
        tab: "Guddiyada deynta",
        h: "Ku qabo shaqo badan guddi kooban",
        d: "Deji silsiladda oggolaanshaha; nidaamku wuxuu kaydiyaa saxiixyada iyo diiwaanka xisaab-xirka.",
      },
      executives: {
        tab: "Maamulayaasha",
        h: "Ka maamul dhammaan laamaha hal xudun",
        d: "Warbixinada sharciyeed iyo kuwa maamulka oo diyaar ah waqti kasta.",
      },
    },
    teamTiles: {
      title: "Loo dhisay qaabka ay kooxdaadu u fikirto.",
      d1_title: "Xog-muujiyaha Waqtiga Dhabta ah",
      d1_desc: "Xogta laamaha oo cusboonaata isla marka khasnajigu xog geliyo.",
      d2_title: "Caawiyaha AI",
      d2_desc: "Weydii su'aalo af cad ah oo hel jawaabta xisaab-xirka iyo warbixinteeda.",
      d3_title: "Warbixinno Hal Gujin ah",
      d3_desc: "Warbixinada NBE iyo guddiga oo lagu diyaariyo ilbiriqsiyo gudahood.",
      d4_title: "Digniino Caqli Badan",
      d4_desc: "Hel digniin isla marka ay dhacdo wax aan caadi ahayn.",
      d5_title: "Wada-shaqeynta Kooxda",
      d5_desc: "Laamaha, guddiyada iyo xisaabiyeyaashu waxay ka wada shaqeeyaan hal meel.",
      cards: {
        activeMembers: "Xubnaha Firfircoon",
        recentReports: "Warbixinadii Ugu Dambeeyay",
        nbePack: "Xirmada Bishii ee NBE",
        completed: "Dhammaystiran",
        dividendForecast: "Saadaasha Faa'iidada",
        inReview: "Dib u eegis ku socota",
        alertMsg: "PAR 30 wuxuu Adama ku kordhay 0.6% — dib u eeg 4 deyn",
        branches: "Laamaha",
        creditCommittee: "Guddiga Deynta",
        auditors: "Hanti-dhowrka",
      },
      questions: ["Laankee baa si xawli ah u kortay?", "Is barbar dhig dhigaalka Q1 iyo Q2", "Ayaa dib uga dhacay bixinta deynta?"],
    },
    serviceDetail: {
      backToModules: "Dhammaan qaybaha",
      moduleLabel: "Qaybta",
      of15: "ka mid ah 15",
      keyFeatures: "Astaamaha muhiimka ah",
      previous: "Hore",
      next: "Xiga",
      atAGlance: "Jiritaanka guud",
      capabilitiesLabel: "Awoodaha",
      featuresCount: "astaamood",
      partOfLabel: "Qayb ka ah",
      partOfValue: "Ethio SACCO Core",
      channelsLabel: "Kanaalada",
      channelsValue: "Web · Moobayl · USSD",
      requestDemo: "Codso bandhig",
      browseAll: "Eeg dhammaan qaybaha",
      screenshotNote: "Sawirro ku meel gaar ah — ku beddel sawirrada dhabta ah",
      footerCopyright: "Bruh Tech Solution — Addis Ababa, Itoobiya",
    },
    contact: {
      eyebrow: "Bilaaw Maanta",
      title: "Ku beddel iskaashatadaada nidaam dhijitaal ah.",
      desc: "Kooxdayada Bruh Tech Solution ee Addis Ababa waxay diyaar u yihiin inay kuugu rakibaan PC-ga xafiiskaaga ama Cloud-ka.",
      cta: "Codso Muuqaal Bilaash ah",
      email: "hello@bruhtech.com",
    },
    footer: {
      rights: "Bruh Tech Solution. Xuquuqda oo dhan way dhowran tahay.",
      loc: "Addis Ababa, Itoobiya",
      tagline: "Shirkad tignoolajiyada maaliyadda ee Itoobiya!",
      bio: "Bruh Tech Solution waxay dhistaa nidaamyo maaliyadeed oo casri ah oo sugan si kor loogu qaado iskaashatooyinka SACCO ee dalka oo dhan.",
      home: "Bogga Hore",
      products: "Badeecadaha",
      platform: "Madalka",
      modules: "Qaybaha",
      aboutUs: "Nagu Saabsan",
      process: "Habka",
      callCenter: "Xarunta Wicitaanka",
      phone1: "+251 910 979060",
      phone2: "+251 946 642299",
      phone3: "+251 911 487246",
      locationTitle: "Goobteena",
      address: "Sarbet | Agagaarka Hay'adda Waddooyinka Addis Ababa | Dhismaha Elilta Dabaqa 3aad, Xafiiska No. 301",
    },
    flowMocks: {
      core: {
        nav: ["Dashboard-ka", "Xubnaha", "Keydka", "Deyn-bixinta", "Saamiyada", "Warbixinnada"],
        totalSavings: "Wadarta Keydka",
        quarterGrowth: "▲ 12.4% rubacan",
        members: "Xubnaha",
        activeLoans: "Deymaha Shaqeynaya",
        par30: "PAR 30 (Khatarta Ku Jira)",
        growth: "Koriinka Guud ee Sanduuqa",
      },
      teller: {
        title: "Safafka Lacag-qabayaasha — Laanta Adama",
        deposit: "SV-1180 · Dhigaalka Keydka",
        repayment: "LN-1902 · Bixinta Deynta",
        shares: "SH-0042 · 12 Saamiyo",
        post: "Diiwaangeli",
        posted: "Waa la diiwaangeliyey ✓",
        eod: "Xiritaanka Maalinta",
        reconciled: "Waa la is-waafajiyey ✓ · 0 khilaaf",
      },
      pay: {
        title: "Waddooyinka Lacag-bixinta — Hal Mar Diiwaangashan",
        channels: ["Telebirr", "CBE Birr", "USSD *889#"],
        oneLedger: "Hal Buug-weyn",
        todayVol: "Maanta ETB 2.4 Milyan",
        live: "Si toos ah la isugu waafajiyey",
      },
      audit: {
        title: "Warbixinnada iyo Raad-raaca Hantidhawrka",
        nbe: "Warbixinta Bilaha ah ee Bangiga Dhexe",
        dividend: "Qaabka Qaybinta Faa'iidada",
        pl: "Faa'iidada iyo Qasaarada Laanta",
        generated: "Waa la diyaariyey",
        scheduled: "Waa la qorsheeyey",
        log1: "09:41 · Lacag-qabuhu wuxuu diiwaangeliyey SV-1180 — saxiixan",
        log2: "09:42 · Diiwaanka LN-1902 — xaqiijin laba-geesood ah",
        log3: "09:44 · Xirmada warbixinta waa la xiray — hash-ka waa la keydiyey",
      },
    },
    productMocks: {
      mobile: {
        greeting: "Salaan, Meseret 👋",
        totalSavings: "Wadarta Keydka",
        passbookNotice: "Buugga Keydka SV-1180 · Hadda la cusbooneysiiyey",
        actions: ["Dhigasho", "La bixid", "Deyn", "Saami"],
        goalTitle: "Hadafka Cayilinta Dibiga",
        depositItem: "Dhigaalka — Telebirr",
        loanRepayItem: "Bixinta Deynta",
      },
      ussd: {
        head: "*889# · Maedot SACCO",
        menu: [
          "1. Hubinta Hadhaaga",
          "2. Dhigasho (Telebirr)",
          "3. Lacag la bixid",
          "4. U wareeji xubin",
          "5. Xaaladda deynta",
          "6. Iibso saamiyo",
          "7. Warbixin kooban",
          "0. Caawinaad",
        ],
        reply: "Jawaab: 1",
      },
    },
    teamsTabsMocks: {
      feed: [
        { icon: "₸", tint: "#E8F4EC", t: "Telebirr", d: "Dhigaalka waa la xaqiijiyey · ETB 4,500" },
        { icon: "◍", tint: "#FDF3DC", t: "Faa'iidada Keydka", d: "8.2% awoodda faa'iido-qaybsiga sanadkan" },
        { icon: "🏦", tint: "#EAF0FA", t: "CBE Birr", d: "142 xisaabood maanta la is-waafajiyey" },
        { icon: "#", tint: "#F4EAFA", t: "USSD", d: "38 xubnood hadda isticmaalaya" },
        { icon: "⚡", tint: "#FDF3DC", t: "Laanta Ugu Sarreysa", d: "Laanta Adama ayaa hormuud ka ah dhigaalka toddobaadkan" },
        { icon: "∞", tint: "#EAF0FA", t: "Isku-dhafka Buugga", d: "Dhammaan kanaalada mar qura cusbooneysiiya" },
      ],
      workflow: {
        loan: "Deyn LN-2039",
        input: "Gelinta Codsiga",
        disbursement: "Bixinta Lacagta",
        signed: "Saxiixan 3/3",
      },
      analytics: {
        branchMix: "Isku-darka Laamaha",
        month: "Abriil 2026",
        savingsTrend: "Isbeddelka Keydka",
        timeframe: "6-dii Bilood ee La Soo Dhaafay",
      },
    },
    serviceGallery: {
      note: "Sawirrada muunadda ah — ku beddel sawirrada dhabta ah ee softiweerka gudaha",
      ariaShow: "Muuji sawirka shaashadda",
      screenshotAlt: "Sawirka shaashadda",
    },
    common: {
      prev: "Kii Hore",
      next: "Kii Xiga",
      appScreens: "Shaashadaha App-ka",
      prevScreen: "Shaashadda hore",
      nextScreen: "Shaashadda xigta",
      themeLight: "U beddel habka iftiinka",
      themeDark: "U beddel habka mugdiga",
      selectLanguage: "Dooro luqadda",
      languagesHeader: "Luqadaha / Languages",
    },
  },

  ti: {
    nav: {
      brand: "ብሩህ ቴክ",
      process: "መስርሕ",
      platform: "ፕላትፎርም",
      products: "ፍርያት",
      modules: "ሞጁላት",
      app: "መተግበሪ",
      team: "ጋንታና",
      impact: "ለውጢ",
      contact: "ርኸቡና",
      requestDemo: "ፈተነ ሕተቱ",
    },
    hero: {
      headline: "ናይ ሳኮ ኮር ባንኪንግ ሲስተም — ኣብ ናይ ቢሮ ኮምፒውተር (PC)ን ኣብ ክላውድን ዝሰርሕ።",
      subhead:
        "ብሩህ ቴክ ሶሉሽን ንናይ ዕቋርን ልቓሕን ሕብረት ስራሕ ማሕበራት ብዘመናዊ ኮር ባንኪንግ ቴክኖሎጂ የጎልብት። ኣብ ናይ ቢሮ ፒሲ ብቐጥታ ብዘይ ኢንተርኔት ክሰርሕ ዝኽእል ወይ ድማ ኣብ ክላውድ ዝዝርጋሕ — ከም ማዕዶት ሳኮ ብዝበሉ ማሕበራት ብተግባር ዝተረጋገፀ።",
    },
    process: {
      tag: "// ናይ ምስራሕ መስርሕ //",
      title: "ምቹእ ናይ ምዝርጋሕ ኣማራፂ፦ ኣብ ናይ ቢሮ ፒሲ (Local PC)ን ኣብ ክላውድን።",
      subhead:
        "ብሩህ ቴክ ሶሉሽን ነቲ ናይ ሳኮ ፕላትፎርም ኣብ ናይ ቢሮ ኮምፒውተር ብቐጥታ ብምፅዓን ወይ ኣብ ክላውድ ብምድላው ብቕልጡፍ የረክብ።",
      steps: [
        {
          id: "01",
          number: "01",
          title: "ኣብ ናይ ቢሮ ፒሲ ወይ ኣብ ክላውድ ምፅዓን",
          description:
            "ነቲ ሲስተም ኣብ ናይ ቢሮ ዴስክቶፕ/ላፕቶፕ ብቐጥታ ምፅዓን ወይ ድማ ውሑስ ኣብ ዝኾነ ናይ ክላውድ ሰርቨር ምድላው።",
        },
        {
          id: "02",
          number: "02",
          title: "ምዝገባ ኣባላትን ፋይዳ ኬዋይሲን",
          description:
            "ተኸታታሊ ናይ MEM00000001 መፍለዪ ቑፅሪ ብኣውቶማቲክ ምፍጣር፣ 16-ዲጂት ፋይዳ ሃገራዊ መፍለዪ ምርግጋጽን ምዝገባ ወረስትን።",
        },
        {
          id: "03",
          number: "03",
          title: "ዕቋር፣ ልቓሕን 3-ብርኪ መረጋገፂን",
          description:
            "ናይ ግዴታ (MS001)ን ናይ ድሌትን (VS001) ዕቋራት፣ ግመታ ንብረትን ናይ ኦፊሰር -> ስራሕ መካየዲ -> ፋይናንስ ምርግጋጽን።",
        },
        {
          id: "04",
          number: "04",
          title: "ድርብ መዝገብ ሒሳብን ስልጠናን",
          description:
            "ብኣውቶማቲክ ዝተመጣጠነ ጆርናል ዘቐምጥ ናይ ሒሳብ መደብ (COA)፣ መዕፀዊ እዋን ሒሳብን ንሰራሕተኛታት ምሉእ ስልጠና ምሃብን።",
        },
      ],
    },
    platform: {
      title: "ኣርባዕተ ወሰንቲ ንኡሳን ስርዓታት። ናይ ቢሮ ፒሲ ቅልጣፈን ናይ ክላውድ ሓይልን።",
      items: [
        {
          t: "1. ምሕደራ ኣባላትን ፋይዳ ምርግጋጽን",
          d: "ውሑስ ተኸታታሊ MEM መፍለዪ ምፍጣር፣ ናይ 16-ዲጂት ፋይዳ ምርግጋጽ፣ ምደባ ወረስትን ኣብ ምዝገባ ቀጥታ ሒሳብ ምኽፋትን።",
        },
        {
          t: "2. ናይ ዕቋርን ተቐማጦን ንኡስ ስርዓት",
          d: "ናይ ግዴታ (MS001)ን ናይ ፍቓድን (VS001) ዕቋራት፣ ውሑስ ናይ ወፃእን ኣታዊን መስርሕ፣ ናይ ዓይነት ንብረትን ወርቅን ምዝገባ።",
        },
        {
          t: "3. ናይ ልቓሕ መስርሕን ብዝተፈላለየ ብርኪ ምርግጋጽን",
          d: "ኦፊሰር ልቓሕ -> ስራሕ መካየዲ -> ፋይናንስ፣ ተለዋዋጢ ናይ PMT ቀመር ስሌትን ብኸፊል ናይ ምኽፋል ኣሰራርሓን።",
        },
        {
          t: "4. ድርብ መዝገብ ሓፈሻዊ ናይ ሒሳብ መዝገብ",
          d: "ንነፍሲ ወከፍ ምንቅስቓስ ብኣውቶማቲክ ዝተመጣጠነ ዴቢትን ክሬዲትን ምምዝጋብ፣ ናይ እዋን ሒሳብ መዕፀዊ ምቁፅፃርን ሕጋዊ ፀብፃባትን።",
        },
      ],
    },
    letsBuild: {
      left: "ንዑ",
      right: "ንህነፅ",
      eye: "( መፃኢ ሕብረት ስራሕ ማሕበራት )",
      hint: "ንምርኣይ ንታሕቲ ሕሰቡ",
      subhead:
        "ማሕበርኩም ብብሩህ ቴክ ሶሉሽን ንምሕዳስ ድሉዋት ዲኹም? ኣብ ናይ ቢሮ ፒሲ ወይ ኣብ ክላውድ ንምፅዓን ኣብ ኣዲስ ኣበባ ዝርከብ ጋንታና ድሉው እዩ።",
      cta: "ናይ ስርዓቱ መብርሂ ቖፀሮ ሓዙ",
    },
    products: {
      eyebrow: "( ሰለስተ ፍርያት )",
      title: "ሰለስተ ዘመናዊ መራኸቢታት። ሓደ ወጥ ናይ ሒሳብ መዝገብ።",
      subhead: "ንኦዲት ብቑዕ ዝኾነ ናይ ሳኮ ኮር ባንኪንግ ሲስተም ምስ ናይ ኣባላት ሞባይል መተግበሪን USSD ኣገልግሎትን።",
      p1: {
        tag: "ኣብ ቢሮ ፒሲ / ኣብ ክላውድ",
        title: "ናይ ብሩህ ቴክ ኮር ሳኮ ሲስተም",
        desc: "ኣብ ናይ ቢሮ ኮምፒውተር ብቐጥታ ዝሰርሕ ወይ ኣብ ክላውድ ዝተኣናገደ ኮር ባንኪንግ ሲስተም። ብ Spring Boot 3.3፣ Java 21፣ PostgreSQLን 94+ ፍቓዳትን ዝተሃነፀ።",
        more: "ኣብ ናይ ቢሮ ፒሲን ኣብ ክላውድን ይሰርሕ",
        chips: ["ምዝገባ ኣባላትን ኬዋይሲን", "ስሩዕን ናይ ግዜ ገደብን ቁጠባ", "ኣክስዮንን መክሰብን", "ልቓሕ፣ ዋሕስን ምጽዳቕን", "ቀንዲ መዝገብን ናይ ሕሳብ ሰሌዳን", "ተለር፣ ጥረ ገንዘብን ጨናፍርን", "ናይ ፋይናንስን ናይ ቁጽጽርን ሪፖርታት", "ናይ ኦዲት ምክትታል", "ግደን ፍቓድን ተጠቀምቲ", "ምስ ቴሌብር፣ ኤም-ፔሳን ባንክታትን ምትእስሳር"],
      },
      p2: {
        tag: "ኣንድሮይድ / ኣይኦኤስ",
        title: "ናይ ኣባላት ናይ ሞባይል ባንኪንግ መተግበሪ",
        desc: "ናይ ኣባላት መተግበሪ — ናይ ግዴታን ፍቓድን ዕቋር ምርኣይ፣ ልቓሕ ምሕታት፣ ዋሕስ ምትትታልን መግለፂ ሒሳብ ብ5 ቋንቋታት ምውራድን።",
        more: "ብ5 ናይ ኢትዮጵያ ቋንቋታት ይርከብ",
        chips: ["ብናይ ኣጻብዕቲ ፊርማ ምእታው", "ዝተረፈ ሕሳብን ስቴትመንትን", "ገንዘብ ምቕማጥን ምውጻእን", "ገንዘብ ምትሕልላፍ", "ሕቶ ልቓሕን ምኽፋልን", "ሕቶ ዋሕስ", "ናይ ቢል ክፍሊትን ኣየር ሰዓትን", "ናይ QR ክፍሊት", "ናይ ቀጥታ መልእኽትታት", "ናይ ቀጥታ ሓገዝ"],
      },
      p3: {
        tag: "ተራ ተንቀሳቐስቲ ስልክታት",
        title: "ናይ ዩኤስኤስዲ (USSD) ባንኪንግ (*889#)",
        desc: "ኢንተርኔት ከየድለየ ኣብ ዝኾነ ስልኪ ባንኪ ምጥቃም። ዕቋር ምርኣይ፣ ኩነታት ልቓሕ ምትትታልን ብቴሌብር/ሲቢኢ ምስግጋርን።",
        more: "ብዘይ ኢንተርኔት ኣብ ኩሉ ስልኪ ይሰርሕ",
        chips: ["ምዝገባን ፒን ኮድን", "ዝተረፈ ሕሳብን ሓጺር ስቴትመንትን", "ምቕማጥን ምውጻእን", "ናብ ኣባል ወይ ባንኪ ምትሕልላፍ", "ልቓሕ ምሕታትን ምኽፋልን", "ኣክስዮንን መክሰብን", "ኣየር ሰዓትን ቢልን", "ጨንፈር መእለሺ"],
      },
    },
    modules: {
      eyebrow: "( ናይ ብሩህ ቴክ ፕላትፎርም )",
      title: "ሙሉእ ናይ ሳኮ ሞጁላት፣ ንፒሲን ክላውድን ዝተዳለወ",
      requestDemo: "ፈተነ ሕተቱ",
      viewDetails: "ዝርዝር ርኣዩ",
    },
    appShots: {
      eyebrow: "ናይ ኣባላት ተሞክሮ",
      title: "ዘመናዊ ናይ ሕብረት ስራሕ ባንኪ ኣብ ኢድ ነፍሲ ወከፍ ኣባል።",
      s1: {
        t: "ናይ ኣባል ናይ ቀጥታ ዳሽቦርድ",
        d: "ናይ ግዴታ ዕቋር (MS001)፣ ናይ ፍቓድ ዕቋር (VS001)፣ ፅላላት ኣክሲዮንን ናይ ቀረባ ናይ ሒሳብ ምንቅስቓስን ኣብ ሓደ ቦታ።",
      },
      s2: {
        t: "ፋይዳ ኬዋይሲን መግለፂ ኣባልነትን",
        d: "ዝተረጋገፀ 16-ዲጂት ፋይዳ፣ ዲጂታል ናይ ማሕበር መፍለዪ ካርድን ዝተመዝገቡ ወረስትን።",
      },
      s3: {
        t: "ምክትታል መስርሕ ልቓሕ",
        d: "ሕቶ ልቓሕ ብኦፊሰር፣ ስራሕ መካየዲን ክፍሊ ፋይናንስን ዝበፅሖ ብርኪ ብንፁር ምርኣይ።",
      },
      s4: {
        t: "ናይ ልቓሕ ክፍሊት መሕሰቢ ማሽን (PMT)",
        d: "ወርሓዊ ክፍሊት፣ ዋና ገንዘብን ወለድን፣ ከምኡ’ውን ናይ ምኽፋል ናይ ግዜ ሰሌዳ።",
      },
      s5: {
        t: "ብቋንቋኹም ይሰርሕ",
        d: "ትግርኛ፣ ኣምሓርኛ፣ ኦሮምኛ፣ ሶማልኛን እንግሊዝኛን — ኣባላት ብዝርድእዎ ቋንቋ ይጥቀሙ።",
      },
    },
    team: {
      eyebrow: "ጋንታና",
      title: "ናይ ብሩህ ቴክ ሶሉሽን መሃንድሳት ፍለጡ",
      roles: {
        matyas: "ተሓጋጋዚ መስራቲ • ናይ ቢዝነስ ኣናሊስት",
        abenezer: "መስራቲ • ፉል-ስታክ ሶፍትዌር ኢንጂነር",
        mulisa: "ናይ ማርኬቲንግ ስፔሻሊስት",
        sarah: "ዋና ኣማኻሪት",
      },
      names: {
        matyas: "ማትያስ ኣበራ",
        abenezer: "ኣቤኔዘር ክፍሌ",
        mulisa: "ሙሊሳ ታደሰ",
        sarah: "ሳራ ሚቼል",
      },
      aria: {
        prev: "ዝሓለፈ ኣባል ጋንታ",
        next: "ዝቕጽል ኣባል ጋንታ",
      },
    },
    thenNow: {
      eyebrow: "( ትማሊ → ሎሚ )",
      title: "ናይ ማሕበር ሕብረት ከምዘለዎ እዩ። ናይ ሒሳብ ኣተሓሕዛ ግን ዘሚኑ።",
      desc: "ንዓመታት ኣባላት ብናይ ወረቐት ደብተር ይሰርሑ ነይሮም። ብሩህ ቴክ ሶሉሽን ኣብ ናይ ቢሮ ፒሲን ኣብ ክላውድን ዝሰርሕ ዘመናዊ ሲስተም የቕርብ — ከም ማዕዶት ሳኮ ብዝበሉ ማሕበራት ዝተመስከረሉ።",
      oldTag: "ናይ ቀደም ናይ ወረቐት ኣሰራርሓ",
      modernAria: "ዘመናዊ ኣሰራርሓ — ብሳኮ ፕላትፎርም ዲጂታል ክፍሊት ምፍጻም",
      tradAlt: "ናይ ቀደም ናይ ወረቐት ዘመን ሕብረት ስራሕ ማሕበር",
      newTag: "ናይ ብሩህ ቴክ ዲጂታል ኮር",
      newChips: [
        "ኣብ ናይ ቢሮ ፒሲ ወይ ኣብ ክላውድ ይሰርሕ",
        "ናይ 16-ዲጂት ፋይዳ ኬዋይሲ ምርግጋጽ",
        "ብ3-ብርኪ ዝረጋገጽ ውሑስ ልቓሕ",
        "ናይ ቀጥታ ድርብ መዝገብ ሒሳብ",
      ],
      oldChips: [
        "ናይ ወረቐት ደብተርን ብኢድ ዝተሰርሑ ድምርን",
        "ኣብ ሳንዱቕ ዝተዓሸገ ጥረ ገንዘብ",
        "ንውሳነ ልቓሕ ንሳምንታት ምፅባይ",
        "ንጌጋን ንጥፍኣትን ዝተቓልዐ ኣሰራርሓ",
      ],
    },
    teamsTabs: {
      title: "ንኹሎም ናይ ሳኮ ኣካላት ዝተዳለወ",
      subhead: "ሓደ ጨንፈር ወይ ብርክት ዝበሉ ማሕበራት እንተመሪሕኩም፣ እቲ ሲስተም ምስ ናይ ስራሕ ኣገባብኩም ብቐሊሉ ይላመድ።",
      tellers: {
        tab: "ንገንዘብ ተቐበልቲ (ተለራት)",
        h: "ደጋጊምካ መረዳእታ ምእታው ኣየድልን",
        d: "እቲ ማእኸል ንኹሉ መስመራት የራኽብ — ተለር፣ ቴሌብር፣ ሲቢኢን ዩኤስኤስዲን — ነፍሲ ወከፍ ምንቅስቓስ ብሓንሳብ ይመዝገብ።",
      },
      committees: {
        tab: "ንናይ ልቓሕ ኮሚቴታት",
        h: "ብውሑዳት ኣባላት ኮሚቴ ዝበለፀ ስራሕ ኣሳልጡ",
        d: "ናይ ምጽዳቕ መስርሕ ሓንሳብ ወስኑ፤ እቲ ሲስተም ፈረማታት መዝጊቡ ናይ ኦዲት ተሓታትነት የረጋግፅ።",
      },
      executives: {
        tab: "ንሓለፍቲ ስራሕ",
        h: "ንኹሎም ጨናፍር ካብ ሓደ ማእኸል ምምሕዳር",
        d: "ናይ ብሄራዊ ባንኪ ሪፖርታትን ናይ ውሳነ ሓበሬታታትን ብቕልጡፍ ይዳለዉ።",
      },
    },
    teamTiles: {
      title: "ጋንታኹም ብዝሓስበሉ ኣገባብ ክሰርሕ ዝተዳለወ።",
      d1_title: "ናይ ቀጥታ ዳሽቦርድታት",
      d1_desc: "ተለር ምንቅስቓስ ምስ ኣተወ ብቕጽበት ዝሕደሱ ናይ ጨንፈርን ናይ ልቓሕን ዳሽቦርድታት።",
      d2_title: "ናይ ኤኣይ ሓጋዚ",
      d2_desc: "ብንጹር ቋንቋ ሕተቱ፤ ካብቲ ቀንዲ መዝገብ ሒሳብ ዝተረጋገጸ መልሲ ምስ ሪፖርቱ ረኽቡ።",
      d3_title: "ብሓደ ጠውቂ ዝወፁ ሪፖርታት",
      d3_desc: "ናይ ብሄራዊ ባንክን ናይ ኮሚቴን ሪፖርታት ብሰከንድታት ውሽጢ ተሓቲሞም ይዳለዉ።",
      d4_title: "ብልሒ ዘለዎም መጠንቀቕታታት",
      d4_desc: "ዘይተለምደ ነገር ምስዘጋጥም — ናይ ልቓሕ ሓደጋ ወይ ደው ዝበለ ምጽዳቕ ብቕጽበት ይሕበር።",
      d5_title: "ናይ ጋንታ ሓባራዊ ስራሕ",
      d5_desc: "ጨናፍር፣ ኮሚቴታትን ኦዲተራትን ኣብ ሓደ ናይ ሓባር መዝገብ ብምትሕብባር ይሰርሑ።",
      cards: {
        activeMembers: "ንቑሓት ኣባላት",
        recentReports: "ናይ ቀረባ ግዜ ሪፖርታት",
        nbePack: "ናይ ወርሒ ብሄራዊ ባንክ ሪፖርት",
        completed: "ተወዲኡ",
        dividendForecast: "ናይ መክሰብ ትንበያ",
        inReview: "ኣብ ገምጋም ዘሎ",
        alertMsg: "ኣብ ኣዳማ ጨንፈር PAR 30 ብ 0.6% ወሲኹ — 4 ልቓሓት ገምግሙ",
        branches: "ጨናፍር",
        creditCommittee: "ናይ ልቓሕ ኮሚቴ",
        auditors: "ኦዲተራት",
      },
      questions: ["ኣየናይ ጨንፈር ብቕልጡፍ ዓብዩ?", "ናይ ሩብ 1ን 2ን ቁጠባታት ኣወዳድር", "ናይ ልቓሕ ክፍሊት ዘደንጎዩ መን እዮም?"],
    },
    serviceDetail: {
      backToModules: "ኩሎም ሞጁላት",
      moduleLabel: "ሞጁል",
      of15: "ካብ 15",
      keyFeatures: "ቀንድን ባህርያት",
      previous: "ዝሓለፈ",
      next: "ዝቕጽል",
      atAGlance: "ብሓጺሩ",
      capabilitiesLabel: "ዓቕምታት",
      featuresCount: "ባህርያት",
      partOfLabel: "ኣካል ናይ",
      partOfValue: "ናይ ኢትዮ ሳኮ ኮር",
      channelsLabel: "መስመራት",
      channelsValue: "ዌብ · ሞባይል · ዩኤስኤስዲ",
      requestDemo: "ናይ ነፃ ምርኢት ሕተቱ",
      browseAll: "ኩሎም ሞጁላት ርኣዩ",
      screenshotNote: "ግዝያዊ ስእሊ — ብትክክለኛ ናይ ፍርያት ምስሊ ቀይርዎ",
      footerCopyright: "ብሩህ ቴክ ሶሉሽን — ኣዲስ ኣበባ፣ ኢትዮጵያ",
    },
    contact: {
      eyebrow: "ምይይጥ ጀምሩ",
      title: "ማሕበርኩም ሎሚ ዲጂታላይዝ ግበሩ።",
      desc: "ኣብ ኣዲስ ኣበባ ዝርከብ ናይ ብሩህ ቴክ ሶሉሽን ጋንታ ኣብ ናይ ቢሮ ፒሲኹም ንምፅዓን ወይ ብክላውድ ንምርኣይ ድሉው እዩ።",
      cta: "ናይ ነፃ ምርኢት ሕተቱ",
      email: "hello@bruhtech.com",
    },
    footer: {
      rights: "ብሩህ ቴክ ሶሉሽን። መሰሉ ብሕጊ ዝተሓለወ እዩ።",
      loc: "ኣዲስ ኣበባ፣ ኢትዮጵያ",
      tagline: "ናይ ኢትዮጵያ ፋይናንስ ቴክኖሎጂ ትካል!",
      bio: "ብሩህ ቴክ ሶሉሽን ናይ ኢትዮጵያ ናይ ሕብረት ስራሕን ሳኮን ማሕበራት ንምምዕባል ኣተኣማማኒን ዘመናውን ናይ ኮር ባንኪንግ ስርዓት ይሃንፅ።",
      home: "መበገሲ",
      products: "ፍርያት",
      platform: "ፕላትፎርም",
      modules: "ሞጁላት",
      aboutUs: "ብዛዕባና",
      process: "መስርሕ",
      callCenter: "ማእኸል ጻውዒት",
      phone1: "+251 910 979060",
      phone2: "+251 946 642299",
      phone3: "+251 911 487246",
      locationTitle: "ኣድራሻና",
      address: "ሳርቤት | ኣብ ጥቓ ባለስልጣን መገድታት ከተማ ኣዲስ ኣበባ | ኤሊልታ ኣፓርትመንት 3ይ ደብሪ፣ ቢሮ ቁጽሪ 301",
    },
    flowMocks: {
      core: {
        nav: ["ዳሽቦርድ", "ኣባላት", "ቁጠባ", "ልቓሕ", "ኣክስዮን", "ጸብጻባት"],
        totalSavings: "ጠቕላላ ቁጠባ",
        quarterGrowth: "▲ 12.4% ኣብዚ ርብዒ ዓመት",
        members: "ኣባላት",
        activeLoans: "ንጡፋት ልቓሓት",
        par30: "PAR 30 (ኣብ ሓደጋ)",
        growth: "ዕቤት ፖርትፎልዮ",
      },
      teller: {
        title: "ሰልፊ ቴለር — ጨንፈር ኣዳማ",
        deposit: "SV-1180 · ዕቑር ገንዘብ ምእታው",
        repayment: "LN-1902 · ምኽፋል ልቓሕ",
        shares: "SH-0042 · 12 ኣክስዮናት",
        post: "መዝግብ",
        posted: "ተመዝጊቡ ✓",
        eod: "ናይ መዓልቲ ዕጽዋ",
        reconciled: "ተሰማሚዑ ✓ · 0 ፍልልይ",
      },
      pay: {
        title: "ናይ ክፍሊት መስመራት — ብሓንሳብ ዝምዝገብ",
        channels: ["ቴሌብር", "ሲቢኢ ብር", "USSD *889#"],
        oneLedger: "ሓደ ቀንዲ መዝገብ",
        todayVol: "ሎሚ 2.4 ሚልዮን ብር",
        live: "ብቐጥታ ዝተሰማምዐ",
      },
      audit: {
        title: "ጸብጻባትን ናይ ኦዲት ክትትልን",
        nbe: "ወርሓዊ ናይ ሃገራዊ ባንክ ጸብጻብ",
        dividend: "ናይ መክሰብ ምምቃል ሞዴል",
        pl: "ናይ ጨንፈር መክሰብን ክሳራን",
        generated: "ተዳልዩ",
        scheduled: "ተመዲቡ",
        log1: "09:41 · ቴለር SV-1180 መዝጊቡ — ብፊርማ",
        log2: "09:42 · ናይ ሕሳብ መዝገብ LN-1902 — ድርብ ምርግጋጽ",
        log3: "09:44 · ጸብጻብ ተዓሺጉ — ሃሽ ተመዝጊቡ",
      },
    },
    productMocks: {
      mobile: {
        greeting: "ሰላም፣ መሰረት 👋",
        totalSavings: "ጠቕላላ ቁጠባ",
        passbookNotice: "ናይ ቁጠባ ደብተር SV-1180 · ሕጂ ዝተሓደሰ",
        actions: ["ምዕቋር", "ምውጻእ", "ልቓሕ", "ኣክስዮን"],
        goalTitle: "ዕላማ ምስባሕ ብዕራይ",
        depositItem: "ምዕቋር — ብቴሌብር",
        loanRepayItem: "ምኽፋል ልቓሕ",
      },
      ussd: {
        head: "*889# · ማዕዶት ሳኮ",
        menu: [
          "1. ዝተረፈ ሕሳብ ምፍላጥ",
          "2. ምዕቋር (ቴሌብር)",
          "3. ገንዘብ ምውጻእ",
          "4. ናብ ኣባል ምትሕልላፍ",
          "5. ኩነታት ልቓሕ",
          "6. ኣክስዮን ምግዛእ",
          "7. ሓጺር መግለጺ",
          "0. ሓገዝ",
        ],
        reply: "መልሲ: 1",
      },
    },
    teamsTabsMocks: {
      feed: [
        { icon: "₸", tint: "#E8F4EC", t: "ቴሌብር", d: "ምዕቋር ተረጋጊጹ · 4,500 ብር" },
        { icon: "◍", tint: "#FDF3DC", t: "መኽሰብ ቁጠባ", d: "8.2% ናይ መክሰብ ምምቃል ዓቕሚ ኣብዚ ዓመት" },
        { icon: "🏦", tint: "#EAF0FA", t: "ሲቢኢ ብር", d: "142 ንግዳዊ ምንቅስቓሳት ሎሚ ተሰማሚዖም" },
        { icon: "#", tint: "#F4EAFA", t: "USSD", d: "38 ኣባላት ሕጂ ይጥቀሙ ኣለዉ" },
        { icon: "⚡", tint: "#FDF3DC", t: "ቀዳማይ ጨንፈር", d: "ጨንፈር ኣዳማ ብቁጠባ ይመርሕ ኣሎ" },
        { icon: "∞", tint: "#EAF0FA", t: "ምስምማዕ ደብተር", d: "ብኹሉ መገድታት ብሓንሳብ ዝሕደስ" },
      ],
      workflow: {
        loan: "ልቓሕ LN-2039",
        input: "መመልከቲ",
        disbursement: "ምልቃቕ ገንዘብ",
        signed: "ዝጸደቐ 3/3",
      },
      analytics: {
        branchMix: "ድርሻ ጨናፍር",
        month: "ሚያዝያ 2026",
        savingsTrend: "ናይ ቁጠባ ዕቤት ኣንፈት",
        timeframe: "ዝሓለፉ 6 ኣዋርሕ",
      },
    },
    serviceGallery: {
      note: "ናይ ምስሊ መርኣያ — ኣብ ውሽጢ ብናይ ሓቂ ስእሊ ተክእዎ ኣብ",
      ariaShow: "ስክሪንሾት ኣርእይ",
      screenshotAlt: "ስክሪንሾት",
    },
    common: {
      prev: "ዝሓለፈ",
      next: "ዝቕጽል",
      appScreens: "ገጻት መተግበሪ",
      prevScreen: "ዝሓለፈ ገጽ",
      nextScreen: "ዝቕጽል ገጽ",
      themeLight: "ናብ ብሩህ ገጽታ ቀይር",
      themeDark: "ናብ ጸላም ገጽታ ቀይር",
      selectLanguage: "ቋንቋ ሕረዩ",
      languagesHeader: "ቋንቋታት / Languages",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  currentLanguageInfo: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  /* Use useSyncExternalStore to read the saved language from localStorage.
     This avoids both the hydration mismatch (server snapshot returns "en")
     and the set-state-in-effect lint rule.  The pre-hydration <Script> in
     layout.tsx already sets the `lang` attribute on <html> so users see
     the correct language while React hydrates with "en" initially. */
  const listenersRef = useRef(new Set<() => void>());

  const subscribe = useCallback((cb: () => void) => {
    listenersRef.current.add(cb);
    return () => { listenersRef.current.delete(cb); };
  }, []);

  const getSnapshot = useCallback((): Language => {
    try {
      const saved = localStorage.getItem("bruhtech_lang") as Language;
      if (saved && ["en", "am", "om", "so", "ti"].includes(saved)) return saved;
    } catch { /* ignore */ }
    return "en";
  }, []);

  const getServerSnapshot = useCallback((): Language => "en", []);

  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    try {
      localStorage.setItem("bruhtech_lang", lang);
      document.documentElement.lang = lang;
    } catch { /* ignore */ }
    // Notify subscribers so useSyncExternalStore re-reads the snapshot
    listenersRef.current.forEach((cb) => cb());
  }, []);

  const t = translations[language] || translations.en;
  const currentLanguageInfo =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, currentLanguageInfo }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
