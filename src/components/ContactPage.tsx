"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import SiteFooter from "./SiteFooter";
import "./contact/contact.css";

interface ContactPageProps {
  onClose?: () => void;
  isModalView?: boolean;
}

interface DropdownOptionItem {
  value: string;
  label: string;
  desc?: string;
}

interface CustomDropdownProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  options: DropdownOptionItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function CustomDropdown({
  id,
  label,
  icon,
  value,
  onChange,
  options,
  isOpen,
  onToggle,
  onClose,
}: CustomDropdownProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const selectedItem = options.find((o) => o.value === value) || options[0];

  return (
    <div className="contact-field-block" ref={containerRef}>
      <label id={`${id}-label`} className="contact-field-label">
        <span>{label}</span>
      </label>

      <div className="custom-dropdown-container">
        <button
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${id}-label ${id}`}
          className={`custom-dropdown-trigger ${isOpen ? "is-open" : ""}`}
          onClick={onToggle}
        >
          <span className="custom-dropdown-trigger-left">
            <span className="custom-dropdown-icon" aria-hidden="true">
              {icon}
            </span>
            <span className="custom-dropdown-label">{selectedItem.label}</span>
          </span>

          <span className="custom-dropdown-chevron" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="custom-dropdown-menu" role="listbox" aria-labelledby={`${id}-label`}>
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`custom-dropdown-item ${isSelected ? "is-selected" : ""}`}
                  onClick={() => {
                    onChange(opt.value);
                    onClose();
                  }}
                >
                  <div className="custom-dropdown-item-info">
                    <span className="custom-dropdown-item-title">{opt.label}</span>
                    {opt.desc && <span className="custom-dropdown-item-desc">{opt.desc}</span>}
                  </div>

                  {isSelected && (
                    <span className="custom-dropdown-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const DISCIPLINE_OPTIONS: DropdownOptionItem[] = [
  { value: "Software Engineering", label: "Software Engineering", desc: "Full-stack web, SaaS platforms, APIs & architecture" },
  { value: "Mobile Applications", label: "Mobile Applications", desc: "iOS, Android, React Native & Flutter mobile apps" },
  { value: "AI & Automation", label: "AI & Automation", desc: "LLMs, autonomous agents & intelligent pipelines" },
  { value: "Cloud & DevOps", label: "Cloud & DevOps", desc: "AWS, GCP, Kubernetes, CI/CD & cloud scaling" },
  { value: "Design Systems & UI/UX", label: "Design Systems & UI/UX", desc: "Product design, user experience & design OS" },
  { value: "GovTech Platforms", label: "GovTech Platforms", desc: "Citizen platforms & digital public infrastructure" },
  { value: "Enterprise Modernization", label: "Enterprise Modernization", desc: "Legacy refactoring & cloud-native migration" },
];

const BUDGET_OPTIONS: DropdownOptionItem[] = [
  { value: "₹20,000 – ₹50,000", label: "₹20,000 – ₹50,000", desc: "Starter scope & rapid MVP sprints" },
  { value: "₹50,000 – ₹1,00,000", label: "₹50,000 – ₹1,00,000", desc: "Production pilots & core builds" },
  { value: "₹1,00,000 – ₹5,00,000", label: "₹1,00,000 – ₹5,00,000", desc: "Comprehensive enterprise platforms" },
  { value: "₹5,00,000 – ₹10,00,000", label: "₹5,00,000 – ₹10,00,000", desc: "Multi-system scalable deployments" },
  { value: "₹10,00,000+ Enterprise", label: "₹10,00,000+ Enterprise", desc: "Bespoke digital transformation" },
];

const TIMELINE_OPTIONS: DropdownOptionItem[] = [
  { value: "Immediate (< 1 Month)", label: "Immediate (< 1 Month)", desc: "High-priority rapid kickoff" },
  { value: "1 – 3 Months", label: "1 – 3 Months", desc: "Standard production release" },
  { value: "3 – 6 Months", label: "3 – 6 Months", desc: "Multi-phase architecture roadmap" },
  { value: "Flexible / Planning", label: "Flexible / Planning", desc: "Strategic exploration & roadmap" },
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "06:30 PM",
];

const MEETING_FORMAT_OPTIONS: DropdownOptionItem[] = [
  { value: "Google Meet", label: "Google Meet", desc: "HD Video conference with screen sharing" },
  { value: "Zoom Video", label: "Zoom Video", desc: "Direct Zoom meeting room generated automatically" },
  { value: "Microsoft Teams", label: "Microsoft Teams", desc: "Enterprise Teams collaboration invite" },
  { value: "Phone Call", label: "Phone Call", desc: "Direct telephone voice consultation" },
];

const TIMEZONE_OPTIONS: DropdownOptionItem[] = [
  { value: "IST (UTC+5:30)", label: "IST (UTC+5:30) — India", desc: "Kolkata, Mumbai, Bengaluru, New Delhi" },
  { value: "EST (UTC-5)", label: "EST (UTC-5) — New York", desc: "Eastern Time (US & Canada)" },
  { value: "PST (UTC-8)", label: "PST (UTC-8) — San Francisco", desc: "Pacific Time (US & Canada)" },
  { value: "GMT (UTC+0)", label: "GMT (UTC+0) — London", desc: "Greenwich Mean Time (UK & Europe)" },
  { value: "SGT (UTC+8)", label: "SGT (UTC+8) — Singapore", desc: "Singapore, Hong Kong, Tokyo" },
];

interface FaqItem {
  id: string;
  num: string;
  category: "Capabilities" | "Commercials" | "Security & IP" | "Velocity";
  question: string;
  answer: string;
  highlight: string;
}

const FAQ_CATEGORIES = ["All", "Capabilities", "Commercials", "Security & IP", "Velocity"] as const;

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "capabilities",
    num: "01",
    category: "Capabilities",
    question: "What kind of projects does EPIC STUDIO take?",
    answer: "We engineer bespoke full-stack web platforms, iOS & Android mobile applications, autonomous AI agent pipelines, cloud infrastructure, and modern design systems. We handle both greenfield zero-to-one product builds and complex enterprise legacy modernizations.",
    highlight: "Full-stack Web · iOS & Android · AI Agents · Cloud Architecture"
  },
  {
    id: "commercials",
    num: "02",
    category: "Commercials",
    question: "What's the typical engagement model and budget?",
    answer: "We work via sprint-based milestone delivery or dedicated embedded engineering pods. Engagements typically start with focused sprints, providing transparent scopes, direct access to senior technical leads, and clear deliverables with zero hidden fees.",
    highlight: "Sprint-based delivery · Dedicated pods · Zero hidden fees"
  },
  {
    id: "collaboration",
    num: "03",
    category: "Capabilities",
    question: "Can you collaborate with our existing product or engineering team?",
    answer: "Yes, absolutely. We frequently embed alongside in-house teams to accelerate velocity, solve high-complexity architectural bottlenecks, lead mobile or AI initiatives, or provide dedicated technical leadership.",
    highlight: "Co-development · Architecture acceleration · Seamless Git workflows"
  },
  {
    id: "security",
    num: "04",
    category: "Security & IP",
    question: "Do you sign mutual NDAs prior to technical discussions?",
    answer: "Yes, 100%. We execute bilateral non-disclosure agreements before reviewing any sensitive product blueprints, proprietary IP, code repositories, or market data.",
    highlight: "100% Bilateral NDAs · Complete IP protection · Enterprise compliance"
  },
  {
    id: "velocity",
    num: "05",
    category: "Velocity",
    question: "How fast can a project kick off after the initial inquiry?",
    answer: "Every inquiry is reviewed directly by our senior technical directors within 2 hours. Once initial alignment and scope definition are established, sprint kickoffs typically launch within 48 to 72 hours.",
    highlight: "< 2h director review · 48–72h rapid kickoff"
  },
  {
    id: "coverage",
    num: "06",
    category: "Velocity",
    question: "Do you work with international clients across time zones?",
    answer: "Yes. Headquartered in India, our engineering pods work synchronous crossover hours with partners across North America (EST/PST), Europe (GMT/CET), and the Asia-Pacific region.",
    highlight: "Synchronous EST, GMT & IST crossover · Global delivery"
  }
];

export default function ContactPage({ onClose, isModalView = false }: ContactPageProps) {
  const [activeMode, setActiveMode] = useState<"inquiry" | "schedule" | "offices">("inquiry");
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>("All");
  const [openFaqId, setOpenFaqId] = useState<string | null>("capabilities");

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleScrollToForm = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const filteredFaqItems =
    activeFaqCategory === "All"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeFaqCategory);

  // Inquiry Form State
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("Software Engineering");
  const [selectedBudget, setSelectedBudget] = useState<string>("₹50,000 – ₹1,00,000");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("Immediate (< 1 Month)");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Schedule Call State
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("11:30 AM");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Google Meet");
  const [selectedTimezone, setSelectedTimezone] = useState<string>("IST (UTC+5:30)");
  const [callTopic, setCallTopic] = useState("");

  // Submission & Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    token: string;
    type: "inquiry" | "call";
    name: string;
    email: string;
    summary: string;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live clocks for Global Hubs
  const [hubTimes, setHubTimes] = useState({
    kolkata: "",
    delhi: "",
    bengaluru: "",
  });

  useEffect(() => {
    const timeFormatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    let lastFormatted = "";
    const updateClocks = () => {
      if (document.hidden) return;
      const formatted = timeFormatter.format(new Date());
      if (formatted === lastFormatted) return;
      lastFormatted = formatted;
      setHubTimes({
        kolkata: formatted,
        delhi: formatted,
        bengaluru: formatted,
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (toastTimeoutRef.current !== null) clearTimeout(toastTimeoutRef.current);
    },
    []
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current !== null) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      toastTimeoutRef.current = null;
      setToastMessage(null);
    }, 2400);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`✓ Copied ${label} to clipboard`);
  };

  // Generate dynamic 7 upcoming weekdays
  const getUpcomingDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      days.push({
        offset: i,
        dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
        dateNum: d.getDate(),
        month: d.toLocaleDateString("en-US", { month: "short" }),
        fullDateStr: d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      });
    }
    return days;
  };
  const upcomingDays = getUpcomingDays();

  // Inquiry Form Submit
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const token = `EPIC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedData({
        token,
        type: "inquiry",
        name,
        email,
        summary: `${selectedDiscipline} · ${selectedBudget} · ${selectedTimeline}`,
      });
    }, 500);
  };

  // Schedule Call Submit
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const selectedDayObj = upcomingDays[selectedDayOffset];
      const token = `EPIC-CALL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedData({
        token,
        type: "call",
        name,
        email,
        summary: `${selectedDayObj.fullDateStr} at ${selectedTimeSlot} (${selectedTimezone}) via ${selectedPlatform.toUpperCase()}`,
      });
    }, 500);
  };

  // Generate Calendar .ics download
  const handleDownloadCalendarEvent = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EPIC STUDIO//Project Consultation//EN
BEGIN:VEVENT
SUMMARY:EPIC STUDIO Project Consultation with ${name}
DESCRIPTION:Project consultation regarding digital products, software engineering, and design.
LOCATION:Google Meet / Remote Link
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `epic-consultation-${submittedData?.token || "session"}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("✓ Calendar invite downloaded (.ics)");
  };

  const contentJSX = (
    <>
      {/* Main Center Stage Content */}
      <div className="contact-hero-content">
        <div className={`contact-split-layout ${isModalView ? "is-modal-layout" : ""}`}>
          {/* Left Column: Consultation Console & Trust Strip */}
          <div className="contact-left-col">
            {/* Consultation Console */}
            <div className="contact-console-stack">
              {/* Mode Switcher Tabs */}
              <div className="contact-mode-toggle" role="tablist" aria-label="Contact options">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMode === "inquiry"}
                  className={`contact-mode-btn ${activeMode === "inquiry" ? "active" : ""}`}
                  onClick={() => {
                    setActiveMode("inquiry");
                    setSubmittedData(null);
                  }}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <span>Project Inquiry</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMode === "schedule"}
                  className={`contact-mode-btn ${activeMode === "schedule" ? "active" : ""}`}
                  onClick={() => {
                    setActiveMode("schedule");
                    setSubmittedData(null);
                  }}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Schedule Call</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMode === "offices"}
                  className={`contact-mode-btn ${activeMode === "offices" ? "active" : ""}`}
                  onClick={() => {
                    setActiveMode("offices");
                    setSubmittedData(null);
                  }}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Direct Contacts</span>
                </button>
              </div>

              {/* Console Box Card */}
              <div className="contact-card-box">
                {submittedData ? (
                  /* Success & Confirmation State */
                  <div className="contact-success-card">
                    <div className="success-badge-icon">
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.8">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>

                    <h2 className="contact-success-title">
                      {submittedData.type === "call" ? "Consultation Scheduled" : "Inquiry Received"}
                    </h2>

                    <p className="contact-success-desc">
                      Thank you, <strong>{submittedData.name}</strong>. A confirmation has been sent to <strong>{submittedData.email}</strong>. Our team will review your inquiry and get in touch within 2 business hours.
                    </p>

                    <div className="contact-token-box">
                      <span>REFERENCE CODE: {submittedData.token}</span>
                      <button
                        type="button"
                        className="token-copy-btn"
                        onClick={() => handleCopyText(submittedData.token, "Reference Code")}
                      >
                        COPY
                      </button>
                    </div>

                    <div className="success-actions-row">
                      {submittedData.type === "call" && (
                        <button
                          type="button"
                          className="success-btn-primary"
                          onClick={handleDownloadCalendarEvent}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span>Add to Calendar (.ics)</span>
                        </button>
                      )}

                      <button
                        type="button"
                        className="success-btn-secondary"
                        onClick={() => setSubmittedData(null)}
                      >
                        Submit Another Inquiry
                      </button>

                      {onClose && (
                        <button type="button" className="success-btn-secondary" onClick={onClose}>
                          Close
                        </button>
                      )}
                    </div>
                  </div>
                ) : activeMode === "inquiry" ? (
                  /* Mode 1: Project Inquiry Form */
                  <form onSubmit={handleInquirySubmit} className="contact-form-layout">
                    {/* Project Parameters 3-Dropdown Row */}
                    <div className="contact-grid-3col">
                      <CustomDropdown
                        id="inquiry-discipline"
                        label="Primary Discipline *"
                        value={selectedDiscipline}
                        onChange={setSelectedDiscipline}
                        options={DISCIPLINE_OPTIONS}
                        isOpen={openDropdown === "discipline"}
                        onToggle={() => setOpenDropdown((prev) => (prev === "discipline" ? null : "discipline"))}
                        onClose={() => setOpenDropdown((prev) => (prev === "discipline" ? null : prev))}
                        icon={
                          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                          </svg>
                        }
                      />

                      <CustomDropdown
                        id="inquiry-budget"
                        label="Estimated Budget *"
                        value={selectedBudget}
                        onChange={setSelectedBudget}
                        options={BUDGET_OPTIONS}
                        isOpen={openDropdown === "budget"}
                        onToggle={() => setOpenDropdown((prev) => (prev === "budget" ? null : "budget"))}
                        onClose={() => setOpenDropdown((prev) => (prev === "budget" ? null : prev))}
                        icon={
                          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                          </svg>
                        }
                      />

                      <CustomDropdown
                        id="inquiry-timeline"
                        label="Expected Timeline *"
                        value={selectedTimeline}
                        onChange={setSelectedTimeline}
                        options={TIMELINE_OPTIONS}
                        isOpen={openDropdown === "timeline"}
                        onToggle={() => setOpenDropdown((prev) => (prev === "timeline" ? null : "timeline"))}
                        onClose={() => setOpenDropdown((prev) => (prev === "timeline" ? null : prev))}
                        icon={
                          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        }
                      />
                    </div>

                    {/* Contact Coordinates */}
                    <div className="contact-grid-2col">
                      <div className="contact-field-block">
                        <label htmlFor="inquiry-name" className="contact-field-label">
                          <span>Full Name *</span>
                        </label>
                        <div className="contact-input-shell">
                          <input
                            id="inquiry-name"
                            type="text"
                            required
                            placeholder="e.g. Aarav Sharma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="contact-native-input"
                          />
                        </div>
                      </div>

                      <div className="contact-field-block">
                        <label htmlFor="inquiry-email" className="contact-field-label">
                          <span>Work Email *</span>
                        </label>
                        <div className="contact-input-shell">
                          <input
                            id="inquiry-email"
                            type="email"
                            required
                            placeholder="aarav@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="contact-native-input"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="contact-grid-2col">
                      <div className="contact-field-block">
                        <label htmlFor="inquiry-company" className="contact-field-label">
                          <span>Company / Organization</span>
                          <span className="contact-label-opt">Optional</span>
                        </label>
                        <div className="contact-input-shell">
                          <input
                            id="inquiry-company"
                            type="text"
                            placeholder="Organization or Brand"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="contact-native-input"
                          />
                        </div>
                      </div>

                      <div className="contact-field-block">
                        <label htmlFor="inquiry-phone" className="contact-field-label">
                          <span>Phone Number</span>
                          <span className="contact-label-opt">Optional</span>
                        </label>
                        <div className="contact-input-shell">
                          <input
                            id="inquiry-phone"
                            type="tel"
                            placeholder="+91 (optional)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="contact-native-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project Overview */}
                    <div className="contact-field-block">
                      <label htmlFor="inquiry-message" className="contact-field-label">
                        <span>Project Overview</span>
                      </label>
                      <div className="contact-textarea-shell">
                        <textarea
                          id="inquiry-message"
                          placeholder="Briefly describe your objectives, key requirements, or project scope..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="contact-native-textarea"
                        />
                      </div>
                    </div>

                    {/* Submit Row */}
                    <div className="contact-submit-row">
                      <div className="contact-sla-badge">
                        <span className="contact-sla-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </span>
                        <span className="contact-sla-label">Average response time under 2 hours</span>
                      </div>

                      <button
                        type="submit"
                        className="contact-main-submit-btn"
                        disabled={isSubmitting}
                      >
                        <span>{isSubmitting ? "Submitting..." : "Submit Inquiry"}</span>
                        <span className="contact-btn-arrow-box" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                ) : activeMode === "schedule" ? (
                  /* Mode 2: 30-Min Consultation Scheduler */
                  <form onSubmit={handleScheduleSubmit} className="schedule-grid-wrap">
                    <div className="schedule-meta-bar">
                      <div className="schedule-meta-left">
                        <span className="schedule-meta-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </span>
                        <span className="schedule-meta-text">30-Minute Introductory Technical Consultation</span>
                      </div>
                      <span className="schedule-meta-badge">Direct Architecture Lead</span>
                    </div>

                    {/* Date Picker & Time Slots in a sleek 2-Column Row */}
                    <div className="schedule-datetime-row">
                      {/* Date Picker Cards */}
                      <div className="contact-field-block schedule-date-col">
                        <label className="contact-field-label">
                          <span>1. Select Date</span>
                        </label>
                        <div className="schedule-date-cards">
                          {upcomingDays.map((day) => (
                            <button
                              key={day.offset}
                              type="button"
                              className={`date-selector-card ${selectedDayOffset === day.offset ? "active" : ""}`}
                              onClick={() => setSelectedDayOffset(day.offset)}
                            >
                              <span className="date-card-day">{day.dayName}</span>
                              <span className="date-card-num">{day.dateNum}</span>
                              <span className="date-card-month">{day.month}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Slots Grid */}
                      <div className="contact-field-block schedule-time-col">
                        <label className="contact-field-label">
                          <span>2. Select Time Slot</span>
                          <span className="contact-label-opt">{selectedTimezone.split(" — ")[0]}</span>
                        </label>
                        <div className="time-slots-grid">
                          {TIME_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              className={`time-slot-btn ${selectedTimeSlot === slot ? "active" : ""}`}
                              onClick={() => setSelectedTimeSlot(slot)}
                            >
                              <span>{slot}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Platform & Timezone */}
                    <div className="contact-grid-2col">
                      <CustomDropdown
                        id="schedule-platform"
                        label="3. Meeting Format *"
                        value={selectedPlatform}
                        onChange={setSelectedPlatform}
                        options={MEETING_FORMAT_OPTIONS}
                        isOpen={openDropdown === "platform"}
                        onToggle={() => setOpenDropdown((prev) => (prev === "platform" ? null : "platform"))}
                        onClose={() => setOpenDropdown((prev) => (prev === "platform" ? null : prev))}
                        icon={
                          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7" />
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                          </svg>
                        }
                      />

                      <CustomDropdown
                        id="schedule-timezone"
                        label="Timezone"
                        value={selectedTimezone}
                        onChange={setSelectedTimezone}
                        options={TIMEZONE_OPTIONS}
                        isOpen={openDropdown === "timezone"}
                        onToggle={() => setOpenDropdown((prev) => (prev === "timezone" ? null : "timezone"))}
                        onClose={() => setOpenDropdown((prev) => (prev === "timezone" ? null : prev))}
                        icon={
                          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                        }
                      />
                    </div>

                    {/* Name, Email & Topic for Call in a streamlined 3-Column Row */}
                    <div className="contact-grid-3col">
                      <div className="contact-field-block">
                        <label htmlFor="call-name" className="contact-field-label">
                          <span>Full Name *</span>
                        </label>
                        <div className="contact-input-shell">
                          <input
                            id="call-name"
                            type="text"
                            required
                            placeholder="e.g. Aarav Sharma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="contact-native-input"
                          />
                        </div>
                      </div>

                      <div className="contact-field-block">
                        <label htmlFor="call-email" className="contact-field-label">
                          <span>Work Email *</span>
                        </label>
                        <div className="contact-input-shell">
                          <input
                            id="call-email"
                            type="email"
                            required
                            placeholder="aarav@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="contact-native-input"
                          />
                        </div>
                      </div>

                      <div className="contact-field-block">
                        <label htmlFor="call-topic" className="contact-field-label">
                          <span>Discussion Topic</span>
                          <span className="contact-label-opt">Optional</span>
                        </label>
                        <div className="contact-input-shell">
                          <input
                            id="call-topic"
                            type="text"
                            placeholder="e.g. AI, web or mobile..."
                            value={callTopic}
                            onChange={(e) => setCallTopic(e.target.value)}
                            className="contact-native-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Row */}
                    <div className="contact-submit-row">
                      <div className="contact-sla-badge">
                        <span className="contact-sla-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </span>
                        <span className="contact-sla-label">Instant calendar dispatch &amp; video link</span>
                      </div>

                      <button
                        type="submit"
                        className="contact-main-submit-btn"
                        disabled={isSubmitting}
                      >
                        <span>{isSubmitting ? "Booking..." : "Confirm Consultation"}</span>
                        <span className="contact-btn-arrow-box" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Mode 3: Direct Offices & Hubs */
                  <div className="direct-connect-grid">
                    {/* Direct Email */}
                    <div className="hotline-card">
                      <div>
                        <div className="hotline-top">
                          <div className="hotline-icon-box" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                          </div>
                          <div className="hotline-text">
                            <h3>Direct Studio Email</h3>
                            <p>Submit briefs, RFP documentation, or architectural initiatives.</p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="hotline-action-btn"
                        onClick={() => handleCopyText("contact@epic-studio.in", "Email Address")}
                      >
                        <span>contact@epic-studio.in</span>
                        <span>COPY</span>
                      </button>
                    </div>

                    {/* Telephone */}
                    <div className="hotline-card">
                      <div>
                        <div className="hotline-top">
                          <div className="hotline-icon-box" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                          </div>
                          <div className="hotline-text">
                            <h3>Executive Telephone</h3>
                            <p>Direct consultant lines: Mon – Fri, 9:00 AM – 7:00 PM IST.</p>
                          </div>
                        </div>
                      </div>

                      <div className="hotline-dual-actions">
                        <a href="tel:+916291773811" className="hotline-action-btn">
                          <span>+91 62917 73811</span>
                          <span>CALL →</span>
                        </a>
                        <a href="tel:+917980595630" className="hotline-action-btn">
                          <span>+91 79805 95630</span>
                          <span>CALL →</span>
                        </a>
                      </div>
                    </div>

                    {/* WhatsApp Priority Desk */}
                    <div className="hotline-card">
                      <div>
                        <div className="hotline-top">
                          <div className="hotline-icon-box" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.414z"/>
                            </svg>
                          </div>
                          <div className="hotline-text">
                            <h3>WhatsApp Priority Desk</h3>
                            <p>Instant engineering chat and project inquiries on WhatsApp.</p>
                          </div>
                        </div>
                      </div>

                      <div className="hotline-dual-actions">
                        <a
                          href="https://wa.me/916291773811?text=Hello%20EPIC%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20project."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hotline-action-btn"
                        >
                          <span>+91 62917 73811</span>
                          <span>CHAT →</span>
                        </a>
                        <a
                          href="https://wa.me/917980595630?text=Hello%20EPIC%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20project."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hotline-action-btn"
                        >
                          <span>+91 79805 95630</span>
                          <span>CHAT →</span>
                        </a>
                      </div>
                    </div>

                    {/* Confidentiality & Mutual NDA */}
                    <div className="hotline-card">
                      <div>
                        <div className="hotline-top">
                          <div className="hotline-icon-box" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                              <circle cx="12" cy="11" r="2.5" />
                              <path d="M12 13.5v3" />
                            </svg>
                          </div>
                          <div className="hotline-text">
                            <h3>Mutual NDA Protocol</h3>
                            <p>Execute standard bilateral NDAs prior to confidential briefings.</p>
                          </div>
                        </div>
                      </div>

                      <a
                        href="mailto:contact@epic-studio.in?subject=NDA%20Request%20-%20EPIC%20Studio"
                        className="hotline-action-btn"
                      >
                        <span>Request NDA</span>
                        <span>DISPATCH →</span>
                      </a>
                    </div>

                    {/* Global Engineering Operations Bar */}
                    <div className="direct-operations-bar">
                      <div className="op-column">
                        <div className="op-label-row">
                          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>GLOBAL HEADQUARTERS</span>
                        </div>
                        <div className="op-title">Kolkata, India</div>
                        <div className="op-subtitle">Sector V Tech Corridor • {hubTimes.kolkata || "09:30 AM"} IST</div>
                      </div>

                      <div className="op-divider" />

                      <div className="op-column">
                        <div className="op-label-row">
                          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                          <span>CLIENT COVERAGE</span>
                        </div>
                        <div className="op-title">Americas • Europe • APAC</div>
                        <div className="op-subtitle">Synchronous EST, GMT &amp; IST sprint overlap</div>
                      </div>

                      <div className="op-divider" />

                      <div className="op-column">
                        <div className="op-label-row">
                          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                          <span>SECURITY &amp; COMPLIANCE</span>
                        </div>
                        <div className="op-title">Mutual NDA Protocols</div>
                        <div className="op-subtitle">Enterprise IP isolation &amp; dedicated pods</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reassurance Value Strip */}
            <div className="contact-trust-strip">
              <div className="contact-trust-card">
                <div className="trust-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <path d="m7 8 3 3-3 3" />
                    <line x1="13" y1="14" x2="17" y2="14" />
                  </svg>
                </div>
                <div className="trust-text">
                  <h4>Direct Engineering Team</h4>
                  <p>Direct collaboration with dedicated tech leads.</p>
                </div>
              </div>

              <div className="contact-trust-card">
                <div className="trust-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="11" r="2.5" />
                    <path d="M12 13.5v3" />
                  </svg>
                </div>
                <div className="trust-text">
                  <h4>Confidentiality Assured</h4>
                  <p>Strict mutual NDA protocols protecting all IP.</p>
                </div>
              </div>

              <div className="contact-trust-card">
                <div className="trust-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                    <path d="M13 2 16 5" />
                    <path d="M8 2 5 5" />
                  </svg>
                </div>
                <div className="trust-text">
                  <h4>Fast Response Guarantee</h4>
                  <p>Inquiry review &amp; feedback within 2 hours.</p>
                </div>
              </div>
            </div>

            {/* Pure Textual Free Consultation Section (No Box, No Buttons) */}
            {!isModalView && (
              <div className="contact-free-consult-textual">
                <h3 className="free-consult-pure-title">
                  FREE CONSULTATION!
                </h3>
                <p className="free-consult-pure-desc">
                  Direct 30-minute architectural strategy session with senior tech leads. Zero commitment, zero sales pitch.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Creative Technology Studio Technical Command Center */}
          {!isModalView && (
            <aside className="contact-right-panel" aria-label="Studio Technical Value & Process">
              {/* Background Art Direction: Ghosted Wordmark, Blueprint Lines & Coordinate Markings */}
              <div className="contact-right-bg-blueprint" aria-hidden="true">
                <span className="bg-blueprint-wordmark">CONTACT</span>

                <svg className="bg-blueprint-svg" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Low-opacity orbital rings */}
                  <circle cx="460" cy="180" r="140" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="460" cy="180" r="230" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                  
                  {/* Technical connection circuit lines */}
                  <path d="M 40 100 L 480 100 L 540 160 L 540 580" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
                  <path d="M 40 420 L 300 420 L 340 460 L 540 460" stroke="rgba(201, 255, 23, 0.08)" strokeWidth="0.8" strokeDasharray="4 4" />

                  {/* Technical metadata text */}
                  <text x="40" y="32" fill="rgba(255,255,255,0.18)" fontSize="8.5" fontFamily="monospace" letterSpacing="0.12em">SYS.ARCH // SPEC_01</text>
                  <text x="400" y="32" fill="rgba(255,255,255,0.18)" fontSize="8.5" fontFamily="monospace" letterSpacing="0.12em">22.5726°N 88.4331°E</text>

                  {/* Precision crosshairs */}
                  <g stroke="rgba(255,255,255,0.12)" strokeWidth="0.8">
                    <line x1="34" y1="240" x2="46" y2="240" />
                    <line x1="40" y1="234" x2="40" y2="246" />
                    <line x1="514" y1="320" x2="526" y2="320" />
                    <line x1="520" y1="314" x2="520" y2="326" />
                  </g>

                  {/* Subtle Lime Accent Nodes */}
                  <circle cx="540" cy="160" r="3" fill="var(--lime, #c9ff17)" fillOpacity="0.6" />
                  <circle cx="340" cy="460" r="2.5" fill="var(--lime, #c9ff17)" fillOpacity="0.8" />
                  <circle cx="540" cy="460" r="3" fill="#38bdf8" fillOpacity="0.6" />
                </svg>
              </div>

              {/* 1. Primary Hero Typography */}
              <div className="contact-right-typography-block">
                <h1 className="contact-right-hero-title">
                  LET&apos;S BUILD <br />
                  <span className="contact-outline-word">SOMETHING</span> <br />
                  <span className="contact-lime-accent">EPIC.</span>
                </h1>

                {/* 2. Supporting Message */}
                <p className="contact-right-hero-sub">
                  Speak directly with senior technical leads. No sales gatekeepers, no vague promises. Just clear technical thinking, transparent execution, and a roadmap built around your goals.
                </p>
              </div>

              {/* 3. WHY EPIC Section (Technical Specification Rows) */}
              <div className="contact-right-why-block">
                <div className="contact-section-label">
                  <span>WHY EPIC</span>
                  <span className="contact-label-dash" />
                </div>

                <div className="contact-spec-rows-list">
                  <div className="contact-spec-row">
                    <span className="spec-row-num">01</span>
                    <div className="spec-row-content">
                      <h4 className="spec-row-title">DIRECT TECHNICAL ACCESS</h4>
                      <p className="spec-row-desc">Speak directly with senior technical leads.</p>
                    </div>
                  </div>

                  <div className="contact-spec-row">
                    <span className="spec-row-num">02</span>
                    <div className="spec-row-content">
                      <h4 className="spec-row-title">FAST RESPONSE</h4>
                      <p className="spec-row-desc">Initial inquiries reviewed within 2 hours.</p>
                    </div>
                  </div>

                  <div className="contact-spec-row">
                    <span className="spec-row-num">03</span>
                    <div className="spec-row-content">
                      <h4 className="spec-row-title">NDA-READY DISCUSSIONS</h4>
                      <p className="spec-row-desc">Confidential technical conversations available.</p>
                    </div>
                  </div>

                  <div className="contact-spec-row">
                    <span className="spec-row-num">04</span>
                    <div className="spec-row-content">
                      <h4 className="spec-row-title">GLOBAL COLLABORATION</h4>
                      <p className="spec-row-desc">India-based. Worldwide execution.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Interactive Studio Location Map (Greyish Monochromatic by default, Full Color on Hover) */}
              <div className="contact-map-card" role="region" aria-label="Studio Location Map">
                <iframe
                  title="EPIC STUDIO Location - 9C7R+VC Baruipur, West Bengal"
                  className="contact-map-iframe"
                  src="https://maps.google.com/maps?q=9C7R%2BVC+Baruipur%2C+West+Bengal&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                />

                {/* Minimal Top Header Pill */}
                <div className="contact-map-topbar">
                  <div className="contact-map-location-tag">
                    <span className="contact-map-pulse-dot" />
                    <span>9C7R+VC • Baruipur, West Bengal</span>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=9C7R%2BVC+Baruipur,+West+Bengal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-map-link-btn"
                    aria-label="Open location in Google Maps (opens in new tab)"
                  >
                    <span>View Map</span>
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Copy Feedback Toast */}
      {toastMessage && (
        <div className="contact-toast" role="alert">
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );

  // If rendered in a Modal
  if (isModalView) {
    return (
      <div className="contact-hero-modal-shell">
        <div className="contact-modal-header-hero">
          <div className="contact-modal-title-wrap">
            <span className="contact-modal-eyebrow">
              <span className="contact-modal-badge-dot" aria-hidden="true" />
              DIRECT ARCHITECTURE &amp; PRODUCT BRIEF
            </span>
            <h2 className="contact-modal-headline">
              Got an idea? <span className="contact-modal-headline-highlight">You can share with us!</span>
            </h2>
          </div>

          {onClose && (
            <button
              type="button"
              className="contact-modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="hero-section contact-hero-section" style={{ minHeight: "auto", paddingTop: "6px" }}>
          {contentJSX}
        </div>
      </div>
    );
  }

  // Standalone Full-Page View (e.g. /contact)
  return (
    <main className="site-shell contact-page-root">
      {/* SECTION 01: HERO CONSOLE & SHOWCASE */}
      <section className="hero-section contact-hero-section" aria-labelledby="contact-hero-title">
        <Header />
        {contentJSX}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02: FAQ (Questions Before the First Call?)
          ───────────────────────────────────────────────────────────── */}
      <section className="contact-faq-section" aria-labelledby="contact-faq-heading">
        <div className="contact-faq-container">
          <div className="contact-faq-split-grid">
            {/* Left Column: Sticky Briefing & Direct Assistance Panel */}
            <aside className="faq-briefing-col">
              <div className="faq-sticky-wrapper">
                <h2 id="contact-faq-heading" className="faq-main-heading">
                  QUESTIONS BEFORE <br />
                  <span className="faq-heading-gradient">THE FIRST CALL?</span>
                </h2>

                <p className="faq-main-subtext">
                  Clear architectural, commercial, and operational specifications for engaging and building with EPIC STUDIO.
                </p>

                {/* Quick SLA Mini-Matrix */}
                <div className="faq-sla-matrix">
                  <div className="faq-matrix-item">
                    <span className="faq-matrix-val">&lt; 2 Hours</span>
                    <span className="faq-matrix-lbl">Review Turnaround</span>
                  </div>
                  <div className="faq-matrix-item">
                    <span className="faq-matrix-val">100% Bilateral</span>
                    <span className="faq-matrix-lbl">Mutual NDA Assured</span>
                  </div>
                  <div className="faq-matrix-item">
                    <span className="faq-matrix-val">48 – 72 Hours</span>
                    <span className="faq-matrix-lbl">Sprint Kickoff</span>
                  </div>
                </div>

                {/* Direct Assistance Card */}
                <div className="faq-direct-card">
                  <div className="faq-direct-card-glow" aria-hidden="true" />
                  <div className="faq-direct-top">
                    <span className="faq-direct-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="faq-direct-title">Have a specific architectural brief?</h3>
                      <p className="faq-direct-desc">Speak directly with senior technical leads for bespoke scoping and fast-track sprints.</p>
                    </div>
                  </div>

                  <div className="faq-direct-actions">
                    <button
                      type="button"
                      className="faq-direct-btn-primary"
                      onClick={handleScrollToForm}
                    >
                      <span>Start Inquiry</span>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    </button>
                    <a
                      href="https://wa.me/916291773811?text=Hello%20EPIC%20Studio%2C%20I%20have%20a%20question%20before%20initiating%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="faq-direct-btn-secondary"
                    >
                      <span>WhatsApp Desk</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column: Category Filters & Enhanced FAQ Cards */}
            <div className="faq-cards-col">
              {/* Category Filter Tabs */}
              <div className="faq-filter-tabs" role="tablist" aria-label="FAQ Categories">
                {FAQ_CATEGORIES.map((category) => {
                  const isActive = activeFaqCategory === category;
                  const count =
                    category === "All"
                      ? FAQ_ITEMS.length
                      : FAQ_ITEMS.filter((item) => item.category === category).length;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`faq-filter-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => setActiveFaqCategory(category)}
                    >
                      <span>{category}</span>
                      <span className="faq-filter-count">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Cards Stack */}
              <div className="faq-cards-list">
                {filteredFaqItems.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`faq-modern-card ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        className="faq-modern-trigger"
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                      >
                        <div className="faq-trigger-left">
                          <div className="faq-badge-cluster">
                            <span className="faq-index-num">{faq.num}</span>
                            <span className="faq-cat-badge">{faq.category}</span>
                          </div>
                          <h3 className="faq-modern-question">{faq.question}</h3>
                        </div>

                        <div className="faq-toggle-circle" aria-hidden="true">
                          <svg
                            viewBox="0 0 24 24"
                            width="15"
                            height="15"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="faq-toggle-icon"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" className="faq-icon-vert" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                      </button>

                      <div
                        id={`faq-answer-${faq.id}`}
                        className="faq-modern-content-wrap"
                        role="region"
                        aria-labelledby={`faq-trigger-${faq.id}`}
                      >
                        <div className="faq-modern-inner">
                          <div className="faq-modern-body">
                            <p className="faq-modern-answer">{faq.answer}</p>
                            <div className="faq-highlight-pill">
                              <span className="faq-highlight-label">KEY TAKEAWAY</span>
                              <span className="faq-highlight-text">{faq.highlight}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
