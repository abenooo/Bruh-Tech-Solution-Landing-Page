"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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
      title: "Three enterprise interfaces. One continuous core ledger.",
      p1: {
        tag: "Local PC / Cloud Core",
        title: "Bruh Tech Core SACCO System",
        desc: "The secure core engine and web management console. Runs natively on branch PCs or hosted on cloud servers. Built with Spring Boot 3.3, Java 21, PostgreSQL 15, and 94+ RBAC permissions.",
        more: "Runs locally on branch PCs & in cloud",
      },
      p2: {
        tag: "Android / iOS",
        title: "Member Mobile Banking App",
        desc: "Native member experience — check voluntary/mandatory balances, apply for loans, track guarantor status, and download statements in 5 languages.",
        more: "Available in 5 Ethiopian languages",
      },
      p3: {
        tag: "Feature Phones & Offline",
        title: "USSD Banking (*889#)",
        desc: "Universal banking on feature phones without internet. Access deposits, loan status, balances, and CBE/Telebirr transfers on any handset.",
        more: "Zero-data universal access",
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
    },
    thenNow: {
      eyebrow: "( Then → Now )",
      title: "Cooperative values remain. The ledger is transformed.",
      desc: "For decades, SACCOs operated with physical ledger notebooks and paper books. Bruh Tech Solution provides modern digital software running directly on branch PCs or in the cloud — trusted by cooperatives like Maedot SACCO.",
      oldTag: "Yesterday's Paper SACCO",
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
      title: "ሶስት ዘመናዊ መገናኛዎች። አንድ ወጥ የሆነ የሂሳብ መዝገብ።",
      p1: {
        tag: "በቢሮ ፒሲ / በክላውድ",
        title: "የብሩህ ቴክ ኮር ሳኮ ሲስተም",
        desc: "በማህበሩ የቢሮ ኮምፒውተር ላይ በቀጥታ የሚሰራ ወይም በክላውድ የሚስተናገድ አስተማማኝ የኮር ባንኪንግ ስርዓት። በስፕሪንግ ቡት 3.3፣ ጃቫ 21፣ ፖስትግሬስኪውኤል እና 94+ ፈቃዶች የተገነባ።",
        more: "በቢሮ ፒሲ ላይ በቀጥታ እና በክላውድ ይሰራል",
      },
      p2: {
        tag: "አንድሮይድ / አይኦኤስ",
        title: "የአባላት የሞባይል ባንኪንግ መተግበሪያ",
        desc: "የአባላት መተግበሪያ — የግዴታና ፍቃደኝነት ቁጠባ ሂሳብን መፈተሽ፣ ብድር መጠየቅ፣ የዋስ ሁኔታ መከታተል እና የሂሳብ መግለጫ በ5 ቋንቋዎች ማውረድ።",
        more: "በ5 የኢትዮጵያ ቋንቋዎች ይገኛል",
      },
      p3: {
        tag: "መሰረታዊ ስልኮች",
        title: "የዩኤስኤስዲ (USSD) ባንኪንግ (*889#)",
        desc: "ኢንተርኔት ሳያስፈልግ በማንኛውም ተራ ስልክ ባንክ መጠቀም። ቁጠባን ማየት፣ የብድር ሁኔታ መከታተል እና በቴሌብር/ሲቢኢ ማስተላለፍ።",
        more: "ያለ ኢንተርኔት በሁሉም ስልኮች ይሰራል",
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
    },
    thenNow: {
      eyebrow: "( ትናንት → ዛሬ )",
      title: "የማህበሩ አንድነት እንዳለ ነው። የሂሳብ አያያዙ ዘምኗል።",
      desc: "ለዓመታት አባላት በወረቀት ደብተርና በእንጨት ሳጥን ይሰሩ ነበር። ብሩህ ቴክ ሶሉሽን በቢሮ ፒሲ እና በክላውድ የሚሰራ ዘመናዊ የሳኮ ሲስተም ያቀርባል — እንደ ማዕዶት ሳኮ ባሉ ማህበራት በተግባር የተረጋገጠ።",
      oldTag: "የቀድሞው የወረቀት አሰራር",
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
      title: "Tajaajiloota ammayyaa sadii. Galmee herreegaa tokko.",
      p1: {
        tag: "PC Waajjiraa / Kilaawudii",
        title: "Bruh Tech Core SACCO System",
        desc: "Kompiitara waajjiraa irratti kallattiin kan hojjetu yookiin sarvarii kilaawudii irratti kan qindaa'e. Spring Boot 3.3, Java 21, PostgreSQL 15 fi eeyyamoota 94+ qaba.",
        more: "PC waajjiraa fi Kilaawudii irratti ni hojjeta",
      },
      p2: {
        tag: "Android / iOS",
        title: "Appilikeeshinii Baankii Miseensotaa",
        desc: "Appii miseensotaa — qusannaa ilaaluu, liqii gaafachuu, wabummaa hordofuu fi ibsa herreegaa afaan 5n buufachuu.",
        more: "Afaanota Itoophiyaa 5n jira",
      },
      p3: {
        tag: "Bilbiloota Sasalphaa",
        title: "Baankii USSD (*889#)",
        desc: "Interneetii malee bilbila kamiyyuu irratti baankii fayyadamuu. Qusannaa, haala liqii fi dabarsa Telebirr/CBE.",
        more: "Interneetii malee bilbila hundarratti",
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
    },
    thenNow: {
      eyebrow: "( Kaleessa → Har'a )",
      title: "Tokkummaan hojii gamtaa akkuma jirutti jira. Herreegni ammayyoomeera.",
      desc: "Waggoota hedduuf miseensonni dabtara waraqaatiin hojjechaa turan. Bruh Tech Solution sirna dijitaalaa PC waajjiraa fi kilaawudii irratti hojjetu dhiyeessa — waldaalee akka Maedot SACCOtiin kan mirkanaa'e.",
      oldTag: "Sirna Waraqaa Durii",
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
      title: "Saddex xiriiriyeyaal casri ah. Hal diiwaan oo buuxa.",
      p1: {
        tag: "PC Xafiiseed / Cloud Core",
        title: "Bruh Tech Core SACCO System",
        desc: "Matoorka bangiga dhexe ee sugan. Si toos ah ugu shaqeeya kumbuyuutarrada PC-ga xafiiska ama Cloud-ka. Waxaa lagu dhisay Spring Boot 3.3, Java 21, PostgreSQL iyo 94+ rukhsado.",
        more: "Ku shaqeeya PC-ga xafiiska iyo Cloud-ka",
      },
      p2: {
        tag: "Android / iOS",
        title: "App-ka Bangiga ee Xubnaha",
        desc: "Khibradda xubinta — hubi xisaabta kaydka, codso deymo, la soco dammaanad-qaadayaasha, kuna soo degso bayaannada 5 luqadood.",
        more: "Waxaa lagu heli karaa 5 luqadood",
      },
      p3: {
        tag: "Taleefannada Caadiga ah",
        title: "Bangiga USSD (*889#)",
        desc: "Banginimo buuxda oo bilaa internet ah taleefan kasta. Ka hel kaydka, xaaladda deynta, iyo wareejinta Telebirr/CBE.",
        more: "Wuxuu ku shaqeeyaa taleefan kasta",
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
    },
    thenNow: {
      eyebrow: "( Shalay → Maanta )",
      title: "Qiimaha iskaashatadu waa sidii. Xisaabinta ayaa casriyowday.",
      desc: "Sanado badan, xubnuhu waxay ku shaqayn jireen buugaag warqad ah. Bruh Tech Solution waxay bixisaa nidaam casri ah oo ku shaqeeya PC-ga xafiiska iyo Cloud-ka — iyadoo ay aamineen iskaashatooyinka sida Maedot SACCO.",
      oldTag: "Nidaamkii Warqadda ee Hore",
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
      title: "ሰለስተ ዘመናዊ መራኸቢታት። ሓደ ወጥ ናይ ሒሳብ መዝገብ።",
      p1: {
        tag: "ኣብ ቢሮ ፒሲ / ኣብ ክላውድ",
        title: "ናይ ብሩህ ቴክ ኮር ሳኮ ሲስተም",
        desc: "ኣብ ናይ ቢሮ ኮምፒውተር ብቐጥታ ዝሰርሕ ወይ ኣብ ክላውድ ዝተኣናገደ ኮር ባንኪንግ ሲስተም። ብ Spring Boot 3.3፣ Java 21፣ PostgreSQLን 94+ ፍቓዳትን ዝተሃነፀ።",
        more: "ኣብ ናይ ቢሮ ፒሲን ኣብ ክላውድን ይሰርሕ",
      },
      p2: {
        tag: "ኣንድሮይድ / ኣይኦኤስ",
        title: "ናይ ኣባላት ናይ ሞባይል ባንኪንግ መተግበሪ",
        desc: "ናይ ኣባላት መተግበሪ — ናይ ግዴታን ፍቓድን ዕቋር ምርኣይ፣ ልቓሕ ምሕታት፣ ዋሕስ ምትትታልን መግለፂ ሒሳብ ብ5 ቋንቋታት ምውራድን።",
        more: "ብ5 ናይ ኢትዮጵያ ቋንቋታት ይርከብ",
      },
      p3: {
        tag: "ተራ ተንቀሳቐስቲ ስልክታት",
        title: "ናይ ዩኤስኤስዲ (USSD) ባንኪንግ (*889#)",
        desc: "ኢንተርኔት ከየድለየ ኣብ ዝኾነ ስልኪ ባንኪ ምጥቃም። ዕቋር ምርኣይ፣ ኩነታት ልቓሕ ምትትታልን ብቴሌብር/ሲቢኢ ምስግጋርን።",
        more: "ብዘይ ኢንተርኔት ኣብ ኩሉ ስልኪ ይሰርሕ",
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
    },
    thenNow: {
      eyebrow: "( ትማሊ → ሎሚ )",
      title: "ናይ ማሕበር ሕብረት ከምዘለዎ እዩ። ናይ ሒሳብ ኣተሓሕዛ ግን ዘሚኑ።",
      desc: "ንዓመታት ኣባላት ብናይ ወረቐት ደብተር ይሰርሑ ነይሮም። ብሩህ ቴክ ሶሉሽን ኣብ ናይ ቢሮ ፒሲን ኣብ ክላውድን ዝሰርሕ ዘመናዊ ሲስተም የቕርብ — ከም ማዕዶት ሳኮ ብዝበሉ ማሕበራት ዝተመስከረሉ።",
      oldTag: "ናይ ቀደም ናይ ወረቐት ኣሰራርሓ",
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
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bruhtech_lang") as Language;
      if (saved && ["en", "am", "om", "so", "ti"].includes(saved)) {
        setLanguageState(saved);
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("bruhtech_lang", lang);
    } catch {
      // ignore
    }
  };

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
