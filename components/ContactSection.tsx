"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { localizeHref, type Locale, type SiteContent } from "@/lib/content";

const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DRAFT_STORAGE_KEY = "agropest-contact-draft";

type ContactSectionProps = {
  content: SiteContent;
  locale: Locale;
  title?: string;
  description?: string;
};

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

type FieldErrors = Partial<Record<"name" | "email" | "topic", string>>;

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PLACEHOLDER_DOMAINS = new Set([
  "example.com",
  "test.com",
  "domain.com",
  "email.com",
  "sample.com",
  "fake.com",
  "asdf.com",
  "notreal.com",
  "yourdomain.com",
  "mailinator.com"
]);
const PLACEHOLDER_LOCAL_PARTS = new Set(["test", "asdf", "admin", "user", "xxxx", "sample", "fake", "noreply", "name", "email"]);

function isValidEmail(raw: string): boolean {
  const value = raw.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(value)) return false;

  const [localPart, domain] = value.split("@");
  const domainLabels = domain.split(".");
  const mainLabel = domainLabels[domainLabels.length - 2] ?? "";
  const tld = domainLabels[domainLabels.length - 1] ?? "";

  if (tld.length < 2) return false;
  if (/^\d+$/.test(mainLabel)) return false;
  if (localPart === mainLabel) return false;
  if (PLACEHOLDER_DOMAINS.has(domain)) return false;
  if (PLACEHOLDER_LOCAL_PARTS.has(localPart)) return false;
  if (/^(.)\1*$/.test(localPart)) return false;

  return true;
}

const BURST_DOT_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function SuccessBurst() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      {BURST_DOT_ANGLES.map((angle, index) => (
        <span
          key={angle}
          className="success-icon-dot absolute h-1.5 w-1.5 rounded-full bg-agri-gold"
          style={{ "--burst-angle": `${angle}deg`, animationDelay: `${480 + index * 20}ms` } as CSSProperties}
        />
      ))}
      <svg viewBox="0 0 52 52" className="success-icon-circle relative h-16 w-16">
        <circle cx="26" cy="26" r="25" className="fill-agri-green" />
        <path
          className="success-icon-check"
          d="M15 27 L23 35 L38 18"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function validateForm(state: FormState, messages: SiteContent["contactSection"]["validation"]): FieldErrors {
  const errors: FieldErrors = {};
  if (!state.name.trim()) errors.name = messages.nameRequired;
  if (!state.email.trim()) errors.email = messages.emailRequired;
  else if (!isValidEmail(state.email)) errors.email = messages.emailInvalid;
  if (!state.topic) errors.topic = messages.topicRequired;
  return errors;
}

