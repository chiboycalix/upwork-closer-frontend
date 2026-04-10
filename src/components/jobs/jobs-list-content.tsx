"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useJobs } from "@/hooks/use-jobs";

export function JobsListContent() {
  const { data: jobs, isLoading } = useJobs();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Jobs</h1>
          <p className="mt-1 text-sm text-zinc-400">
            All your analyzed job postings and their current status.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400"
        >
          <Icon icon="hugeicons:add-01" className="size-3.5" />
          New Analysis
        </Link>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="h-4 w-16 animate-pulse rounded bg-white/[0.06]" />
                <div className="h-4 w-14 animate-pulse rounded-full bg-white/[0.06]" />
              </div>
              <div className="mb-1.5 h-4 w-full animate-pulse rounded bg-white/[0.06]" />
              <div className="mb-3 h-3 w-1/2 animate-pulse rounded bg-white/[0.06]" />
              <div className="mb-4 flex gap-1.5">
                <div className="h-5 w-16 animate-pulse rounded-md bg-white/[0.06]" />
                <div className="h-5 w-14 animate-pulse rounded-md bg-white/[0.06]" />
              </div>
              <div className="border-t border-white/[0.04] pt-3">
                <div className="h-3 w-24 animate-pulse rounded bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
      ) : !jobs || jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-[#13131a] py-20 text-center">
          <Icon icon="hugeicons:briefcase-01" className="mb-3 size-12 text-zinc-600" />
          <h3 className="text-lg font-semibold text-zinc-300">No jobs yet</h3>
          <p className="mt-1 max-w-sm text-sm text-zinc-500">
            Paste a job description on the dashboard to create your first analysis.
          </p>
          <Link
            href="/"
            className="mt-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400"
          >
            <Icon icon="hugeicons:add-01" className="size-3.5" />
            Analyze a Job
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => {
            const hasProposal = job.proposalCount > 0;
            const status = hasProposal ? "proposal" : "analyzed";
            const statusStyle = hasProposal
              ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
              : "border-brand-500/20 bg-brand-500/10 text-brand-400";

            return (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="group rounded-2xl border border-white/[0.06] bg-[#13131a] p-5 transition-all hover:border-white/[0.1] hover:bg-[#15151d]"
              >
                {/* Top */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                    UPWORK
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${statusStyle}`}
                  >
                    {status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-1.5 text-sm font-semibold leading-snug text-zinc-200 line-clamp-2">
                  {job.title || job.description.slice(0, 80)}
                </h3>
                <p className="mb-3 text-xs text-zinc-600 line-clamp-2">
                  {job.description.slice(0, 120)}
                  {job.description.length > 120 ? "…" : ""}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-white/[0.04] pt-3">
                  <span className="text-[10px] text-zinc-600">
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {job.latestScore !== null && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-brand-400">
                        {job.latestScore}%
                      </span>
                      <span className="text-[10px] text-zinc-600">score</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
