import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import "./globals.css";

import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";
import { ToastProvider } from "@/components/ui/toast";
import { LanguageProvider } from "@/lib/i18n";
import { SkipLink } from "@/components/site/skip-link";
import { SCHEME_COUNT } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Adhikaar — know what you're owed",
    template: "%s · Adhikaar",
  },
  description: `Answer a few plain-language questions and Adhikaar checks ${SCHEME_COUNT} Indian central government welfare schemes — explaining exactly why you qualify, with every claim cited to the official scheme text.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <LanguageProvider>
          <SkipLink />
          <ToastProvider>
            <SiteNav />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
