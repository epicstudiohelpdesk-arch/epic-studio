"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";

const SearchModal = dynamic(() => import("./SearchModal"));
const ExpertModal = dynamic(() => import("./ExpertModal"));
const EngineeringLivePreview = dynamic(() => import("./LivePreviews").then((m) => m.EngineeringLivePreview));
const AILivePreview = dynamic(() => import("./LivePreviews").then((m) => m.AILivePreview));
const GovTechLivePreview = dynamic(() => import("./LivePreviews").then((m) => m.GovTechLivePreview));
const CreativeLivePreview = dynamic(() => import("./LivePreviews").then((m) => m.CreativeLivePreview));
const CloudLivePreview = dynamic(() => import("./LivePreviews").then((m) => m.CloudLivePreview));
const GrowthLivePreview = dynamic(() => import("./LivePreviews").then((m) => m.GrowthLivePreview));
const MobileLivePreview = dynamic(() => import("./LivePreviews").then((m) => m.MobileLivePreview));
const LabsLivePreview = dynamic(() => import("./LivePreviews").then((m) => m.LabsLivePreview));

interface DivisionItem {
  name: string;
  desc: string;
  iconSvg: React.ReactNode;
}

interface SolutionItem {
  name: string;
  badge?: string;
  desc: string;
  iconSvg: React.ReactNode;
}

interface IndustryItem {
  name: string;
  tag: string;
  iconSvg: React.ReactNode;
}

const DIVISIONS_DATA: DivisionItem[] = [
  {
    name: "Engineering",
    desc: "Enterprise software, high-throughput web apps, distributed SaaS platforms, APIs, and microservices.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: "Mobile",
    desc: "Native iOS & Android, Flutter, React Native, and offline-first mobile client architecture.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
      </svg>
    ),
  },
  {
    name: "Creative",
    desc: "Design systems, spatial UI/UX, product design architecture, and WebGL motion graphics.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    name: "AI",
    desc: "Autonomous workflow agents, deterministic LLM orchestration, and internal intelligence meshes.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
  },
  {
    name: "Cloud",
    desc: "Multi-region Kubernetes, automated CI/CD pipelines, zero-downtime rollouts, and infrastructure as code.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    name: "Growth",
    desc: "Product telemetry, conversion funnel optimization, precision SEO, and attribution loops.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    name: "GovTech",
    desc: "Digital public infrastructure, high-concurrency citizen portals, and sovereign compliance architectures.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
      </svg>
    ),
  },
  {
    name: "Labs",
    desc: "Experimental research, spatial computing, protocol innovation, and open-source tooling.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55A1 1 0 0 0 5.611 22h12.778a1 1 0 0 0 .891-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <line x1="8.5" y1="2" x2="15.5" y2="2" />
      </svg>
    ),
  },
];

