export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSchemaProps = {
  items: FaqItem[];
};

function toSafeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function FaqSchema({ items }: FaqSchemaProps) {
  if (!items.length) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJson(schema) }} />;
}
