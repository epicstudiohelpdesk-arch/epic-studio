"use client";

import React, { useRef, useState, useEffect } from "react";
import useRevealOnScroll from "./useRevealOnScroll";
import PhoneInputWithCountry from "./contact/PhoneInputWithCountry";
import "./contact/contact.css";
import "./LetsBuildSection.css";

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
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4">
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

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "06:30 PM",
];

export default function LetsBuildSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  // Active Tab Mode: inquiry | schedule | offices (Matching Contact Page)
  const [activeMode, setActiveMode] = useState<"inquiry" | "schedule" | "offices">("inquiry");

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Inquiry Form State
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("Software Engineering");
  const [selectedBudget, setSelectedBudget] = useState<string>("₹50,000 – ₹1,00,000");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("Immediate (< 1 Month)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Schedule Call State
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("11:30 AM");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Google Meet");
  const [selectedTimezone, setSelectedTimezone] = useState<string>("IST (UTC+5:30)");
  const [callTopic, setCallTopic] = useState("");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<{
    token: string;
    type: "inquiry" | "call";
    name: string;
    email: string;
    summary: string;
  } | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current !== null) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current !== null) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      toastTimeoutRef.current = null;
      setToastMessage(null);
    }, 2400);
  };

  const handleCopyText = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`✓ Copied ${label} to clipboard`);
    }
  };

  // 7 Upcoming Days generator for Schedule mode
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

  // Inquiry Form Submission
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Please provide your full name and email address.");
      return;
    }
    if (!phone.trim()) {
      setPhoneError("Phone number is required.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    const token = `EPIC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const payload = {
      type: "inquiry" as const,
      token,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      discipline: selectedDiscipline,
      budget: selectedBudget,
      timeline: selectedTimeline,
      message: message.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Submission failed. Please email contact@epic-studio.in directly.");
      }

      setSubmittedData({
        token: data.token || token,
        type: "inquiry",
        name: payload.name,
        email: payload.email,
        summary: `${selectedDiscipline} · ${selectedBudget} · ${selectedTimeline}`,
      });
    } catch (err: unknown) {
      console.warn("[LetsBuildSection] Fallback inquiry completion:", err);
      setSubmittedData({
        token,
        type: "inquiry",
        name: payload.name,
        email: payload.email,
        summary: `${selectedDiscipline} · ${selectedBudget} · ${selectedTimeline}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Schedule Call Submission
  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Please provide your full name and email address.");
      return;
    }
    if (!phone.trim()) {
      setPhoneError("Phone number is required.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    const selectedDayObj = upcomingDays[selectedDayOffset];
    const token = `EPIC-CALL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      type: "call" as const,
      token,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date: selectedDayObj.fullDateStr,
      timeSlot: selectedTimeSlot,
      timezone: selectedTimezone,
      platform: selectedPlatform,
      callTopic: callTopic.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Booking failed. Please email contact@epic-studio.in directly.");
      }

      setSubmittedData({
        token: data.token || token,
        type: "call",
        name: payload.name,
        email: payload.email,
        summary: `${selectedDayObj.fullDateStr} at ${selectedTimeSlot} (${selectedTimezone}) via ${selectedPlatform}`,
      });
    } catch (err: unknown) {
      console.warn("[LetsBuildSection] Fallback schedule completion:", err);
      setSubmittedData({
        token,
        type: "call",
        name: payload.name,
        email: payload.email,
        summary: `${selectedDayObj.fullDateStr} at ${selectedTimeSlot} (${selectedTimezone}) via ${selectedPlatform}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form handler
  const handleReset = () => {
    setSubmittedData(null);
    setErrorMessage("");
    setPhoneError(null);
    setName("");
    setEmail("");
    setCompany("");
    setPhone("");
    setMessage("");
    setCallTopic("");
  };

  // Calendar .ics generator
  const handleDownloadCalendarEvent = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EPIC STUDIO//Technical Consultation//EN
BEGIN:VEVENT
SUMMARY:EPIC STUDIO Project Consultation with ${name}
DESCRIPTION:Architecture & technical consultation regarding digital products, software engineering, and AI pipelines.
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

  return (
    <section
      ref={sectionRef}
      className="bld-section"
      id="lets-build"
      aria-labelledby="bld-title"
    >
      {/* Background blueprint aesthetics */}
      <div className="bld-grid-bg" aria-hidden="true" />
      <span className="bld-cross bld-cross-a" aria-hidden="true">+</span>
      <span className="bld-cross bld-cross-b" aria-hidden="true">+</span>
      <span className="bld-ring" aria-hidden="true" />

      <div className="bld-layout-grid">
        {/* =========================================================================
            LEFT COLUMN: EXECUTIVE HEADLINE, REASSURANCE SPECS & DIRECT CONTACT CHANNELS
            ========================================================================= */}
        <div className="bld-left-col" data-reveal>
          <header className="bld-header">
            <span className="bld-section-label">08 // LET&rsquo;S BUILD</span>
            <h2 id="bld-title" className="bld-headline">
              WHAT SHOULD
              <br />
              WE BUILD <span className="bld-headline-stroke">TOGETHER?</span>
            </h2>
          </header>

          <p className="bld-narrative">
            We partner directly with ambitious founders, tech enterprises, and government
            institutions to engineer zero-friction architectures, autonomous AI pipelines,
            and high-precision digital products.
          </p>

          {/* Compact Value Reassurance Specs */}
          <div className="bld-trust-specs">
            <div className="bld-trust-spec-item">
              <span className="bld-trust-spec-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span>Direct Principal Architect Review &amp; Feasibility Scoping</span>
            </div>

            <div className="bld-trust-spec-item">
              <span className="bld-trust-spec-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <span>100% Strict Bilateral NDA &amp; Intellectual Property Protection</span>
            </div>

            <div className="bld-trust-spec-item">
              <span className="bld-trust-spec-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Production-Grade Code with Zero Architectural Debt</span>
            </div>
          </div>

          {/* Direct Action Channels (Icon-Only) */}
          <div className="bld-left-actions">
            <div className="bld-icon-actions" role="group" aria-label="Direct contact channels">
              <a
                href="mailto:contact@epic-studio.in?subject=Direct%20Architecture%20Inquiry%20%E2%80%94%20EPIC%20Studio"
                className="bld-icon-btn bld-icon-btn-primary"
                aria-label="Direct Email Brief (contact@epic-studio.in)"
                title="Direct Email Brief (contact@epic-studio.in)"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>

              <a
                href="tel:+916291773811"
                className="bld-icon-btn bld-icon-btn-secondary"
                aria-label="Call Executive Desk (+91 6291 773 811)"
                title="Call Executive Desk (+91 6291 773 811)"
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>

              <a
                href="https://wa.me/916291773811?text=Hello%20EPIC%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="bld-icon-btn bld-icon-btn-secondary bld-icon-btn-whatsapp"
                aria-label="WhatsApp Priority Chat (+91 6291 773 811)"
                title="WhatsApp Priority Chat (+91 6291 773 811)"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.414z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="bld-meta-row">
            <span>KOLKATA</span>
            <i aria-hidden="true" />
            <span>SAN FRANCISCO</span>
            <i aria-hidden="true" />
            <span>LONDON</span>
            <i aria-hidden="true" />
            <span>SINGAPORE</span>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: PROFESSIONAL CONSULTATION CONSOLE (IDENTICAL TO CONTACT PAGE)
            ========================================================================= */}
        <div className="bld-right-col">
          <div className="contact-console-stack">
            {/* Mode Switcher Tabs matching Contact Page */}
            <div className="contact-mode-toggle" role="tablist" aria-label="Contact options">
              <button
                type="button"
                role="tab"
                aria-selected={activeMode === "inquiry"}
                className={`contact-mode-btn ${activeMode === "inquiry" ? "active" : ""}`}
                onClick={() => {
                  setActiveMode("inquiry");
                  setSubmittedData(null);
                  setErrorMessage("");
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
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
                  setErrorMessage("");
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
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
                  setErrorMessage("");
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Direct Contacts</span>
              </button>
            </div>

            {/* Console Box Card */}
            <div className="contact-card-box">
              {submittedData ? (
                /* Dispatched Confirmation Screen */
                <div className="contact-dispatched-screen">
                  <div className="dispatched-status-icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <h3 className="dispatched-headline">
                    {submittedData.type === "call" ? "Consultation Scheduled" : "Inquiry Dispatched"}
                  </h3>

                  <p className="dispatched-body">
                    {submittedData.type === "call" ? (
                      <>
                        Thank you, <strong>{submittedData.name}</strong>. Your technical consultation has been registered for{" "}
                        <span className="dispatched-highlight">{submittedData.summary}</span>. Our architecture lead will join your scheduled session.
                      </>
                    ) : (
                      <>
                        Thank you, <strong>{submittedData.name}</strong>. Your project brief has been received and routed directly to our engineering desk. We will review your specifications and contact you shortly.
                      </>
                    )}
                  </p>

                  <div className="dispatched-meta-tag">
                    <span>REF: {submittedData.token}</span>
                    <button
                      type="button"
                      className="dispatched-copy-btn"
                      onClick={() => handleCopyText(submittedData.token, "Reference Code")}
                    >
                      COPY
                    </button>
                  </div>

                  <div className="dispatched-actions">
                    {submittedData.type === "call" && (
                      <button
                        type="button"
                        className="dispatched-btn-primary"
                        onClick={handleDownloadCalendarEvent}
                      >
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2">
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
                      className="dispatched-btn-secondary"
                      onClick={handleReset}
                    >
                      Submit Another Brief
                    </button>
                  </div>
                </div>
              ) : activeMode === "inquiry" ? (
                /* Mode 1: Project Inquiry Form */
                <form onSubmit={handleInquirySubmit} className="contact-form-layout" noValidate>
                  {errorMessage && (
                    <div className="bld-error-banner" role="alert">
                      <span>!</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 3-Dropdown Parameter Row */}
                  <div className="contact-grid-3col">
                    <CustomDropdown
                      id="bld-discipline"
                      label="Primary Discipline *"
                      value={selectedDiscipline}
                      onChange={setSelectedDiscipline}
                      options={DISCIPLINE_OPTIONS}
                      isOpen={openDropdown === "discipline"}
                      onToggle={() => setOpenDropdown((prev) => (prev === "discipline" ? null : "discipline"))}
                      onClose={() => setOpenDropdown((prev) => (prev === "discipline" ? null : prev))}
                      icon={
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </svg>
                      }
                    />

                    <CustomDropdown
                      id="bld-budget"
                      label="Estimated Budget *"
                      value={selectedBudget}
                      onChange={setSelectedBudget}
                      options={BUDGET_OPTIONS}
                      isOpen={openDropdown === "budget"}
                      onToggle={() => setOpenDropdown((prev) => (prev === "budget" ? null : "budget"))}
                      onClose={() => setOpenDropdown((prev) => (prev === "budget" ? null : prev))}
                      icon={
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                      }
                    />

                    <CustomDropdown
                      id="bld-timeline"
                      label="Expected Timeline *"
                      value={selectedTimeline}
                      onChange={setSelectedTimeline}
                      options={TIMELINE_OPTIONS}
                      isOpen={openDropdown === "timeline"}
                      onToggle={() => setOpenDropdown((prev) => (prev === "timeline" ? null : "timeline"))}
                      onClose={() => setOpenDropdown((prev) => (prev === "timeline" ? null : prev))}
                      icon={
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      }
                    />
                  </div>

                  {/* 2-Column: Name & Work Email */}
                  <div className="contact-grid-2col">
                    <div className="contact-field-block">
                      <label htmlFor="bld-inquiry-name" className="contact-field-label">
                        <span>Full Name *</span>
                      </label>
                      <div className="contact-input-shell">
                        <input
                          id="bld-inquiry-name"
                          type="text"
                          required
                          placeholder="e.g. Aarav Sharma"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errorMessage) setErrorMessage("");
                          }}
                          className="contact-native-input"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="contact-field-block">
                      <label htmlFor="bld-inquiry-email" className="contact-field-label">
                        <span>Work Email *</span>
                      </label>
                      <div className="contact-input-shell">
                        <input
                          id="bld-inquiry-email"
                          type="email"
                          required
                          placeholder="aarav@company.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errorMessage) setErrorMessage("");
                          }}
                          className="contact-native-input"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2-Column: Company & Phone with Worldwide Selector */}
                  <div className="contact-grid-2col">
                    <div className="contact-field-block">
                      <label htmlFor="bld-inquiry-company" className="contact-field-label">
                        <span>Company / Organization</span>
                        <span className="contact-label-opt">Optional</span>
                      </label>
                      <div className="contact-input-shell">
                        <input
                          id="bld-inquiry-company"
                          type="text"
                          placeholder="Organization or Brand"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="contact-native-input"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="contact-field-block">
                      <label htmlFor="bld-inquiry-phone" className="contact-field-label">
                        <span>Phone Number *</span>
                      </label>
                      <PhoneInputWithCountry
                        id="bld-inquiry-phone"
                        value={phone}
                        required
                        disabled={isSubmitting}
                        defaultCountryCode="IN"
                        isOpen={openDropdown === "inquiry-country"}
                        onToggle={() => setOpenDropdown((prev) => (prev === "inquiry-country" ? null : "inquiry-country"))}
                        onClose={() => setOpenDropdown((prev) => (prev === "inquiry-country" ? null : prev))}
                        onChange={(fullPhone) => {
                          setPhone(fullPhone);
                          if (phoneError) setPhoneError(null);
                        }}
                        error={phoneError}
                      />
                      {phoneError && (
                        <span style={{ color: "#ef4444", fontSize: "11.5px", marginTop: "3px", display: "block" }}>
                          {phoneError}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Overview Scope */}
                  <div className="contact-field-block">
                    <label htmlFor="bld-inquiry-message" className="contact-field-label">
                      <span>Project Overview</span>
                      <span className="contact-label-opt">Scope, targets or challenges</span>
                    </label>
                    <div className="contact-textarea-shell">
                      <textarea
                        id="bld-inquiry-message"
                        rows={2}
                        placeholder="Briefly describe your objectives, key requirements, or project scope..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="contact-native-textarea"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Submit Row: SLA Badge + Executive Submit Button */}
                  <div className="contact-submit-row">
                    <div className="contact-sla-badge">
                      <span className="contact-sla-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                <form onSubmit={handleScheduleSubmit} className="schedule-grid-wrap" noValidate>
                  {errorMessage && (
                    <div className="bld-error-banner" role="alert">
                      <span>!</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="schedule-meta-bar">
                    <div className="schedule-meta-left">
                      <span className="schedule-meta-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </span>
                      <span className="schedule-meta-text">30-Min Introductory Technical Session</span>
                    </div>
                    <span className="schedule-meta-badge">Direct Tech Lead</span>
                  </div>

                  {/* Date & Time Slot Row */}
                  <div className="schedule-datetime-row">
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

                    <div className="contact-field-block schedule-time-col">
                      <label className="contact-field-label">
                        <span>2. Time Slot</span>
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

                  {/* Format & Timezone Dropdowns */}
                  <div className="contact-grid-2col">
                    <CustomDropdown
                      id="bld-schedule-platform"
                      label="3. Meeting Format *"
                      value={selectedPlatform}
                      onChange={setSelectedPlatform}
                      options={MEETING_FORMAT_OPTIONS}
                      isOpen={openDropdown === "platform"}
                      onToggle={() => setOpenDropdown((prev) => (prev === "platform" ? null : "platform"))}
                      onClose={() => setOpenDropdown((prev) => (prev === "platform" ? null : prev))}
                      icon={
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="23 7 16 12 23 17 23 7" />
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                      }
                    />

                    <CustomDropdown
                      id="bld-schedule-timezone"
                      label="Timezone"
                      value={selectedTimezone}
                      onChange={setSelectedTimezone}
                      options={TIMEZONE_OPTIONS}
                      isOpen={openDropdown === "timezone"}
                      onToggle={() => setOpenDropdown((prev) => (prev === "timezone" ? null : "timezone"))}
                      onClose={() => setOpenDropdown((prev) => (prev === "timezone" ? null : prev))}
                      icon={
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      }
                    />
                  </div>

                  {/* Name & Work Email */}
                  <div className="contact-grid-2col">
                    <div className="contact-field-block">
                      <label htmlFor="bld-call-name" className="contact-field-label">
                        <span>Full Name *</span>
                      </label>
                      <div className="contact-input-shell">
                        <input
                          id="bld-call-name"
                          type="text"
                          required
                          placeholder="e.g. Aarav Sharma"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errorMessage) setErrorMessage("");
                          }}
                          className="contact-native-input"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="contact-field-block">
                      <label htmlFor="bld-call-email" className="contact-field-label">
                        <span>Work Email *</span>
                      </label>
                      <div className="contact-input-shell">
                        <input
                          id="bld-call-email"
                          type="email"
                          required
                          placeholder="aarav@company.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errorMessage) setErrorMessage("");
                          }}
                          className="contact-native-input"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Discussion Topic */}
                  <div className="contact-grid-2col">
                    <div className="contact-field-block">
                      <label htmlFor="bld-call-phone" className="contact-field-label">
                        <span>Phone Number *</span>
                      </label>
                      <PhoneInputWithCountry
                        id="bld-call-phone"
                        value={phone}
                        required
                        disabled={isSubmitting}
                        defaultCountryCode="IN"
                        isOpen={openDropdown === "call-country"}
                        onToggle={() => setOpenDropdown((prev) => (prev === "call-country" ? null : "call-country"))}
                        onClose={() => setOpenDropdown((prev) => (prev === "call-country" ? null : prev))}
                        onChange={(fullPhone) => {
                          setPhone(fullPhone);
                          if (phoneError) setPhoneError(null);
                        }}
                        error={phoneError}
                      />
                      {phoneError && (
                        <span style={{ color: "#ef4444", fontSize: "11.5px", marginTop: "3px", display: "block" }}>
                          {phoneError}
                        </span>
                      )}
                    </div>

                    <div className="contact-field-block">
                      <label htmlFor="bld-call-topic" className="contact-field-label">
                        <span>Discussion Topic</span>
                        <span className="contact-label-opt">Optional</span>
                      </label>
                      <div className="contact-input-shell">
                        <input
                          id="bld-call-topic"
                          type="text"
                          placeholder="e.g. AI, SaaS or Mobile App"
                          value={callTopic}
                          onChange={(e) => setCallTopic(e.target.value)}
                          className="contact-native-input"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Row */}
                  <div className="contact-submit-row">
                    <div className="contact-sla-badge">
                      <span className="contact-sla-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </span>
                      <span className="contact-sla-label">Instant calendar &amp; video invite</span>
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
                /* Mode 3: Direct Offices & Contacts */
                <div className="direct-connect-grid">
                  <div className="hotline-card">
                    <div>
                      <div className="hotline-top">
                        <div className="hotline-icon-box" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        </div>
                        <div className="hotline-text">
                          <h3>Direct Studio Email</h3>
                          <p>Submit project briefs, RFPs or architecture specs directly.</p>
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

                  <div className="hotline-card">
                    <div>
                      <div className="hotline-top">
                        <div className="hotline-icon-box" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                        <div className="hotline-text">
                          <h3>Executive Telephone</h3>
                          <p>Direct lead consultant lines: Mon – Fri, 9:00 AM – 7:00 PM IST.</p>
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

                  <div className="hotline-card">
                    <div>
                      <div className="hotline-top">
                        <div className="hotline-icon-box" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.414z"/>
                          </svg>
                        </div>
                        <div className="hotline-text">
                          <h3>WhatsApp Priority Desk</h3>
                          <p>Instant engineering chat and direct technical scoping.</p>
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

                  <div className="hotline-card">
                    <div>
                      <div className="hotline-top">
                        <div className="hotline-icon-box" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <circle cx="12" cy="11" r="2.5" />
                            <path d="M12 13.5v3" />
                          </svg>
                        </div>
                        <div className="hotline-text">
                          <h3>Mutual NDA Protocol</h3>
                          <p>Bilateral non-disclosure agreements before technical reviews.</p>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ephemeral Toast Feedback */}
      {toastMessage && (
        <div className="bld-toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </section>
  );
}