const SOLUTIONS_DATA: SolutionItem[] = [
  {
    name: "Launch a Startup",
    desc: "Full-stack MVP architecture, scalable cloud foundation, and rapid go-to-market execution.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    name: "Modernize Existing Software",
    desc: "Refactor legacy monolithic codebases into modular, resilient microservices.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: "Build a Digital Product",
    desc: "Responsive web & native mobile applications engineered for high engagement and low latency.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    name: "AI Workflow Automation",
    desc: "Deploy deterministic multi-agent engines, enterprise LLMs, and internal automation meshes.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <circle cx="15.5" cy="8.5" r="1.5" />
        <path d="M9 15h6" />
      </svg>
    ),
  },
  {
    name: "Government Digitalization",
    desc: "High-security citizen platforms, verified identity management, and digital public infrastructure.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
      </svg>
    ),
  },
  {
    name: "Cloud Transformation",
    desc: "Kubernetes orchestration, automated CI/CD pipelines, and multi-cloud resilience.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    name: "Design OS & Brand Systems",
    desc: "Unified tokenized component systems, Figma-to-code pipelines, and visual brand architecture.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    name: "Growth & Telemetry",
    desc: "Product analytics loops, conversion funnel instrumentation, and performance marketing infrastructure.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    name: "Managed Reliability & SLAs",
    desc: "24/7 technical operations, 99.99% uptime monitoring, and proactive infrastructure maintenance.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    name: "Digital Transformation",
    desc: "End-to-end modernization across engineering pods, operational workflows, and software delivery.",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

const INDUSTRIES_LIST: IndustryItem[] = [
  {
    name: "Government",
    tag: "Citizen Infrastructure",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
      </svg>
    ),
  },
  {
    name: "Healthcare",
    tag: "HIPAA Compliant",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: "Education",
    tag: "EdTech Platforms",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    name: "Retail",
    tag: "Omnichannel Commerce",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    name: "Manufacturing",
    tag: "IoT & Supply Chain",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    name: "Finance",
    tag: "FinTech & Banking",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    name: "Construction",
    tag: "BIM & Operations",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22h20M13 6l6 6M10 9l6 6M7 12l6 6M4 15l6 6" />
      </svg>
    ),
  },
  {
    name: "Hospitality",
    tag: "Booking Engines",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "Real Estate",
    tag: "PropTech Systems",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="9" y1="22" x2="9" y2="2" />
        <line x1="15" y1="22" x2="15" y2="2" />
        <line x1="4" y1="8" x2="20" y2="8" />
        <line x1="4" y1="14" x2="20" y2="14" />
      </svg>
    ),
  },
  {
    name: "Logistics",
    tag: "Fleet & Tracking",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    name: "NGOs",
    tag: "Impact Portals",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    name: "Media & Creators",
    tag: "Streaming Platforms",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    name: "Sports",
    tag: "Fan Engagement",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    name: "Startups",
    tag: "Scale & Venture",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    name: "SMEs",
    tag: "Operations Hub",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3zM9 9h6v6H9z" />
      </svg>
    ),
  },
  {
    name: "Enterprises",
    tag: "High Availability",
    iconSvg: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

const WORK_CATEGORIES = [
  { name: "Case Studies", count: "32 Projects" },
  { name: "Web Platforms", count: "64 Deployed" },
  { name: "Mobile Apps", count: "40+ Apps" },
  { name: "Enterprise Software", count: "18 Systems" },
  { name: "Government Projects", count: "15 Infrastructure" },
  { name: "Brand Identity", count: "50+ Brands" },
  { name: "Campaigns", count: "80+ Sprints" },
  { name: "AI Solutions", count: "25 Agents" },
  { name: "Product Design", count: "90+ Specs" },
];

const NAV_TABS = [
  { label: "Divisions", key: "Divisions", count: "8 Units" },
  { label: "Solutions", key: "Solutions", count: "10 Packages" },
  { label: "Industries", key: "Industries", count: "11 Sectors" },
  { label: "Work", key: "Work", count: "7 Categories" },
];

// Memoized: the header never re-renders when parent hero state flips acts
function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [lastActiveTab, setLastActiveTab] = useState<string>("Divisions");
  const [featuredDivisionIndex, setFeaturedDivisionIndex] = useState<number>(0);
  const [selectedWorkIndex, setSelectedWorkIndex] = useState<number>(0);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [expertModalOpen, setExpertModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenTab, setMobileOpenTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExtremeTop, setIsExtremeTop] = useState(true);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scroll position to update navbar background state when scrolling
  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;
    const updateScrollState = () => {
      ticking = false;
      rafId = null;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const nextScrolled = scrollY > 15;
      const nextExtremeTop = scrollY < 5;
      setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      setIsExtremeTop((prev) => (prev === nextExtremeTop ? prev : nextExtremeTop));
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(updateScrollState);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Auto-rotate the featured division preview on the right panel only.
  // This never changes the selected state of the division buttons.
  useEffect(() => {
    if (activeTab === "Divisions") {
      const interval = setInterval(() => {
        setFeaturedDivisionIndex((prev) => (prev + 1) % DIVISIONS_DATA.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // Lock page scroll while a mega menu flyout is open.
  useEffect(() => {
    if (activeTab) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const preventScroll = (e: WheelEvent | TouchEvent) => {
        const target = e.target as HTMLElement | null;
        if (target && target.closest(".mega-menu-panel, .header-wrapper, .mega-menu-inner")) {
          const scrollable = target.closest(".mega-menu-panel, .universal-flyout-grid, .flyout-col-left, .flyout-col-center, .flyout-col-right") as HTMLElement | null;
          if (scrollable && scrollable.scrollHeight > scrollable.clientHeight) {
            return;
          }
        }
        e.preventDefault();
      };

      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [activeTab]);

  // Lock page scroll + close on Escape while the mobile drawer is open.
  useEffect(() => {
    if (mobileMenuOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const preventScroll = (e: WheelEvent | TouchEvent) => {
        const target = e.target as HTMLElement | null;
        if (target && target.closest(".mobile-menu-drawer")) {
          return;
        }
        e.preventDefault();
      };

      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [mobileMenuOpen]);

  const handleMouseEnter = (key: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveTab(key);
    setLastActiveTab(key);
  };

  const cancelClose = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveTab(null);
    }, 200);
  };

  const currentTab = activeTab || lastActiveTab;
  const isMenuOpen = Boolean(activeTab);
  const isHeaderWhite = isMenuOpen || isScrolled || mobileMenuOpen;

  const activeDivision = DIVISIONS_DATA[featuredDivisionIndex];

  const openMobileMenu = () => {
    setActiveTab(null);
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileOpenTab(null);
  };

  const toggleMobileTab = (key: string) => {
    setMobileOpenTab((prev) => (prev === key ? null : key));
  };

  const openExpertModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveTab(null);
    closeMobileMenu();
    router.push("/contact");
  };

  return (
    <>
      <div
        className={`header-wrapper ${isHeaderWhite ? "header-active-white" : ""} ${isScrolled ? "header-scrolled" : ""} ${isMenuOpen ? "header-hover-active" : ""} ${isExtremeTop ? "at-extreme-top" : ""}`}
        onMouseEnter={cancelClose}
        onMouseLeave={handleMouseLeave}
      >
        <div className="header-bg" aria-hidden="true" />
        <header className="site-header">
          {/* Brand Logo */}
          <Link className="brand" href="/" aria-label="EPIC STUDIO home">
            <span className="brand-logo" aria-hidden="true">
              <img
                src="/brand_logo/dark.png"
                alt="EPIC STUDIO Logo"
                className="brand-logo-img brand-logo-dark"
                width={60}
                height={60}
              />
              <img
                src="/brand_logo/light.png"
                alt="EPIC STUDIO Logo"
                className="brand-logo-img brand-logo-light"
                width={60}
                height={60}
              />
            </span>
            <span className="brand-text">
              <strong>EPIC STUDIO</strong>
              <small>Multidisciplinary Tech & Design</small>
            </span>
          </Link>

          {/* Nav Items */}
          <nav className="main-nav" aria-label="Primary navigation">
            {NAV_TABS.map((item) => {
              const isOpen = activeTab === item.key;
              return (
                <a
                  href="#"
                  key={item.key}
                  className={`nav-link-item ${isOpen ? "active" : ""}`}
                  onMouseEnter={() => handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                  onClick={openExpertModal}
                >
                  <span>{item.label}</span>
                  <span className="nav-animated-bar" />
                  <svg
                    className={`nav-chevron ${isOpen ? "chevron-up" : ""}`}
                    viewBox="0 0 24 24"
                    width="10"
                    height="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </a>
              );
            })}

            {/* Standalone Direct Domains Button (No dropdown chevron, no mega-menu card on hover) */}
            <Link
              href="/domains"
              className={`nav-link-item nav-link-direct ${pathname === "/domains" ? "active" : ""}`}
              onMouseEnter={() => setActiveTab(null)}
            >
              <span>Domains</span>
              <span className="nav-animated-bar" />
            </Link>
          </nav>

          {/* Header Right Actions */}
          <div className="header-actions">
            {/* Search Trigger Button */}
            <button
              className="search-button"
              type="button"
              aria-label="Search EPIC"
              onClick={() => setSearchModalOpen(true)}
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <span className="search-shortcut" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="10"
                  height="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
                K
              </span>
            </button>

            {/* Consultation Button */}
            <Link
              className={`phone-pill ${pathname === "/contact" ? "active" : ""}`}
              href="/contact"
              onMouseEnter={() => setActiveTab(null)}
            >
              <span className="phone-pill-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="phone-pill-text">
                <small>Book Consultation</small>
                Talk with Expert
              </span>
              <span className="phone-pill-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            {/* Hamburger Menu Trigger (mobile only) */}
            <button
              className={`hamburger-btn ${mobileMenuOpen ? "is-open" : ""}`}
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={mobileMenuOpen ? closeMobileMenu : openMobileMenu}
            >
              <span className="hamburger-line" aria-hidden="true" />
              <span className="hamburger-line" aria-hidden="true" />
              <span className="hamburger-line" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Universal Flyout Mega Menu Panel */}
        <div
          className={`mega-menu-panel ${isMenuOpen ? "panel-open" : ""}`}
          onMouseEnter={cancelClose}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mega-menu-inner">

            {/* ========================================================================= */}
            {/* 1. DIVISIONS FLYOUT */}
            {/* ========================================================================= */}
            {currentTab === "Divisions" && (
              <div className="universal-flyout-grid">
                {/* LEFT: Brand Story / Mini Landing Page */}
                <div className="flyout-col-left">
                  <span className="flyout-section-tag">01 / DIVISIONS</span>
                  <h2 className="flyout-headline">
                    Multidisciplinary Technical Excellence
                  </h2>
                  <p className="flyout-paragraph">
                    Every division combines senior systems architecture, bespoke product design, and AI research to build resilient software platforms.
                  </p>
                  <div className="flyout-metrics-row">
                    <div className="mini-metric">
                      <strong>8</strong>
                      <span>Specialized Pods</span>
                    </div>
                    <div className="mini-metric">
                      <strong>50+</strong>
                      <span>Services</span>
                    </div>
                    <div className="mini-metric">
                      <strong>100%</strong>
                      <span>Direct Ownership</span>
                    </div>
                  </div>
                  <a href="#all-divisions" className="flyout-cta-btn" onClick={openExpertModal}>
                    <span>Explore All Divisions</span>
                    <span className="cta-arrow">→</span>
                  </a>
                </div>

                {/* CENTER: Primary Categories */}
                <div className="flyout-col-center">
                  <div className="divisions-grid">
                    {DIVISIONS_DATA.map((item, idx) => (
                      <div
                        key={item.name}
                        className="division-card"
                        onMouseEnter={() => {
                          setFeaturedDivisionIndex(idx);
                        }}
                        onClick={openExpertModal}
                      >
                        <span className="division-icon">
                          {item.iconSvg}
                        </span>
                        <div className="division-meta">
                          <h3>{item.name}</h3>
                          <p>{item.desc}</p>
                        </div>
                        <svg
                          className="division-arrow"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Featured Division & Live Preview */}
                <div className="flyout-col-right">
                  <div className="featured-card">
                    <div className="featured-top-bar">
                      <span className="featured-label">Featured Division</span>
                      <span className="rotation-indicator">
                        {String(featuredDivisionIndex + 1).padStart(2, "0")} /{" "}
                        {String(DIVISIONS_DATA.length).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="featured-title">{activeDivision.name}</h3>
                    <p className="featured-desc">{activeDivision.desc}</p>

                    {/* Live preview panel based on active division */}
                    <div className="featured-preview-container">
                      {activeDivision.name === "Engineering" && <EngineeringLivePreview />}
                      {activeDivision.name === "AI" && <AILivePreview />}
                      {activeDivision.name === "GovTech" && <GovTechLivePreview />}
                      {activeDivision.name === "Creative" && <CreativeLivePreview />}
                      {activeDivision.name === "Cloud" && <CloudLivePreview />}
                      {activeDivision.name === "Growth" && <GrowthLivePreview />}
                      {activeDivision.name === "Mobile" && <MobileLivePreview />}
                      {activeDivision.name === "Labs" && <LabsLivePreview />}
                    </div>

                    <a href="#learn-more" className="featured-learn-btn" onClick={openExpertModal}>
                      <span>Explore {activeDivision.name}</span>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 2. SOLUTIONS FLYOUT */}
            {/* ========================================================================= */}
            {currentTab === "Solutions" && (
              <div className="universal-flyout-grid">
                {/* LEFT: Mini Landing Page */}
                <div className="flyout-col-left">
                  <span className="flyout-section-tag">02 / SOLUTIONS</span>
                  <h2 className="flyout-headline">
                    Targeted Technical Architectures
                  </h2>
                  <p className="flyout-paragraph">
                    Purpose-built delivery blueprints engineered for enterprise modernization, high-concurrency SaaS, and sovereign infrastructure.
                  </p>
                  <div className="flyout-metrics-row">
                    <div className="mini-metric">
                      <strong>3.5x</strong>
                      <span>Velocity</span>
                    </div>
                    <div className="mini-metric">
                      <strong>99.99%</strong>
                      <span>Target Uptime</span>
                    </div>
                  </div>
                  <a href="#all-solutions" className="flyout-cta-btn" onClick={openExpertModal}>
                    <span>View Solutions</span>
                    <span className="cta-arrow">→</span>
                  </a>
                </div>

                {/* CENTER: Solutions List */}
                <div className="flyout-col-center">
                  <div className="solutions-list-grid">
                    {SOLUTIONS_DATA.map((sol) => (
                      <a href="#" key={sol.name} className="solution-item-card" onClick={openExpertModal}>
                        <span className="solution-icon-wrap">{sol.iconSvg}</span>
                        <div>
                          <h4>{sol.name}</h4>
                          <p>{sol.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Recommended Highlights */}
                <div className="flyout-col-right">
                  <div className="recommended-solutions-box">
                    <div className="rec-header-bar">
                      <span className="rec-section-label">Recommended Architecture</span>
                      <span className="rec-badge">Curated Blueprint</span>
                    </div>

                    <div className="rec-list">
                      <div className="rec-card">
                        <div className="rec-card-header">
                          <h4>Digital Transformation</h4>
                          <span className="rec-tag">Architecture</span>
                        </div>
                        <p>End-to-end corporate tech stack modernization and deterministic AI integration.</p>
                        <a href="#digital-transformation" className="rec-link" onClick={openExpertModal}>
                          <span>Explore Solution</span>
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </div>

                      <div className="rec-card">
                        <div className="rec-card-header">
                          <h4>Enterprise Modernization</h4>
                          <span className="rec-tag">Microservices</span>
                        </div>
                        <p>Refactoring legacy monoliths into resilient, event-driven microservices.</p>
                        <a href="#enterprise-modernization" className="rec-link" onClick={openExpertModal}>
                          <span>Explore Solution</span>
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </div>

                      <div className="rec-card">
                        <div className="rec-card-header">
                          <h4>Citizen Portal Platform</h4>
                          <span className="rec-tag">GovTech</span>
                        </div>
                        <p>Scaling public services for 14M+ citizens with sub-second response times.</p>
                        <a href="#citizen-portal" className="rec-link" onClick={openExpertModal}>
                          <span>View Project</span>
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 3. INDUSTRIES FLYOUT */}
            {/* ========================================================================= */}
            {currentTab === "Industries" && (
              <div className="universal-flyout-grid">
                {/* LEFT: Mini Landing Page */}
                <div className="flyout-col-left">
                  <span className="flyout-section-tag">03 / INDUSTRIES</span>
                  <h2 className="flyout-headline">
                    Regulated &amp; High-Throughput Sectors
                  </h2>
                  <p className="flyout-paragraph">
                    Deep domain engineering designed around strict regulatory standards, high availability SLAs, and complex operational workflows.
                  </p>
                  <a href="#industries" className="flyout-cta-btn" onClick={openExpertModal}>
                    <span>Explore Industry Hub</span>
                    <span className="cta-arrow">→</span>
                  </a>
                </div>

                {/* CENTER: 16 Industry Grid */}
                <div className="flyout-col-center">
                  <div className="industries-16-grid">
                    {INDUSTRIES_LIST.map((ind) => (
                      <a href="#" key={ind.name} className="industry-pill-card" onClick={openExpertModal}>
                        <span className="ind-icon-wrap">{ind.iconSvg}</span>
                        <div>
                          <strong className="ind-name">{ind.name}</strong>
                          <small className="ind-tag">{ind.tag}</small>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Dynamic Statistics & Featured Industry */}
                <div className="flyout-col-right">
                  <div className="dynamic-stats-card">
                    <div className="stats-top-bar">
                      <span className="stats-section-label">Industries Served</span>
                      <span className="stats-global-badge">Global Impact</span>
                    </div>

                    <div className="stats-numbers-grid">
                      <div className="stat-num-item">
                        <strong>18+</strong>
                        <span>Sectors</span>
                      </div>
                      <div className="stat-num-item">
                        <strong>250+</strong>
                        <span>Deployments</span>
                      </div>
                      <div className="stat-num-item">
                        <strong>8</strong>
                        <span>Countries</span>
                      </div>
                      <div className="stat-num-item">
                        <strong>15+</strong>
                        <span>GovTech Systems</span>
                      </div>
                    </div>

                    <div className="featured-industry-box">
                      <span className="ind-top-tag">Featured Sector</span>
                      <h4>Government &amp; Public Infrastructure</h4>
                      <p>Digital Citizen Services &amp; Secure Governance Systems</p>
                      <a href="#featured-sector" className="ind-explore-link" onClick={openExpertModal}>
                        <span>Explore Sector</span>
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 4. WORK FLYOUT */}
            {/* ========================================================================= */}
            {currentTab === "Work" && (
              <div className="universal-flyout-grid">
                {/* LEFT: Mini Landing Page */}
                <div className="flyout-col-left">
                  <span className="flyout-section-tag">04 / WORK</span>
                  <h2 className="flyout-headline">
                    Selected Deployments &amp; Case Studies
                  </h2>
                  <p className="flyout-paragraph">
                    Explore high-performance digital platforms, enterprise SaaS ecosystems, and public infrastructure delivered worldwide.
                  </p>
                  <div className="flyout-metrics-row">
                    <div className="mini-metric">
                      <strong>99.4%</strong>
                      <span>Retention</span>
                    </div>
                    <div className="mini-metric">
                      <strong>14</strong>
                      <span>Industry Awards</span>
                    </div>
                  </div>
                  <a href="#portfolio" className="flyout-cta-btn" onClick={openExpertModal}>
                    <span>View Case Studies</span>
                    <span className="cta-arrow">→</span>
                  </a>
                </div>

                {/* CENTER: Work Categories */}
                <div className="flyout-col-center">
                  <div className="work-cats-grid">
                    {WORK_CATEGORIES.map((cat, idx) => (
                      <div
                        key={cat.name}
                        className={`work-cat-card ${selectedWorkIndex === idx ? "active" : ""}`}
                        onMouseEnter={() => setSelectedWorkIndex(idx)}
                        onClick={openExpertModal}
                      >
                        <h4>{cat.name}</h4>
                        <span>{cat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Large Rotating Project Preview */}
                <div className="flyout-col-right">
                  <div className="large-project-card">
                    <div className="project-img-placeholder">
                      <div className="project-badge">FEATURED CASE STUDY</div>
                      <div className="project-visual-graphic">
                        <span className="graphic-icon">
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
                          </svg>
                        </span>
                        <span>West Bengal Education Platform</span>
                      </div>
                    </div>
                    <div className="project-details">
                      <h3>West Bengal Education Platform</h3>
                      <p>Unified digital learning infrastructure supporting multi-lingual curriculum delivery.</p>

                      <div className="tech-stack-pills">
                        <span>Next.js</span>
                        <span>Cloud Native</span>
                        <span>AI Tutoring</span>
                      </div>

                      <div className="project-impact-row">
                        <div>
                          <small>TIMELINE</small>
                          <strong>6 Months</strong>
                        </div>
                        <div>
                          <small>IMPACT</small>
                          <strong>2.4M Students Empowered</strong>
                        </div>
                      </div>

                      <a href="#project-details" className="project-view-btn" onClick={openExpertModal}>
                        <span>View Project Case Study</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}



            {/* ========================================================================= */}
            {/* UNIVERSAL BOTTOM SECTION (Every flyout ends with the same footer) */}
            {/* ========================================================================= */}
            <div className="universal-flyout-footer">
              <div className="footer-info">
                <span className="pulse-indicator-dot" />
                <span className="footer-headline">Need help finding the right solution?</span>
                <span className="footer-subtext">Talk with an EPIC Expert</span>
              </div>
              <Link
                href="/contact"
                className="footer-consult-btn"
                onClick={() => setActiveTab(null)}
              >
                <span>Book Consultation</span>
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-menu-panel ${mobileMenuOpen ? "mobile-menu-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="mobile-menu-inner">

          {/* Upper Official Corporate Header Banner */}
          <div className="mobile-menu-header-banner">
            <div className="mobile-banner-eyebrow">
              <span>EPIC STUDIO</span>
              <span className="mobile-eyebrow-dot">•</span>
              <span>ENTERPRISE TECHNOLOGY & CONSULTING</span>
            </div>
            <h2 className="mobile-banner-headline">
              Multidisciplinary Software & Solutions
            </h2>
            <p className="mobile-banner-desc">
              Access specialized engineering units, cloud solution frameworks, sector expertise, and corporate case studies.
            </p>
            <div className="mobile-banner-metrics">
              <span className="mobile-metric-pill">8 Engineering Units</span>
              <span className="mobile-metric-pill">10 Solutions</span>
              <span className="mobile-metric-pill">11 Sectors</span>
            </div>
          </div>

          <nav className="mobile-nav" aria-label="Mobile navigation">
            {NAV_TABS.map((item) => {
              const isOpen = mobileOpenTab === item.key;
              return (
                <div key={item.key} className={`mobile-nav-item ${isOpen ? "open" : ""}`}>
                  <button
                    className="mobile-nav-toggle"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleMobileTab(item.key)}
                  >
                    <span className="mobile-nav-toggle-left">
                      <span className="mobile-nav-title">{item.label}</span>
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="mobile-nav-count">{item.count}</span>
                      <span className="mobile-chevron" aria-hidden="true">
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mobile-nav-sub">
                      {item.key === "Divisions" && (
                        <ul className="mobile-sub-list">
                          {DIVISIONS_DATA.map((d) => (
                            <li key={d.name}>
                              <a href="#" className="mobile-sub-link" onClick={openExpertModal}>
                                <span>
                                  <span className="mobile-sub-name">{d.name}</span>
                                  <span className="mobile-sub-desc">{d.desc}</span>
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.key === "Solutions" && (
                        <ul className="mobile-sub-list">
                          {SOLUTIONS_DATA.map((s) => (
                            <li key={s.name}>
                              <a href="#" className="mobile-sub-link" onClick={openExpertModal}>
                                <span>
                                  <span className="mobile-sub-name">{s.name}</span>
                                  <span className="mobile-sub-desc">{s.desc}</span>
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.key === "Industries" && (
                        <ul className="mobile-sub-list mobile-sub-list-compact">
                          {INDUSTRIES_LIST.map((ind) => (
                            <li key={ind.name}>
                              <a href="#" className="mobile-sub-link" onClick={openExpertModal}>
                                <span>
                                  <span className="mobile-sub-name">{ind.name}</span>
                                  <span className="mobile-sub-tag">{ind.tag}</span>
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.key === "Work" && (
                        <ul className="mobile-sub-list mobile-sub-list-compact">
                          {WORK_CATEGORIES.map((c) => (
                            <li key={c.name}>
                              <a href="#" className="mobile-sub-link" onClick={openExpertModal}>
                                <span>
                                  <span className="mobile-sub-name">{c.name}</span>
                                  <span className="mobile-sub-desc">{c.count}</span>
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Standalone Direct Domains Button for Mobile */}
            <div className="mobile-nav-item">
              <Link
                href="/domains"
                className={`mobile-nav-btn mobile-nav-direct-link ${pathname === "/domains" ? "is-active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-nav-toggle-left">
                  <span className="mobile-nav-title">Domains</span>
                </span>
                <span className="mobile-direct-arrow">→</span>
              </Link>
            </div>

            {/* Standalone Direct Talk with Expert Button for Mobile */}
            <div className="mobile-nav-item">
              <Link
                href="/contact"
                className={`mobile-nav-btn mobile-nav-direct-link ${pathname === "/contact" ? "is-active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-nav-toggle-left">
                  <span className="mobile-nav-title">Talk with Expert</span>
                </span>
                <span className="mobile-direct-arrow">→</span>
              </Link>
            </div>
          </nav>

          {/* Official Enterprise Mobile Menu Footer */}
          <div className="mobile-menu-footer">
            <div className="mobile-footer-actions">
              <button
                className="mobile-search-btn"
                type="button"
                aria-label="Search EPIC Studio"
                onClick={() => {
                  closeMobileMenu();
                  setSearchModalOpen(true);
                }}
              >
                <span className="mobile-search-left">
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <span>Search services & insights...</span>
                </span>
                <kbd className="mobile-search-badge">⌘K</kbd>
              </button>

              <Link
                href="/contact"
                className="mobile-consult-btn"
                onClick={() => closeMobileMenu()}
              >
                <span className="mobile-consult-title">
                  <span className="mobile-consult-dot" />
                  <span>Book Executive Consultation</span>
                </span>
                <span className="mobile-consult-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>

            <div className="mobile-footer-info-card">
              <div className="mobile-footer-info-row">
                <a href="mailto:contact@epic-studio.in" className="mobile-info-pill">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>contact@epic-studio.in</span>
                </a>
                <a href="tel:+916291773811" className="mobile-info-pill">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+91 62917 73811</span>
                </a>
              </div>

              <div className="mobile-footer-hubs-socials">
                <span className="mobile-hubs-text">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                  </svg>
                  New York • London • Tokyo • Singapore
                </span>
                <div className="mobile-social-pills">
                  <a href="#" className="mobile-social-icon" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="mobile-social-icon" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                    </svg>
                  </a>
                  <a href="#" className="mobile-social-icon" aria-label="X Twitter">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mobile-menu-bottom-bar">
              <span>© 2026 EPIC STUDIO Inc. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>


      {/* Cmd+K Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectAction={(action) => {
          setSearchModalOpen(false);
          if (action === "consultation" || action === "start" || action === "proposal") {
            router.push("/contact");
          }
        }}
      />

      {/* Expert Consultation Page Modal */}
      <ExpertModal
        isOpen={expertModalOpen}
        onClose={() => setExpertModalOpen(false)}
      />
    </>
  );
}

export default memo(Header);
