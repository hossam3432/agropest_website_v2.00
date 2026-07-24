import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { enContent } from "@/lib/content/en";

const { company } = enContent;

export const metadata: Metadata = {
  title: {
    default: company.name,
    template: `%s | ${company.shortName}`
  },
  description: company.tagline
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-02WCLSNN70" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-02WCLSNN70');`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