export function ContactSection({
  content,
  locale,
  title = content.contactSection.defaultTitle,
  description = content.contactSection.defaultDescription
}: ContactSectionProps) {
  const { company, contactSection } = content;
  const labels = contactSection.formLabels;
  const methods = contactSection.methods;
  const topics = contactSection.topics;
  const thankYou = contactSection.thankYou;
  const whatsappHref = content.ctaActions.whatsapp.href;
  const isRtl = locale === "ar";
  const reducedMotion = useReducedMotion();

  const [formState, setFormState] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    topic: "",
    message: ""
  });
  const [attempted, setAttempted] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState(false);
  const controls = useAnimation();

  // Restore a saved draft after mount (client-only, so SSR/hydration render empty fields first).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw) as Partial<FormState>;
      setFormState((prev) => ({ ...prev, ...draft }));
    } catch {
      // corrupt or inaccessible storage - ignore and start blank
    }
  }, []);

  // Keep the draft in sync as the user types; drop it once every field is empty again.
  useEffect(() => {
    const isEmpty = Object.values(formState).every((value) => !value);
    try {
      if (isEmpty) {
        window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      } else {
        window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formState));
      }
    } catch {
      // storage unavailable (private browsing, quota) - ignore
    }
  }, [formState]);

  const errors = validateForm(formState, contactSection.validation);
  const showError = (field: keyof FieldErrors) => Boolean(attempted && errors[field]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const mailtoFallbackHref = () => {
    const topicOption = topics.find((topic) => topic.value === formState.topic);
    const subject = `WEBSITE - ${topicOption?.label ?? formState.topic}`;
    const bodyLines = [
      `${labels.name}: ${formState.name}`,
      formState.company ? `${labels.company}: ${formState.company}` : null,
      `${labels.email}: ${formState.email}`,
      formState.phone ? `${labels.phone}: ${formState.phone}` : null,
      `${labels.topic}: ${topicOption?.label ?? formState.topic}`,
      formState.message ? `${labels.message}: ${formState.message}` : null
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (Object.keys(errors).length > 0) {
      setAttempted(true);
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([50, 40, 50, 40, 50]);
      }
      if (!reducedMotion) {
        controls.start({
          x: [0, -10, 10, -10, 10, -6, 6, 0],
          transition: { duration: 0.5, ease: "easeInOut" }
        });
      }
      return;
    }

    if (!reducedMotion) {
      controls.start({
        x: isRtl ? -140 : 140,
        opacity: 0,
        transition: { duration: 0.5, ease: premiumEase }
      });
    }

    setSendError(false);
    setSubmitting(true);

    const topicOption = topics.find((topic) => topic.value === formState.topic);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          phone: formState.phone,
          topic: formState.topic,
          topicLabel: topicOption?.label ?? formState.topic,
          message: formState.message
        })
      });

      if (!response.ok) throw new Error("send-failed");
      try {
        window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // ignore storage errors
      }
      setFormState({ name: "", company: "", email: "", phone: "", topic: "", message: "" });
      setFlipped(true);
    } catch {
      setSendError(true);
      if (!reducedMotion) {
        controls.start({ x: 0, opacity: 1, transition: { duration: 0.3, ease: premiumEase } });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-agri-mist py-16" id="contact">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="eyebrow">{contactSection.eyebrow}</p>
          <h2 className="section-title mt-3">{title}</h2>
          <p className="section-copy">{description}</p>

          <div className="mt-8 grid gap-4">
            <a className="card p-4 transition hover:border-agri-gold sm:p-5" href={whatsappHref}>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-agri-gold">{methods.whatsapp}</p>
              <p className="mt-2 text-lg font-semibold text-agri-blue"><bdi dir="ltr">{company.phone}</bdi></p>
            </a>
            <a className="card p-5 transition hover:border-agri-gold" href={`mailto:${company.email}`}>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-agri-gold">{methods.email}</p>
              <p className="mt-2 text-lg font-semibold text-agri-blue">{company.email}</p>
            </a>
            <div className="card p-4 sm:p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-agri-gold">{methods.office}</p>
              <p className="mt-2 text-lg font-semibold text-agri-blue">{company.address}</p>
              <p className="mt-2 text-sm text-slate-600">{company.workingHours}</p>
            </div>
          </div>
        </div>

        <div style={{ perspective: "1600px" }}>
          <div
            className="relative transition-transform duration-[900ms]"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transitionTimingFunction: `cubic-bezier(${premiumEase.join(",")})`
            }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="card overflow-hidden p-5 sm:p-8"
              style={{ backfaceVisibility: "hidden" }}
              aria-hidden={flipped}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-agri-blue">
                  <span>
                    {labels.name} <span className="text-agri-orange" aria-hidden="true">*</span>
                    <span className="sr-only"> ({labels.required})</span>
                  </span>
                  <input
                    className={`min-h-12 rounded-md border px-4 text-base outline-none transition focus:border-agri-gold ${
                      showError("name")
                        ? "border-agri-orange placeholder:font-semibold placeholder:text-agri-orange"
                        : "border-agri-line"
                    }`}
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder={showError("name") ? errors.name : undefined}
                    aria-invalid={showError("name")}
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-agri-blue">
                  {labels.company}
                  <input
                    className="min-h-12 rounded-md border border-agri-line px-4 text-base outline-none transition focus:border-agri-gold"
                    name="company"
                    type="text"
                    value={formState.company}
                    onChange={(event) => updateField("company", event.target.value)}
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-agri-blue">
                  <span>
                    {labels.email} <span className="text-agri-orange" aria-hidden="true">*</span>
                    <span className="sr-only"> ({labels.required})</span>
                  </span>
                  <input
                    className={`min-h-12 rounded-md border px-4 text-base outline-none transition focus:border-agri-gold ${
                      showError("email")
                        ? "border-agri-orange placeholder:font-semibold placeholder:text-agri-orange"
                        : "border-agri-line"
                    }`}
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder={showError("email") ? errors.email : undefined}
                    aria-invalid={showError("email")}
                  />
                  {showError("email") && formState.email.trim() ? (
                    <span className="text-xs font-semibold text-agri-orange" role="alert">
                      {errors.email}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2 text-sm font-semibold text-agri-blue">
                  {labels.phone}
                  <input
                    className="min-h-12 rounded-md border border-agri-line px-4 text-base outline-none transition focus:border-agri-gold"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                  />
                </label>
              </div>

              <label className="mt-5 grid gap-2 text-sm font-semibold text-agri-blue">
                <span>
                  {labels.topic} <span className="text-agri-orange" aria-hidden="true">*</span>
                  <span className="sr-only"> ({labels.required})</span>
                </span>
                <select
                  className={`min-h-12 rounded-md border bg-white px-4 text-base outline-none transition focus:border-agri-gold ${
                    showError("topic") ? "border-agri-orange font-semibold text-agri-orange" : "border-agri-line"
                  }`}
                  name="topic"
                  value={formState.topic}
                  onChange={(event) => updateField("topic", event.target.value)}
                  aria-invalid={showError("topic")}
                >
                  <option value="">{showError("topic") ? errors.topic : labels.topicPlaceholder}</option>
                  {topics.map((topic) => (
                    <option key={topic.value} value={topic.value} className="text-agri-blue">
                      {topic.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-5 grid gap-2 text-sm font-semibold text-agri-blue">
                {labels.message}
                <textarea
                  className="min-h-36 rounded-md border border-agri-line px-4 py-3 text-base outline-none transition focus:border-agri-gold"
                  name="message"
                  value={formState.message}
                  onChange={(event) => updateField("message", event.target.value)}
                />
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <motion.button
                  animate={controls}
                  className="btn-primary disabled:opacity-70"
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? labels.sending : labels.submit}
                </motion.button>
              </div>
              {sendError ? (
                <p className="mt-3 text-sm font-semibold text-agri-orange" role="alert">
                  {contactSection.sendErrorMessage}{" "}
                  <a className="underline" href={mailtoFallbackHref()}>
                    {contactSection.sendErrorFallback}
                  </a>
                </p>
              ) : null}
            </form>

            <div
              className="card absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              aria-hidden={!flipped}
            >
              {flipped ? <SuccessBurst key="success-burst" /> : null}
              <h3 className="text-2xl font-bold text-agri-blue">{thankYou.title}</h3>
              <p className="text-slate-600">{thankYou.message}</p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Link className="btn-primary" href={localizeHref(locale, "/products")}>
                  {thankYou.backToProducts}
                </Link>
                <Link className="btn-secondary" href={localizeHref(locale, "/")}>
                  {thankYou.backToHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
