import type { SiteContent } from "@/lib/content";

type ContactSectionProps = {
  content: SiteContent;
  title?: string;
  description?: string;
};

export function ContactSection({
  content,
  title = content.contactSection.defaultTitle,
  description = content.contactSection.defaultDescription
}: ContactSectionProps) {
  const { company, contactSection } = content;
  const labels = contactSection.formLabels;
  const methods = contactSection.methods;
  const whatsappHref = content.ctaActions.whatsapp.href;

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
              <p className="mt-2 text-lg font-semibold text-agri-blue" dir="ltr">{company.phone}</p>
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

        <form action={`mailto:${company.email}`} className="card p-5 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-agri-blue">
              {labels.name}
              <input className="min-h-12 rounded-md border border-agri-line px-4 text-base outline-none transition focus:border-agri-gold" name="name" type="text" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-agri-blue">
              {labels.company}
              <input className="min-h-12 rounded-md border border-agri-line px-4 text-base outline-none transition focus:border-agri-gold" name="company" type="text" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-agri-blue">
              {labels.email}
              <input className="min-h-12 rounded-md border border-agri-line px-4 text-base outline-none transition focus:border-agri-gold" name="email" type="email" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-agri-blue">
              {labels.phone}
              <input className="min-h-12 rounded-md border border-agri-line px-4 text-base outline-none transition focus:border-agri-gold" name="phone" type="tel" />
            </label>
          </div>
          <label className="mt-5 grid gap-2 text-sm font-semibold text-agri-blue">
            {labels.message}
            <textarea className="min-h-36 rounded-md border border-agri-line px-4 py-3 text-base outline-none transition focus:border-agri-gold" name="message" />
          </label>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button className="btn-primary" type="submit">
              {labels.submit}
            </button>
            <a className="btn-secondary" href={whatsappHref}>
              {labels.whatsapp}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
