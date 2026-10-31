import "./home.css";
import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import TechStackStrip from "@/components/TechStackStrip";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import WorkInMotionSection from "@/components/WorkInMotionSection";
import CustomerRatingsStrip from "@/components/CustomerRatingsStrip";
import PricingSection from "@/components/PricingSection";
import IdeaImpactSection from "@/components/IdeaImpactSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import IndustryUniverseSection from "@/components/IndustryUniverseSection";
import PeopleSection from "@/components/PeopleSection";
import LetsBuildSection from "@/components/LetsBuildSection";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import {
  breadcrumbNode,
  schemaGraph,
  serviceListSchema,
  webPageNode,
} from "@/lib/schema";

import AutoContactDrawer from "@/components/AutoContactDrawer";
import DualConvergeModal from "@/components/DualConvergeModal";

export const metadata: Metadata = buildMetadata({
  title: "EPIC STUDIO — Software, Mobile Apps & AI Design Studio",
  description:
    "EPIC STUDIO is a senior-only technology and design studio building enterprise software, mobile apps, AI automation, design systems, GovTech platforms and brand video.",
  path: "/",
});

const crumbs = [{ name: "Home", path: "/" }];

export default function Home() {
  return (
    <main className="site-shell">
      <JsonLd
        data={schemaGraph([
          webPageNode({
            path: "/",
            title: "EPIC STUDIO — Multidisciplinary Technology & Design Studio",
            description: SITE.description,
            crumbs,
          }),
          breadcrumbNode(crumbs, "/"),
          serviceListSchema(SERVICES),
        ])}
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

      {/* VERIFIED CLIENT RATINGS & RESPONSES MARQUEE */}
      <CustomerRatingsStrip />

      {/* HOW MUCH DOES IT COST? AFFORDABLE & LEGITIMATE PRICING */}
      <div id="pricing" />
      <PricingSection />

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

      {/* WHO BUILDS IT? */}
      <PeopleSection />

      {/* WHY START A CONVERSATION? */}
      <LetsBuildSection />
      <SiteFooter />
      <AutoContactDrawer />
      <DualConvergeModal />
    </main>
  );
}
