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
      <body>{children}</body>
    </html>
  );
}
