"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/content";

type DocumentLanguageProps = {
  locale: Locale;
  direction: string;
};

export function DocumentLanguage({ locale, direction }: DocumentLanguageProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;

    return () => {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    };
  }, [direction, locale]);

  return null;
}
