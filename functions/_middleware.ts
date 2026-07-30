// Cloudflare Pages Function running at the edge in front of the static export in `out/`.
// Next.js `middleware.ts` cannot run here (this site uses `output: "export"`, no Next.js
// server at request time) — this is Cloudflare's own equivalent, using its native request
// context instead of Next's.

type PagesFunctionContext = {
  request: Request;
  next: () => Promise<Response>;
};

// AI training / scraping crawlers we block to protect crawl budget and bandwidth.
// Search engine crawlers (Googlebot, Bingbot, DuckDuckBot, etc.) are intentionally
// NOT on this list — they're what we want indexing the site.
const BLOCKED_BOT_USER_AGENTS = [
  "gptbot",
  "chatgpt-user",
  "ccbot",
  "claudebot",
  "claude-web",
  "anthropic-ai",
  "google-extended",
  "bytespider",
  "amazonbot",
  "applebot-extended",
  "perplexitybot",
  "diffbot",
  "omgilibot",
  "omgili",
  "youbot",
  "timpibot",
  "imagesiftbot",
  "meta-externalagent"
];

const FILE_EXTENSION_PATTERN = /\.[a-zA-Z0-9]+$/;

// Response-level hardening. None of these constrain script/connect sources, so GA4
// (googletagmanager.com / google-analytics.com) and other third-party embeds are unaffected.
const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin"
};

function isBlockedBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const normalized = userAgent.toLowerCase();
  return BLOCKED_BOT_USER_AGENTS.some((bot) => normalized.includes(bot));
}

function needsTrailingSlash(pathname: string): boolean {
  if (pathname === "/" || pathname.endsWith("/")) return false;
  if (pathname.startsWith("/cdn-cgi/")) return false;
  return !FILE_EXTENSION_PATTERN.test(pathname);
}

export async function onRequest({ request, next }: PagesFunctionContext): Promise<Response> {
  const userAgent = request.headers.get("user-agent");

  if (isBlockedBot(userAgent)) {
    return new Response("Forbidden", {
      status: 403,
      headers: { "content-type": "text/plain" }
    });
  }

  const url = new URL(request.url);

  if (needsTrailingSlash(url.pathname)) {
    url.pathname = `${url.pathname}/`;
    return Response.redirect(url.toString(), 308);
  }

  const response = await next();
  const contentType = response.headers.get("content-type") ?? "";
  const isRobotsRelevant = contentType.includes("text/html") || contentType.includes("application/pdf");

  const headers = new Headers(response.headers);

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }

  if (isRobotsRelevant && !headers.has("X-Robots-Tag")) {
    headers.set("X-Robots-Tag", "index, follow");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
