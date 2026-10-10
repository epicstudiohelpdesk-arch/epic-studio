"use client";

import React, { useState, useEffect, useRef } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: string) => void;
}

const SEARCH_CATEGORIES = [
  { label: "Services", count: 18, icon: "⚡" },
  { label: "Solutions", count: 10, icon: "🎯" },
  { label: "Industries", count: 16, icon: "🏛️" },
  { label: "Projects", count: 24, icon: "💼" },
  { label: "Articles", count: 42, icon: "📖" },
  { label: "Downloads", count: 8, icon: "📥" },
];

const QUICK_ACTIONS = [
  { name: "Book Consultation", desc: "Schedule a 30-min strategy session", action: "consultation", icon: "📅" },
  { name: "Request Proposal", desc: "Get a detailed estimate & timeline", action: "proposal", icon: "📑" },
  { name: "Download Company Profile", desc: "Get our 2026 capabilities deck (PDF)", action: "profile", icon: "📥" },
  { name: "Start Project", desc: "Initiate immediate onboarding", action: "start", icon: "🚀" },
];

const INDEXED_ITEMS = [
  { type: "Divisions", name: "EPIC Engineering", desc: "Enterprise software, web apps, SaaS, ERP, CRM, APIs", link: "#engineering" },
  { type: "Divisions", name: "EPIC AI", desc: "AI automation, chatbots, ML models, intelligent agents", link: "#ai" },
  { type: "Divisions", name: "EPIC Cloud", desc: "DevOps, infrastructure, cloud migration, monitoring", link: "#cloud" },
  { type: "Divisions", name: "EPIC GovTech", desc: "Citizen platforms, government digital infrastructure", link: "#govtech" },
  { type: "Solutions", name: "Launch a Startup", desc: "End-to-end MVP, brand, tech stack and scale planning", link: "#startup" },
  { type: "Solutions", name: "Enterprise Modernization", desc: "Legacy refactoring & cloud-native migration", link: "#modernize" },
  { type: "Solutions", name: "Digital Transformation", desc: "Full-scale corporate tech overhaul and AI adoption", link: "#transformation" },
  { type: "Industries", name: "Government & Public Sector", desc: "Digital citizen portals & secure infrastructure", link: "#gov" },
  { type: "Industries", name: "Healthcare & MedTech", desc: "HIPAA compliant telehealth & medical software", link: "#health" },
  { type: "Work", name: "West Bengal Education Platform", desc: "Scaling digital learning to 2.4M students", link: "#work-wb" },
  { type: "Insights", name: "How AI is Transforming Public Services", desc: "Research paper on agentic AI for governance", link: "#article-ai" },
];

export default function SearchModal({ isOpen, onClose, onSelectAction }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Handled at parent level or toggle
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = query.trim()
    ? INDEXED_ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Input Bar */}
        <div className="search-modal-header">
          <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search EPIC (Divisions, Solutions, Projects, Insights...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="esc-key" onClick={onClose}>ESC</kbd>
        </div>

        <div className="search-modal-body">
          {query.trim() !== "" ? (
            <div className="search-results-section">
              <h4 className="modal-section-title">Search Results ({filteredItems.length})</h4>
              {filteredItems.length > 0 ? (
                <div className="results-list">
                  {filteredItems.map((item, idx) => (
                    <a href={item.link} key={idx} className="result-item" onClick={onClose}>
                      <span className="result-type-badge">{item.type}</span>
                      <div className="result-info">
                        <strong>{item.name}</strong>
                        <p>{item.desc}</p>
                      </div>
                      <span className="result-arrow">→</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <p>No matches found for "{query}"</p>
                  <span>Try searching for "GovTech", "AI", "Engineering", or "Startup"</span>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Category Links */}
              <div className="modal-section">
                <h4 className="modal-section-title">Explore Categories</h4>
                <div className="category-pill-grid">
                  {SEARCH_CATEGORIES.map((cat) => (
                    <button
                      key={cat.label}
                      className="cat-pill-btn"
                      onClick={() => setQuery(cat.label)}
                    >
                      <span className="cat-icon">{cat.icon}</span>
                      <span className="cat-name">{cat.label}</span>
                      <span className="cat-count">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="modal-divider" />

              {/* Quick Actions */}
              <div className="modal-section">
                <h4 className="modal-section-title">Quick Actions</h4>
                <div className="quick-actions-grid">
                  {QUICK_ACTIONS.map((act) => (
                    <button
                      key={act.name}
                      className="quick-action-card"
                      onClick={() => {
                        onSelectAction(act.action);
                        onClose();
                      }}
                    >
                      <span className="action-icon">{act.icon}</span>
                      <div className="action-meta">
                        <strong>{act.name}</strong>
                        <small>{act.desc}</small>
                      </div>
                      <span className="action-arrow">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="search-modal-footer">
          <span>Tip: Press <kbd>Cmd</kbd> + <kbd>K</kbd> anytime to open EPIC Search</span>
          <span className="search-footer-brand">EPIC STUDIO SEARCH v2.6</span>
        </div>
      </div>
    </div>
  );
}
