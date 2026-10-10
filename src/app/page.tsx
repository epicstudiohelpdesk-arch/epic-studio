import "./home.css";
import HeroSection from "@/components/HeroSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import TechStackStrip from "@/components/TechStackStrip";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import WorkInMotionSection from "@/components/WorkInMotionSection";
import IdeaImpactSection from "@/components/IdeaImpactSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import IndustryUniverseSection from "@/components/IndustryUniverseSection";
import GlanceSection from "@/components/GlanceSection";
import EditorialWorkSection from "@/components/EditorialWorkSection";
import PeopleSection from "@/components/PeopleSection";
import LetsBuildSection from "@/components/LetsBuildSection";
import SiteFooter from "@/components/SiteFooter";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://epic.studio";

const jsonLdNavigation = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "SiteNavigationElement",
      position: 1,
      name: "Software & Product Engineering",
      url: `${siteUrl}/#capabilities`,
      description: "Full-Stack Web & SaaS, enterprise software solutions, scalable APIs, and backend architectures.",
    },
    {
      "@type": "SiteNavigationElement",
      position: 2,
      name: "Mobile App Development",
      url: `${siteUrl}/#mobile`,
      description: "High-performance native iOS, Android, and cross-platform mobile apps engineered for fluid 60fps UI.",
    },
    {
      "@type": "SiteNavigationElement",
      position: 3,
      name: "Video Editing & Motion Production",
      url: `${siteUrl}/#creative`,
      description: "Cinematic commercial video editing, brand post-production, 3D motion design, and visual effects (VFX).",
    },
    {
      "@type": "SiteNavigationElement",
      position: 4,
      name: "UI/UX Design & Brand Systems",
      url: `${siteUrl}/#who-we-are`,
      description: "Award-winning design systems, human-centered UI/UX product interfaces, and interactive 3D web experiences.",
    },
    {
      "@type": "SiteNavigationElement",
      position: 5,
      name: "AI Engineering & Cloud Automation",
      url: `${siteUrl}/#ai`,
      description: "Enterprise AI workflows, custom LLM integrations, automated pipelines, and cloud DevOps infrastructure.",
    },
    {
      "@type": "SiteNavigationElement",
      position: 6,
      name: "Talk with Expert & Strategy",
      url: `${siteUrl}/contact`,
      description: "Schedule a direct technical strategy consultation with principal software architects and creative directors.",
    },
    {
      "@type": "SiteNavigationElement",
      position: 7,
      name: "Domain Search & Registration",
      url: `${siteUrl}/domains`,
      description: "Instant live domain name search, WHOIS privacy protection, and one-click Anycast DNS delegation.",
    },
  ],
};

const jsonLdBreadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Software & Mobile Development",
      item: `${siteUrl}/#capabilities`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Video Editing & Creative Production",
      item: `${siteUrl}/#creative`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact Studio",
      item: `${siteUrl}/contact`,
    },
  ],
};

export default function Home() {
  return (
    <main className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdNavigation) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />

      {/* WHAT IS EPIC? */}
      <HeroSection />
      <WhoWeAreSection />
      <TechStackStrip />

      {/* WHAT CAN EPIC DO? */}
      <div id="capabilities">
        <CapabilitiesSection />
      </div>

      {/* WHAT DOES EPIC CREATE? */}
      <div id="mobile" />
      <div id="creative" />
      <WorkInMotionSection />

      {/* WHAT CHANGES BECAUSE OF EPIC? */}
      <div id="ai" />
      <div id="cloud" />
      <IdeaImpactSection />

      {/* WHAT DOES EPIC BELIEVE? */}
      <PrinciplesSection />

      {/* WHERE DOES EPIC OPERATE? */}
      <div id="govtech">
        <IndustryUniverseSection />
      </div>

      {/* HOW IS EPIC STRUCTURED? */}
      <GlanceSection />

      {/* WHAT HAS EPIC BUILT? */}
      <EditorialWorkSection />

      {/* WHO BUILDS IT? */}
      <PeopleSection />

      {/* WHY START A CONVERSATION? */}
      <LetsBuildSection />
      <SiteFooter />
    </main>
  );
}
