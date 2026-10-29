"use client";

import React, { useRef } from "react";
import useRevealOnScroll from "./useRevealOnScroll";

interface PersonCard {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  followers: string;
  projects: string;
}

const people: PersonCard[] = [
  {
    id: "alex",
    name: "Alex Sen",
    role: "Principal Engineer",
    bio: "Principal Engineer who focuses on simplicity & scalability.",
    image: "/assets/portrait-alex.jpg",
    followers: "312",
    projects: "48",
  },
  {
    id: "sophie",
    name: "Sophie Bennett",
    role: "Product Designer",
    bio: "Product Designer who focuses on simplicity & usability.",
    image: "/assets/portrait-sophie.jpg",
    followers: "312",
    projects: "48",
  },
];

export default function PeopleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="ppl-section"
      id="people"
      aria-labelledby="ppl-title"
    >
      <div className="ppl-grid-bg" aria-hidden="true" />

      <div className="ppl-container">
        {/* Header */}
        <header className="ppl-header" data-reveal>
          <div className="ppl-label-row">
            <span className="ppl-section-label">07 // THE PEOPLE BEHIND THE SYSTEM</span>
          </div>
          <h2 id="ppl-title" className="ppl-headline">
            BUILT BY PEOPLE
            <br />
            WHO CARE ABOUT <span className="ppl-headline-stroke">THE DETAILS.</span>
          </h2>
          <p className="ppl-support-line">
            SENIOR THINKERS. DESIGNERS. ENGINEERS. BUILDERS.
          </p>
        </header>

        {/* Centered Profile Cards */}
        <div className="ppl-spread">
          {people.map((person) => (
            <article
              key={person.id}
              data-reveal
              className="ppl-ios-card"
            >
              {/* Photo Background */}
              <img
                src={person.image}
                alt={person.name}
                className="ppl-ios-bg"
                loading="eager"
                decoding="async"
              />

              {/* Frosted Glass Overlay */}
              <div className="ppl-ios-glass">
                {/* Name + Scalloped Green Verified Badge */}
                <div className="ppl-ios-name-row">
                  <h3 className="ppl-ios-name">{person.name}</h3>
                  <span className="ppl-ios-badge" title="Verified Creator" aria-label="Verified">
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path
                        fill="#15803d"
                        d="M22.5 12.5c0-1.58-.8-2.95-2-3.6.1-.4.2-.9.2-1.4 0-2.2-1.8-4-4-4-.5 0-1 .1-1.4.2C14.6 2.5 13.2 1.6 11.6 1.6c-1.6 0-3 .9-3.6 2.1-.4-.1-.9-.2-1.4-.2-2.2 0-4 1.8-4 4 0 .5.1 1 .2 1.4-1.2.7-2 2-2 3.6 0 1.6.8 3 2 3.6-.1.4-.2.9-.2 1.4 0 2.2 1.8 4 4 4 .5 0 1-.1 1.4-.2.6 1.2 2 2.1 3.6 2.1 1.6 0 3-.9 3.6-2.1.4.1.9.2 1.4.2 2.2 0 4-1.8 4-4 0-.5-.1-1-.2-1.4 1.2-.6 2-2 2-3.6z"
                      />
                      <path
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.5 12.5l2.5 2.5 5-5"
                      />
                    </svg>
                  </span>
                </div>

                {/* Bio text */}
                <p className="ppl-ios-bio">{person.bio}</p>

                {/* Bottom Row: Stats + Follow Button */}
                <div className="ppl-ios-bottom">
                  <div className="ppl-ios-stats">
                    <span className="ppl-ios-stat" title="Followers">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {person.followers}
                    </span>

                    <span className="ppl-ios-stat" title="Projects">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      {person.projects}
                    </span>
                  </div>

                  <button type="button" className="ppl-ios-btn" aria-label={`Follow ${person.name}`}>
                    Follow +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer line */}
        <footer className="ppl-footer" data-reveal>
          <span className="ppl-footer-line" aria-hidden="true" />
          <p>NO JUNIOR BUFFERS. NO HANDOFF MAZE. THE PEOPLE YOU MEET ARE THE PEOPLE WHO BUILD.</p>
        </footer>
      </div>
    </section>
  );
}
