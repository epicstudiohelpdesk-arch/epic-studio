"use client";

import { useState } from "react";
import Link from "next/link";
import PaymentMethodsStrip from "./PaymentMethodsStrip";

const footerNav: { heading: string; items: { label: string; href: string }[] }[] = [
  {
    heading: "Company",
    items: [
      { label: "About Studio", href: "/about" },
      { label: "Careers", href: "/join" },
      { label: "Case Studies", href: "/work" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    items: [
      { label: "Software Engineering", href: "/services/software-engineering" },
      { label: "Mobile Development", href: "/services/mobile-app-development" },
      { label: "AI & Automation", href: "/services/ai-automation" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "GovTech", href: "/services/govtech" },
      { label: "Video Production", href: "/services/video-production" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Case Studies", href: "/work" },
      { label: "Global Coverage", href: "/locations" },
      { label: "FAQ", href: "/faq" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    heading: "Industries",
    items: [
      { label: "GovTech & Public Sector", href: "/services/govtech" },
      { label: "Education Technology", href: "/work/west-bengal-education-platform" },
      { label: "Fintech & Banking", href: "/work/kairo-mobile" },
      { label: "AI & Autonomous SaaS", href: "/work/omniflow-ai" },
    ],
  },
];

const footerSocials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/epic-studio-630a97341" },
  { name: "Instagram", href: "https://www.instagram.com/epic_studio.2024" },
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
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
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
              <div className="mf-contact-row">
                <small>Call us anytime</small>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <a href="tel:+917980595630">
                    <strong>+91 79805 95630</strong>
                  </a>
                  <a href="tel:+916291773811">
                    <strong>+91 6291773811</strong>
                  </a>
                </div>
              </div>
              <div className="mf-contact-row">
                <small>Email</small>
                <a href="mailto:contact@epic-studio.in">
                  <strong>contact@epic-studio.in</strong>
                </a>
              </div>
              <div className="mf-contact-row">
                <small>Working hours</small>
                <strong>24x7 contact us anytime</strong>
              </div>

              {/* Studio Location Map */}
              <div className="contact-map-card mf-map-card" role="region" aria-label="Studio Location Map">
                <iframe
                  title="EPIC STUDIO Location - 9C7R+VC Baruipur, West Bengal"
                  className="contact-map-iframe"
                  src="https://maps.google.com/maps?q=9C7R%2BVC+Baruipur%2C+West+Bengal&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                />

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
            </div>
          )}
        </div>
      </div>

      {/* Payment Assurance Strip Positioned Above EPIC STUDIO Brand Section */}
      <div className="mf-payment-row">
        <PaymentMethodsStrip variant="mobile" />
      </div>

      {/* 3. Brand & Social Section */}
      <div className="mf-brand-section">
        <Link className="mf-brand-title" href="/">
          <strong>EPIC STUDIO</strong>
        </Link>
        <p className="mf-brand-tagline">Multidisciplinary Design &amp; Technology Studio</p>

        <div className="mf-social-links">
          {footerSocials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>

      {/* 4. Footer Bottom Legal */}
      <div className="mf-bottom-legal">
        <p>© 2026 EPIC STUDIO Inc. All rights reserved.</p>
        <div className="mf-legal-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
