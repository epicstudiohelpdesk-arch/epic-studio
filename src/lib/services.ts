import { CONTENT_UPDATED } from "./site";

export interface Faq {
  question: string;
  answer: string;
}

export interface Source {
  title: string;
  url: string;
  publisher: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  detail: string;
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  /** <title> fragment. The layout template appends "| EPIC STUDIO". */
  title: string;
  /** Meta description, 140–165 characters. */
  description: string;
  /** Answer-first lead. Must fully answer "what is this?" in 2–3 sentences. */
  summary: string;
  /** One-sentence definition an LLM can quote verbatim. */
  definition: string;
  audience: string[];
  deliverables: string[];
  process: ProcessStep[];
  stack: string[];
  outcomes: string[];
  faqs: Faq[];
  sources: Source[];
  related: string[];
  updated: string;
}

export const SERVICES: Service[] = [
  {
    slug: "software-engineering",
    name: "Software & Product Engineering",
    shortName: "Software Engineering",
    eyebrow: "01 // SOFTWARE & PRODUCT ENGINEERING",
    title: "Enterprise Software & Product Engineering Services",
    description:
      "EPIC STUDIO designs and builds enterprise software, SaaS platforms, APIs and high-load microservices with senior-only engineering teams.",
    summary:
      "EPIC STUDIO is a senior-only software engineering studio. It designs, builds and operates enterprise web platforms, SaaS products, APIs and high-load microservices for organisations in fintech, education, healthcare, commerce and the public sector.",
    definition:
      "Software and product engineering is the end-to-end discipline of turning a business requirement into a secure, maintainable, production system — covering architecture, implementation, testing, deployment and operation.",
    audience: [
      "CTOs and engineering leaders replacing legacy platforms or clearing delivery backlogs",
      "Founders who need a production-grade MVP without building an in-house team first",
      "Enterprises integrating new products with existing ERP, identity or data systems",
      "Public institutions modernising citizen-facing services",
    ],
    deliverables: [
      "Architecture and technical discovery, including architecture decision records",
      "Full-stack web and SaaS product development",
      "Enterprise APIs, event-driven services and microservices",
      "Database design, migrations and performance tuning",
      "CI/CD pipelines, infrastructure as code and observability",
      "Security review, automated testing and launch runbooks",
    ],
    process: [
      {
        step: "01",
        title: "Discovery and constraints",
        detail:
          "We map users, existing systems, compliance constraints and the commercial outcome before choosing a stack.",
      },
      {
        step: "02",
        title: "Architecture and delivery plan",
        detail:
          "You get a system diagram, data model, integration map, risk register and a milestone plan with acceptance criteria.",
      },
      {
        step: "03",
        title: "Build in production-shaped increments",
        detail:
          "Work ships behind feature flags in two-week increments, with automated tests and staging parity from week one.",
      },
      {
        step: "04",
        title: "Harden and launch",
        detail:
          "Load testing, accessibility checks, security review, observability dashboards and rollback procedures precede go-live.",
      },
      {
        step: "05",
        title: "Operate and improve",
        detail:
          "Post-launch, we run the platform against agreed SLOs or hand over documented runbooks to your team.",
      },
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "Python",
      "Go",
      "Rust",
      "PostgreSQL",
      "Redis",
      "GraphQL",
      "Docker",
      "Kubernetes",
      "Google Cloud",
      "Cloudflare",
    ],
    outcomes: [
      "A documented architecture your team can operate without us",
      "Automated build, test and deploy pipelines with rollback",
      "Measurable web performance and accessibility baselines",
      "Instrumentation for uptime, latency and error budgets",
    ],
    faqs: [
      {
        question: "What kind of software does EPIC STUDIO build?",
        answer:
          "EPIC STUDIO builds enterprise web platforms, SaaS products, internal tools, public-sector portals, enterprise APIs and event-driven microservices. Typical engagements combine a Next.js or React front end with Python, Go or Rust services and PostgreSQL.",
      },
      {
        question: "Does EPIC STUDIO work with existing engineering teams?",
        answer:
          "Yes. The studio can own a workstream end to end, embed senior engineers alongside an in-house team, or run an architecture review before your team implements. Delivery ceremonies and repositories are shared from day one.",
      },
      {
        question: "How does EPIC STUDIO handle legacy modernisation?",
        answer:
          "We start with a dependency and data-flow audit, then modernise incrementally behind a stable interface rather than attempting a risky full rewrite. Each migration step is independently deployable and reversible.",
      },
      {
        question: "Who owns the source code and intellectual property?",
        answer:
          "Ownership is defined in the master services agreement for each engagement. Ask for the standard IP and handover terms before signing, and confirm them in the statement of work.",
      },
      {
        question: "How do you measure engineering quality?",
        answer:
          "We agree on acceptance criteria up front and track automated test coverage, deployment frequency, change failure rate, restore time, Core Web Vitals, and accessibility against WCAG 2.2 AA where relevant.",
      },
      {
        question: "How quickly can an engagement start?",
        answer:
          "Discovery can usually begin within one to two weeks of a signed scope. The first production-shaped increment is planned in the discovery output rather than promised before requirements are understood.",
      },
    ],
    sources: [
      {
        title: "Next.js documentation",
        url: "https://nextjs.org/docs",
        publisher: "Vercel",
      },
      {
        title: "Web Content Accessibility Guidelines (WCAG) 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
      {
        title: "Core Web Vitals",
        url: "https://web.dev/articles/vitals",
        publisher: "Google web.dev",
      },
      {
        title: "OWASP Application Security Verification Standard",
        url: "https://owasp.org/www-project-application-security-verification-standard/",
        publisher: "OWASP Foundation",
      },
    ],
    related: ["mobile-app-development", "ai-automation", "ui-ux-design"],
    updated: CONTENT_UPDATED,
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    shortName: "Mobile Development",
    eyebrow: "02 // MOBILE APP DEVELOPMENT",
    title: "iOS, Android & Cross-Platform App Development",
    description:
      "EPIC STUDIO builds native iOS and Android apps plus React Native and Flutter products with offline-first architecture and hardened mobile security.",
    summary:
      "EPIC STUDIO develops native iOS and Android apps and cross-platform products in React Native and Flutter. Engagements cover product definition, interface design, offline-first architecture, secure release pipelines and post-launch maintenance.",
    definition:
      "Mobile app development is the discipline of designing, building, releasing and maintaining software that runs on iOS and Android devices, including the backend services, store compliance and update lifecycle around it.",
    audience: [
      "Product teams launching a consumer or B2B mobile product",
      "Enterprises extending an internal workflow or customer portal to mobile",
      "Fintech, healthcare and commerce teams with security or offline requirements",
      "Founders who need one codebase across iOS and Android",
    ],
    deliverables: [
      "Product definition, user flows and mobile interaction design",
      "Native iOS (Swift/SwiftUI) and Android (Kotlin/Jetpack Compose) builds",
      "React Native and Flutter cross-platform applications",
      "Offline-first sync, local storage and conflict resolution",
      "Biometric authentication, secure storage and device integrity checks",
      "App Store and Google Play release management and CI pipelines",
    ],
    process: [
      {
        step: "01",
        title: "Platform and scope decision",
        detail:
          "We choose native or cross-platform based on performance needs, device APIs, team skills and release cadence — not fashion.",
      },
      {
        step: "02",
        title: "Prototype the risky path",
        detail:
          "The hardest flow (payments, offline sync, camera, Bluetooth or biometrics) is proven in a thin slice before full build.",
      },
      {
        step: "03",
        title: "Design and build in vertical slices",
        detail:
          "Each slice includes UI, API integration, error states, analytics and tests, reviewed on real devices.",
      },
      {
        step: "04",
        title: "Release readiness",
        detail:
          "Store assets, privacy disclosures, crash reporting, performance profiling and staged rollout plans are completed before submission.",
      },
      {
        step: "05",
        title: "Maintain and iterate",
        detail:
          "OS upgrades, dependency patches and store policy changes are handled through an agreed maintenance window.",
      },
    ],
    stack: [
      "Swift",
      "SwiftUI",
      "Kotlin",
      "Jetpack Compose",
      "React Native",
      "Flutter",
      "TypeScript",
      "Go",
      "GraphQL",
      "REST",
      "PostgreSQL",
      "Firebase",
    ],
    outcomes: [
      "One reviewed release pipeline for every target platform",
      "Offline and poor-network behaviour designed, not patched",
      "Clear privacy and permission model for store review",
      "Crash, performance and adoption telemetry from launch day",
    ],
    faqs: [
      {
        question: "Should we build native or cross-platform?",
        answer:
          "Choose native when the product depends on intensive device APIs, complex background processing, or platform-specific performance. Choose React Native or Flutter when one team must ship a consistent product to both stores quickly and the experience does not hinge on low-level device features.",
      },
      {
        question: "Does EPIC STUDIO handle App Store and Google Play submission?",
        answer:
          "Yes. Release work includes store listings, screenshots, privacy declarations, data-safety forms, build signing, TestFlight or internal-track testing, and staged rollout.",
      },
      {
        question: "Can the app work offline?",
        answer:
          "Yes. We design local persistence, sync queues and conflict-resolution rules for offline-first products, then test them under real network loss rather than only on a simulator.",
      },
      {
        question: "How is mobile security handled?",
        answer:
          "We use platform secure storage, biometric authentication, certificate pinning where appropriate, jailbreak and root signals, and least-privilege API tokens. The control set is mapped to the OWASP Mobile Application Security Verification Standard.",
      },
      {
        question: "Do you maintain apps after launch?",
        answer:
          "Yes, through an agreed maintenance or retainer scope covering OS updates, dependency upgrades, crash triage, store compliance and small feature increments.",
      },
      {
        question: "Can you work with our existing backend?",
        answer:
          "Yes. We integrate with existing REST, GraphQL or gRPC services and document any contract changes. If the backend needs work, that is scoped separately so mobile delivery is not blocked.",
      },
    ],
    sources: [
      {
        title: "Human Interface Guidelines",
        url: "https://developer.apple.com/design/human-interface-guidelines",
        publisher: "Apple",
      },
      {
        title: "Android core app quality guidelines",
        url: "https://developer.android.com/docs/quality-guidelines/core-app-quality",
        publisher: "Android Developers",
      },
      {
        title: "OWASP Mobile Application Security",
        url: "https://mas.owasp.org/",
        publisher: "OWASP Foundation",
      },
      {
        title: "React Native documentation",
        url: "https://reactnative.dev/docs/getting-started",
        publisher: "Meta",
      },
    ],
    related: ["software-engineering", "ui-ux-design", "ai-automation"],
    updated: CONTENT_UPDATED,
  },
  {
    slug: "ai-automation",
    name: "AI Automation & Cloud DevOps",
    shortName: "AI Automation",
    eyebrow: "03 // AI AUTOMATION & CLOUD DEVOPS",
    title: "AI Automation, LLM Integration & Cloud DevOps",
    description:
      "EPIC STUDIO deploys production AI workflows, retrieval-augmented assistants, evaluation harnesses and cloud DevOps for enterprise operations.",
    summary:
      "EPIC STUDIO builds production AI systems: retrieval-augmented assistants, autonomous workflow agents, model evaluation harnesses and the cloud infrastructure that runs them. The studio also operates CI/CD, Kubernetes and observability for teams that need reliable delivery.",
    definition:
      "AI automation is the engineering practice of placing machine-learning models and large language models inside a governed business workflow, with defined inputs, evaluation criteria, guardrails, human escalation and operational monitoring.",
    audience: [
      "Operations teams with repetitive, document-heavy or triage-heavy workflows",
      "Enterprises evaluating LLM assistants that must meet security and accuracy thresholds",
      "Product teams adding search, summarisation or generation to an existing platform",
      "Engineering teams that need a reliable cloud and release foundation",
    ],
    deliverables: [
      "AI opportunity audit and build-versus-buy recommendation",
      "Retrieval-augmented generation (RAG) over approved data sources",
      "Workflow agents with tool permissions and human approval gates",
      "Evaluation sets, regression tests and hallucination controls",
      "Prompt, model and data versioning with audit logs",
      "Kubernetes, CI/CD, secrets management and cost observability",
    ],
    process: [
      {
        step: "01",
        title: "Workflow and risk audit",
        detail:
          "We identify where a model adds measurable value, what data it may touch, and which failure modes are unacceptable.",
      },
      {
        step: "02",
        title: "Evaluation before implementation",
        detail:
          "A labelled evaluation set and acceptance threshold are agreed before a model or vendor is selected.",
      },
      {
        step: "03",
        title: "Thin production slice",
        detail:
          "One high-value flow is shipped with logging, human review and a rollback path instead of a broad demo.",
      },
      {
        step: "04",
        title: "Harden and integrate",
        detail:
          "Access control, PII handling, rate limits, retries and cost caps are added, then the flow is connected to real systems.",
      },
      {
        step: "05",
        title: "Monitor and retrain",
        detail:
          "Quality dashboards, drift alerts and a change process keep the system honest after launch.",
      },
    ],
    stack: [
      "Python",
      "PyTorch",
      "Rust",
      "TypeScript",
      "LLM APIs",
      "Vector databases",
      "PostgreSQL",
      "Redis",
      "Kubernetes",
      "Docker",
      "Google Cloud",
      "Terraform",
    ],
    outcomes: [
      "A measured baseline instead of an unverified demo",
      "Human escalation paths for low-confidence outputs",
      "Per-workflow cost, latency and quality dashboards",
      "Auditable model, prompt and data versions",
    ],
    faqs: [
      {
        question: "What does an AI automation engagement actually deliver?",
        answer:
          "A working, monitored workflow connected to your systems — not a slide deck. Typical output includes the integration, evaluation set, guardrails, deployment pipeline and operating documentation.",
      },
      {
        question: "How do you reduce hallucinations?",
        answer:
          "We constrain answers to retrieved, permissioned sources, require citations to source passages, add confidence thresholds, and route low-confidence cases to a human. An evaluation set is run on every change so regressions are visible.",
      },
      {
        question: "Will our data be used to train a public model?",
        answer:
          "Model and data terms depend on the provider and deployment chosen. We document the data flow, prefer enterprise endpoints with no-training commitments where available, and can keep inference inside your cloud tenancy.",
      },
      {
        question: "Can you integrate with our existing tools?",
        answer:
          "Yes. Integrations commonly cover CRMs, ticketing systems, document stores, data warehouses and internal APIs. Access is scoped to the minimum permissions the workflow needs.",
      },
      {
        question: "How do you control AI running costs?",
        answer:
          "We instrument token and request spend per workflow, cache repeated work, route simple tasks to cheaper models, and set hard budget caps with alerts before launch.",
      },
      {
        question: "Do you follow an AI governance framework?",
        answer:
          "We map controls to the NIST AI Risk Management Framework and the OWASP Top 10 for LLM Applications, then agree which controls are mandatory for your risk tier.",
      },
    ],
    sources: [
      {
        title: "AI Risk Management Framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
        publisher: "NIST",
      },
      {
        title: "OWASP Top 10 for LLM Applications",
        url: "https://genai.owasp.org/llm-top-10/",
        publisher: "OWASP Foundation",
      },
      {
        title: "Google Cloud Architecture Framework",
        url: "https://cloud.google.com/architecture/framework",
        publisher: "Google Cloud",
      },
      {
        title: "Model Context Protocol",
        url: "https://modelcontextprotocol.io/",
        publisher: "Model Context Protocol",
      },
    ],
    related: ["software-engineering", "govtech", "mobile-app-development"],
    updated: CONTENT_UPDATED,
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX, Web Design & Brand Systems",
    shortName: "UI/UX & Web Design",
    eyebrow: "04 // UI/UX & BRAND SYSTEMS",
    title: "Web Design, UI/UX Systems & Brand Identity",
    description:
      "EPIC STUDIO designs accessible websites, product interfaces, scalable design systems and brand identities that engineering teams can implement without drift.",
    summary:
      "EPIC STUDIO designs websites, product interfaces, multi-brand design systems and visual identities. Work is delivered as implementation-ready components, tokens and usage rules so design survives handoff to engineering.",
    definition:
      "UI/UX design is the practice of researching user needs, structuring product flows, and specifying interfaces and design systems precisely enough that they can be built, tested and maintained consistently.",
    audience: [
      "Product teams whose interface has drifted across screens or platforms",
      "Companies rebranding without wanting to rebuild the entire product",
      "Engineering-led organisations that need a shared component language",
      "Founders validating a product before investing in full build",
    ],
    deliverables: [
      "User research synthesis, journey maps and information architecture",
      "Wireframes, interaction flows and clickable prototypes",
      "Design tokens, component libraries and usage documentation",
      "Accessible colour, type and motion specifications",
      "Brand identity, art direction and asset libraries",
      "Design QA against the built product",
    ],
    process: [
      {
        step: "01",
        title: "Research and interface audit",
        detail:
          "We review analytics, support themes, accessibility gaps and the existing interface before proposing a new direction.",
      },
      {
        step: "02",
        title: "Structure before styling",
        detail:
          "Information architecture and key flows are agreed in low fidelity so visual work solves a defined problem.",
      },
      {
        step: "03",
        title: "System and identity",
        detail:
          "Tokens, components, states and brand rules are defined together, including dark mode and responsive behaviour.",
      },
      {
        step: "04",
        title: "Prototype and test",
        detail:
          "Critical flows are tested with real users or internal operators, and the findings are folded back into the system.",
      },
      {
        step: "05",
        title: "Design QA in the build",
        detail:
          "We review implemented screens against the specification and log deviations before release.",
      },
    ],
    stack: [
      "Figma",
      "Design tokens",
      "Component libraries",
      "Prototyping",
      "WCAG 2.2",
      "Responsive layout",
      "Motion specification",
      "Brand systems",
    ],
    outcomes: [
      "One interface language across web and mobile",
      "Accessibility decisions documented, not deferred",
      "Faster engineering handoff with fewer one-off screens",
      "A brand system that still works at product scale",
    ],
    faqs: [
      {
        question: "What is a design system, and do we need one?",
        answer:
          "A design system is a shared set of tokens, components, states and usage rules that keeps interfaces consistent as a product grows. You need one when multiple teams or platforms are shipping UI and drift is already causing rework or inconsistent customer experience.",
      },
      {
        question: "Can you redesign without rebuilding the product?",
        answer:
          "Often yes. We can layer a new visual and component system onto existing flows, prioritising high-traffic screens first, and hand engineering a migration sequence rather than a big-bang rewrite.",
      },
      {
        question: "How is accessibility handled?",
        answer:
          "Accessibility is specified with the design: contrast, focus order, target sizes, error messaging, motion preferences and semantic structure. We target WCAG 2.2 AA for public-facing work and include it in design QA.",
      },
      {
        question: "Do you hand off Figma files or code?",
        answer:
          "Both are possible. Deliverables can include token definitions, component specifications and production-ready front-end components where the engagement includes implementation.",
      },
      {
        question: "Do you design and build websites?",
        answer:
          "Yes. EPIC STUDIO designs and builds marketing sites, product sites and web applications, including responsive layouts, design systems and production front-end implementation where the engagement includes build.",
      },
      {
        question: "How long does a design system engagement take?",
        answer:
          "A focused system for one product usually runs in phased increments rather than a single handover. The exact sequence depends on the number of platforms, existing components and migration constraints identified in the audit.",
      },
      {
        question: "Can you work with our in-house designers?",
        answer:
          "Yes. We can lead the system, co-design with your team, or run a review and roadmap while your designers own execution.",
      },
    ],
    sources: [
      {
        title: "Web Content Accessibility Guidelines (WCAG) 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
      },
      {
        title: "Design Tokens Format Module",
        url: "https://design-tokens.github.io/community-group/format/",
        publisher: "W3C Design Tokens Community Group",
      },
      {
        title: "Human Interface Guidelines",
        url: "https://developer.apple.com/design/human-interface-guidelines",
        publisher: "Apple",
      },
      {
        title: "Material Design 3",
        url: "https://m3.material.io/",
        publisher: "Google",
      },
    ],
    related: ["software-engineering", "mobile-app-development", "video-production"],
    updated: CONTENT_UPDATED,
  },
  {
    slug: "govtech",
    name: "GovTech & Public Platforms",
    shortName: "GovTech",
    eyebrow: "05 // GOVTECH & PUBLIC PLATFORMS",
    title: "GovTech, Digital Public Infrastructure & Citizen Platforms",
    description:
      "EPIC STUDIO engineers citizen portals, digital public infrastructure and high-concurrency government platforms with accessibility and auditability built in.",
    summary:
      "EPIC STUDIO builds digital public infrastructure and citizen-facing platforms for government and public institutions. Work covers service design, high-concurrency portals, identity and data integration, accessibility, audit logging and sovereign cloud deployment.",
    definition:
      "GovTech is the design and engineering of public-sector digital services — citizen portals, benefit delivery, education and health platforms, and the identity, data-exchange and security layers beneath them.",
    audience: [
      "Government departments modernising citizen service delivery",
      "Public education, health and welfare institutions",
      "State-owned bodies replacing fragmented legacy portals",
      "Implementation partners needing senior engineering capacity",
    ],
    deliverables: [
      "Citizen journey research and service blueprinting",
      "High-concurrency public portals and administrative consoles",
      "Identity, entitlement and data-exchange integration",
      "Role-based access control and immutable audit trails",
      "Accessibility conformance and local-language support",
      "Sovereign or region-constrained cloud deployment",
    ],
    process: [
      {
        step: "01",
        title: "Service and stakeholder mapping",
        detail:
          "We map citizen journeys, departmental responsibilities, legal constraints and existing registries before designing technology.",
      },
      {
        step: "02",
        title: "Reference architecture and controls",
        detail:
          "Security classification, data residency, identity model, audit requirements and accessibility targets are agreed in writing.",
      },
      {
        step: "03",
        title: "Pilot a real service",
        detail:
          "One service is delivered end to end with real users and real data volume, then reviewed against the control baseline.",
      },
      {
        step: "04",
        title: "Scale and integrate",
        detail:
          "Additional services reuse the same identity, audit and design layers rather than becoming separate silos.",
      },
      {
        step: "05",
        title: "Operate with transparency",
        detail:
          "Runbooks, incident processes, public status reporting and periodic access reviews keep the platform accountable.",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Kubernetes",
      "OpenID Connect",
      "Audit logging",
      "Infrastructure as code",
      "Google Cloud",
      "Cloudflare",
    ],
    outcomes: [
      "A service that holds under peak civic demand",
      "Traceable access and administrative actions",
      "Accessible journeys for low-bandwidth and assisted users",
      "Reusable identity, design and audit foundations",
    ],
    faqs: [
      {
        question: "What is digital public infrastructure?",
        answer:
          "Digital public infrastructure (DPI) is shared digital rails — identity, payments, data exchange and service delivery — that multiple public and private services build on. GovTech projects often implement one service on top of those rails rather than creating new standalone systems.",
      },
      {
        question: "How do you handle data residency and sovereignty?",
        answer:
          "Deployment region, data classification and cross-border transfer rules are agreed before architecture is chosen. We can deploy in a government cloud or a region-constrained tenancy and document every external data flow.",
      },
      {
        question: "Can the platform handle exam-day or enrolment peak load?",
        answer:
          "Yes, peak load is treated as a design input. We model expected concurrency, load-test the critical paths, add queueing and caching where appropriate, and rehearse degradation behaviour before launch.",
      },
      {
        question: "How is accessibility addressed for public services?",
        answer:
          "We target WCAG 2.2 AA, test with keyboard and screen-reader workflows, support text scaling and reduced motion, and account for low-bandwidth and assisted-service contexts.",
      },
      {
        question: "Do you work with government procurement processes?",
        answer:
          "We can respond to RFPs, provide technical annexes, work under existing framework agreements, or partner with a prime contractor. Scope and compliance evidence are mapped to the tender requirements.",
      },
      {
        question: "What security standards do you design against?",
        answer:
          "Controls are selected from the applicable national policy and mapped to NIST SP 800-53 and OWASP guidance. The agreed baseline, evidence and testing schedule are part of the delivery plan.",
      },
    ],
    sources: [
      {
        title: "India Stack",
        url: "https://www.indiastack.org/",
        publisher: "India Stack",
      },
      {
        title: "Ministry of Electronics and Information Technology",
        url: "https://www.meity.gov.in/",
        publisher: "Government of India",
      },
      {
        title: "NIST SP 800-53 security and privacy controls",
        url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        publisher: "NIST",
      },
      {
        title: "Digital India",
        url: "https://www.digitalindia.gov.in/",
        publisher: "Government of India",
      },
    ],
    related: ["software-engineering", "ai-automation", "ui-ux-design"],
    updated: CONTENT_UPDATED,
  },
  {
    slug: "video-production",
    name: "Video, Social Media & Motion Production",
    shortName: "Video & Social",
    eyebrow: "06 // VIDEO, SOCIAL & MOTION",
    title: "Brand Video, Social Media Content & Motion Graphics",
    description:
      "EPIC STUDIO produces brand films, social media content, short-form video, motion graphics and accessible post-production for technology and consumer brands.",
    summary:
      "EPIC STUDIO provides video editing, motion graphics and post-production for brand, product and social campaigns. Deliverables include narrative brand films, product explainers, short-form social edits, captions and platform-specific exports.",
    definition:
      "Video post-production is the discipline of assembling footage, motion graphics, sound and colour into finished, platform-ready video, including accessibility elements such as captions and transcripts.",
    audience: [
      "Technology brands launching a product or category narrative",
      "Marketing teams that need a repeatable social video pipeline",
      "Founders preparing an investor or sales narrative",
      "Agencies needing senior editorial and motion capacity",
    ],
    deliverables: [
      "Narrative structure, script polish and shot planning",
      "Editorial assembly, pacing and story refinement",
      "Motion graphics, titles, UI animation and VFX compositing",
      "Colour grading and sound design",
      "Captions, subtitles and transcript-ready exports",
      "Platform-specific masters for web, social and presentations",
    ],
    process: [
      {
        step: "01",
        title: "Message and audience",
        detail:
          "We define the single idea the film must land, who it is for and where it will be watched before editing begins.",
      },
      {
        step: "02",
        title: "Assembly and story",
        detail:
          "A rough cut tests the narrative spine. We fix structure before investing in polish.",
      },
      {
        step: "03",
        title: "Motion and sound",
        detail:
          "Graphics, transitions, colour and sound are built to support comprehension rather than decorate it.",
      },
      {
        step: "04",
        title: "Accessibility and variants",
        detail:
          "Captions, legible supers and safe-area checks are completed, then platform-specific cuts are exported.",
      },
      {
        step: "05",
        title: "Delivery and archive",
        detail:
          "You receive organised masters, compressed web versions and a documented asset archive for future edits.",
      },
    ],
    stack: [
      "4K editorial",
      "Motion graphics",
      "VFX compositing",
      "Colour grading",
      "Sound design",
      "Captioning",
      "Platform mastering",
    ],
    outcomes: [
      "One narrative with correctly framed cutdowns per channel",
      "Captions and transcripts from the first master",
      "Consistent brand motion and typography",
      "An organised archive your team can reuse",
    ],
    faqs: [
      {
        question: "Do you produce social media content and campaign assets?",
        answer:
          "Yes. We produce short-form video, motion templates, static social systems, captions and platform-specific cutdowns from one narrative master. Assets are delivered as a repeatable content system with naming and publishing rules.",
      },
      {
        question: "What types of video does EPIC STUDIO produce?",
        answer:
          "Brand films, product explainers, UI and motion graphics, social short-form, investor and sales narratives, and event or campaign edits. Post-production can also be scoped separately from filming.",
      },
      {
        question: "Do you handle scripting and storyboarding?",
        answer:
          "Yes. We can shape the narrative from a brief, polish an existing script, or build a shot plan around footage you already have.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Revision rounds are fixed in the statement of work, usually one structural pass and one polish pass. Additional rounds are quoted rather than absorbed silently.",
      },
      {
        question: "Are captions and accessibility included?",
        answer:
          "Yes. We deliver captions and can provide transcripts and audio-description guidance. Supers are checked for legibility, contrast and safe areas on mobile.",
      },
      {
        question: "Can you work with footage we supply?",
        answer:
          "Yes. We can edit supplied footage, organise and log it, and flag coverage or audio issues before the edit begins.",
      },
      {
        question: "Who owns the final video and the project files?",
        answer:
          "Usage rights and project-file handover are defined in the production agreement. Confirm the intended channels, territory and duration so the licence matches how the work will be used.",
      },
    ],
    sources: [
      {
        title: "Making audio and video media accessible",
        url: "https://www.w3.org/WAI/media/av/",
        publisher: "W3C WAI",
      },
      {
        title: "Captions, transcripts, and descriptions",
        url: "https://webaim.org/techniques/captions/",
        publisher: "WebAIM",
      },
      {
        title: "Learn Performance",
        url: "https://web.dev/learn/performance",
        publisher: "Google web.dev",
      },
    ],
    related: ["ui-ux-design", "software-engineering", "ai-automation"],
    updated: CONTENT_UPDATED,
  },
];

export const SERVICE_MAP = new Map(SERVICES.map((s) => [s.slug, s]));

export function getService(slug: string): Service | undefined {
  return SERVICE_MAP.get(slug);
}
