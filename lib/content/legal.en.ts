import type { LegalContent } from "@/lib/content/legal-types";

const identityRows: [string, string][] = [
  ["Registered legal name", "Agropest Control for Trading (اجروبست كنترول للتجارة)"],
  ["Commercial Register No.", "13035"],
  ["Tax Card No.", "614070253"],
  ["Registered address", "Km 80, Cairo–Alexandria Desert Road, El-Nubaria, El-Beheira Governorate, Arab Republic of Egypt"],
  ["Telephone", "+20 128 881 6352"],
  ["Email", "info@agropestcontrol.com"]
];

const contactLines = [
  "Km 80, Cairo–Alexandria Desert Road, El-Nubaria, El-Beheira Governorate, Egypt",
  "Telephone: +20 128 881 6352",
  "Email: info@agropestcontrol.com"
];

export const enLegal: LegalContent = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy",
    metaDescription:
      "How Agropest Control for Trading collects, uses and protects personal data on www.agropestcontrol.com, including cookies, analytics, and your rights under Egyptian Personal Data Protection Law No. 151 of 2020.",
    lastUpdatedLabel: "Last updated",
    tocLabel: "On this page",
    intro: [
      {
        kind: "p",
        text:
          "This Privacy Policy explains how Agropest Control for Trading — اجروبست كنترول للتجارة (“Agropest Control”, “we”, “us”, “our”) collects, uses and protects personal data when you visit www.agropestcontrol.com (the “Website”)."
      },
      { kind: "p", text: "We are the data controller responsible for the personal data described in this policy." },
      { kind: "table", rows: identityRows }
    ],
    sections: [
      {
        id: "scope",
        heading: "1. Scope",
        blocks: [
          {
            kind: "p",
            text:
              "This policy applies to the Website only. It does not apply to our pages on third-party platforms such as Facebook, which are governed by those platforms’ own privacy policies, nor to any third-party website we link to."
          },
          {
            kind: "p",
            text:
              "The Website is an informational corporate resource. We do not sell products online, we do not process payments, and we do not operate user accounts."
          }
        ]
      },
      {
        id: "data-we-collect",
        heading: "2. What Personal Data We Collect",
        blocks: [
          { kind: "h3", text: "2.1 Information you provide to us" },
          {
            kind: "p",
            text:
              "If you contact us through a form on the Website, or by writing to the email address published on it, we collect the information you choose to give us — typically your name, company or farm name, email address, telephone number, and the content of your message."
          },
          {
            kind: "p",
            text:
              "You are not required to provide this information in order to browse the Website. If you do provide it, we use it only to respond to your enquiry."
          },
          { kind: "h3", text: "2.2 Information collected automatically" },
          {
            kind: "p",
            text:
              "When you visit the Website, certain technical information is collected automatically by our hosting provider and our analytics tool:"
          },
          {
            kind: "list",
            items: [
              "IP address (in truncated or anonymised form where our analytics configuration allows)",
              "Browser type, operating system and device type",
              "Approximate location, derived at country or city level from the IP address",
              "Pages viewed, time spent on each page, and the link or search that brought you to the Website",
              "Date and time of access"
            ]
          },
          {
            kind: "p",
            text:
              "This information is used in aggregate to understand how the Website is used and to keep it secure and functioning correctly. We do not use it to identify individual visitors."
          }
        ]
      },
      {
        id: "cookies",
        heading: "3. Cookies and Similar Technologies",
        blocks: [
          { kind: "p", text: "A cookie is a small text file stored on your device by your browser. The Website uses two categories:" },
          {
            kind: "p",
            text:
              "**Strictly necessary cookies.** These are required for the Website to load and function correctly and to remember your cookie preferences. They cannot be switched off and do not require your consent."
          },
          {
            kind: "p",
            text:
              "**Analytics cookies.** These are set by Google Analytics 4 and help us understand how visitors use the Website. They are only placed **after you give consent** through the cookie banner shown on your first visit."
          },
          {
            kind: "cookieSettings",
            text:
              "You may withdraw or change your consent at any time through the cookie settings below, or by deleting cookies through your browser settings. Withdrawing consent does not affect the lawfulness of processing carried out before withdrawal.",
            label: "Cookie settings"
          }
        ]
      },
      {
        id: "analytics",
        heading: "4. Analytics",
        blocks: [
          {
            kind: "p",
            text:
              "We use Google Analytics 4, a service provided by Google LLC, to measure Website traffic and understand which content is useful to visitors. Where our configuration permits, IP addresses are anonymised before storage."
          },
          {
            kind: "p",
            text:
              "Analytics data is processed by Google as our service provider. You can prevent Google Analytics from collecting your data by declining analytics cookies in our cookie banner, or by installing Google’s browser opt-out add-on available at [tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout)."
          }
        ]
      },
      {
        id: "purposes",
        heading: "5. Why We Process Your Data, and On What Basis",
        blocks: [
          {
            kind: "table",
            head: ["Purpose", "Basis"],
            rows: [
              ["Responding to enquiries you send us", "Your consent, and our legitimate interest in conducting business correspondence"],
              ["Operating, securing and maintaining the Website", "Our legitimate interest in a secure and functioning website"],
              ["Measuring Website usage through analytics", "Your consent, given through the cookie banner"],
              ["Meeting record-keeping or regulatory obligations", "Compliance with applicable Egyptian law"]
            ]
          }
        ]
      },
      {
        id: "sharing",
        heading: "6. Who We Share Data With",
        blocks: [
          { kind: "p", text: "We do not sell personal data, and we do not share it for advertising purposes." },
          {
            kind: "p",
            text:
              "We use a small number of service providers who process data on our behalf in order to run the Website and our correspondence:"
          },
          {
            kind: "list",
            items: [
              "**Cloudflare, Inc.** — website hosting, content delivery and security protection",
              "**Google LLC** — Google Analytics 4 (Website measurement) and Google Workspace (our business email)",
              "**Adobe Inc.** — web font delivery; your browser requests font files from Adobe’s servers, which involves transmitting your IP address to Adobe"
            ]
          },
          {
            kind: "p",
            text:
              "We may also disclose personal data where we are legally required to do so by a competent Egyptian authority, court order, or applicable law."
          }
        ]
      },
      {
        id: "transfers",
        heading: "7. International Transfers",
        blocks: [
          {
            kind: "p",
            text:
              "Our service providers operate global infrastructure, so your data may be stored or processed on servers located outside the Arab Republic of Egypt. Where this happens, we rely on providers that apply recognised contractual and technical safeguards to protect the data in line with applicable data protection standards."
          }
        ]
      },
      {
        id: "retention",
        heading: "8. How Long We Keep Data",
        blocks: [
          {
            kind: "list",
            items: [
              "**Enquiry correspondence:** retained for as long as needed to handle your enquiry and maintain a record of our business relationship, then deleted or archived.",
              "**Analytics data:** retained according to the retention period configured in Google Analytics, after which it is deleted automatically.",
              "**Server and security logs:** retained for a short period by our hosting provider for security and troubleshooting purposes."
            ]
          }
        ]
      },
      {
        id: "security",
        heading: "9. Security",
        blocks: [
          {
            kind: "p",
            text:
              "We apply reasonable technical and organisational measures to protect personal data, including encrypted connections (HTTPS) across the Website and access controls on our email systems. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security."
          }
        ]
      },
      {
        id: "your-rights",
        heading: "10. Your Rights",
        blocks: [
          {
            kind: "p",
            text:
              "Under Egyptian Personal Data Protection Law No. 151 of 2020, and subject to its conditions and exceptions, you have the right to:"
          },
          {
            kind: "list",
            items: [
              "know what personal data we hold about you and how it is processed;",
              "access your personal data;",
              "request correction of inaccurate or incomplete data;",
              "request erasure of your data;",
              "withdraw consent previously given, at any time;",
              "object to processing, or request that it be restricted;",
              "be informed of any breach affecting your personal data."
            ]
          },
          {
            kind: "p",
            text:
              "To exercise any of these rights, write to **[info@agropestcontrol.com](mailto:info@agropestcontrol.com)**. We will respond within the period required by applicable law. We may need to verify your identity before acting on a request."
          },
          {
            kind: "p",
            text:
              "If you are located in the European Economic Area or the United Kingdom, you may also hold rights under the GDPR, including the right to data portability and the right to lodge a complaint with your national supervisory authority."
          }
        ]
      },
      {
        id: "children",
        heading: "11. Children",
        blocks: [
          {
            kind: "p",
            text:
              "The Website is intended for business and professional audiences. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will delete it."
          }
        ]
      },
      {
        id: "third-party-links",
        heading: "12. Third-Party Links and Social Media",
        blocks: [
          {
            kind: "p",
            text:
              "The Website links to third-party websites and to our own pages on social platforms such as Facebook. We are not responsible for the privacy practices or content of those third parties. Interactions with our social media pages are governed by the privacy policy of the platform concerned."
          }
        ]
      },
      {
        id: "changes",
        heading: "13. Changes to This Policy",
        blocks: [
          {
            kind: "p",
            text:
              "We may update this Privacy Policy to reflect changes in our practices, our service providers, or applicable law. The revised version takes effect once published on this page, and the “Last updated” date above will be changed accordingly. Where a change is significant, we will make it clearly visible on the Website."
          }
        ]
      },
      {
        id: "contact",
        heading: "14. Contact",
        blocks: [
          { kind: "p", text: "For any question about this policy or about how we handle personal data:" },
          { kind: "address", name: "Agropest Control for Trading", lines: contactLines }
        ]
      }
    ]
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms and Conditions",
    metaTitle: "Terms and Conditions",
    metaDescription:
      "The terms governing use of www.agropestcontrol.com — the informational purpose of the Website, how product and technical data should be read, limitation of liability, intellectual property, and governing law.",
    lastUpdatedLabel: "Last updated",
    tocLabel: "On this page",
    intro: [
      {
        kind: "p",
        text:
          "These Terms and Conditions (“Terms”) govern your access to and use of the website www.agropestcontrol.com (the “Website”), operated by Agropest Control for Trading — اجروبست كنترول للتجارة (“Agropest Control”, “we”, “us”, “our”)."
      },
      {
        kind: "p",
        text:
          "By accessing or using the Website, you confirm that you have read, understood and accepted these Terms. If you do not accept them, please do not use the Website."
      }
    ],
    sections: [
      {
        id: "about-us",
        heading: "1. About Us",
        blocks: [
          {
            kind: "p",
            text:
              "Agropest Control is an Egyptian company established in 1995, engaged in the import, trading and distribution of agrochemicals, fertilizers and agricultural supplies."
          },
          { kind: "table", rows: identityRows }
        ]
      },
      {
        id: "purpose",
        heading: "2. Purpose of the Website",
        blocks: [
          {
            kind: "p",
            text:
              "The Website is an **informational and corporate resource**. Its purpose is to provide information about our company, our licences and registrations, and the technical characteristics of the products in our portfolio."
          },
          {
            kind: "p",
            text:
              "The Website is **not an online store**. We do not sell products, process payments or accept orders through the Website. Nothing on the Website constitutes a binding offer to sell."
          }
        ]
      },
      {
        id: "product-information",
        heading: "3. Product Information and Technical Data",
        blocks: [
          {
            kind: "p",
            text:
              "We take care to ensure that the product information published on the Website — including active ingredients, formulation types, concentrations, application rates, crops and pack sizes — is accurate and consistent with the approved registration of each product."
          },
          { kind: "p", text: "However:" },
          {
            kind: "list",
            items: [
              "**The approved product label is the only authoritative document.** Where the Website and the physical product label differ, the label prevails in all cases.",
              "Product information on the Website is provided for **general technical reference**, not as a recommendation for any specific field, crop, season or pest situation.",
              "Registration status, approved uses and permitted application rates may change following decisions of the competent Egyptian authorities. Information published here may not reflect the most recent change at all times.",
              "Availability of any product listed on the Website is not guaranteed, and listing does not imply that a product is currently in stock or currently registered in any particular country."
            ]
          },
          {
            kind: "callout",
            text:
              "Always read and follow the approved label, safety data sheet and applicable national regulations before purchasing, storing, handling or applying any product."
          }
        ]
      },
      {
        id: "no-advice",
        heading: "4. No Advisory Relationship",
        blocks: [
          {
            kind: "p",
            text:
              "Information on the Website does not constitute agronomic, technical, regulatory, safety or legal advice, and does not create any advisory relationship between you and Agropest Control."
          },
          {
            kind: "p",
            text:
              "Decisions on product selection, dosage, timing, mixing, application method, pre-harvest interval and worker safety must be made in consultation with a qualified agronomist or licensed technical adviser, and in accordance with the approved label and applicable law."
          }
        ]
      },
      {
        id: "safe-use",
        heading: "5. Safe Use and User Responsibility",
        blocks: [
          {
            kind: "p",
            text:
              "Agrochemical products are regulated substances and may be hazardous if handled incorrectly. Their sale, storage, transport, handling and application are subject to Egyptian law and, where applicable, the law of the country of use."
          },
          {
            kind: "p",
            text:
              "You are solely responsible for ensuring that any use of a product is lawful, appropriately licensed, and carried out with the required protective equipment and precautions. Agropest Control accepts no responsibility for any use of a product that departs from its approved label or from applicable regulations."
          }
        ]
      },
      {
        id: "liability",
        heading: "6. Limitation of Liability",
        blocks: [
          {
            kind: "p",
            text:
              "The Website and its content are provided on an “as is” and “as available” basis. To the fullest extent permitted by applicable Egyptian law:"
          },
          {
            kind: "list",
            items: [
              "We do not warrant that the Website will be uninterrupted, error-free or free of harmful components.",
              "We do not warrant that the content of the Website is complete, current or free of typographical or technical error.",
              "We shall not be liable for any direct, indirect, incidental or consequential loss — including crop loss, yield loss, financial loss or damage to property — arising from reliance on information published on the Website."
            ]
          },
          { kind: "p", text: "Nothing in these Terms excludes or limits any liability that cannot lawfully be excluded or limited." }
        ]
      },
      {
        id: "intellectual-property",
        heading: "7. Intellectual Property",
        blocks: [
          {
            kind: "p",
            text:
              "All content on the Website — including text, technical documentation, product data sheets, images, layout, graphics and the Agropest Control name, logo and product brand names — is the property of Agropest Control or its licensors and is protected under applicable intellectual property law."
          },
          {
            kind: "p",
            text:
              "You may view, download and print content from the Website for your own internal, non-commercial reference. You may not reproduce, republish, distribute, modify or use any content for commercial purposes without our prior written permission."
          },
          {
            kind: "p",
            text:
              "Third-party trademarks, including active ingredient trade names and manufacturer marks, remain the property of their respective owners."
          }
        ]
      },
      {
        id: "third-party-links",
        heading: "8. Links to Third-Party Websites",
        blocks: [
          {
            kind: "p",
            text:
              "The Website may contain links to third-party websites, including regulatory authorities, manufacturers and our social media pages. These links are provided for convenience only. We do not control and are not responsible for the content, accuracy or privacy practices of any third-party website."
          }
        ]
      },
      {
        id: "privacy",
        heading: "9. Privacy and Cookies",
        blocks: [
          {
            kind: "p",
            text:
              "Your use of the Website is also governed by our [Privacy Policy](/privacy-policy), which explains what information we collect, how we use analytics and cookies, and your rights under Egyptian Personal Data Protection Law No. 151 of 2020."
          }
        ]
      },
      {
        id: "prohibited-use",
        heading: "10. Prohibited Use",
        blocks: [
          { kind: "p", text: "You agree not to use the Website to:" },
          {
            kind: "list",
            items: [
              "attempt to gain unauthorised access to the Website, its servers or any connected system;",
              "interfere with, disrupt or place unreasonable load on the Website;",
              "extract, scrape or systematically collect content for commercial reuse;",
              "misrepresent yourself as an agent, distributor or representative of Agropest Control;",
              "use any content in a way that is unlawful, misleading, or that misstates the approved use of a regulated product."
            ]
          }
        ]
      },
      {
        id: "changes",
        heading: "11. Changes to These Terms",
        blocks: [
          {
            kind: "p",
            text:
              "We may update these Terms from time to time to reflect changes in our business, our product portfolio or applicable law. The updated version takes effect once published on this page, and the “Last updated” date above will be revised accordingly. Continued use of the Website after publication constitutes acceptance of the revised Terms."
          }
        ]
      },
      {
        id: "governing-law",
        heading: "12. Governing Law and Jurisdiction",
        blocks: [
          {
            kind: "p",
            text:
              "These Terms are governed by and construed in accordance with the laws of the Arab Republic of Egypt. Any dispute arising out of or in connection with the Website or these Terms shall be subject to the exclusive jurisdiction of the competent Egyptian courts."
          }
        ]
      },
      {
        id: "contact",
        heading: "13. Contact",
        blocks: [
          { kind: "p", text: "For any question regarding these Terms, please contact us:" },
          { kind: "address", name: "Agropest Control for Trading", lines: contactLines }
        ]
      }
    ]
  }
};
