import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { ScrollText } from "lucide-react";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adhikaar — know what you're owed",
  description:
    "Describe your situation in plain language. Adhikaar checks 15 Indian central government welfare schemes and explains exactly why you qualify — every claim cited to the official scheme text.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <header className="border-b border-border bg-card/60">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
            <a
              href="/"
              className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <ScrollText className="size-4.5" aria-hidden="true" />
              </span>
              <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
                Adhikaar
              </span>
            </a>
            <span className="hidden text-sm text-muted-foreground sm:block">
              Grounded in official government documents
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>

        <footer className="border-t border-border">
          <div className="mx-auto w-full max-w-3xl px-4 py-6 text-sm leading-relaxed text-muted-foreground sm:px-6">
            <p>
              Adhikaar explains eligibility using official scheme documents — it is not legal
              advice, and final decisions rest with the implementing authorities. No personal
              data is stored.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
