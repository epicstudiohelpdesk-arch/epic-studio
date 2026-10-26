"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ALL_COUNTRIES, Country, detectCountryFromPhone, getCountryByCode } from "@/data/countries";

interface PhoneInputWithCountryProps {
  id?: string;
  name?: string;
  value: string; // can be full "+91 9876543210" or local digits
  onChange: (fullPhoneNumber: string, details: { country: Country; localDigits: string; isValid: boolean }) => void;
  required?: boolean;
  disabled?: boolean;
  defaultCountryCode?: string; // e.g. "IN"
  error?: string | null;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export default function PhoneInputWithCountry({
  id = "contact-phone",
  name = "phone",
  value,
  onChange,
  required = true,
  disabled = false,
  defaultCountryCode = "IN",
  error,
  className = "",
  isOpen: controlledIsOpen,
  onToggle,
  onClose,
}: PhoneInputWithCountryProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    // If value already has a country dial code prefix, detect it
    if (value && value.trim().startsWith("+")) {
      const detected = detectCountryFromPhone(value);
      if (detected) return detected.country;
    }
    return getCountryByCode(defaultCountryCode);
  });

  const [localNumber, setLocalNumber] = useState<string>(() => {
    if (value && value.trim().startsWith("+")) {
      const detected = detectCountryFromPhone(value);
      if (detected) return detected.localDigits;
    }
    return value ? value.replace(/^\+\d+\s*/, "") : "";
  });

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isMenuOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const toggleDropdown = () => {
    if (onToggle) onToggle();
    else setInternalIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    if (onClose) onClose();
    else setInternalIsOpen(false);
    setSearchQuery("");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  // Synchronize when value changes from outside
  useEffect(() => {
    if (value && value.trim().startsWith("+")) {
      const detected = detectCountryFromPhone(value);
      if (detected && detected.country.code !== selectedCountry.code) {
        setSelectedCountry(detected.country);
        setLocalNumber(detected.localDigits);
      }
    }
  }, [value, selectedCountry.code]);

  // Click outside to close
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isMenuOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isMenuOpen]);

  // Handle local number change & paste
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;

    // Check if user pasted an international number starting with "+"
    if (rawVal.trim().startsWith("+")) {
      const detected = detectCountryFromPhone(rawVal);
      if (detected) {
        setSelectedCountry(detected.country);
        const cleanLocal = cleanPhoneDigits(detected.localDigits);
        setLocalNumber(cleanLocal);
        notifyChange(detected.country, cleanLocal);
        return;
      }
    }

    // Clean entered local number (digits, hyphens, spaces)
    const cleanLocal = cleanPhoneDigits(rawVal);
    setLocalNumber(cleanLocal);
    notifyChange(selectedCountry, cleanLocal);
  };

  // Strip non-dial characters except spaces and hyphens
  const cleanPhoneDigits = (str: string) => {
    return str.replace(/[^\d\s-]/g, "");
  };

  const notifyChange = (country: Country, digits: string) => {
    const numericOnly = digits.replace(/\D/g, "");
    const fullNumber = numericOnly ? `${country.dialCode} ${digits.trim()}` : "";
    const isValid =
      numericOnly.length >= country.minLength && numericOnly.length <= country.maxLength + 2;

    onChange(fullNumber, {
      country,
      localDigits: digits.trim(),
      isValid,
    });
  };

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    closeDropdown();

    // If local number had leading 0 for some national formats, strip it
    let updatedLocal = localNumber;
    if (updatedLocal.startsWith("0")) {
      updatedLocal = updatedLocal.replace(/^0+/, "");
      setLocalNumber(updatedLocal);
    }

    notifyChange(country, updatedLocal);
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 40);
  };

  // Filtered countries based on search query
  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return ALL_COUNTRIES;

    const queryWithoutPlus = query.replace(/^\+/, "");
    return ALL_COUNTRIES.filter((c) => {
      return (
        c.name.toLowerCase().includes(query) ||
        c.code.toLowerCase().includes(query) ||
        c.dialCode.toLowerCase().includes(query) ||
        c.dialCode.replace("+", "").includes(queryWithoutPlus)
      );
    });
  }, [searchQuery]);

  // Pinned popular countries
  const popularCountries = useMemo(() => {
    if (searchQuery.trim()) return [];
    return ALL_COUNTRIES.filter((c) => c.priority);
  }, [searchQuery]);

  return (
    <div className={`contact-phone-input-root ${className}`} ref={containerRef}>
      <div className={`contact-phone-input-shell ${isMenuOpen ? "dropdown-active" : ""} ${error ? "has-error" : ""}`}>
        {/* Country Code Selector Trigger */}
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isMenuOpen}
          aria-label={`Select country code, currently ${selectedCountry.name} (${selectedCountry.dialCode})`}
          className="contact-country-trigger"
          onClick={toggleDropdown}
          disabled={disabled}
        >
          <span className="contact-country-flag" aria-hidden="true">
            {selectedCountry.flag}
          </span>
          <span className="contact-country-dial">{selectedCountry.dialCode}</span>
          <span className={`contact-country-arrow ${isMenuOpen ? "is-open" : ""}`} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        {/* Separator Divider */}
        <span className="contact-country-divider" aria-hidden="true" />

        {/* Native Phone Number Input */}
        <input
          ref={phoneInputRef}
          id={id}
          name={name}
          type="tel"
          required={required}
          disabled={disabled}
          placeholder={selectedCountry.placeholder || "Enter phone number"}
          value={localNumber}
          onChange={handleInputChange}
          autoComplete="tel"
          className="contact-phone-native-input"
        />
      </div>

      {/* Country Selector Dropdown Menu */}
      {isMenuOpen && (
        <div className="contact-country-dropdown-menu" role="listbox" aria-label="Country list">
          {/* Search Header */}
          <div className="contact-country-search-box">
            <span className="contact-country-search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search country or dial code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="contact-country-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="contact-country-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* List of Countries */}
          <div className="contact-country-options-scroll">
            {/* Pinned popular if no search query */}
            {popularCountries.length > 0 && (
              <div className="contact-country-section">
                <div className="contact-country-section-header">Popular Countries</div>
                {popularCountries.map((c) => {
                  const isSelected = c.code === selectedCountry.code;
                  return (
                    <button
                      key={`popular-${c.code}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`contact-country-option-item ${isSelected ? "is-selected" : ""}`}
                      onClick={() => handleSelectCountry(c)}
                    >
                      <span className="contact-country-option-left">
                        <span className="contact-country-option-flag" aria-hidden="true">
                          {c.flag}
                        </span>
                        <span className="contact-country-option-name">{c.name}</span>
                      </span>
                      <span className="contact-country-option-dial">{c.dialCode}</span>
                    </button>
                  );
                })}
                <div className="contact-country-section-divider" />
              </div>
            )}

            {/* All / Filtered Countries */}
            <div className="contact-country-section">
              {popularCountries.length > 0 && (
                <div className="contact-country-section-header">All Countries</div>
              )}
              {filteredCountries.length === 0 ? (
                <div className="contact-country-empty-state">
                  No country found matching &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                filteredCountries.map((c) => {
                  const isSelected = c.code === selectedCountry.code;
                  return (
                    <button
                      key={`all-${c.code}-${c.dialCode}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`contact-country-option-item ${isSelected ? "is-selected" : ""}`}
                      onClick={() => handleSelectCountry(c)}
                    >
                      <span className="contact-country-option-left">
                        <span className="contact-country-option-flag" aria-hidden="true">
                          {c.flag}
                        </span>
                        <span className="contact-country-option-name">{c.name}</span>
                      </span>
                      <span className="contact-country-option-dial">{c.dialCode}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
