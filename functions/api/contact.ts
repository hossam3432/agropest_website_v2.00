// Cloudflare Pages Function — handles POST /api/contact from the contact form
// (components/ContactSection.tsx) and relays it through Resend.
//
// Required Cloudflare Pages environment variables (set as secrets in the
// dashboard, not committed here):
//   RESEND_API_KEY    - API key from resend.com
//   CONTACT_TO_EMAIL   - optional override, defaults to info@agropestcontrol.com
//   CONTACT_FROM_EMAIL - optional override, must be an address on a domain
//                         verified with Resend, e.g. "AgroPest Website <website@agropestcontrol.com>"

type Env = {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

type PagesFunctionContext = {
  request: Request;
  env: Env;
};

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  topic?: string;
  topicLabel?: string;
  message?: string;
};

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const DEFAULT_TO_EMAIL = "info@agropestcontrol.com";
const DEFAULT_FROM_EMAIL = "AgroPest Website <onboarding@resend.dev>";

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" }
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function onRequestPost({ request, env }: PagesFunctionContext): Promise<Response> {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const topic = (payload.topicLabel ?? payload.topic ?? "").trim();
  const company = (payload.company ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!name || !email || !topic || !EMAIL_PATTERN.test(email)) {
    return jsonResponse({ error: "Missing or invalid required fields" }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ error: "Email service not configured" }, 500);
  }

  const toAddress = env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const fromAddress = env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;

  const rows: Array<[string, string]> = (
    [
      ["Name", name],
      ["Company", company],
      ["Email", email],
      ["Phone", phone],
      ["Topic", topic],
      ["Message", message]
    ] as Array<[string, string]>
  ).filter(([, value]) => value.length > 0);

  const html = `<div>${rows
    .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, "<br/>")}</p>`)
    .join("")}</div>`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [toAddress],
      reply_to: email,
      subject: `WEBSITE - ${topic}`,
      html,
      text
    })
  });

  if (!resendResponse.ok) {
    const detail = await resendResponse.text();
    return jsonResponse({ error: "Failed to send email", detail }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}
