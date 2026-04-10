"use client";

import { JobInputCard } from "@/components/dashboard/job-input-card";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ConciergeInsight } from "@/components/dashboard/concierge-insight";
import { useDashboardStats, useJobs } from "@/hooks/use-jobs";
import { useUserProfile } from "@/hooks/use-settings";

export function DashboardContent() {
  const { data: profile } = useUserProfile();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: jobs, isLoading: jobsLoading } = useJobs();

  const firstName = profile?.fullName?.split(" ")[0] || "there";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Hero */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Ready to win your next job, {firstName}?
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Paste a job description to analyze, generate a proposal, and build
          proof — all AI-powered.
        </p>
      </div>

      {/* Two-column grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Left column */}
        <div className="space-y-6">
          <JobInputCard />
          <RecentActivity jobs={jobs ?? []} isLoading={jobsLoading} />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <StatsGrid stats={stats ?? null} isLoading={statsLoading} />
          <ConciergeInsight />
        </div>
      </div>
    </div>
  );
}
