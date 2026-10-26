"use client";

import React, { useState, useRef } from "react";
import Header from "./Header";
import SiteFooter from "./SiteFooter";
import PhoneInputWithCountry from "./contact/PhoneInputWithCountry";
import "./contact/contact.css";
import "./join/join.css";

interface RoleSpec {
  id: string;
  title: string;
  department: "field-research" | "inside-sales" | "b2b-closers" | "trainee";
  pod: string;
  type: string;
  location: string;
  experience: string;
  compensationBadge: string;
  summary: string;
  workflowStep: string;
  keyHighlights: string[];
  responsibilities: string[];
  qualifications: string[];
}

const OPEN_ROLES: RoleSpec[] = [
  {
    id: "market-data-collector",
    title: "Market Intelligence & Data Collection Executive",
    department: "field-research",
    pod: "Field Intelligence & Market Discovery",
    type: "Full-Time / Field Flexible",
    location: "Kolkata, Howrah, 24 Parganas & Bengal Districts",
    experience: "Freshers Welcome / 1+ Years",
    compensationBadge: "Fixed Base + Per-Dossier Data Incentives + Weekly Bonuses",
    summary:
      "Visit and contact local retail shops, clinics, institutes, and traditional businesses in the market. Uncover their daily operational bottlenecks, identify how they are missing out on the internet economy (no website, no mobile app, zero online advertisements), and submit structured business intelligence reports.",
    workflowStep: "STEP 1 // MARKET DATA COLLECTION",
    keyHighlights: [
      "On-Ground Merchant Discovery",
      "Business Problem Assessment",
      "Digital Gap Identification",
      "Structured Dossier Submission",
    ],
    responsibilities: [
      "Visit commercial markets, shopping zones, industrial clusters, and business hubs to connect directly with business owners and managers.",
      "Conduct friendly, conversational discovery interviews to understand their current reach, customer footfall challenges, and lack of digital tools.",
      "Assess their digital status: absent or outdated website, no mobile app for customers, zero Google Maps/search ranking, and unoptimized advertising.",
      "Record structured intelligence dossiers (decision-maker contacts, business pain points, marketing willingness) and submit them directly to our internal Business Analyst desk.",
    ],
    qualifications: [
      "Strong spoken communication in Bengali and/or Hindi; conversational English.",
      "High natural confidence, curiosity, and comfort walking into businesses to talk to shop owners and managers.",
      "Disciplined, honest, and detail-oriented in recording accurate business information.",
      "Freshers, college graduates, and candidates with field survey, sales promotion, or customer-facing backgrounds are highly encouraged to apply.",
    ],
  },
  {
    id: "client-solutions-specialist",
    title: "Business Development & Client Solutions Specialist",
    department: "inside-sales",
    pod: "Strategic Client Acquisition & Pitch Pod",
    type: "Full-Time",
    location: "Kolkata Hub (Sector V) / Hybrid / Remote Pan-India",
    experience: "1–4 Years (Sales / Account Management)",
    compensationBadge: "Competitive Fixed Base + High Uncapped Deal Commissions",
    summary:
      "Work directly from the qualified market intelligence gathered by our Field Research team and custom solution roadmaps engineered by our internal Business Analysts. Contact business owners, conduct strategic pitch consultations, explain their massive untapped internet reach, and close website, app, and digital growth agreements.",
    workflowStep: "STEP 3 // SOLUTIONS PITCH & DEAL CLOSING",
    keyHighlights: [
      "Qualified Data-Backed Outreach",
      "Custom BA Solution Presentations",
      "Internet Reach & ROI Consultation",
      "High-Value Contract Closing",
    ],
    responsibilities: [
      "Receive pre-qualified business intelligence dossiers and custom digital proposals formulated by our dedicated Business Analysts.",
      "Contact business owners via scheduled calls, video briefings, and targeted follow-up sessions.",
      "Walk decision-makers through tailored solutions: custom websites, customer mobile applications, Google/Meta ad funnels, and local SEO dominance.",
      "Explain the exact financial return on investment (ROI): how modern internet visibility converts online browsers into daily paying customers.",
      "Overcome commercial objections, negotiate pricing scopes, and finalize signed service contracts.",
    ],
    qualifications: [
      "Proven experience or strong natural talent in consultative tele-sales, B2B sales, software selling, or client acquisition.",
      "Persuasive communicator with the ability to explain digital product value without getting lost in technical jargon.",
      "Driven by performance: eager to earn substantial uncapped milestone commissions on top of guaranteed base pay.",
      "Proficient in English, Bengali, and Hindi.",
    ],
  },
  {
    id: "b2b-field-sales-closer",
    title: "Senior B2B Field Sales Executive (Commercial Closer)",
    department: "b2b-closers",
    pod: "Enterprise & High-Value Commercial Expansion",
    type: "Full-Time",
    location: "Kolkata & West Bengal Commercial Corridors",
    experience: "2–6 Years (Field Sales / Commercial Deals)",
    compensationBadge: "High Base Salary + Milestone Deal Bonuses + Travel Allowance",
    summary:
      "Conduct in-person executive meetings with business directors, founders, and large retail chain owners. Present custom Business Analyst blueprints, demonstrate live software and web prototypes, negotiate commercial agreements, and close high-ticket digital transformation contracts.",
    workflowStep: "STEP 3 // IN-PERSON STRATEGIC CLOSING",
    keyHighlights: [
      "Direct Executive Meetings",
      "Live Software Demonstrations",
      "Commercial Scope Negotiation",
      "High-Ticket Milestone Commissions",
    ],
    responsibilities: [
      "Lead scheduled in-person meetings with business founders and directors based on field-researched market data.",
      "Showcase interactive web and mobile prototypes designed by Epic Studio to illustrate their future digital reach.",
      "Structure multi-phase development scopes, manage milestone commercial contracts, and close high-value partnerships.",
      "Maintain ongoing advisory relationships with clients to foster repeat retainers and regional referrals.",
    ],
    qualifications: [
      "Strong field sales acumen with demonstrable track record closing B2B service or product agreements.",
      "Polished presentation skills, executive presence, and commercial negotiation instinct.",
      "Deep understanding of Kolkata and West Bengal regional business ecosystems.",
    ],
  },
  {
    id: "commercial-growth-trainee",
    title: "Commercial Growth & Market Research Trainee",
    department: "trainee",
    pod: "Sales & Market Intelligence Academy",
    type: "Trainee / Full-Time PPO Track",
    location: "Kolkata Hub & Regional Districts",
    experience: "Freshers Welcome (0–1 Year)",
    compensationBadge: "Monthly Stipend + High Per-Dossier Incentives + Fast PPO",
    summary:
      "Accelerated commercial onboarding program for ambitious freshers and college graduates. Learn professional market research, business data collection, client psychology, and consultative closing techniques with direct daily mentorship from our senior Business Analysts.",
    workflowStep: "ACADEMY // STRUCTURED TRAINING TO CLOSER",
    keyHighlights: [
      "Comprehensive Field Training",
      "Business Analyst Mentorship",
      "Market Intelligence Mastery",
      "Direct Pre-Placement Offer (PPO)",
    ],
    responsibilities: [
      "Shadow senior field research executives to learn how to interview business owners and identify digital market gaps.",
      "Learn how our Business Analysts analyze market problems and design tailored digital solutions (websites, apps, ads).",
      "Master high-velocity customer communication, field data documentation, and objection handling.",
      "Transition rapidly into a full-time Market Intelligence Executive or Client Solutions Specialist based on performance.",
    ],
    qualifications: [
      "College graduates or final-year students with high energy, exceptional work ethic, and ambition to excel in sales and business development.",
      "Fluency in Bengali and/or Hindi; basic working English.",
      "Zero prior experience required: we provide all training, market scripts, questionnaire frameworks, and analyst guidance.",
    ],
  },
];

