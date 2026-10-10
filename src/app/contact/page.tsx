import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Talk with Expert & Architecture Consultation | EPIC STUDIO",
  description:
    "Schedule a 30-minute direct strategy consultation with EPIC STUDIO's principal architects or submit a detailed technical project brief for software engineering, AI systems, GovTech, and cloud infrastructure.",
  openGraph: {
    title: "Talk with Expert & Technical Consultation | EPIC STUDIO",
    description:
      "Direct senior technical director access, zero sales gatekeepers, 2-hour SLA response commitment, and mutual NDA protection for enterprise software initiatives.",
  },
};

export default function Contact() {
  return <ContactPage isModalView={false} />;
}
