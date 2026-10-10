"use client";

import { useState } from "react";
import Link from "next/link";

const footerNav = [
  {
    heading: "Company",
    items: ["About Studio", "Careers", "Press & Media", "Sustainability", "Contact Us"],
  },
  {
    heading: "Services",
    items: ["Product Engineering", "Creative Direction", "AI & Automation", "Cloud Infrastructure", "Growth Strategy"],
  },
  {
    heading: "Resources",
    items: ["Insights & Articles", "Case Studies", "Design Playbooks", "Events", "Brand Assets"],
  },
  {
    heading: "Industries",
    items: ["Technology & SaaS", "Fintech & Banking", "Healthcare", "Retail & E-commerce", "Public Sector"],
  },
];

const contactItems = [
  { label: "Studio HQ", value: "548 Market St, San Francisco, CA", href: "#" },
  { label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { label: "Email", value: "contact@epic-studio.in", href: "mailto:contact@epic-studio.in" },
  { label: "Hours", value: "Mon – Fri · 9:00 AM – 6:00 PM PST", href: "#" },
];

const footerSocials = [
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Twitter / X", href: "#" },
  { name: "Dribbble", href: "#" },
  { name: "GitHub", href: "#" },
];

export default function MobileFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const toggleSection = (heading: string) => {
    setOpenSection((prev) => (prev === heading ? null : heading));
  };

  return (
    <footer className="mf-clean-footer" aria-label="Mobile site footer">
      {/* 1. CTA Section */}
      <div className="mf-cta-section">
        <h2 className="mf-cta-heading">
          Let&apos;s build something <span className="mf-lime">extraordinary</span> together.
        </h2>
        <p className="mf-cta-text">
          Have an idea or project in mind? We&apos;d love to partner with you.
        </p>

        <div className="mf-cta-buttons">
          <Link className="mf-btn-solid" href="/contact">
            <span>Start a Project</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="mf-newsletter-wrapper">
          <span className="mf-news-label">Subscribe to our newsletter</span>
          {subscribed ? (
            <div className="mf-news-success" role="status">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>You&apos;re subscribed! See you in your inbox.</span>
            </div>
          ) : (
            <form
              className="mf-news-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubscribed(true);
              }}
            >
              <div className="mf-news-field-wrap">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" aria-label="Subscribe to newsletter">
                  <span>Join</span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 2. Accordion Navigation */}
      <div className="mf-nav-accordions">
        {footerNav.map(({ heading, items }) => {
          const isOpen = openSection === heading;
          return (
            <div className={`mf-acc-group ${isOpen ? "is-open" : ""}`} key={heading}>
              <button
                className="mf-acc-btn"
                type="button"
                onClick={() => toggleSection(heading)}
                aria-expanded={isOpen}
              >
                <span>{heading}</span>
                <svg className="mf-acc-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isOpen && (
                <ul className="mf-acc-sublist">
                  {items.map((item) => (
                    <li key={item}>
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}

        {/* Contact Accordion */}
        <div className={`mf-acc-group ${openSection === "Contact" ? "is-open" : ""}`}>
          <button
            className="mf-acc-btn"
            type="button"
            onClick={() => toggleSection("Contact")}
            aria-expanded={openSection === "Contact"}
          >
            <span>Get in Touch</span>
            <svg className="mf-acc-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {openSection === "Contact" && (
            <div className="mf-contact-box">
              {contactItems.map((c) => (
                <a className="mf-contact-row" href={c.href} key={c.label}>
                  <small>{c.label}</small>
                  <strong>{c.value}</strong>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Brand & Social Section */}
      <div className="mf-brand-section">
        <a className="mf-brand-title" href="#">
          <strong>EPIC STUDIO</strong>
        </a>
        <p className="mf-brand-tagline">Multidisciplinary Design &amp; Technology Studio</p>

        <div className="mf-social-links">
          {footerSocials.map((s) => (
            <a key={s.name} href={s.href}>
              {s.name}
            </a>
          ))}
        </div>
      </div>

      {/* 4. Footer Bottom Legal */}
      <div className="mf-bottom-legal">
        <p>© 2026 EPIC STUDIO Inc. All rights reserved.</p>
        <div className="mf-legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
