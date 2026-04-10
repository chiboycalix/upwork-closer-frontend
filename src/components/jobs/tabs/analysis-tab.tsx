"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAnalysis, useCreateAnalysis } from "@/hooks/use-job-detail";

interface AnalysisTabProps {
  jobId: string;
  description: string;
}

export function AnalysisTab({ jobId, description }: AnalysisTabProps) {
  const { data: analysis, isLoading } = useAnalysis(jobId);
  const createAnalysis = useCreateAnalysis();

  useEffect(() => {
    if (!isLoading && !analysis && !createAnalysis.isPending) {
      createAnalysis.mutate({ jobId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, analysis, jobId]);

  const isGenerating = createAnalysis.isPending;

  if (isLoading || isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-4 size-10 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        <p className="text-sm text-zinc-400">
          {isGenerating ? "AI is analyzing the job posting…" : "Loading analysis…"}
        </p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon icon="hugeicons:ai-brain-02" className="mb-3 size-10 text-zinc-600" />
        <p className="text-sm text-zinc-400">No analysis available.</p>
        <button
          onClick={() => createAnalysis.mutate({ jobId })}
          className="mt-3 cursor-pointer rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2 text-sm font-semibold text-white"
        >
          Run Analysis
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Confidence badge */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          <Icon icon="hugeicons:ai-brain-02" className="size-4 text-brand-400" />
          AI Analysis Insights
        </span>
        <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand-400">
          GENERATED
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left column */}
        <div className="space-y-4">
          {/* Job description */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Job Description</h3>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-400">
              {description}
            </p>
          </div>

          {/* Key requirements */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Key Requirements</h3>
            <div className="space-y-2">
              {analysis.keyRequirements.map((req) => (
                <div key={req} className="flex items-center gap-2.5">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500/10">
                    <Icon icon="hugeicons:checkmark-circle-02" className="size-3.5 text-brand-400" />
                  </div>
                  <span className="text-sm text-zinc-300">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden expectations */}
          {analysis.hiddenExpectations.length > 0 && (
            <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-[#13131a] to-amber-950/10 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Icon icon="hugeicons:alert-02" className="size-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-amber-400">Hidden Expectations</h3>
              </div>
              <ul className="space-y-2 text-sm text-zinc-400">
                {analysis.hiddenExpectations.map((exp, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 text-amber-500">•</span>
                    {exp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Client intent */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand-500/10">
                <Icon icon="hugeicons:target-02" className="size-5 text-brand-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Client Intent
                </p>
                <p className="text-sm font-semibold text-white">{analysis.clientType}</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">{analysis.clientIntent}</p>
          </div>

          {/* Budget signal */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <Icon icon="hugeicons:money-send-square" className="size-5 text-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Budget Signal
                </p>
                <p className="text-sm font-semibold text-white">{analysis.budgetSignal}</p>
              </div>
            </div>
          </div>

          {/* Urgency */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-red-500/10">
                <Icon icon="hugeicons:clock-01" className="size-5 text-red-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Urgency Level
                </p>
                <p className="text-sm font-semibold capitalize text-white">{analysis.urgencyLevel}</p>
              </div>
            </div>
          </div>

          {/* Quick strategy */}
          <div className="rounded-2xl border border-brand-500/20 bg-gradient-to-br from-[#13131a] to-brand-950/30 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Icon icon="hugeicons:bulb" className="size-4 text-brand-400" />
              <h4 className="text-sm font-semibold text-brand-400">Quick Strategy</h4>
            </div>
            <p className="text-sm leading-relaxed text-zinc-300">{analysis.winStrategy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
