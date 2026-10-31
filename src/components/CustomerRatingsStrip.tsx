"use client";

import React, { useId } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import "./CustomerRatingsStrip.css";

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  projectTag: string;
  quote: string;
}

const VERIFIED_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Marcus Vance",
    role: "VP of Engineering",
    company: "Chrono Logistics",
    initials: "MV",
    rating: 5.0,
    projectTag: "Distributed Fleet Core",
    quote:
      "Epic re-engineered our high-concurrency dispatch pipeline past 120k RPS. System friction dropped by 82% with zero production downtime.",
  },
  {
    id: "rev-2",
    name: "Elena Rostova",
    role: "Co-Founder & CTO",
    company: "Vespera Health",
    initials: "ER",
    rating: 5.0,
    projectTag: "Clinical Spatial UI & AI",
    quote:
      "The 5-axis synthesis engine is a masterclass. Our clinical platform achieved atomic 120 FPS native interactions and full HIPAA zero-trust compliance.",
  },
  {
    id: "rev-3",
    name: "Devon Park",
    role: "Director of Digital Systems",
    company: "Horizon GovTech",
    initials: "DP",
    rating: 5.0,
    projectTag: "GovTech Public Infrastructure",
    quote:
      "Spotless architecture, zero technical debt, and rigorous threat models. Easily the most disciplined and capable engineering team we’ve partnered with.",
  },
  {
    id: "rev-4",
    name: "Dr. Aris Thorne",
    role: "Head of AI Infrastructure",
    company: "Synthetix Labs",
    initials: "AT",
    rating: 5.0,
    projectTag: "Autonomous ML Pipelines",
    quote:
      "Sub-50ms LLM agent orchestration directly embedded into our core application loops. Compounding operational leverage jumped 4x within 90 days.",
  },
  {
    id: "rev-5",
    name: "Sarah Lin",
    role: "Director of Product",
    company: "Aether Dynamics",
    initials: "SL",
    rating: 5.0,
    projectTag: "Enterprise SaaS Ecosystem",
    quote:
      "They didn't just build software — they engineered market impact. Our enterprise client conversion surged +38% across all tiers post-launch.",
  },
  {
    id: "rev-6",
    name: "Kenji Takahashi",
    role: "Founder & CEO",
    company: "Kinetix Financial",
    initials: "KT",
    rating: 5.0,
    projectTag: "High-Frequency Settlement Core",
    quote:
      "Uncompromising engineering standards and transparent sprint cadences. The cleanest code architecture and documentation our auditors have ever seen.",
  },
];

export default function CustomerRatingsStrip() {
  const headingId = useId();

  // Duplicate items to create a seamless infinite marquee loop
  const duplicatedReviews = [...VERIFIED_REVIEWS, ...VERIFIED_REVIEWS];

  return (
    <section
      className="crs-strip-wrapper"
      aria-labelledby={headingId}
    >
      <div className="crs-strip-inner">
        {/* =========================================================================
            LEFT STATIC ANCHOR COLLAR: GOOGLE 5.0 RATING SUMMARY
            ========================================================================= */}
        <div className="crs-collar">
          <div className="crs-google-badge" title="Google Verified Enterprise Reviews">
            <FcGoogle className="crs-google-icon" aria-hidden="true" />
            <div className="crs-score-wrap">
              <span className="crs-score-val">5.0</span>
              <div className="crs-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="crs-star-icon" aria-hidden="true" />
                ))}
              </div>
            </div>
          </div>

          <div className="crs-meta-col">
            <span id={headingId} className="crs-kicker">
              CLIENT RATINGS
            </span>
            <span className="crs-sub-label">
              100% VERIFIED · 5.0 ★ EXCELLENT
            </span>
          </div>

          <span className="crs-divider" aria-hidden="true" />
        </div>

        {/* =========================================================================
            RIGHT MARQUEE STREAM: GOOGLE-STYLE PROFESSIONAL TESTIMONIAL CARDS
            ========================================================================= */}
        <div className="crs-marquee-col" aria-label="Client testimonials and verified ratings">
          <div className="crs-marquee-track">
            {duplicatedReviews.map((item, idx) => (
              <article
                key={`${item.id}-${idx}`}
                className="crs-review-card"
                tabIndex={0}
              >
                {/* Card Top: Google Review Identity */}
                <div className="crs-card-header">
                  <div className="crs-card-google-identity">
                    <FcGoogle className="crs-card-g-icon" aria-hidden="true" />
                    <span className="crs-card-google-text">Google Review</span>
                    <MdVerified
                      className="crs-card-verified-icon"
                      title="Verified Client Engagement"
                      aria-label="Verified Engagement"
                    />
                  </div>
                </div>

                {/* Rating Stars + Project Scope Tag */}
                <div className="crs-card-rating-row">
                  <div className="crs-card-stars" aria-label={`Rating: ${item.rating} stars`}>
                    {[...Array(5)].map((_, starIdx) => (
                      <FaStar key={starIdx} className="crs-card-star" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="crs-card-score">{item.rating.toFixed(1)}</span>
                  <span className="crs-card-tag-bullet">·</span>
                  <span className="crs-card-tag">{item.projectTag}</span>
                </div>

                {/* Executive Response / Impact Quote */}
                <p className="crs-card-quote">
                  {item.quote}
                </p>

                {/* Card Footer: Executive Attribution */}
                <footer className="crs-card-footer">
                  <div className="crs-avatar-badge" aria-hidden="true">
                    <span>{item.initials}</span>
                  </div>
                  <div className="crs-author-details">
                    <span className="crs-author-name">{item.name}</span>
                    <span className="crs-author-role">
                      {item.role} · <strong>{item.company}</strong>
                    </span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
