import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/seo";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const GOOGLE_INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";

type PingType = "URL_UPDATED" | "URL_DELETED";

type IndexNowRequestBody = {
  url?: string;
  urls?: string[];
  type?: PingType;
};

function normalizeUrls(body: IndexNowRequestBody): string[] {
  const raw = body.urls ?? (body.url ? [body.url] : []);
  return raw
    .filter((entry): entry is string => typeof entry === "string" && entry.length > 0)
    .map((entry) => (entry.startsWith("http") ? entry : `${siteUrl}${entry.startsWith("/") ? entry : `/${entry}`}`))
    .filter((entry) => entry.startsWith(siteUrl));
}

async function pingIndexNow(urls: string[]) {
  if (!INDEXNOW_KEY) {
    return { skipped: true, reason: "INDEXNOW_KEY not configured" };
  }

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(siteUrl).host,
        key: INDEXNOW_KEY,
        keyLocation: `${siteUrl}/${INDEXNOW_KEY}.txt`,
        urlList: urls
      })
    });

    return { skipped: false, status: response.status, ok: response.ok };
  } catch (error) {
    return { skipped: false, ok: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Requires a Google service-account OAuth2 access token (Indexing API is scoped to
// JobPosting/BroadcastEvent pages per Google's terms). Wire up token minting before use.
async function pingGoogleIndexing(urls: string[], type: PingType) {
  const accessToken = process.env.GOOGLE_INDEXING_ACCESS_TOKEN;
  if (!accessToken) {
    return { skipped: true, reason: "GOOGLE_INDEXING_ACCESS_TOKEN not configured" };
  }

  try {
    const results = await Promise.all(
      urls.map((url) =>
        fetch(GOOGLE_INDEXING_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ url, type })
        }).then((response) => ({ url, status: response.status, ok: response.ok }))
      )
    );

    return { skipped: false, results };
  } catch (error) {
    return { skipped: false, ok: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function POST(request: Request) {
  const requiredSecret = process.env.INDEXNOW_API_SECRET;
  if (requiredSecret && request.headers.get("x-api-secret") !== requiredSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: IndexNowRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const urls = normalizeUrls(body);
  if (urls.length === 0) {
    return NextResponse.json({ error: "No valid url/urls provided" }, { status: 400 });
  }

  const type: PingType = body.type === "URL_DELETED" ? "URL_DELETED" : "URL_UPDATED";

  const [indexNow, googleIndexing] = await Promise.all([pingIndexNow(urls), pingGoogleIndexing(urls, type)]);

  return NextResponse.json({ urls, indexNow, googleIndexing });
}
