"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ClientRedirectProps = {
  href: string;
};

// Static export cannot emit server redirects, so legacy URLs are prerendered
// as real pages that forward on the client.
export function ClientRedirect({ href }: ClientRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return null;
}
