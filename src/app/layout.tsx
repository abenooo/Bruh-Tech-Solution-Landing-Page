import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bruh Tech Solution — Core banking for Ethiopia's cooperatives",
  description:
    "The Ethio SACCO Platform digitizes Ethiopia's 23,000+ savings and credit cooperatives — membership, savings, loans, shares, accounting and payments on one audit-grade core. Built in Addis Ababa.",
  openGraph: {
    title: "Bruh Tech Solution — Core banking for Ethiopia's cooperatives",
    description:
      "One audit-grade core for membership, savings, loans, shares, accounting and payments. Built in Addis Ababa, ready for 23,000+ SACCOs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* restore the saved theme before first paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
