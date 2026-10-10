"use client";

import React, { type CSSProperties } from "react";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import MobileFooter from "./MobileFooter";

const footerNav = {
  Company: ["About", "Careers", "Press & Media", "Sustainability", "Contact"],
  Services: ["Engineering", "Creative", "AI & Automation", "Cloud & DevOps", "Growth Marketing"],
  Resources: ["Insights", "Case Studies", "Playbooks", "Events", "Brand Assets"],
  Industries: ["Technology", "Finance", "Healthcare", "Retail", "Public Sector"],
};

const footerStats = [
  ["500+", "Happy clients"],
  ["125+", "Projects shipped"],
  ["12", "Countries served"],
  ["450+", "Awards won"],
];

const footerSocials = [
  {
    name: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Dribbble",
    path: "M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z",
  },
  {
    name: "GitHub",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    name: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
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
                <a className="fd-chip" href="tel:+15551234567">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  +1 (555) 123-4567
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
                    href="#"
                    key={social.name}
                    aria-label={social.name}
                    title={social.name}
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
                    const href =
                      item === "Contact" || item === "Contact Us"
                        ? "/contact"
                        : item === "Domains"
                        ? "/domains"
                        : "#";
                    return (
                      <li key={item}>
                        <Link href={href}>
                          <span className="fd-col-text">{item}</span>
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
                        d="M12 21s-7-5.6-7-11a7 7 0 1114 0c0 5.4-7 11-7 11zM12 10a2 2 0 100-4 2 2 0 000 4z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="fd-contact-copy">
                    <small>Visit the studio</small>
                    <a href="#">548 Market St, San Francisco, CA</a>
                  </span>
                </li>
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
                    <a href="tel:+15551234567">+1 (555) 123-4567</a>
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
                    <a href="#">Mon – Fri · 9:00 AM – 6:00 PM</a>
                  </span>
                </li>
              </ul>
            </div>
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
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </footer>
      </div>
      <MobileFooter />
    </>
  );
}
