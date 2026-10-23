import { SITE } from "./site";
import type { Faq } from "./services";

/**
 * Canonical, visible FAQ answers. These same strings feed the FAQPage
 * structured data, so the JSON-LD can never drift from the page copy.
 */
export const COMPANY_FAQS: Faq[] = [
  {
    question: "What is EPIC STUDIO?",
    answer:
      "EPIC STUDIO is a multidisciplinary technology and design studio. It builds enterprise software, mobile apps, AI automation, UI/UX systems, GovTech platforms and brand video for organisations worldwide. The studio works with senior practitioners rather than layered junior teams.",
  },
  {
    question: "What services does EPIC STUDIO offer?",
    answer:
      "EPIC STUDIO offers six services: software and product engineering, mobile app development, AI automation and cloud DevOps, UI/UX and brand systems, GovTech and public platforms, and video and motion production. Each can be engaged independently or as one integrated programme.",
  },
  {
    question: "Where is EPIC STUDIO based?",
    answer:
      "EPIC STUDIO's engineering headquarters is in Kolkata, West Bengal, India. The studio publishes client hubs in Bengaluru, San Francisco, London and Singapore, and delivers remotely to clients across the Americas, Europe and APAC.",
  },
  {
    question: "Does EPIC STUDIO work with international clients?",
    answer:
      "Yes. EPIC STUDIO works with clients across the Americas, Europe and APAC, with sprint overlap across IST, GMT and US time zones. Communication, repositories and delivery ceremonies are run remotely by default.",
  },
  {
    question: "What technology stack does EPIC STUDIO use?",
    answer:
      "The published stack includes TypeScript, Next.js, React, Node.js, Python, PyTorch, Go, Rust, PostgreSQL, Redis, GraphQL, Docker, Kubernetes, Google Cloud and Cloudflare. Mobile work uses Swift, SwiftUI, Kotlin, Jetpack Compose, React Native and Flutter.",
  },
  {
    question: "Is EPIC STUDIO a software company or a creative agency?",
    answer:
      "It is both, with engineering as the centre of gravity. The studio combines product engineering, AI, design systems and video production so a single team can take a product from positioning and interface design through to production software and launch content.",
  },
  {
    question: "How does EPIC STUDIO price projects?",
    answer:
      "Engagements are scoped and quoted individually after discovery. EPIC STUDIO does not publish a public rate card because scope, compliance requirements and team composition vary significantly between projects. Request a written proposal through the contact page.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Timeline depends on scope, integrations and compliance requirements. Discovery produces a milestone plan with acceptance criteria before a delivery date is committed. The studio does not quote a blanket duration before requirements are understood.",
  },
  {
    question: "Does EPIC STUDIO sign NDAs?",
    answer:
      "Yes. EPIC STUDIO offers a mutual non-disclosure agreement before confidential briefings and can work under a client's standard NDA. NDA requests can be sent to contact@epic-studio.in.",
  },
  {
    question: "Who owns the intellectual property?",
    answer:
      "IP ownership is defined in the master services agreement and statement of work for each engagement. Ask for the standard IP, licensing and handover terms before signing so ownership and reuse rights are explicit.",
  },
  {
    question: "Does EPIC STUDIO provide support after launch?",
    answer:
      "Yes. Post-launch support, maintenance and platform operations can be included as a retainer or a defined support window. The scope, response targets and exclusions are agreed in the statement of work.",
  },
  {
    question: "Which industries does EPIC STUDIO serve?",
    answer:
      "EPIC STUDIO publishes work across GovTech, education, healthcare, fintech, commerce, manufacturing, proptech and startups. The common requirement is a complex digital system that must hold up in production, not a one-off marketing page.",
  },
  {
    question: "How can I contact EPIC STUDIO?",
    answer:
      "Email contact@epic-studio.in, call +91 62917 73811, or submit a brief through the contact page. The studio also publishes a WhatsApp priority desk and responds to qualified project enquiries within one business day.",
  },
  {
    question: "Can I see EPIC STUDIO's case studies?",
    answer:
      "Yes. The work section includes published case studies for the West Bengal Education Platform, Omniflow AI and Kairo Mobile, with architecture notes, stack details and reported outcome metrics.",
  },
];

/** Short subset rendered on the homepage. */
export const HOME_FAQS: Faq[] = COMPANY_FAQS.filter((faq) =>
  [
    "What is EPIC STUDIO?",
    "What services does EPIC STUDIO offer?",
    "Where is EPIC STUDIO based?",
    "What technology stack does EPIC STUDIO use?",
    "How does EPIC STUDIO price projects?",
    "How can I contact EPIC STUDIO?",
  ].includes(faq.question)
);

export const CONTACT_LINE = `Email ${SITE.email} or call ${SITE.phones[0].replace(/-/g, " ")}.`;
