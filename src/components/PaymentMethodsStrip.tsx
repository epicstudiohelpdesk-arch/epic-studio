"use client";

import React from "react";
import { SiVisa, SiApplepay, SiGooglepay } from "react-icons/si";
import "./payment-methods.css";

interface PaymentMethodsStripProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export default function PaymentMethodsStrip({
  variant = "desktop",
  className = "",
}: PaymentMethodsStripProps) {
  return (
    <div
      className={`fd-payments-strip ${variant === "mobile" ? "is-mobile" : ""} ${className}`.trim()}
      aria-label="Accepted payment options and secure checkout methods"
    >
      <div className="fd-payments-caption">
        {/* Subtle Green Verified Shield */}
        <svg
          className="fd-payments-lock"
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <span className="fd-payments-text">We accept all major cards &amp; secure payments</span>
      </div>

      <div className="fd-payment-badges" role="list" aria-label="Supported payment providers">
        {/* Visa */}
        <span className="fd-payment-badge" title="Visa" role="listitem">
          <SiVisa className="fd-payment-icon fd-payment-icon-visa" aria-hidden="true" />
          <span className="sr-only">Visa</span>
        </span>

        {/* Mastercard */}
        <span className="fd-payment-badge" title="Mastercard" role="listitem">
          <svg
            className="fd-payment-icon fd-payment-icon-mastercard"
            viewBox="0 0 28 17"
            width="26"
            height="16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="9" cy="8.5" r="7.5" fill="#EB001B" />
            <circle cx="19" cy="8.5" r="7.5" fill="#F79E1B" fillOpacity="0.9" />
            <path
              d="M14 3.7a7.5 7.5 0 0 0 0 9.6 7.5 7.5 0 0 0 0-9.6z"
              fill="#FF5F00"
            />
          </svg>
          <span className="sr-only">Mastercard</span>
        </span>

        {/* American Express */}
        <span className="fd-payment-badge fd-payment-badge-amex" title="American Express" role="listitem">
          <svg
            className="fd-payment-icon fd-payment-icon-amex"
            viewBox="0 0 34 18"
            width="30"
            height="16"
            fill="none"
            aria-hidden="true"
          >
            <rect width="34" height="18" rx="2.5" fill="#006FCF" />
            <text
              x="17"
              y="12.5"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="7.5"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.8"
            >
              AMEX
            </text>
          </svg>
          <span className="sr-only">American Express</span>
        </span>

        {/* Apple Pay */}
        <span className="fd-payment-badge" title="Apple Pay" role="listitem">
          <SiApplepay className="fd-payment-icon fd-payment-icon-apple" aria-hidden="true" />
          <span className="sr-only">Apple Pay</span>
        </span>

        {/* Google Pay */}
        <span className="fd-payment-badge" title="Google Pay" role="listitem">
          <SiGooglepay className="fd-payment-icon fd-payment-icon-gpay" aria-hidden="true" />
          <span className="sr-only">Google Pay</span>
        </span>

        {/* UPI */}
        <span className="fd-payment-badge fd-payment-badge-upi" title="Unified Payments Interface (UPI)" role="listitem">
          <svg
            className="fd-payment-icon fd-payment-icon-upi"
            viewBox="0 0 38 18"
            width="34"
            height="16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 14.5L8.5 9L4 3.5h3.8l4.5 5.5-4.5 5.5H4z" fill="#097939" />
            <path d="M10 14.5l4.5-5.5-4.5-5.5h3.8l4.5 5.5-4.5 5.5H10z" fill="#F37021" />
            <text
              x="23"
              y="13"
              fill="#ffffff"
              fontSize="10"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.4"
            >
              UPI
            </text>
          </svg>
          <span className="sr-only">UPI</span>
        </span>

        {/* Wire / Bank Transfer */}
        <span className="fd-payment-badge fd-payment-badge-wire" title="Bank Wire &amp; NetBanking" role="listitem">
          <svg
            className="fd-payment-icon fd-payment-icon-wire"
            viewBox="0 0 42 18"
            width="38"
            height="16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 13h9v1.5H4V13zm1-2h7v1H5v-1zm1-4.5h1.2v3.5H6V6.5zm3 0h1.2v3.5H9V6.5zm-4.5 0h1.2v3.5H4.5V6.5zm10 0h1.2v3.5h-1.2V6.5zm-6-3L15 6H2l6.5-2.5z"
              fill="#ffffff"
              fillOpacity="0.9"
            />
            <text
              x="19"
              y="12"
              fill="#ffffff"
              fontSize="7"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.6"
            >
              WIRE
            </text>
          </svg>
          <span className="sr-only">Bank Wire Transfer</span>
        </span>
      </div>
    </div>
  );
}
