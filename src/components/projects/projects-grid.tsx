"use client";

import { Icon } from "@iconify/react";

interface Project {
  title: string;
  platform: string;
  budget: string;
  score: number;
  savedDate: string;
  tags: string[];
  icon: string;
  iconBg: string;
  status: "analyzed" | "draft" | "proposed";
}

const statusStyles: Record<Project["status"], string> = {
  analyzed: "border-brand-500/20 bg-brand-500/10 text-brand-400",
  draft: "border-zinc-500/20 bg-zinc-500/10 text-zinc-400",
  proposed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
};

const projects: Project[] = [
  {
    title: "Senior Full-Stack Developer for SaaS Fintech Integration",
    platform: "UPWORK",
    budget: "Fixed Price · $15,000",
    score: 96,
    savedDate: "Oct 24, 2023",
    tags: ["React/Next.js", "Stripe", "Node.js"],
    icon: "hugeicons:source-code",
    iconBg: "#2563eb",
    status: "proposed",
  },
  {
    title: "Mobile App Redesign for Health & Wellness Startup",
    platform: "TOPTAL",
    budget: "Hourly · $120/hr",
    score: 89,
    savedDate: "Oct 22, 2023",
    tags: ["React Native", "Figma", "UI/UX"],
    icon: "hugeicons:smart-phone-01",
    iconBg: "#059669",
    status: "analyzed",
  },
  {
    title: "Backend API Development with GraphQL & PostgreSQL",
    platform: "UPWORK",
    budget: "Fixed Price · $8,000",
    score: 93,
    savedDate: "Oct 20, 2023",
    tags: ["GraphQL", "PostgreSQL", "Docker"],
    icon: "hugeicons:database",
    iconBg: "#d97706",
    status: "draft",
  },
  {
    title: "E-commerce Platform Migration to Next.js 14",
    platform: "LINKEDIN",
    budget: "Contract · $10,000/mo",
    score: 91,
    savedDate: "Oct 18, 2023",
    tags: ["Next.js", "Shopify", "TypeScript"],
    icon: "hugeicons:shopping-cart-01",
    iconBg: "#7c3aed",
    status: "proposed",
  },
  {
    title: "AI-Powered Customer Support Chatbot Integration",
    platform: "UPWORK",
    budget: "Fixed Price · $6,500",
    score: 87,
    savedDate: "Oct 16, 2023",
    tags: ["OpenAI", "Python", "FastAPI"],
    icon: "hugeicons:ai-brain-02",
    iconBg: "#0891b2",
    status: "analyzed",
  },
  {
    title: "Real-time Dashboard for IoT Sensor Data",
    platform: "TOPTAL",
    budget: "Hourly · $95/hr",
    score: 84,
    savedDate: "Oct 14, 2023",
    tags: ["WebSockets", "D3.js", "AWS"],
    icon: "hugeicons:chart-line-data-01",
    iconBg: "#dc2626",
    status: "draft",
  },
];

export function ProjectsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <div
          key={p.title}
          className="group rounded-2xl border border-white/[0.06] bg-[#13131a] p-5 transition-colors hover:border-white/[0.1]"
        >
          {/* Top row */}
          <div className="mb-3 flex items-start justify-between">
            <div
              className="flex size-10 items-center justify-center rounded-xl"
              style={{ background: p.iconBg }}
            >
              <Icon icon={p.icon} className="size-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${statusStyles[p.status]}`}
              >
                {p.status}
              </span>
              <button className="cursor-pointer rounded-md p-1 text-zinc-600 transition-colors hover:text-zinc-300">
                <Icon icon="hugeicons:bookmark-02" className="size-4" />
              </button>
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-1 text-sm font-semibold leading-snug text-zinc-200 line-clamp-2">
            {p.title}
          </h3>

          {/* Platform + budget */}
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              {p.platform}
            </span>
            <span className="text-xs text-zinc-600">{p.budget}</span>
          </div>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/[0.04] bg-white/[0.02] px-2 py-0.5 text-[10px] text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/[0.04] pt-3">
            <span className="text-[10px] text-zinc-600">
              Saved {p.savedDate}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-brand-400">
                {p.score}%
              </span>
              <span className="text-[10px] text-zinc-600">AI Score</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
