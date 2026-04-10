"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AnalysisTab } from "@/components/jobs/tabs/analysis-tab";
import { ProposalTab } from "@/components/jobs/tabs/proposal-tab";
import { ProofTab } from "@/components/jobs/tabs/proof-tab";
import { ScoringTab } from "@/components/jobs/tabs/scoring-tab";
import { StrategyTab } from "@/components/jobs/tabs/strategy-tab";
import { useJob } from "@/hooks/use-job-detail";

const tabs = [
  { id: "analysis", label: "Analysis", icon: "hugeicons:ai-brain-02" },
  { id: "proposal", label: "Proposal", icon: "hugeicons:quill-write-02" },
  { id: "proof", label: "Proof Builder", icon: "hugeicons:folder-check" },
  { id: "score", label: "Score", icon: "hugeicons:chart-line-data-02" },
  { id: "strategy", label: "Strategy", icon: "hugeicons:target-02" },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface JobDetailContentProps {
  jobId: string;
}

export function JobDetailContent({ jobId }: JobDetailContentProps) {
  const [activeTab, setActiveTab] = useState<TabId>("analysis");
  const { data: job, isLoading } = useJob(jobId);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="h-4 w-32 animate-pulse rounded bg-white/[0.06]" />
        <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
          <div className="h-5 w-48 animate-pulse rounded bg-white/[0.06]" />
          <div className="mt-3 h-6 w-96 animate-pulse rounded bg-white/[0.06]" />
          <div className="mt-3 h-4 w-64 animate-pulse rounded bg-white/[0.06]" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center py-20">
        <Icon icon="hugeicons:search-circle" className="mb-3 size-12 text-zinc-600" />
        <h2 className="text-lg font-semibold text-zinc-300">Job not found</h2>
        <Link href="/jobs" className="mt-3 text-sm text-brand-400 hover:text-brand-300">
          Back to My Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Back + breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <Link
          href="/jobs"
          className="flex items-center gap-1 transition-colors hover:text-zinc-300"
        >
          <Icon icon="hugeicons:arrow-left-02" className="size-4" />
          My Jobs
        </Link>
        <span>/</span>
        <span className="text-zinc-300">Job Detail</span>
      </div>

      {/* Job header */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                UPWORK
              </span>
            </div>
            <h1 className="text-xl font-bold text-white">
              {job.title || "Untitled Job"}
            </h1>
            <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Icon icon="hugeicons:clock-01" className="size-3.5" />
                {new Date(job.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Description preview */}
        <p className="mt-4 text-sm leading-relaxed text-zinc-400 line-clamp-3">
          {job.description}
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-[#13131a] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white/[0.08] text-white shadow-sm"
                : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
            }`}
          >
            <Icon icon={tab.icon} className="size-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "analysis" && <AnalysisTab jobId={jobId} description={job.description} />}
        {activeTab === "proposal" && <ProposalTab jobId={jobId} />}
        {activeTab === "proof" && <ProofTab jobId={jobId} />}
        {activeTab === "score" && <ScoringTab jobId={jobId} />}
        {activeTab === "strategy" && <StrategyTab jobId={jobId} />}
      </div>
    </div>
  );
}
