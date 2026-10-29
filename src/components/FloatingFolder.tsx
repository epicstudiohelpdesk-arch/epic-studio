"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Folder from "./Folder";

export default function FloatingFolder() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastValue = false;
    const heroEl = document.querySelector(
      ".hero-section, .hero, header + section, main > section:first-of-type"
    );

    // High-performance IntersectionObserver avoids synchronous reflows on mobile scroll
    if (heroEl && typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(
        ([entry]) => {
          const shouldShow = !entry.isIntersecting;
          if (shouldShow !== lastValue) {
            lastValue = shouldShow;
            setIsVisible(shouldShow);
          }
        },
        { rootMargin: "-45% 0px 0px 0px" }
      );
      io.observe(heroEl);
      return () => io.disconnect();
    }

    // Passive fallback for browsers without IntersectionObserver
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const next = window.scrollY > 400;
        if (next !== lastValue) {
          lastValue = next;
          setIsVisible(next);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const folderItems = [
    <Link href="/" key="work" className="folder-paper-item" aria-label="Selected Work">
      <span className="folder-paper-icon">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      </span>
      <span className="folder-paper-label">Work</span>
    </Link>,
    <Link href="/domains" key="domains" className="folder-paper-item" aria-label="Domain Registry">
      <span className="folder-paper-icon">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </span>
      <span className="folder-paper-label">Domains</span>
    </Link>,
    <Link href="/#contact" key="contact" className="folder-paper-item" aria-label="Contact Studio">
      <span className="folder-paper-icon">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </span>
      <span className="folder-paper-label">Contact</span>
    </Link>,
  ];

  if (isAdmin) return null;

  return (
    <aside
      className={`floating-folder-root ${isVisible ? "visible" : ""}`}
      aria-label="Quick Access Folder"
      aria-hidden={!isVisible}
    >
      <div className="floating-folder-container">
        <Folder
          size={1}
          color="#082fe6"
          items={folderItems}
          className="custom-floating-folder"
        />
      </div>
    </aside>
  );
}