interface DropdownOptionItem {
  value: string;
  label: string;
  desc?: string;
}

const EXPERIENCE_OPTIONS: DropdownOptionItem[] = [
  { value: "Fresher (Zero Experience, Strong Communication)", label: "Fresher (Zero Experience, Strong Communication)", desc: "Quick learner with natural confidence" },
  { value: "1–2 Years (Field / Tele-sales / Direct Marketing)", label: "1–2 Years (Field / Tele-sales / Direct Marketing)", desc: "Hands-on customer interaction experience" },
  { value: "3–5 Years (B2B Sales / Account Management)", label: "3–5 Years (B2B Sales / Account Management)", desc: "Proven deal pitching and client relationship track record" },
  { value: "5+ Years (Senior Commercial Closer / Lead)", label: "5+ Years (Senior Commercial Closer / Lead)", desc: "High-ticket sales closer & team leadership" },
];

const TERRITORY_OPTIONS: DropdownOptionItem[] = [
  { value: "Kolkata (Central, South & Salt Lake / Sector V)", label: "Kolkata (Central, South & Salt Lake / Sector V)", desc: "Core commercial & retail zones" },
  { value: "South 24 Parganas (Baruipur, Garia, Sonarpur)", label: "South 24 Parganas (Baruipur, Garia, Sonarpur)", desc: "Rapidly expanding district markets" },
  { value: "North 24 Parganas (Dum Dum, Barasat, Barrackpore)", label: "North 24 Parganas (Dum Dum, Barasat, Barrackpore)", desc: "Dense suburban commercial corridors" },
  { value: "Howrah & Hooghly Industrial / Retail Hubs", label: "Howrah & Hooghly Industrial / Retail Hubs", desc: "Wholesale, manufacturing & retail markets" },
  { value: "Rest of West Bengal Districts", label: "Rest of West Bengal Districts", desc: "Regional tier-2 & tier-3 merchant markets" },
  { value: "Remote / Pan-India (Inside Calling & Video Pitch)", label: "Remote / Pan-India (Inside Calling & Video Pitch)", desc: "Digital calling desk from home/office" },
];

const LANGUAGE_OPTIONS: DropdownOptionItem[] = [
  { value: "Bengali & English", label: "Bengali & English", desc: "Strong local market rapport" },
  { value: "Bengali, Hindi & English", label: "Bengali, Hindi & English", desc: "Comprehensive regional fluency" },
  { value: "Hindi & English", label: "Hindi & English", desc: "Pan-India commercial communication" },
  { value: "Fluent Multi-lingual", label: "Fluent Multi-lingual", desc: "Bengali, Hindi, English + others" },
];

const AVAILABILITY_OPTIONS: DropdownOptionItem[] = [
  { value: "Immediate (< 7 Days)", label: "Immediate (< 7 Days)", desc: "Ready to start field/sales right away" },
  { value: "15 Days Notice", label: "15 Days Notice", desc: "Short transition timeline" },
  { value: "1 Month Notice", label: "1 Month Notice", desc: "Standard employment transition" },
  { value: "College Student / Field Internship", label: "College Student / Field Internship", desc: "Flexible market research hours" },
];

