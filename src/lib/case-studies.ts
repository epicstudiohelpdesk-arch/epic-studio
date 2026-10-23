import { CONTENT_UPDATED } from "./site";
import type { Faq } from "./services";

export interface CaseStudy {
  slug: string;
  name: string;
  category: string;
  title: string;
  description: string;
  summary: string;
  challenge: string;
  approach: string[];
  architecture: string[];
  /** Published top-line result. Keep the caveat visible on the page. */
  headlineMetric: { value: string; label: string };
  metrics: { value: string; label: string }[];
  stack: string[];
  faqs: Faq[];
  updated: string;
  accent: "lime" | "blue" | "white";
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "west-bengal-education-platform",
    name: "West Bengal Education Platform",
    category: "GovTech / Digital Public Platform",
    title: "West Bengal Education Platform — GovTech Case Study",
    description:
      "How EPIC STUDIO architected a statewide education platform for examination-day concurrency, serving 12M+ students and teachers.",
    summary:
      "The West Bengal Education Platform is a statewide learning and governance system designed for peak examination-day concurrency. EPIC STUDIO's published engagement covers the citizen and administrator experience, cloud microservices and analytics for 12M+ students and teachers.",
    challenge:
      "A statewide education system concentrates enormous traffic into a few predictable windows: enrolment, results and examinations. The platform needed to remain usable for students and teachers on mixed devices and networks while giving administrators a reliable operational view.",
    approach: [
      "Map student, teacher and administrator journeys before defining the service architecture.",
      "Separate read-heavy public traffic from write-heavy administrative workflows so peak results traffic cannot block back-office operations.",
      "Design for degraded networks with lightweight pages, clear loading states and retry-safe submissions.",
      "Instrument the platform so operators can see queue depth, error rates and service health during peak windows.",
    ],
    architecture: [
      "Next.js front end with server-rendered public pages and role-aware administrative consoles",
      "Cloud-hosted microservices behind a managed API layer",
      "Managed PostgreSQL for transactional records with read replicas for peak reporting",
      "Caching and queueing at the traffic edges for predictable peak behaviour",
      "Analytics pipeline for operational and learning insight",
    ],
    headlineMetric: { value: "12M+", label: "students and teachers served" },
    metrics: [
      { value: "12M+", label: "Students and teachers served" },
      { value: "Statewide", label: "Learning and governance scope" },
      { value: "Peak-first", label: "Architecture designed for exam-day load" },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Cloud microservices",
      "PostgreSQL",
      "Caching",
      "Queueing",
      "AI analytics",
    ],
    faqs: [
      {
        question: "What is the West Bengal Education Platform?",
        answer:
          "It is a statewide digital learning and governance platform built to serve students, teachers and administrators. EPIC STUDIO's published work covers the citizen experience, administrative workflows, cloud services and analytics at a scale of 12M+ users.",
      },
      {
        question: "How does the platform handle examination-day traffic?",
        answer:
          "The architecture separates public read traffic from administrative writes, adds caching and queueing at the edges, and is load-tested against modelled peak concurrency rather than average usage.",
      },
      {
        question: "Does the platform support low-bandwidth users?",
        answer:
          "The service design prioritises lightweight pages, clear loading and error states, and retry-safe form submissions so journeys remain usable on mixed devices and constrained networks.",
      },
    ],
    updated: CONTENT_UPDATED,
    accent: "lime",
  },
  {
    slug: "omniflow-ai",
    name: "Omniflow AI",
    category: "SaaS Platform / AI Orchestration",
    title: "Omniflow AI — Autonomous Workflow Engine Case Study",
    description:
      "EPIC STUDIO's Omniflow AI case study: a Rust and PyTorch workflow engine for real-time enterprise operations, reported at 3.4× faster execution.",
    summary:
      "Omniflow AI is an autonomous enterprise workflow engine designed to execute operational processes in real time. The published build combines a Rust core, PyTorch models and an event mesh, with a reported 3.4× improvement in enterprise operations speed.",
    challenge:
      "Enterprise operations are usually split across tools, queues and manual handoffs. Automating them requires low-latency execution, safe tool permissions and a way to evaluate model behaviour before it touches production systems.",
    approach: [
      "Model the workflow as explicit steps with typed inputs, outputs and failure states.",
      "Keep the execution core in Rust for predictable latency and memory behaviour.",
      "Use PyTorch models only where judgement is required, with deterministic rules around them.",
      "Add human approval gates and audit logging for irreversible actions.",
      "Evaluate each workflow against a labelled baseline before rollout.",
    ],
    architecture: [
      "Rust execution core for the workflow runtime",
      "PyTorch inference services for classification and extraction steps",
      "Event mesh for asynchronous step coordination and retries",
      "PostgreSQL for workflow state and audit history",
      "Observability for latency, failure and cost per execution",
    ],
    headlineMetric: { value: "3.4×", label: "faster enterprise operations (reported)" },
    metrics: [
      { value: "3.4×", label: "Reported operations speed-up" },
      { value: "Real time", label: "Workflow execution model" },
      { value: "Rust + PyTorch", label: "Deterministic core with model judgement" },
    ],
    stack: ["Rust", "PyTorch", "Python", "Event mesh", "PostgreSQL", "Observability"],
    faqs: [
      {
        question: "What does Omniflow AI do?",
        answer:
          "Omniflow AI is an autonomous workflow engine that executes enterprise operations in real time. It coordinates typed workflow steps, uses models for judgement-heavy steps, and keeps irreversible actions behind approval gates.",
      },
      {
        question: "Why use Rust for an AI workflow engine?",
        answer:
          "The execution core benefits from predictable latency, memory safety and low overhead. Models handle judgement; Rust handles orchestration, retries and state transitions deterministically.",
      },
      {
        question: "How is the 3.4× figure measured?",
        answer:
          "The 3.4× figure is EPIC STUDIO's published project result for enterprise operations speed. It is a studio-reported metric, not an independently audited benchmark, and the measurement basis should be confirmed during due diligence.",
      },
    ],
    updated: CONTENT_UPDATED,
    accent: "blue",
  },
  {
    slug: "kairo-mobile",
    name: "Kairo Mobile",
    category: "Mobile / Fintech",
    title: "Kairo Mobile — Cross-Border Banking App Case Study",
    description:
      "EPIC STUDIO's Kairo Mobile case study: a React Native banking app with hardware-enclave biometrics and Go microservices, $450M+ processed.",
    summary:
      "Kairo Mobile is a cross-border banking application built with React Native, hardware-backed biometric security and Go microservices. EPIC STUDIO's published project result reports $450M+ in transaction volume processed.",
    challenge:
      "Cross-border banking combines high-risk authentication, regulated data handling and unreliable networks. The app had to feel immediate while keeping credentials inside the device's secure hardware and keeping the backend auditable.",
    approach: [
      "Keep biometric keys in the platform secure enclave and never expose raw credentials to the app layer.",
      "Design transaction flows to be idempotent so a dropped connection cannot double-charge a user.",
      "Use Go microservices for predictable payment-path latency and explicit service boundaries.",
      "Instrument the funnel from onboarding to transaction completion, with fraud and failure signals separated.",
    ],
    architecture: [
      "React Native application shared across iOS and Android",
      "Hardware-backed key storage and biometric authentication",
      "Go microservices for accounts, payments and transaction state",
      "Idempotency keys and reconciliation jobs for payment safety",
      "Audit logging and alerting on the transaction path",
    ],
    headlineMetric: { value: "$450M+", label: "transaction volume processed (reported)" },
    metrics: [
      { value: "$450M+", label: "Reported transaction volume" },
      { value: "Hardware", label: "Enclave-backed biometric security" },
      { value: "2 platforms", label: "One React Native codebase" },
    ],
    stack: ["React Native", "Swift Vault", "Go", "PostgreSQL", "Biometric auth", "Audit logging"],
    faqs: [
      {
        question: "What is Kairo Mobile?",
        answer:
          "Kairo Mobile is a cross-border banking application built by EPIC STUDIO with a React Native client, hardware-enclave biometric security and Go microservices for payments.",
      },
      {
        question: "How is biometric security implemented?",
        answer:
          "Biometric keys are stored in the device's secure hardware and never exposed to the JavaScript layer. Authentication is bound to a device key, with server-side verification and audit logging.",
      },
      {
        question: "Is the $450M+ figure audited?",
        answer:
          "The $450M+ transaction volume is EPIC STUDIO's published project result. It is a studio-reported figure rather than an independently audited statement, and should be verified during commercial due diligence.",
      },
    ],
    updated: CONTENT_UPDATED,
    accent: "white",
  },
];

export const CASE_STUDY_MAP = new Map(CASE_STUDIES.map((c) => [c.slug, c]));

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDY_MAP.get(slug);
}
