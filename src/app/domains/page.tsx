import type { Metadata } from "next";
import DomainSearchPage from "@/components/domains/DomainSearchPage";

export const metadata: Metadata = {
  title: "Domain Search & Registration | EPIC STUDIO",
  description:
    "Instant live domain availability checks, transparent 1st year and renewal pricing, AI brandable suggestions, and one-click Anycast DNS delegation across 500+ TLDs.",
  openGraph: {
    title: "Domain Name Search & Instant Registration | EPIC STUDIO",
    description:
      "Find and register your enterprise domain with zero hidden markup, free WHOIS Privacy Guard forever, and instant 1-click cloud DNS.",
  },
};

export default function DomainsPage() {
  return <DomainSearchPage />;
}
