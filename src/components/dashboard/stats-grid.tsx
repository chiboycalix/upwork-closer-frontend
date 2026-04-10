"use client";

import { Icon } from "@iconify/react";
import type { DashboardStats } from "@/hooks/use-jobs";

interface StatCardProps {
  icon: string;
  iconBg: string;
  label: string;
  value: string;
  sub?: string;
  badge?: string;
  badgeColor?: string;
  progress?: number;
}

function StatCard({
  icon,
  iconBg,
  label,
  value,
  sub,
  badge,
  badgeColor = "text-brand-400",
  progress,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div
          className="flex size-9 items-center justify-center rounded-xl"
          style={{ background: iconBg }}
        >
          <Icon icon={icon} className="size-4 text-white" />
        </div>
        {badge && (
          <span className={`text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">
        {value}
        {sub && <span className="ml-1 text-sm font-normal text-zinc-500">{sub}</span>}
      </p>
      {progress !== undefined && (
        <div className="mt-3 h-1 w-full rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-brand-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5">
      <div className="mb-3 h-9 w-9 animate-pulse rounded-xl bg-white/[0.06]" />
      <div className="h-3 w-24 animate-pulse rounded bg-white/[0.06]" />
      <div className="mt-2 h-7 w-16 animate-pulse rounded bg-white/[0.06]" />
    </div>
  );
}

interface StatsGridProps {
  stats: DashboardStats | null;
  isLoading: boolean;
}

export function StatsGrid({ stats, isLoading }: StatsGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  const avgScoreDisplay = stats?.avgScore !== null && stats?.avgScore !== undefined
    ? (stats.avgScore / 10).toFixed(1)
    : "—";
  const avgScoreProgress = stats?.avgScore ?? 0;

  return (
    <div className="grid gap-4">
      <StatCard
        icon="hugeicons:document-02"
        iconBg="#2563eb"
        label="Proposals Generated"
        value={String(stats?.totalProposals ?? 0)}
      />
      <StatCard
        icon="hugeicons:star"
        iconBg="#7c3aed"
        label="Avg Quality Score"
        value={avgScoreDisplay}
        sub="/ 10"
        progress={avgScoreProgress}
      />
      <StatCard
        icon="hugeicons:briefcase-01"
        iconBg="#dc2626"
        label="Total Jobs"
        value={String(stats?.totalJobs ?? 0)}
      />
    </div>
  );
}
