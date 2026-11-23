import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Bruh Tech Solution — SACCO Core Banking (Local PC & Cloud)",
  description:
    "Bruh Tech Solution provides enterprise core banking software for Ethiopian SACCO cooperatives. Runs locally on branch office PCs (offline-resilient) and deploys in the secure cloud. Trusted by cooperatives including Maedot SACCO.",
  openGraph: {
    title: "Bruh Tech Solution — SACCO Core Banking (Local PC & Cloud)",
    description:
      "Enterprise core banking engine for Ethiopian SACCO cooperatives. Installable locally on branch PCs or in the cloud. Built with Java 21, Spring Boot 3.3, 16-digit Fayda KYC verification, and 5-language localization.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* restore the saved theme and language before first paint to avoid a flash */}
        <Script
          id="restore-theme-lang"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}var l=localStorage.getItem('bruhtech_lang');if(l){document.documentElement.setAttribute('lang',l);}}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
