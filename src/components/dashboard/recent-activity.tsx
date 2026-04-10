"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import type { JobListItem } from "@/hooks/use-jobs";

interface RecentActivityProps {
  jobs: JobListItem[];
  isLoading: boolean;
}

export function RecentActivity({ jobs, isLoading }: RecentActivityProps) {
  const recentJobs = jobs.slice(0, 5);

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Recent Jobs</h3>
        <Link
          href="/jobs"
          className="text-xs font-medium text-brand-400 transition-colors hover:text-brand-300"
        >
          View All
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5">
              <div className="size-8 animate-pulse rounded-lg bg-white/[0.06]" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 w-3/4 animate-pulse rounded bg-white/[0.06]" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
      ) : recentJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Icon icon="hugeicons:briefcase-01" className="mb-2 size-8 text-zinc-600" />
          <p className="text-sm text-zinc-400">No jobs yet</p>
          <p className="text-xs text-zinc-600">
            Paste a job description above to get started.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {recentJobs.map((job) => {
            const hasProposal = job.proposalCount > 0;
            const statusText = hasProposal ? "Proposal" : "Analyzed";
            const statusColor = hasProposal ? "text-amber-400" : "text-brand-400";

            return (
              <li key={job.id}>
                <Link
                  href={`/jobs/${job.id}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#2563eb]">
                    <Icon icon="hugeicons:source-code" className="size-3.5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-200">
                      {job.title || job.description.slice(0, 60) + "…"}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(job.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {job.latestScore !== null && ` · Score: ${job.latestScore}%`}
                    </p>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${statusColor}`}>
                    {statusText}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
