"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <form
      className="fd-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSubscribed(true);
      }}
    >
      {subscribed ? (
        <div className="fd-form-success" role="status">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <strong>You&apos;re subscribed.</strong>
            <span>See you in your inbox soon.</span>
          </div>
        </div>
      ) : (
        <>
          <div className="fd-form-field">
            <label htmlFor="fd-news-email">Email address</label>
            <input
              id="fd-news-email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="fd-form-submit" type="submit">
            <span>Subscribe</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
      <p className="fd-form-note">
        By subscribing you agree to our <a href="#">Privacy Policy</a>.
      </p>
    </form>
  );
}
