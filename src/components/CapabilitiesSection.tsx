"use client";

import React, { useState, useRef } from "react";

interface CapabilityItem {
  id: string;
  num: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  link: string;
  isSpecialized?: boolean;
}

const capabilitiesData: CapabilityItem[] = [
  {
    id: "engineering",
    num: "01",
    category: "TECHNOLOGY & SAAS",
    title: "Software & Product Engineering",
    subtitle: "Enterprise Platforms, Native Apps & High-Load Microservices",
    description: "We architect and engineer resilient digital products designed for high availability, enterprise scalability, and zero-downtime releases.",
    deliverables: [
      "Full-Stack Web & SaaS",
      "Native iOS & Android",
      "Enterprise APIs & Microservices",
      "High-Performance Cloud Backends",
    ],
    link: "#engineering",
  },
  {
    id: "design",
    num: "02",
    category: "DESIGN & EXPERIENCE",
    title: "UI/UX & Brand Systems",
    subtitle: "Scalable Design Systems, Product Interfaces & Visual Identity",
    description: "We craft human-centered digital experiences and design systems that establish market authority and turn complex workflows into intuitive products.",
    deliverables: [
      "UX Strategy & Product Wireframing",
      "Enterprise Design Systems",
      "Interactive Prototypes",
      "Visual Brand & Identity",
    ],
    link: "#creative",
  },
  {
    id: "intelligence",
    num: "03",
    category: "AI & INFRASTRUCTURE",
    title: "AI Workflows & Cloud DevOps",
    subtitle: "Automated ML Pipelines, Intelligent Assistants & Cloud Infrastructure",
    description: "We deploy machine learning models, custom AI automation workflows, and automated CI/CD deployment pipelines built for security.",
    deliverables: [
      "AI Assistants & LLM Integrations",
      "Automated Business Workflows",
      "Cloud Infrastructure (DevOps)",
      "Security Audits & Compliance",
    ],
    link: "#growth",
  },
  {
    id: "govtech",
    num: "04",
    category: "INSTITUTIONAL INNOVATION",
    title: "GovTech & Public Platforms",
    subtitle: "Citizen Services, Public Infrastructure & Secure Government Systems",
    description: "Specialized engineering for public sector institutions, sovereign cloud infrastructure, citizen digital access portals, and security compliance.",
    deliverables: [
      "Public Sector Infrastructure",
      "Citizen Digital Portals",
      "Gov Cloud & Security Compliance",
      "Institutional Automation",
    ],
    link: "#govtech",
    isSpecialized: true,
  },
];

export default function CapabilitiesSection() {
  const [activeId, setActiveId] = useState<string>("engineering");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (id: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveId(id);
    }, 60);
  };

  const handleListMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveId("engineering");
    }, 150);
  };

  const handleClick = (id: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveId(id);
  };

  return (
    <section className="capabilities-section" id="capabilities" aria-labelledby="capabilities-title">
      <div className="capabilities-container">
        
        {/* Editorial Section Header */}
        <div className="capabilities-header">
          <div className="capabilities-badge">
            <span className="capabilities-badge-dot" aria-hidden="true" />
            <span className="capabilities-badge-text">02 // CAPABILITIES</span>
          </div>

          <h2 id="capabilities-title" className="capabilities-headline">
            <span className="hl-solid">ONE STUDIO.</span>{" "}
            <span className="hl-stroke">MULTIPLE DISCIPLINES.</span>
          </h2>

          <p className="capabilities-lead-copy">
            From software engineering to brand strategy, our capabilities work independently or come together around a single business objective.
          </p>
        </div>

        {/* Executive Discipline Accordion Bands */}
        <div className="capabilities-list-wrapper" onMouseLeave={handleListMouseLeave}>
          {capabilitiesData.map((item) => {
            const isActive = activeId === item.id;

            return (
              <div
                key={item.id}
                className={`capability-row-card ${item.isSpecialized ? "is-specialized" : ""} ${
                  isActive ? "is-active" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onClick={() => handleClick(item.id)}
              >
                <div className="capability-row-main">
                  
                  {/* Left Column: Number & Category Eyebrow */}
                  <div className="capability-col-num">
                    <span className="capability-num">{item.num}</span>
                    <span className="capability-cat">{item.category}</span>
                  </div>

                  {/* Center Column: Title & Subtitle */}
                  <div className="capability-col-title">
                    <h3 className="capability-title">{item.title}</h3>
                    <p className="capability-subtitle">{item.subtitle}</p>
                  </div>

                  {/* Right Column: Arrow Trigger */}
                  <div className="capability-col-arrow">
                    <span className="capability-arrow-btn" aria-label={`Explore ${item.title}`}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>

                </div>

                {/* Smooth CSS Grid Expandable Details */}
                <div className="capability-row-details">
                  <div className="capability-details-inner">
                    <p className="capability-desc">{item.description}</p>
                    
                    <div className="capability-deliverables-grid">
                      {item.deliverables.map((deliv) => (
                        <div className="capability-deliv-item" key={deliv}>
                          <svg className="deliv-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
