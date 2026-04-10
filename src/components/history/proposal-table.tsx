"use client";

import { Icon } from "@iconify/react";

type StatusVariant = "sent" | "draft" | "declined";

const statusStyles: Record<StatusVariant, string> = {
  sent: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  draft: "border-zinc-500/20 bg-zinc-500/10 text-zinc-400",
  declined: "border-red-500/20 bg-red-500/10 text-red-400",
};

interface ProposalRow {
  title: string;
  platform: string;
  type: string;
  icon: string;
  iconBg: string;
  status: StatusVariant;
  score: number;
  date: string;
  time: string;
}

const proposals: ProposalRow[] = [
  {
    title: "Senior Product Designer for Fintech Mobile App",
    platform: "UPWORK",
    type: "Fixed Price · $5,000",
    icon: "hugeicons:paint-brush-01",
    iconBg: "#7c3aed",
    status: "sent",
    score: 98,
    date: "Oct 24, 2023",
    time: "10:14 AM",
  },
  {
    title: "Creative Illustration Pack for SaaS Landing Page",
    platform: "TOPTAL",
    type: "Hourly · $85/hr",
    icon: "hugeicons:edit-02",
    iconBg: "#dc2626",
    status: "draft",
    score: 72,
    date: "Oct 23, 2023",
    time: "04:05 PM",
  },
  {
    title: "React Dashboard Development with D3.js Visualization",
    platform: "UPWORK",
    type: "Fixed Price · $12,000",
    icon: "hugeicons:source-code",
    iconBg: "#2563eb",
    status: "sent",
    score: 91,
    date: "Oct 21, 2023",
    time: "09:30 AM",
  },
  {
    title: "AI Content Strategist for Tech Publication",
    platform: "LINKEDIN",
    type: "Full-time Contract",
    icon: "hugeicons:ai-brain-02",
    iconBg: "#7c3aed",
    status: "declined",
    score: 95,
    date: "Oct 19, 2023",
    time: "11:15 AM",
  },
];

export function ProposalTable() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a]">
      {/* Header */}
      <div className="grid grid-cols-[1fr_100px_80px_120px_80px] items-center gap-4 border-b border-white/[0.06] px-5 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Job Title & Platform
        </span>
        <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Status
        </span>
        <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          AI Score
        </span>
        <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Date Sent
        </span>
        <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Actions
        </span>
      </div>

      {/* Rows */}
      {proposals.map((p) => (
        <div
          key={p.title}
          className="grid grid-cols-[1fr_100px_80px_120px_80px] items-center gap-4 border-b border-white/[0.04] px-5 py-4 transition-colors last:border-0 hover:bg-white/[0.02]"
        >
          {/* Title + platform */}
          <div className="flex items-center gap-3">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-lg"
              style={{ background: p.iconBg }}
            >
              <Icon icon={p.icon} className="size-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-200">
                {p.title}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                  {p.platform}
                </span>
                <span className="text-xs text-zinc-600">{p.type}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex justify-center">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyles[p.status]}`}
            >
              {p.status}
            </span>
          </div>

          {/* Score */}
          <div className="flex justify-center">
            <span className="flex size-8 items-center justify-center rounded-full border border-brand-500/20 text-xs font-bold text-brand-400">
              {p.score}
            </span>
          </div>

          {/* Date */}
          <div className="text-center">
            <p className="text-xs text-zinc-300">{p.date}</p>
            <p className="text-[10px] text-zinc-600">{p.time}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-center">
            <button className="cursor-pointer rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-300">
              <Icon icon="hugeicons:more-vertical" className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