const CAREERS_FAQ = [
  {
    id: "no-coding-required",
    num: "01",
    category: "Role Scope",
    question: "Do I need a technical coding or computer science background to apply?",
    answer:
      "Not at all! You do NOT need to write code or build software. Our internal Business Analysts and Software Architects evaluate all technical requirements and engineer custom websites, mobile apps, or digital advertising blueprints. Your mission is either talking to business owners on the ground to identify their market struggles, or presenting the solution prepared by our analysts and closing the deal.",
    highlight: "Zero coding required · Complete technical backing from internal Business Analysts",
  },
  {
    id: "how-engine-works",
    num: "02",
    category: "Workflow",
    question: "How does the coordination between Data Collectors, Business Analysts, and Closers work?",
    answer:
      "It operates as a seamless 3-stage engine: 1) Market Data Collectors connect with local businesses, identify their lack of internet reach, and submit a structured problem dossier; 2) Our internal Business Analysts study the dossier and formulate a custom digital transformation proposal (website/app scope + ROI estimate); 3) Our Client Solutions Specialists or Closers reach out to the business owner with that ready proposal, explain the customer reach they will gain, and close the partnership!",
    highlight: "Structured 3-Stage Pipeline · Data Collection → BA Solution → Solution Closer",
  },
  {
    id: "compensation-structure",
    num: "03",
    category: "Compensation",
    question: "How is compensation and performance commission structured?",
    answer:
      "We believe in transparent, rewarding compensation. Every role receives a guaranteed fixed base salary. In addition, Market Data Collectors receive per-dossier verified data incentives, while Client Solutions Specialists and Closers earn uncapped percentage commissions on every contract signed. High performers take home industry-leading monthly payouts.",
    highlight: "Guaranteed Base Salary + Per-Dossier Data Incentives + Uncapped Deal Commissions",
  },
  {
    id: "freshers-welcome",
    num: "04",
    category: "Eligibility",
    question: "Are freshers or college students eligible for the Market Intelligence & Data Collection role?",
    answer:
      "Yes, 100%! We prioritize energy, natural curiosity, and communication skills far above previous corporate experience. If you are comfortable walking into shops and businesses to talk to decision-makers and have local language fluency (Bengali/Hindi), we will train you on our questionnaire frameworks and field methodology.",
    highlight: "Freshers & students welcome · Complete on-ground training & questionnaire scripts provided",
  },
  {
    id: "target-locations",
    num: "05",
    category: "Territory",
    question: "Which market territories and districts are we currently deploying teams in?",
    answer:
      "Our immediate field operations focus on Kolkata (Central, South, Salt Lake, New Town), South 24 Parganas (Baruipur, Garia, Sonarpur), North 24 Parganas (Dum Dum, Barasat, Barrackpore), and Howrah commercial markets. For Inside Sales and Solutions Specialists, operations are conducted from our Kolkata Sector V office or remotely pan-India.",
    highlight: "Kolkata, Howrah, 24 Parganas & Bengal commercial clusters · Pan-India inside sales",
  },
  {
    id: "field-allowances",
    num: "06",
    category: "Benefits",
    question: "Are field travel and mobile communication allowances provided?",
    answer:
      "Yes. All on-field Market Intelligence Executives and B2B Sales Executives receive dedicated local travel allowances, mobile/data stipends, and company presentation materials to make client visits seamless and efficient.",
    highlight: "Local travel allowance · Mobile/data stipend · Official presentation kits",
  },
];

