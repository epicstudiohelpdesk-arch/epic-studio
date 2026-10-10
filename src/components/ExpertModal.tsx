"use client";

import React, { useEffect } from "react";
import ContactPage from "./ContactPage";

interface ExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpertModal({ isOpen, onClose }: ExpertModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="expert-modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="compact-modal-inner-wrap"
        onClick={(e) => e.stopPropagation()}
      >
        <ContactPage onClose={onClose} isModalView={true} />
      </div>
    </div>
  );
}
