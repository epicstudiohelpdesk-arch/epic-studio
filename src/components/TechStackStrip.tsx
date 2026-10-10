"use client";

import React from "react";
import LogoLoop, { LogoItem } from "./LogoLoop";
import "./TechStackStrip.css";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiPython,
  SiPytorch,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiGo,
  SiRust,
  SiCloudflare,
  SiTerraform,
  SiFigma,
  SiSwift,
  SiTailwindcss,
  SiSupabase,
} from "react-icons/si";

interface TechBrand {
  name: string;
  icon: React.ReactNode;
  url: string;
}

const enterpriseStack: TechBrand[] = [
  { name: "Next.js", icon: <SiNextdotjs />, url: "https://nextjs.org" },
  { name: "TypeScript", icon: <SiTypescript />, url: "https://www.typescriptlang.org" },
  { name: "React", icon: <SiReact />, url: "https://react.dev" },
  { name: "Python", icon: <SiPython />, url: "https://www.python.org" },
  { name: "PyTorch", icon: <SiPytorch />, url: "https://pytorch.org" },
  { name: "Google Cloud", icon: <SiGooglecloud />, url: "https://cloud.google.com" },
  { name: "Docker", icon: <SiDocker />, url: "https://www.docker.com" },
  { name: "Kubernetes", icon: <SiKubernetes />, url: "https://kubernetes.io" },
  { name: "PostgreSQL", icon: <SiPostgresql />, url: "https://www.postgresql.org" },
  { name: "Redis", icon: <SiRedis />, url: "https://redis.io" },
  { name: "GraphQL", icon: <SiGraphql />, url: "https://graphql.org" },
  { name: "Go", icon: <SiGo />, url: "https://go.dev" },
  { name: "Rust", icon: <SiRust />, url: "https://www.rust-lang.org" },
  { name: "Cloudflare", icon: <SiCloudflare />, url: "https://www.cloudflare.com" },
  { name: "Terraform", icon: <SiTerraform />, url: "https://www.terraform.io" },
  { name: "Figma", icon: <SiFigma />, url: "https://www.figma.com" },
  { name: "Swift", icon: <SiSwift />, url: "https://developer.apple.com/swift/" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, url: "https://tailwindcss.com" },
  { name: "Supabase", icon: <SiSupabase />, url: "https://supabase.com" },
];

export default function TechStackStrip() {
  const logos: LogoItem[] = enterpriseStack.map((item) => ({
    title: item.name,
    href: item.url,
    node: (
      <span className="mono-brand-item">
        <span className="mono-brand-icon" aria-hidden="true">
          {item.icon}
        </span>
        <span className="mono-brand-name">{item.name}</span>
      </span>
    ),
  }));

  return (
    <div className="mono-strip-wrapper" aria-label="Technology Stack and Infrastructure Ecosystem">
      <div className="mono-strip-inner">
        
        {/* Left static metadata collar */}
        <div className="mono-strip-label-col">
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mono-strip-icon"
            aria-hidden="true"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span className="mono-strip-kicker">CORE STACK</span>
          <span className="mono-strip-divider" aria-hidden="true" />
        </div>

        {/* Quiet monochrome slow-drift marquee */}
        <div className="mono-strip-marquee-col">
          <LogoLoop
            logos={logos}
            speed={42}
            direction="left"
            gap={56}
            logoHeight={44}
            hoverSpeed={0}
            scaleOnHover={false}
            fadeOut
            fadeOutColor="#f8f9fa"
            ariaLabel="Enterprise frameworks and cloud infrastructure"
          />
        </div>

      </div>
    </div>
  );
}