export default function JoinUsPage() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("market-data-collector");
  const [activeInspectorTab, setActiveInspectorTab] = useState<"scope" | "apply" | "perks">("scope");

  // Form State
  const [selectedRole, setSelectedRole] = useState<string>(OPEN_ROLES[0].title);
  const [selectedExperience, setSelectedExperience] = useState<string>("Fresher (Zero Experience, Strong Communication)");
  const [selectedTerritory, setSelectedTerritory] = useState<string>("Kolkata (Central, South & Salt Lake / Sector V)");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Bengali & English");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("Immediate (< 7 Days)");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [message, setMessage] = useState("");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    token: string;
    name: string;
    email: string;
    role: string;
    whatsappUrls?: string[];
  } | null>(null);

  // FAQ State
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>("All");
  const [openFaqId, setOpenFaqId] = useState<string | null>("no-coding-required");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const terminalRef = useRef<HTMLDivElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyText = (text: string, label: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`✓ ${label} copied to clipboard`);
    }
  };

  const scrollToTerminal = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectRole = (role: RoleSpec) => {
    setSelectedRoleId(role.id);
    setSelectedRole(role.title);
    setActiveInspectorTab("scope");
  };

  const handleApplyRole = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setActiveInspectorTab("apply");
    setSubmittedData(null);
    setFormError(null);
    scrollToTerminal();
  };

  const currentRole = OPEN_ROLES.find((r) => r.id === selectedRoleId) || OPEN_ROLES[0];

  const filteredFaqs =
    activeFaqCategory === "All"
      ? CAREERS_FAQ
      : CAREERS_FAQ.filter((f) => f.category === activeFaqCategory);

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!name.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    const cleanDigits = phone.replace(/[^0-9]/g, "");
    if (!phone.trim() || cleanDigits.length < 7) {
      setPhoneError("Please enter a valid phone number with your country code.");
      setFormError("Phone number is mandatory.");
      return;
    }
    if (!resumeUrl.trim()) {
      setFormError("Please provide your Resume / CV link, LinkedIn profile, or brief bio link.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: selectedRole,
        experience: selectedExperience,
        availability: selectedAvailability,
        portfolioUrl: `Territory: ${selectedTerritory} | Languages: ${selectedLanguage}`,
        resumeUrl: resumeUrl.trim(),
        message: [
          `PREFERRED TERRITORY: ${selectedTerritory}`,
          `LANGUAGES SPOKEN: ${selectedLanguage}`,
          "",
          `COMMUNICATION PROFILE & PITCH:`,
          message.trim() || "No additional notes provided.",
        ].join("\n"),
      };

      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setSubmittedData({
        token: data.token,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        whatsappUrls: data.whatsappUrls,
      });

      showToast("✓ Application successfully registered!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setFormError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="site-shell join-cutout-root">
      {/* SECTION 01: HERO & GEOMETRIC CUTOUT BENTO SHOWCASE */}
      <section className="hero-section join-cutout-hero-section" aria-labelledby="join-hero-title">
        <Header />

        <div className="join-cutout-container">
          {/* CLEAN HERO HEADER (No tabular badge, No tabular metrics ribbon) */}
          <div className="join-cutout-hero-header">
            <h1 id="join-hero-title" className="join-cutout-main-title">
              DRIVE THE FUTURE. <span className="join-lime-glow">SCALE SOMETHING EPIC.</span>
            </h1>
            <p className="join-cutout-main-desc">
              We connect offline merchants across West Bengal to modern websites, custom mobile apps, and internet customer reach. We are recruiting frontline <strong>Market Intelligence Executives</strong> and <strong>Commercial Solution Closers</strong>. Zero coding required — fully backed by internal Business Analysts.
            </p>
          </div>

          {/* GEOMETRIC CUTOUT BENTO FRAME */}
          <div className="join-cutout-master-frame" ref={terminalRef}>
            {/* Signature Geometric Cutout Notch with Inverted Curves (Image 1 / Image 2 style) */}
            <div className="cutout-top-notch-anchor" aria-label="Commercial Positions & Intake Status">
              <div className="cutout-notch-pill-group">
                <div className="cutout-notch-pill is-primary">
                  <span className="notch-pill-icon">⚡</span>
                  <span className="notch-pill-title">COMMERCIAL POSITIONS (4)</span>
                </div>
                <div className="cutout-notch-pill is-status">
                  <span className="notch-live-pulse" />
                  <span className="notch-pill-text">ACTIVELY HIRING</span>
                  <span className="notch-pill-dot">·</span>
                  <span className="notch-pill-count">2026 INTAKE</span>
                </div>
              </div>
            </div>

            {/* Dotted Geometric Matrix Texture (Image 1 / Image 2 style) */}
            <div className="cutout-bg-dot-pattern" aria-hidden="true" />

            <div className="cutout-bento-grid">
              {/* LEFT BENTO CARD: COMMERCIAL POSITIONS (4) - Geometric Cutout Card */}
              <div className="cutout-bento-card is-roles" role="region" aria-label="Commercial Positions Directory">
                <div className="cutout-card-header">
                  <div className="roles-header-left">
                    <span className="roles-header-eyebrow">TALENT DIRECTORY</span>
                    <h3 className="roles-header-heading">Open Commercial Tracks</h3>
                  </div>
                  <span className="roles-live-badge">SELECT TO INSPECT</span>
                </div>

                <div className="cutout-roles-list" role="tablist" aria-label="Positions List">
                  {OPEN_ROLES.map((role, idx) => {
                    const isSelected = selectedRoleId === role.id && selectedRole === role.title;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        className={`cutout-role-item ${isSelected ? "is-selected" : ""}`}
                        onClick={() => handleSelectRole(role)}
                      >
                        <div className="role-item-num">0{idx + 1}</div>
                        <div className="role-item-content">
                          <div className="role-item-headline">
                            <span className="role-item-title">{role.title}</span>
                            {role.id === "market-data-collector" && (
                              <span className="role-pill-priority">PRIORITY</span>
                            )}
                          </div>
                          <div className="role-item-pod">
                            <span>{role.pod}</span>
                            <span className="role-pod-sep">/</span>
                            <span>{role.location}</span>
                          </div>
                          <div className="role-item-comp">
                            <span className="comp-symbol">⚡</span>
                            <span>{role.compensationBadge}</span>
                          </div>
                        </div>
                        <div className="role-item-arrow">→</div>
                      </button>
                    );
                  })}

                  {/* Open Commercial Application */}
                  <button
                    type="button"
                    className={`cutout-role-item is-open-app ${selectedRole === "Open Commercial & Sales Application" ? "is-selected" : ""}`}
                    onClick={() => {
                      setSelectedRole("Open Commercial & Sales Application");
                      setActiveInspectorTab("apply");
                      setSubmittedData(null);
                    }}
                  >
                    <div className="role-item-num">✦</div>
                    <div className="role-item-content">
                      <div className="role-item-headline">
                        <span className="role-item-title">Open Commercial &amp; Sales Application</span>
                      </div>
                      <div className="role-item-pod">
                        <span>Submit CV for general sales, research, or custom market proposal</span>
                      </div>
                    </div>
                    <span className="open-app-badge">APPLY →</span>
                  </button>
                </div>

                {/* Bottom Trust Notch */}
                <div className="cutout-card-trust-footer">
                  <div className="trust-footer-pill">
                    <span className="trust-micro-dot" />
                    <span>Direct Review SLA &lt; 48h</span>
                  </div>
                  <div className="trust-footer-pill">
                    <span className="trust-micro-dot" />
                    <span>Zero Tech Coding Required</span>
                  </div>
                </div>
              </div>

              {/* RIGHT BENTO CARD: ROLE INSPECTOR & INLINE APPLICATION */}
              <div className="cutout-bento-card is-inspector" role="region" aria-label="Role Details & Application Console">
                {/* Inspector Header with Segmented Capsule Nav */}
                <div className="inspector-cutout-header">
                  <div className="inspector-heading-block">
                    <span className="inspector-workflow-step">{currentRole.workflowStep}</span>
                    <h2 className="inspector-role-name">{selectedRole}</h2>
                  </div>

                  <div className="cutout-segmented-nav" role="tablist" aria-label="Role inspection views">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeInspectorTab === "scope"}
                      className={`segmented-tab-pill ${activeInspectorTab === "scope" ? "is-active" : ""}`}
                      onClick={() => setActiveInspectorTab("scope")}
                    >
                      Position Scope
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeInspectorTab === "apply"}
                      className={`segmented-tab-pill ${activeInspectorTab === "apply" ? "is-active" : ""}`}
                      onClick={() => {
                        setActiveInspectorTab("apply");
                        setSubmittedData(null);
                      }}
                    >
                      Quick Apply
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeInspectorTab === "perks"}
                      className={`segmented-tab-pill ${activeInspectorTab === "perks" ? "is-active" : ""}`}
                      onClick={() => setActiveInspectorTab("perks")}
                    >
                      Earning &amp; Perks
                    </button>
                  </div>
                </div>

                {/* Inspector Content Body */}
                <div className="inspector-cutout-body">
                  {submittedData ? (
                    /* 1. DISPATCHED SCREEN */
                    <div className="cutout-dispatched-screen">
                      <div className="dispatched-circle-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>

                      <h3 className="dispatched-card-title">Application Dispatched!</h3>
                      <p className="dispatched-card-desc">
                        Thank you, <strong>{submittedData.name}</strong>. Your candidacy for{" "}
                        <strong>{submittedData.role}</strong> has been logged into our commercial recruiting pipeline. Our team will review your credentials and contact you within 24 to 48 hours.
                      </p>

                      <div className="dispatched-token-pill">
                        <span className="dispatched-token-code">{submittedData.token}</span>
                        <button
                          type="button"
                          className="dispatched-copy-btn"
                          onClick={() => handleCopyText(submittedData.token, "Application Reference Code")}
                        >
                          COPY REF
                        </button>
                      </div>

                      <div className="dispatched-actions-row">
                        {submittedData.whatsappUrls?.[0] && (
                          <a
                            href={submittedData.whatsappUrls[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dispatched-whatsapp-link"
                          >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.414z"/>
                            </svg>
                            <span>Confirm on WhatsApp</span>
                          </a>
                        )}
                        <button
                          type="button"
                          className="dispatched-reset-btn"
                          onClick={() => {
                            setSubmittedData(null);
                            setActiveInspectorTab("scope");
                          }}
                        >
                          View Position Scope
                        </button>
                      </div>
                    </div>
                  ) : activeInspectorTab === "scope" ? (
                    /* 2. POSITION SCOPE */
                    <div className="inspector-scope-panel">
                      <div className="cutout-comp-banner">
                        <div className="comp-banner-top">
                          <span className="comp-banner-label">COMPENSATION MODEL</span>
                          <span className="comp-banner-exp">{currentRole.experience}</span>
                        </div>
                        <p className="comp-banner-value">{currentRole.compensationBadge}</p>
                      </div>

                      <div className="inspector-block-section">
                        <h4 className="inspector-subhead">MISSION &amp; MARKET CONTEXT</h4>
                        <p className="inspector-narrative">{currentRole.summary}</p>
                      </div>

                      {/* 2-Column Deliverables & Qualifications */}
                      <div className="inspector-spec-split">
                        <div className="inspector-spec-card">
                          <h4 className="inspector-subhead">CORE DELIVERABLES</h4>
                          <ul className="spec-check-list">
                            {currentRole.responsibilities.map((item, i) => (
                              <li key={i} className="spec-check-item">
                                <span className="check-icon">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="inspector-spec-card">
                          <h4 className="inspector-subhead">WHAT WE LOOK FOR</h4>
                          <ul className="spec-check-list">
                            {currentRole.qualifications.map((item, i) => (
                              <li key={i} className="spec-check-item">
                                <span className="check-icon">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Micro Tags */}
                      <div className="inspector-micro-pills-row">
                        {currentRole.keyHighlights.map((tag, i) => (
                          <span key={i} className="micro-pill-chip">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Bar */}
                      <div className="inspector-cta-bar">
                        <button
                          type="button"
                          className="cutout-apply-btn"
                          onClick={() => handleApplyRole(currentRole.title)}
                        >
                          <span>Apply for this Position</span>
                          <span className="cta-arrow">→</span>
                        </button>

                        <div className="cutout-desk-pill">
                          <span className="desk-pill-label">Direct Desk:</span>
                          <button
                            type="button"
                            className="desk-pill-btn"
                            onClick={() => handleCopyText("careers@epic-studio.in", "Careers Email")}
                          >
                            careers@epic-studio.in
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : activeInspectorTab === "apply" ? (
                    /* 3. APPLICATION FORM */
                    <div className="inspector-apply-panel">
                      <div className="apply-panel-header">
                        <span className="apply-role-tag">
                          Target Position: <strong>{selectedRole}</strong>
                        </span>
                        <span className="apply-sla-badge">&lt; 48-Hour Response SLA</span>
                      </div>

                      <form onSubmit={handleSubmitApplication} className="cutout-form-stack">
                        {formError && (
                          <div className="cutout-form-alert">
                            ⚠ {formError}
                          </div>
                        )}

                        {/* Name & Email */}
                        <div className="cutout-form-row">
                          <div className="cutout-field">
                            <label className="field-label">
                              Full Name <span className="req">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Rahul Sen / Priya Sharma"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="field-input"
                            />
                          </div>

                          <div className="cutout-field">
                            <label className="field-label">
                              Email Address <span className="req">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="rahul@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="field-input"
                            />
                          </div>
                        </div>

                        {/* Phone with Country Picker */}
                        <div className="cutout-field">
                          <label className="field-label">
                            Phone / WhatsApp Number <span className="req">*</span>
                          </label>
                          <PhoneInputWithCountry
                            id="join-applicant-phone"
                            name="applicantPhone"
                            value={phone}
                            onChange={(fullVal) => {
                              setPhone(fullVal);
                              if (phoneError) setPhoneError(null);
                            }}
                            required
                            defaultCountryCode="IN"
                            error={phoneError}
                          />
                        </div>

                        {/* Position & Experience */}
                        <div className="cutout-form-row">
                          <div className="cutout-field">
                            <label className="field-label">
                              Target Position <span className="req">*</span>
                            </label>
                            <div className="custom-dropdown-container">
                              <button
                                type="button"
                                className={`custom-dropdown-trigger ${openDropdown === "role" ? "is-open" : ""}`}
                                onClick={() =>
                                  setOpenDropdown((prev) => (prev === "role" ? null : "role"))
                                }
                              >
                                <span className="custom-dropdown-trigger-left">
                                  <span className="custom-dropdown-label">{selectedRole}</span>
                                </span>
                                <span className="custom-dropdown-chevron">▼</span>
                              </button>

                              {openDropdown === "role" && (
                                <div className="custom-dropdown-menu">
                                  {[
                                    ...OPEN_ROLES.map((r) => ({
                                      value: r.title,
                                      label: r.title,
                                      desc: `${r.pod} · ${r.type}`,
                                    })),
                                    {
                                      value: "Open Commercial & Sales Application",
                                      label: "Open Commercial & Sales Application",
                                      desc: "General sales, research, or custom market proposal",
                                    },
                                  ].map((item) => {
                                    const isSelected = selectedRole === item.value;
                                    return (
                                      <button
                                        key={item.value}
                                        type="button"
                                        className={`custom-dropdown-item ${isSelected ? "is-selected" : ""}`}
                                        onClick={() => {
                                          setSelectedRole(item.value);
                                          const matchingRole = OPEN_ROLES.find((r) => r.title === item.value);
                                          if (matchingRole) setSelectedRoleId(matchingRole.id);
                                          setOpenDropdown(null);
                                        }}
                                      >
                                        <div className="custom-dropdown-item-info">
                                          <span className="custom-dropdown-item-title">{item.label}</span>
                                          {item.desc && (
                                            <span className="custom-dropdown-item-desc">{item.desc}</span>
                                          )}
                                        </div>
                                        {isSelected && <span className="custom-dropdown-check">✓</span>}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="cutout-field">
                            <label className="field-label">
                              Sales / Market Experience <span className="req">*</span>
                            </label>
                            <div className="custom-dropdown-container">
                              <button
                                type="button"
                                className={`custom-dropdown-trigger ${openDropdown === "exp" ? "is-open" : ""}`}
                                onClick={() =>
                                  setOpenDropdown((prev) => (prev === "exp" ? null : "exp"))
                                }
                              >
                                <span className="custom-dropdown-trigger-left">
                                  <span className="custom-dropdown-label">{selectedExperience}</span>
                                </span>
                                <span className="custom-dropdown-chevron">▼</span>
                              </button>

                              {openDropdown === "exp" && (
                                <div className="custom-dropdown-menu">
                                  {EXPERIENCE_OPTIONS.map((item) => {
                                    const isSelected = selectedExperience === item.value;
                                    return (
                                      <button
                                        key={item.value}
                                        type="button"
                                        className={`custom-dropdown-item ${isSelected ? "is-selected" : ""}`}
                                        onClick={() => {
                                          setSelectedExperience(item.value);
                                          setOpenDropdown(null);
                                        }}
                                      >
                                        <div className="custom-dropdown-item-info">
                                          <span className="custom-dropdown-item-title">{item.label}</span>
                                          {item.desc && (
                                            <span className="custom-dropdown-item-desc">{item.desc}</span>
                                          )}
                                        </div>
                                        {isSelected && <span className="custom-dropdown-check">✓</span>}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Territory & Languages */}
                        <div className="cutout-form-row">
                          <div className="cutout-field">
                            <label className="field-label">
                              Preferred Territory <span className="req">*</span>
                            </label>
                            <div className="custom-dropdown-container">
                              <button
                                type="button"
                                className={`custom-dropdown-trigger ${openDropdown === "territory" ? "is-open" : ""}`}
                                onClick={() =>
                                  setOpenDropdown((prev) => (prev === "territory" ? null : "territory"))
                                }
                              >
                                <span className="custom-dropdown-trigger-left">
                                  <span className="custom-dropdown-label">{selectedTerritory}</span>
                                </span>
                                <span className="custom-dropdown-chevron">▼</span>
                              </button>

                              {openDropdown === "territory" && (
                                <div className="custom-dropdown-menu">
                                  {TERRITORY_OPTIONS.map((item) => {
                                    const isSelected = selectedTerritory === item.value;
                                    return (
                                      <button
                                        key={item.value}
                                        type="button"
                                        className={`custom-dropdown-item ${isSelected ? "is-selected" : ""}`}
                                        onClick={() => {
                                          setSelectedTerritory(item.value);
                                          setOpenDropdown(null);
                                        }}
                                      >
                                        <div className="custom-dropdown-item-info">
                                          <span className="custom-dropdown-item-title">{item.label}</span>
                                          {item.desc && (
                                            <span className="custom-dropdown-item-desc">{item.desc}</span>
                                          )}
                                        </div>
                                        {isSelected && <span className="custom-dropdown-check">✓</span>}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="cutout-field">
                            <label className="field-label">
                              Languages Spoken <span className="req">*</span>
                            </label>
                            <div className="custom-dropdown-container">
                              <button
                                type="button"
                                className={`custom-dropdown-trigger ${openDropdown === "lang" ? "is-open" : ""}`}
                                onClick={() =>
                                  setOpenDropdown((prev) => (prev === "lang" ? null : "lang"))
                                }
                              >
                                <span className="custom-dropdown-trigger-left">
                                  <span className="custom-dropdown-label">{selectedLanguage}</span>
                                </span>
                                <span className="custom-dropdown-chevron">▼</span>
                              </button>

                              {openDropdown === "lang" && (
                                <div className="custom-dropdown-menu">
                                  {LANGUAGE_OPTIONS.map((item) => {
                                    const isSelected = selectedLanguage === item.value;
                                    return (
                                      <button
                                        key={item.value}
                                        type="button"
                                        className={`custom-dropdown-item ${isSelected ? "is-selected" : ""}`}
                                        onClick={() => {
                                          setSelectedLanguage(item.value);
                                          setOpenDropdown(null);
                                        }}
                                      >
                                        <div className="custom-dropdown-item-info">
                                          <span className="custom-dropdown-item-title">{item.label}</span>
                                          {item.desc && (
                                            <span className="custom-dropdown-item-desc">{item.desc}</span>
                                          )}
                                        </div>
                                        {isSelected && <span className="custom-dropdown-check">✓</span>}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Resume & Availability */}
                        <div className="cutout-form-row">
                          <div className="cutout-field">
                            <label className="field-label">
                              Resume / LinkedIn Link <span className="req">*</span>
                            </label>
                            <input
                              type="url"
                              required
                              placeholder="Google Drive, LinkedIn, or Notion URL"
                              value={resumeUrl}
                              onChange={(e) => setResumeUrl(e.target.value)}
                              className="field-input"
                            />
                          </div>

                          <div className="cutout-field">
                            <label className="field-label">
                              Availability Timeline
                            </label>
                            <div className="custom-dropdown-container">
                              <button
                                type="button"
                                className={`custom-dropdown-trigger ${openDropdown === "avail" ? "is-open" : ""}`}
                                onClick={() =>
                                  setOpenDropdown((prev) => (prev === "avail" ? null : "avail"))
                                }
                              >
                                <span className="custom-dropdown-trigger-left">
                                  <span className="custom-dropdown-label">{selectedAvailability}</span>
                                </span>
                                <span className="custom-dropdown-chevron">▼</span>
                              </button>

                              {openDropdown === "avail" && (
                                <div className="custom-dropdown-menu">
                                  {AVAILABILITY_OPTIONS.map((item) => {
                                    const isSelected = selectedAvailability === item.value;
                                    return (
                                      <button
                                        key={item.value}
                                        type="button"
                                        className={`custom-dropdown-item ${isSelected ? "is-selected" : ""}`}
                                        onClick={() => {
                                          setSelectedAvailability(item.value);
                                          setOpenDropdown(null);
                                        }}
                                      >
                                        <div className="custom-dropdown-item-info">
                                          <span className="custom-dropdown-item-title">{item.label}</span>
                                          {item.desc && (
                                            <span className="custom-dropdown-item-desc">{item.desc}</span>
                                          )}
                                        </div>
                                        {isSelected && <span className="custom-dropdown-check">✓</span>}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Pitch Note */}
                        <div className="cutout-field">
                          <label className="field-label">
                            Why You&apos;d Excel / Communication Style (Optional)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Tell us about your comfort talking to business owners, past sales achievements, or regional fluency."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="field-textarea"
                          />
                        </div>

                        {/* Submit CTA */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="cutout-submit-btn"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="cutout-spinner" />
                              <span>Dispatching Application...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Application Directly</span>
                              <span className="cta-arrow">→</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  ) : (
                    /* 4. EARNING & CULTURE PERKS */
                    <div className="inspector-perks-panel">
                      <div className="perks-panel-intro">
                        <h4 className="perks-title-main">High Autonomy &amp; Transparent Compensation</h4>
                        <p className="perks-desc-main">
                          We reward real commercial outcomes and problem discovery above rigid timesheets. All roles offer guaranteed base compensation paired with aggressive performance rewards.
                        </p>
                      </div>

                      <div className="perks-bento-grid">
                        <div className="perks-bento-card">
                          <span className="perk-index-num">01</span>
                          <h5 className="perk-card-title">Guaranteed Fixed Base</h5>
                          <p className="perk-card-desc">Reliable monthly foundation for every role so you can focus on building deep merchant rapport without financial stress.</p>
                        </div>

                        <div className="perks-bento-card">
                          <span className="perk-index-num">02</span>
                          <h5 className="perk-card-title">Per-Dossier Research Bonuses</h5>
                          <p className="perk-card-desc">Data collection executives earn immediate bonuses for each verified offline business dossier submitted to our analysts.</p>
                        </div>

                        <div className="perks-bento-card">
                          <span className="perk-index-num">03</span>
                          <h5 className="perk-card-title">Uncapped Deal Commissions</h5>
                          <p className="perk-card-desc">Closers earn transparent percentage shares on all custom software, web app, and advertising agreements with zero earnings cap.</p>
                        </div>

                        <div className="perks-bento-card">
                          <span className="perk-index-num">04</span>
                          <h5 className="perk-card-title">Business Analyst Backing</h5>
                          <p className="perk-card-desc">You never build or estimate technical features alone. Our dedicated engineering analysts formulate scopes and ROI proofs for you.</p>
                        </div>
                      </div>

                      <div className="perks-cta-row">
                        <button
                          type="button"
                          className="cutout-apply-btn"
                          onClick={() => handleApplyRole(currentRole.title)}
                        >
                          <span>Apply for {currentRole.title}</span>
                          <span className="cta-arrow">→</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: THE 3-STAGE COMMERCIAL WORKFLOW (Geometric Horizontal Flow) */}
      <section className="join-pipeline-section" aria-labelledby="pipeline-heading">
        <div className="join-cutout-container">
          <div className="pipeline-header-block">
            <span className="pipeline-eyebrow">COMMERCIAL ARCHITECTURE // COLLABORATION MODEL</span>
            <h2 id="pipeline-heading" className="pipeline-main-title">
              OUR 3-TIER COMMERCIAL ENGINE
            </h2>
            <p className="pipeline-sub">
              How our Field Intelligence Executives, internal Business Analysts, and Commercial Closers unite to transform offline merchants.
            </p>
          </div>

          <div className="pipeline-horizontal-track">
            <div className="pipeline-step-node">
              <div className="step-node-badge">STEP 01</div>
              <h3 className="step-node-title">FIELD DATA DISCOVERY</h3>
              <p className="step-node-desc">
                Field Intelligence Executives visit offline retail shops, clinics, and businesses to identify operational bottlenecks and digital absence (no website, no app, zero ads).
              </p>
              <div className="step-node-tag">On-Ground Intelligence Dossier</div>
            </div>

            <div className="pipeline-connector-line">
              <span className="pipeline-connector-arrow">→</span>
            </div>

            <div className="pipeline-step-node">
              <div className="step-node-badge">STEP 02</div>
              <h3 className="step-node-title">BA SOLUTION BLUEPRINT</h3>
              <p className="step-node-desc">
                Our internal Business Analysts analyze the dossier and engineer a customized digital blueprint (website/app scope + exact ROI and internet reach calculations).
              </p>
              <div className="step-node-tag">Technical Scope &amp; ROI Model</div>
            </div>

            <div className="pipeline-connector-line">
              <span className="pipeline-connector-arrow">→</span>
            </div>

            <div className="pipeline-step-node">
              <div className="step-node-badge">STEP 03</div>
              <h3 className="step-node-title">SOLUTION PITCH &amp; CLOSING</h3>
              <p className="step-node-desc">
                Commercial Closers reach out to decision-makers with the ready-made blueprint, demonstrate internet reach multiplication, overcome objections, and finalize agreements.
              </p>
              <div className="step-node-tag">Consultative Deal Closing</div>
            </div>

            <div className="pipeline-connector-line">
              <span className="pipeline-connector-arrow">→</span>
            </div>

            <div className="pipeline-step-node is-highlight">
              <div className="step-node-badge">STEP 04</div>
              <h3 className="step-node-title">UNCAPPED HIGH YIELD</h3>
              <p className="step-node-desc">
                Guaranteed base salary paid on time, weekly per-dossier data research bonuses, and substantial contract percentage payouts with zero earnings ceilings.
              </p>
              <div className="step-node-tag highlight">Base + Bonus + Uncapped Comm.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: TALENT STANDARDS (Geometric 4-Column Strip) */}
      <section className="join-standards-section" aria-labelledby="standards-heading">
        <div className="join-cutout-container">
          <div className="standards-header-block">
            <span className="standards-eyebrow">TALENT STANDARDS // CORE COMMERCIAL BENCHMARKS</span>
            <h2 id="standards-heading" className="standards-main-title">
              WHAT WE LOOK FOR
            </h2>
          </div>

          <div className="standards-compact-grid">
            <div className="standards-card">
              <span className="standards-index">01</span>
              <h3 className="standards-title">Market Curiosity &amp; Discovery</h3>
              <p className="standards-desc">
                Comfort walking into local stores, asking sharp questions, listening deeply, and uncovering real merchant pain points without scripts.
              </p>
            </div>

            <div className="standards-card">
              <span className="standards-index">02</span>
              <h3 className="standards-title">Value &amp; Measurable Reach</h3>
              <p className="standards-desc">
                Demonstrating how a website or mobile app converts internet search traffic into daily paying customers and real business profit.
              </p>
            </div>

            <div className="standards-card">
              <span className="standards-index">03</span>
              <h3 className="standards-title">Business Analyst Backing</h3>
              <p className="standards-desc">
                Zero coding required. Complete daily coordination with our technical analysts who create the deliverables and pricing structures.
              </p>
            </div>

            <div className="standards-card">
              <span className="standards-index">04</span>
              <h3 className="standards-title">High Ownership &amp; Earnings</h3>
              <p className="standards-desc">
                Transparent base compensation, rapid weekly dossier payouts, and high milestone closing commissions paid on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: COMMERCIAL FAQS */}
      <section className="join-faq-section" aria-labelledby="careers-faq-heading">
        <div className="join-cutout-container">
          <div className="faq-compact-header">
            <span className="faq-eyebrow">COMMERCIAL RECRUITING INTELLIGENCE</span>
            <h2 id="careers-faq-heading" className="faq-compact-title">
              FREQUENTLY ANSWERED QUESTIONS
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="faq-filter-strip" role="tablist" aria-label="FAQ Categories">
            {["All", "Role Scope", "Workflow", "Compensation", "Eligibility", "Territory"].map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeFaqCategory === cat}
                className={`faq-filter-pill ${activeFaqCategory === cat ? "active" : ""}`}
                onClick={() => setActiveFaqCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2-Column FAQ Grid */}
          <div className="faq-compact-grid">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`faq-compact-card ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-compact-trigger"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-trigger-left">
                      <span className="faq-num-pill">{faq.num}</span>
                      <span className="faq-question-text">{faq.question}</span>
                    </div>
                    <span className="faq-chevron">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="faq-compact-content">
                      <p className="faq-answer-text">{faq.answer}</p>
                      <div className="faq-highlight-pill">{faq.highlight}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GLOBAL TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="join-toast-notification" role="status">
          {toastMessage}
        </div>
      )}

      {/* SITE FOOTER */}
      <SiteFooter />
    </main>
  );
}
