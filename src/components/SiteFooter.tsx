"use client";

import React, { type CSSProperties } from "react";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import MobileFooter from "./MobileFooter";
import PaymentMethodsStrip from "./PaymentMethodsStrip";

const footerNav: Record<string, { label: string; href: string }[]> = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Join Us", href: "/join" },
    { label: "Work", href: "/work" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Software Engineering", href: "/services/software-engineering" },
    { label: "Mobile Development", href: "/services/mobile-app-development" },
    { label: "AI Automation", href: "/services/ai-automation" },
    { label: "Web Design & UX", href: "/services/ui-ux-design" },
    { label: "GovTech", href: "/services/govtech" },
    { label: "Video & Social", href: "/services/video-production" },
  ],
  Resources: [
    { label: "Case Studies", href: "/work" },
    { label: "Service Index", href: "/services" },
    { label: "FAQ", href: "/faq" },
    { label: "About", href: "/about" },
    { label: "Global coverage", href: "/locations" },
  ],
  Industries: [
    { label: "Public Sector", href: "/services/govtech" },
    { label: "Education", href: "/work/west-bengal-education-platform" },
    { label: "Finance", href: "/work/kairo-mobile" },
    { label: "AI & SaaS", href: "/work/omniflow-ai" },
  ],
};

const footerStats = [
  ["500+", "Happy clients"],
  ["125+", "Projects shipped"],
  ["12", "Countries served"],
  ["450+", "Awards won"],
];

const footerSocials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/epic_studio.2024",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/epic-studio-630a97341",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];


export default function SiteFooter() {
  return (
    <>
      <div className="fd-footer-desktop">
        <footer className="fd-footer" data-anim-scope>
          <span className="fd-glow fd-glow-a" aria-hidden="true" />
          <span className="fd-glow fd-glow-b" aria-hidden="true" />

          {/* CTA band + newsletter */}
          <div className="fd-cta">
            <div className="fd-cta-copy">
              <h2 className="fd-cta-title">
                Let&apos;s build the <span className="fd-accent">loud</span>, useful, memorable thing next.
              </h2>
              <p className="fd-cta-desc">
                From strategy to shipped product — a multidisciplinary team ready for your boldest brief.
              </p>
              <div className="fd-cta-chips">
                <Link className="fd-btn fd-btn-primary" href="/contact">
                  Start a project
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <a className="fd-chip" href="mailto:contact@epic-studio.in">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  contact@epic-studio.in
                </a>
                <a className="fd-chip" href="tel:+917980595630">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  +91 79805 95630
                </a>
                <a className="fd-chip" href="tel:+916291773811">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  +91 6291773811
                </a>
              </div>
            </div>
            <div className="fd-cta-actions">
              <div className="fd-cta-news">
                <span className="fd-kicker">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Newsletter
                </span>
                <NewsletterForm />
              </div>
            </div>
          </div>

          {/* Link grid */}
          <div className="fd-grid">
            <div className="fd-brand">
              <Link className="fd-logo" href="/" aria-label="EPIC STUDIO home">
                <span className="fd-logo-star" aria-hidden="true">
                  <svg viewBox="0 0 100 100" fill="none">
                    <path
                      d="M 50 0 Q 50 50 100 50 Q 50 50 50 100 Q 50 50 0 50 Q 50 50 50 0 Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="fd-logo-copy">
                  <strong>EPIC STUDIO</strong>
                  <small>Multidisciplinary Tech &amp; Design</small>
                </span>
              </Link>
              <p className="fd-brand-desc">
                A global collective of engineers, designers and AI researchers building
                high-performance digital products and public infrastructure.
              </p>
              <div className="fd-stats">
                {footerStats.map(([value, label]) => (
                  <div className="fd-stat" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div className="fd-social">
                {footerSocials.map((social) => (
                  <a
                    className="fd-social-link"
                    href={social.href}
                    key={social.name}
                    aria-label={`EPIC STUDIO on ${social.name}`}
                    title={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerNav).map(([heading, items]) => (
              <nav className="fd-col" aria-label={`${heading} menu`} key={heading}>
                <h3>{heading}</h3>
                <ul>
                  {items.map((item) => {
                    return (
                      <li key={item.href}>
                        <Link href={item.href}>
                          <span className="fd-col-text">{item.label}</span>
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                              d="M5 12h14M13 6l6 6-6 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}

            <div className="fd-contact">
              <h3>Get in touch</h3>
              <ul className="fd-contact-list">
                <li>
                  <span className="fd-contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="fd-contact-copy">
                    <small>Call us anytime</small>
                    <a href="tel:+917980595630">+91 79805 95630</a>
                    <a href="tel:+916291773811">+91 6291773811</a>
                  </span>
                </li>
                <li>
                  <span className="fd-contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="fd-contact-copy">
                    <small>Email us</small>
                    <a href="mailto:contact@epic-studio.in">contact@epic-studio.in</a>
                  </span>
                </li>
                <li>
                  <span className="fd-contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="fd-contact-copy">
                    <small>Working hours</small>
                    <span className="fd-contact-val">24x7 contact us anytime</span>
                  </span>
                </li>
              </ul>

              {/* Studio Location Map Card (Right Side - Get in Touch) */}
              <div className="contact-map-card fd-map-card" role="region" aria-label="Studio Location Map">
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
          </div>

          {/* Payment Assurance Strip Positioned Above Large EPIC STUDIO Watermark */}
          <div className="fd-payment-row">
            <PaymentMethodsStrip variant="desktop" />
          </div>

          {/* Watermark */}
          <div className="fd-watermark" aria-hidden="true">
            <div className="fd-wm-inner">
              {"EPIC STUDIO".split("").map((ch, i) =>
                ch === " " ? (
                  <span key={i} className="fd-wm-gap" />
                ) : (
                  <span
                    key={i}
                    className={`fd-wm-letter ${i < 4 ? "fd-wm-solid" : "fd-wm-outline"}`}
                    style={{ "--w-i": i } as CSSProperties}
                  >
                    {ch}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="fd-bottom">
            <span className="fd-copyright">© 2026 EPIC STUDIO. All rights reserved.</span>
            <div className="fd-legal">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </footer>
      </div>
      <MobileFooter />
    </>
  );
}
