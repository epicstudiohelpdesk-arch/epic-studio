import { CONTENT_UPDATED, SITE_URL } from "./site";
import type { Faq, Source } from "./services";

export interface Region {
  slug: string;
  name: string;
  shortName: string;
  market: string;
  hreflang: string;
  /** Meta description, 140–165 characters. */
  metaDescription: string;
  ogLocale: string;
  currency: string;
  currencyCode: string;
  timezone: string;
  timezoneNote: string;
  hub: string | null;
  overview: string;
  context: string[];
  compliance: Source[];
  delivery: string[];
  /** Region-specific note per service slug. */
  serviceNotes: Record<string, string>;
  faqs: Faq[];
  sources: Source[];
  updated: string;
}

export const REGIONS: Region[] = [
  {
    slug: "united-states",
    name: "United States",
    shortName: "USA",
    market: "US & North America",
    hreflang: "en-US",
    metaDescription:
      "EPIC STUDIO delivers software, mobile, AI and design work for US clients, with a San Francisco client hub and US time-zone overlap.",
    ogLocale: "en_US",
    currency: "USD",
    currencyCode: "USD",
    timezone: "ET / PT",
    timezoneNote:
      "Daily overlap with US Eastern and Pacific business hours from the Kolkata engineering base.",
    hub: "San Francisco",
    overview:
      "EPIC STUDIO works with US product and marketing teams that need senior engineering, design and AI delivery without a long local hiring cycle. The studio is headquartered in Kolkata, publishes a client hub in San Francisco, and runs US engagements remotely with explicit overlap hours.",
    context: [
      "US buyers usually optimise for time-to-market, vendor security review and a predictable release cadence. EPIC STUDIO scopes engagements around a production-shaped first increment, so diligence and delivery are not sequential.",
      "Accessibility and privacy expectations are part of the brief, not an afterthought. Public-facing work is designed toward WCAG 2.2 AA, and data handling is documented against the applicable US state privacy regime and the client's own security questionnaire.",
      "The commercial model is direct: a scoped statement of work, named senior practitioners, milestone acceptance criteria, and no layers of account management between the brief and the build.",
    ],
    compliance: [
      {
        title: "California Consumer Privacy Act (CCPA/CPRA)",
        url: "https://oag.ca.gov/privacy/ccpa",
        publisher: "California Attorney General",
      },
      {
        title: "Web Content Accessibility Guidelines (WCAG) 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
      {
        title: "NIST Cybersecurity Framework",
        url: "https://www.nist.gov/cyberframework",
        publisher: "NIST",
      },
    ],
    delivery: [
      "US Eastern overlap: approximately 9:00 AM–1:00 PM ET",
      "US Pacific overlap: approximately 9:00 AM–12:00 PM PT",
      "Async decision records and Loom-style walkthroughs between live calls",
      "US-friendly release windows and on-call escalation agreed per engagement",
    ],
    serviceNotes: {
      "software-engineering":
        "US SaaS and enterprise teams typically need architecture that survives procurement review: documented data flows, role-based access, audit logging and a clear deployment model.",
      "mobile-app-development":
        "US consumer products are judged on onboarding, accessibility and App Store review readiness. We test those paths before the first submission, not after rejection.",
      "ai-automation":
        "US AI programmes are increasingly asked for evaluation evidence, not demos. We bring a labelled evaluation set and an operating cost model to the first production slice.",
      "ui-ux-design":
        "US product teams often have an existing component library. We audit it, define the missing states and accessibility rules, then extend rather than replacing everything.",
      "govtech":
        "US public-sector work demands accessibility, auditability and vendor security evidence. We scope those controls explicitly before build.",
      "video-production":
        "US launches usually need one narrative master plus platform-specific cutdowns. We deliver captions and safe-area variants with the first master.",
    },
    faqs: [
      {
        question: "Do you provide web design and software development in the USA?",
        answer:
          "Yes. EPIC STUDIO provides web design, software engineering, mobile apps, AI automation and video for US clients. Work is delivered remotely with US-overlap hours and follows the same senior-led model used for every market.",
      },
      {
        question: "Does EPIC STUDIO have a US office?",
        answer:
          "EPIC STUDIO publishes a client hub in San Francisco and its engineering base is in Kolkata, India. It does not claim a separate US registered office. US engagements are delivered remotely with US-overlap hours, and the contracting entity and address are stated in the statement of work.",
      },
      {
        question: "Can EPIC STUDIO work in US time zones?",
        answer:
          "Yes. The studio maintains daily overlap with US Eastern and Pacific business hours, with asynchronous decision records and recorded walkthroughs for the rest of the day.",
      },
      {
        question: "How do you handle US data privacy requirements?",
        answer:
          "Data flows are mapped during discovery and documented against the client's obligations, including CCPA/CPRA where applicable. A data processing agreement and the required security controls are agreed before production access is granted.",
      },
      {
        question: "Do you support ADA and WCAG accessibility?",
        answer:
          "Public-facing work is designed and tested toward WCAG 2.2 AA, including keyboard navigation, focus order, contrast, error handling and screen-reader workflows. Accessibility is included in design QA rather than bolted on at the end.",
      },
      {
        question: "Can you replace or augment a US agency?",
        answer:
          "Yes. EPIC STUDIO can take over a workstream, embed senior engineers alongside an in-house team, or run an architecture review while your existing agency continues delivery.",
      },
      {
        question: "How is a US engagement priced?",
        answer:
          "Engagements are scoped and quoted after discovery. There is no public rate card because scope, compliance and team composition vary. Commercial terms and the invoicing currency are agreed in the proposal.",
      },
    ],
    sources: [
      {
        title: "CCPA/CPRA overview",
        url: "https://oag.ca.gov/privacy/ccpa",
        publisher: "California Attorney General",
      },
      {
        title: "WCAG 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
      {
        title: "NIST Cybersecurity Framework",
        url: "https://www.nist.gov/cyberframework",
        publisher: "NIST",
      },
    ],
    updated: CONTENT_UPDATED,
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    shortName: "UK",
    market: "UK & Ireland",
    hreflang: "en-GB",
    metaDescription:
      "Software, mobile, AI, design and video for UK clients, with London hub coverage, UK GDPR context and WCAG 2.2 accessibility.",
    ogLocale: "en_GB",
    currency: "GBP",
    currencyCode: "GBP",
    timezone: "GMT / BST",
    timezoneNote:
      "Direct overlap with UK business hours; London is a published client hub.",
    hub: "London",
    overview:
      "EPIC STUDIO delivers software, mobile, AI, design and video work for UK organisations from a senior-led team, with a published client hub in London and an engineering base in Kolkata. Engagements are scoped for UK procurement, accessibility and data-protection expectations.",
    context: [
      "UK buyers tend to ask for evidence early: a named team, a delivery plan, accessibility conformance and a clear data-processing position. We put those artefacts into discovery rather than treating them as post-signature paperwork.",
      "Public-facing services are designed toward WCAG 2.2 AA, which aligns with the accessibility expectations of UK service providers and the UK public sector.",
      "Time-zone overlap is straightforward: Kolkata is 5.5 hours ahead of GMT and 4.5 hours ahead of BST, leaving a full UK morning and early afternoon for live collaboration.",
    ],
    compliance: [
      {
        title: "UK GDPR guidance",
        url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/",
        publisher: "Information Commissioner's Office",
      },
      {
        title: "Data Protection Act 2018",
        url: "https://www.legislation.gov.uk/ukpga/2018/12/contents",
        publisher: "UK Government",
      },
      {
        title: "Web Content Accessibility Guidelines (WCAG) 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
    ],
    delivery: [
      "Live overlap through the UK morning and early afternoon",
      "UK GDPR-aligned data processing agreement where required",
      "Accessibility evidence for public-facing services",
      "Release windows aligned to UK support hours",
    ],
    serviceNotes: {
      "software-engineering":
        "UK enterprise and public-sector work benefits from explicit architecture decision records, security evidence and a handover pack your team can own.",
      "mobile-app-development":
        "UK product teams often need a single codebase across iOS and Android with a clear privacy and permission model for store review.",
      "ai-automation":
        "UK AI adoption is increasingly governance-led. We map controls to your risk tier and keep a human escalation path for low-confidence outputs.",
      "ui-ux-design":
        "UK service design frequently starts with accessibility and content clarity. We treat both as structural inputs, not a visual polish pass.",
      "govtech":
        "UK public-sector suppliers need accessibility, auditability and data-protection evidence. We scope those requirements before build.",
      "video-production":
        "UK campaigns often need accessible captions and cutdowns for broadcast-adjacent, web and social channels from the same master.",
    },
    faqs: [
      {
        question: "Do you provide web design and software development in the UK?",
        answer:
          "Yes. EPIC STUDIO provides web design, software engineering, mobile apps, AI automation and video for UK clients, with London hub coverage, UK business-hours overlap and WCAG 2.2 AA accessibility in scope.",
      },
      {
        question: "Does EPIC STUDIO have a UK office?",
        answer:
          "London is a published EPIC STUDIO client hub. The engineering base is in Kolkata, India, and the studio does not claim a separate UK registered office. UK engagements run remotely with UK business-hours overlap, and contracting details are confirmed in the statement of work.",
      },
      {
        question: "How do you handle UK GDPR?",
        answer:
          "We map data flows, agree a data processing agreement where required, restrict production access to the minimum necessary, and document retention and deletion. The specific controller/processor position is agreed before delivery starts.",
      },
      {
        question: "Can you meet UK public-sector accessibility expectations?",
        answer:
          "We design and test toward WCAG 2.2 AA, including keyboard access, focus management, contrast, error recovery and screen-reader workflows. Evidence is produced as part of design and build QA.",
      },
      {
        question: "Do you work with UK time zones?",
        answer:
          "Yes. The Kolkata team overlaps with GMT and BST business hours, with the UK morning available for live workshops and reviews.",
      },
      {
        question: "Can you invoice in GBP?",
        answer:
          "The invoicing currency and payment terms are agreed in the commercial proposal. Currency choice is part of the contracting conversation, not an assumption on the website.",
      },
      {
        question: "Can you support a UK rebrand or product launch?",
        answer:
          "Yes. A single programme can cover positioning, interface and design system work, the production build, and launch video or campaign assets.",
      },
    ],
    sources: [
      {
        title: "UK GDPR guidance",
        url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/",
        publisher: "ICO",
      },
      {
        title: "Data Protection Act 2018",
        url: "https://www.legislation.gov.uk/ukpga/2018/12/contents",
        publisher: "UK Government",
      },
      {
        title: "WCAG 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
    ],
    updated: CONTENT_UPDATED,
  },
  {
    slug: "europe",
    name: "Europe",
    shortName: "Europe",
    market: "European Union & wider Europe",
    hreflang: "en-DE",
    metaDescription:
      "EPIC STUDIO delivers software, mobile, AI and design for European clients, with GDPR, EAA accessibility and multilingual delivery.",
    ogLocale: "en_GB",
    currency: "EUR",
    currencyCode: "EUR",
    timezone: "CET / EET",
    timezoneNote:
      "Overlap with CET and EET business hours; London client hub supports European programmes.",
    hub: "London",
    overview:
      "EPIC STUDIO works with European companies on software engineering, mobile, AI, design systems and video. Engagements are built around EU data-protection obligations, the European Accessibility Act and multilingual delivery, with a London client hub and a Kolkata engineering base.",
    context: [
      "European buyers rarely accept a demo as evidence. They ask for a data-processing position, accessibility conformance, security controls and a clear plan for language and market rollout.",
      "The European Accessibility Act applies to many consumer-facing digital services, and EN 301 549 provides the technical reference. We treat accessibility as a build requirement with testable acceptance criteria.",
      "Multilingual delivery is a content and interface problem, not a translation pass at the end. We design layouts, components and content models that survive longer German strings, right-to-left markets and market-specific legal copy.",
    ],
    compliance: [
      {
        title: "General Data Protection Regulation (GDPR)",
        url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
        publisher: "European Union",
      },
      {
        title: "European Accessibility Act",
        url: "https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en",
        publisher: "European Commission",
      },
      {
        title: "EN 301 549 accessibility standard",
        url: "https://www.etsi.org/human-factors-accessibility/en-301-549-v3-the-harmonized-european-standard-for-ict-accessibility",
        publisher: "ETSI",
      },
    ],
    delivery: [
      "Overlap with CET and EET business hours",
      "GDPR data-processing terms and data-flow documentation",
      "Accessibility acceptance criteria aligned to EN 301 549 / WCAG 2.2 AA",
      "Multilingual content models and market-specific QA",
    ],
    serviceNotes: {
      "software-engineering":
        "European platforms often need multi-country configuration, GDPR-safe analytics and a content model that supports several languages without forking the codebase.",
      "mobile-app-development":
        "Mobile work across Europe must account for local privacy consent, accessibility and store listings in multiple languages.",
      "ai-automation":
        "EU AI programmes need a data-protection position, human oversight and documented evaluation. We map controls before selecting a model or vendor.",
      "ui-ux-design":
        "European design systems need to survive translation, longer labels and market-specific legal content. We test the layout with real localized strings.",
      "govtech":
        "Public-sector and publicly funded services need accessibility, auditability and data-residency evidence. We scope those controls explicitly.",
      "video-production":
        "European campaigns usually need localized captions, subtitles and market-specific cutdowns rather than one English master.",
    },
    faqs: [
      {
        question: "Do you provide web design and software development in Europe?",
        answer:
          "Yes. EPIC STUDIO provides web design, software engineering, mobile apps, AI automation and video for European clients, with GDPR data-processing terms, EN 301 549 accessibility context and CET/EET overlap.",
      },
      {
        question: "Does EPIC STUDIO have an EU office?",
        answer:
          "EPIC STUDIO's engineering base is in Kolkata, India, and London is a published client hub. The studio does not claim an EU registered office. EU engagements are delivered remotely with European business-hours overlap, and the contracting entity is confirmed in the statement of work.",
      },
      {
        question: "How do you handle GDPR for European clients?",
        answer:
          "We map data flows, agree a data processing agreement where required, minimise production access, document retention and deletion, and support data-residency choices available in the selected cloud region.",
      },
      {
        question: "Can you meet European Accessibility Act requirements?",
        answer:
          "We design and test toward WCAG 2.2 AA and use EN 301 549 as the technical reference for ICT accessibility. Accessibility criteria are written into acceptance testing rather than treated as a separate audit.",
      },
      {
        question: "Do you build multilingual websites and products?",
        answer:
          "Yes. We build content models and interfaces that support multiple languages and right-to-left layouts, and we test with real localized strings. Native-language review can be scoped as a deliverable.",
      },
      {
        question: "Which European markets do you cover?",
        answer:
          "The studio works with clients across the EU and wider Europe, including Germany, France, the Netherlands, Spain, Italy and the Nordics. Delivery is remote-first with CET/EET overlap.",
      },
      {
        question: "Can you invoice in EUR?",
        answer:
          "The invoicing currency and payment terms are agreed in the commercial proposal. EUR is a common option for European engagements but is not assumed before contracting.",
      },
    ],
    sources: [
      {
        title: "GDPR",
        url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
        publisher: "European Union",
      },
      {
        title: "European Accessibility Act",
        url: "https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en",
        publisher: "European Commission",
      },
      {
        title: "EN 301 549",
        url: "https://www.etsi.org/human-factors-accessibility/en-301-549-v3-the-harmonized-european-standard-for-ict-accessibility",
        publisher: "ETSI",
      },
    ],
    updated: CONTENT_UPDATED,
  },
  {
    slug: "uae-dubai",
    name: "UAE & Dubai",
    shortName: "UAE",
    market: "United Arab Emirates & GCC",
    hreflang: "en-AE",
    metaDescription:
      "Websites, software, mobile, AI and video for UAE and Dubai clients, with GST overlap and Arabic/English delivery support.",
    ogLocale: "en_AE",
    currency: "AED",
    currencyCode: "AED",
    timezone: "GST",
    timezoneNote:
      "GST is UTC+4, only 1.5 hours behind the Kolkata engineering base — near-full working-day overlap.",
    hub: null,
    overview:
      "EPIC STUDIO works with UAE and GCC organisations on websites, software, mobile apps, AI automation, design systems and video campaigns. Engagements are delivered from the Kolkata engineering base with near-full working-day overlap, bilingual-ready content structures and UAE data-protection considerations.",
    context: [
      "Dubai buyers often need a market-facing website, campaign or product launched against a fixed event or season. The useful starting point is the launch date and the approval chain, not a generic capability deck.",
      "Bilingual delivery matters. We build interfaces and content models that support Arabic and English, including right-to-left layout, and scope native-language review where the content requires it.",
      "Data-protection expectations are evolving under the UAE Personal Data Protection Law. We document data flows, access controls and retention before production access, and can deploy in a region-constrained cloud tenancy where required.",
    ],
    compliance: [
      {
        title: "UAE Personal Data Protection Law",
        url: "https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws",
        publisher: "UAE Government",
      },
      {
        title: "Telecommunications and Digital Government Regulatory Authority",
        url: "https://www.tdra.gov.ae/en/",
        publisher: "TDRA",
      },
      {
        title: "Web Content Accessibility Guidelines (WCAG) 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
    ],
    delivery: [
      "Near-full-day overlap with Gulf Standard Time",
      "Arabic/English content structures and RTL interface support",
      "UAE data-protection and data-flow documentation",
      "Campaign and launch deadlines planned backwards from the event date",
    ],
    serviceNotes: {
      "software-engineering":
        "UAE platforms often serve a bilingual audience and a mobile-first market. We design the content model, identity and data flows before build.",
      "mobile-app-development":
        "Mobile products for the Gulf need bilingual onboarding, local payment and identity integration, and a clear privacy model for store review.",
      "ai-automation":
        "AI workflows in the region need Arabic/English handling, data-residency choices and human review for regulated decisions.",
      "ui-ux-design":
        "Dubai-facing interfaces need RTL support, bilingual typography and layouts that survive both languages without a separate design.",
      "govtech":
        "Public-facing digital services in the Gulf require bilingual accessibility, audit logging and a clear data-residency position.",
      "video-production":
        "Campaign films for the UAE market often need Arabic subtitles or VO, platform cutdowns and a launch-date-driven edit schedule.",
    },
    faqs: [
      {
        question: "Do you provide web design and video production in Dubai?",
        answer:
          "Yes. EPIC STUDIO provides web design, website development, software, mobile apps, AI automation and video production for UAE and Dubai clients. Projects can include Arabic/English structures, RTL layouts and platform-specific social cutdowns.",
      },
      {
        question: "Does EPIC STUDIO have a Dubai office?",
        answer:
          "EPIC STUDIO does not claim a Dubai office. Its engineering base is in Kolkata, India, and it serves UAE clients remotely with near-full working-day overlap. Any on-site requirement is agreed in the statement of work.",
      },
      {
        question: "Can you build Arabic and English websites?",
        answer:
          "Yes. We build content models and interfaces that support Arabic and English, including right-to-left layout and bilingual typography. Native Arabic review is scoped where the content requires it.",
      },
      {
        question: "How do you handle UAE data protection?",
        answer:
          "We map data flows and access controls against the UAE Personal Data Protection Law, document retention and deletion, and can deploy in a region-constrained cloud tenancy where the engagement requires it.",
      },
      {
        question: "Can you deliver against a Dubai launch or event deadline?",
        answer:
          "Yes, if the scope is fixed early. We plan backwards from the launch date, separate must-have from post-launch scope, and flag dependencies that would put the date at risk.",
      },
      {
        question: "Do you produce video and social campaigns for the UAE market?",
        answer:
          "Yes. We produce brand films, product motion, social cutdowns and captions, including Arabic subtitle or voice-over variants when those are included in scope.",
      },
      {
        question: "What time zone do you work in?",
        answer:
          "Gulf Standard Time is UTC+4, only 1.5 hours behind the Kolkata engineering base, so UAE clients get near-full working-day overlap.",
      },
    ],
    sources: [
      {
        title: "UAE data protection laws",
        url: "https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws",
        publisher: "UAE Government",
      },
      {
        title: "TDRA",
        url: "https://www.tdra.gov.ae/en/",
        publisher: "TDRA",
      },
      {
        title: "WCAG 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
    ],
    updated: CONTENT_UPDATED,
  },
  {
    slug: "singapore",
    name: "Singapore & APAC",
    shortName: "Singapore",
    market: "Singapore & Asia-Pacific",
    hreflang: "en-SG",
    metaDescription:
      "Software, mobile, AI and design for Singapore and APAC clients, with a Singapore client hub, PDPA context and SGT overlap.",
    ogLocale: "en_SG",
    currency: "SGD",
    currencyCode: "SGD",
    timezone: "SGT",
    timezoneNote:
      "Singapore is a published client hub; SGT is UTC+8 with a 2.5-hour lead over the Kolkata base.",
    hub: "Singapore",
    overview:
      "EPIC STUDIO serves Singapore and APAC clients from a senior engineering and design team, with a published client hub in Singapore and an engineering base in Kolkata. Work covers software, mobile, AI, design systems, GovTech and video.",
    context: [
      "APAC engagements often need a single team across several markets, languages and regulatory contexts. We keep the architecture and design system shared while allowing market-specific content and configuration.",
      "Singapore's PDPA sets the data-protection baseline for many regional programmes. We document consent, retention and access controls, and align the deployment region with the client's obligations.",
      "The time-zone position is unusually good: SGT is only 2.5 hours ahead of IST, giving a long shared working day for Singapore and India-based stakeholders.",
    ],
    compliance: [
      {
        title: "Personal Data Protection Act (PDPA)",
        url: "https://www.pdpc.gov.sg/",
        publisher: "Personal Data Protection Commission Singapore",
      },
      {
        title: "IMDA",
        url: "https://www.imda.gov.sg/",
        publisher: "Infocomm Media Development Authority",
      },
      {
        title: "Web Content Accessibility Guidelines (WCAG) 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
    ],
    delivery: [
      "Long shared working day with Singapore stakeholders",
      "PDPA-aligned data handling and access controls",
      "Multi-market APAC content and configuration models",
      "Regional cloud deployment options",
    ],
    serviceNotes: {
      "software-engineering":
        "APAC platforms often need multi-market configuration and a shared core. We design the tenancy and content model before implementation.",
      "mobile-app-development":
        "Mobile products for APAC need local payment, identity and language support without fragmenting the codebase.",
      "ai-automation":
        "AI workflows across APAC need language coverage, data-residency choices and clear human escalation for regulated decisions.",
      "ui-ux-design":
        "Regional design systems need to support multiple languages and market-specific content without forking the component library.",
      "govtech":
        "Public-sector platforms need accessibility, auditability and data-residency evidence aligned to the relevant jurisdiction.",
      "video-production":
        "APAC campaigns often need multiple subtitle tracks and market-specific cutdowns from a single narrative master.",
    },
    faqs: [
      {
        question: "Do you provide web design and mobile app development in Singapore?",
        answer:
          "Yes. EPIC STUDIO provides web design, software engineering, mobile app development, AI automation and video for Singapore and APAC clients, with a Singapore client hub and SGT working overlap.",
      },
      {
        question: "Does EPIC STUDIO have a Singapore office?",
        answer:
          "Singapore is a published EPIC STUDIO client hub. The engineering base is in Kolkata, India. Contracting details and any on-site requirement are confirmed in the statement of work.",
      },
      {
        question: "How do you handle Singapore PDPA?",
        answer:
          "We document consent, purpose limitation, retention and access controls, and align the deployment region with the client's PDPA obligations. A data processing agreement is agreed where required.",
      },
      {
        question: "Can you support multiple APAC markets?",
        answer:
          "Yes. We build a shared core with market-specific content, configuration and integrations, so adding a market does not require a separate codebase.",
      },
      {
        question: "What are the working hours for Singapore clients?",
        answer:
          "Singapore is UTC+8 and Kolkata is UTC+5:30, giving a 2.5-hour difference and a long shared working day for live collaboration.",
      },
      {
        question: "Can you invoice in SGD?",
        answer:
          "The invoicing currency and payment terms are agreed in the commercial proposal. SGD is a common option for Singapore engagements but is not assumed before contracting.",
      },
      {
        question: "Do you support regional cloud deployment?",
        answer:
          "Where the engagement requires data residency, we select an appropriate cloud region and document every external data flow. The available options depend on the chosen provider and service mix.",
      },
    ],
    sources: [
      {
        title: "Personal Data Protection Commission Singapore",
        url: "https://www.pdpc.gov.sg/",
        publisher: "PDPC",
      },
      {
        title: "IMDA",
        url: "https://www.imda.gov.sg/",
        publisher: "IMDA",
      },
      {
        title: "WCAG 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
    ],
    updated: CONTENT_UPDATED,
  },
  {
    slug: "india",
    name: "India",
    shortName: "India",
    market: "India",
    hreflang: "en-IN",
    metaDescription:
      "EPIC STUDIO delivers enterprise software, mobile apps, AI automation and design across India, with hubs in Kolkata, Mumbai and Bengaluru.",
    ogLocale: "en_IN",
    currency: "INR",
    currencyCode: "INR",
    timezone: "IST",
    timezoneNote:
      "Engineering base in Kolkata; IST is the studio's home time zone.",
    hub: "Kolkata",
    overview:
      "EPIC STUDIO is headquartered in Kolkata, India, and works with Indian enterprises, public institutions and startups across Mumbai, Bengaluru, Delhi NCR and Kolkata on software, mobile, AI, design systems, GovTech and video. The studio combines Indian engineering depth with a senior-only delivery model.",
    context: [
      "Indian digital programmes often combine public-scale traffic, multilingual users and constrained devices. The architecture has to work under those conditions, not only in a demo.",
      "Public and regulated work brings its own obligations: accessibility, auditability, data protection under the DPDP Act and, for government platforms, security and procurement requirements.",
      "The studio's base in Kolkata with presence across Mumbai and Bengaluru means Indian clients get full working-day overlap, direct access to the delivery team and the option of in-person workshops.",
    ],
    compliance: [
      {
        title: "Digital Personal Data Protection Act, 2023",
        url: "https://www.meity.gov.in/",
        publisher: "Ministry of Electronics and Information Technology",
      },
      {
        title: "India Stack",
        url: "https://www.indiastack.org/",
        publisher: "India Stack",
      },
      {
        title: "Web Content Accessibility Guidelines (WCAG) 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
    ],
    delivery: [
      "Full working-day overlap with Indian clients",
      "DPDP-aligned data handling and access controls",
      "Multilingual and low-bandwidth service design",
      "Public-sector procurement and security documentation support",
    ],
    serviceNotes: {
      "software-engineering":
        "Indian platforms often need to handle high concurrency and variable network quality. We design for peak load and degraded networks from the start.",
      "mobile-app-development":
        "Mobile products in India need low-end device performance, local payment integration and multilingual onboarding.",
      "ai-automation":
        "AI workflows in India need language coverage, cost control and human review for high-stakes decisions.",
      "ui-ux-design":
        "Design systems for India need to support multiple scripts, text scaling and low-bandwidth conditions without losing clarity.",
      "govtech":
        "Public platforms need accessibility, auditability and high-concurrency architecture, with security controls mapped to the procurement requirement.",
      "video-production":
        "Campaigns for India often need multiple language versions and platform-specific cutdowns from a single master.",
    },
    faqs: [
      {
        question: "Do you provide web design and software development in India?",
        answer:
          "Yes. EPIC STUDIO provides web design, software engineering, mobile apps, AI automation, GovTech platforms and video for Indian organisations, with full working-day overlap from the Kolkata base.",
      },
      {
        question: "Where is EPIC STUDIO based in India?",
        answer:
          "EPIC STUDIO's engineering base is in Kolkata, West Bengal, India. The studio maintains active client presence across Mumbai, Bengaluru, Delhi NCR, and international hubs in San Francisco, London, and Singapore.",
      },
      {
        question: "Do you serve clients in Mumbai, Bengaluru and across India?",
        answer:
          "Yes. EPIC STUDIO delivers enterprise software engineering, mobile apps, AI automation, and UI/UX design systems for clients in Mumbai, Bengaluru, Delhi NCR, Kolkata, and nationwide. Clients receive dedicated senior delivery teams, full working-day IST overlap, and in-person workshop options.",
      },
      {
        question: "Do you work with Indian government departments?",
        answer:
          "Yes. The studio's GovTech work covers citizen portals, high-concurrency public platforms, accessibility and secure cloud deployment. Security and procurement evidence are scoped per tender.",
      },
      {
        question: "How do you handle India's DPDP Act?",
        answer:
          "We map data flows, purpose limitation, consent and retention against the Digital Personal Data Protection Act, and agree the controller/processor position and access controls before delivery.",
      },
      {
        question: "Can you support Indian languages?",
        answer:
          "We design content models and interfaces that support multiple Indian scripts and languages, and test with real localized strings. Native-language review can be scoped as a deliverable.",
      },
      {
        question: "Can you handle high-concurrency public platforms?",
        answer:
          "Yes. Peak concurrency is treated as a design input. We model expected load, separate read-heavy public traffic from administrative writes, and load-test critical paths before launch.",
      },
      {
        question: "Can we meet the team in person?",
        answer:
          "Indian clients can arrange in-person workshops with the Kolkata-based team. Scope and scheduling are agreed in the engagement plan.",
      },
    ],
    sources: [
      {
        title: "Ministry of Electronics and Information Technology",
        url: "https://www.meity.gov.in/",
        publisher: "Government of India",
      },
      {
        title: "India Stack",
        url: "https://www.indiastack.org/",
        publisher: "India Stack",
      },
      {
        title: "WCAG 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
    ],
    updated: CONTENT_UPDATED,
  },
];

export const REGION_MAP = new Map(REGIONS.map((region) => [region.slug, region]));

export function getRegion(slug: string): Region | undefined {
  return REGION_MAP.get(slug);
}

/** Geo meta values per region page. */
export const REGION_GEO: Record<string, { region: string; placename: string }> = {
  "united-states": { region: "US", placename: "United States" },
  "united-kingdom": { region: "GB", placename: "United Kingdom" },
  europe: { region: "EU", placename: "European Union" },
  "uae-dubai": { region: "AE-DU", placename: "Dubai" },
  singapore: { region: "SG", placename: "Singapore" },
  india: { region: "IN-WB", placename: "Kolkata" },
};

/** Reciprocal hreflang map for region pages. */
export const HREFLANG_LANGUAGES: Record<string, string> = {
  "en-US": `${SITE_URL}/locations/united-states`,
  "en-GB": `${SITE_URL}/locations/united-kingdom`,
  "en-AE": `${SITE_URL}/locations/uae-dubai`,
  "en-DE": `${SITE_URL}/locations/europe`,
  "en-FR": `${SITE_URL}/locations/europe`,
  "en-NL": `${SITE_URL}/locations/europe`,
  "en-ES": `${SITE_URL}/locations/europe`,
  "en-IT": `${SITE_URL}/locations/europe`,
  "en-SG": `${SITE_URL}/locations/singapore`,
  "en-IN": `${SITE_URL}/locations/india`,
  "x-default": `${SITE_URL}/locations`,
};
