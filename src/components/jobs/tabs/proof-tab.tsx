"use client";

import { Icon } from "@iconify/react";
import { useProofIdeas, useGenerateProof } from "@/hooks/use-job-detail";

interface ProofTabProps {
  jobId: string;
}

export function ProofTab({ jobId }: ProofTabProps) {
  const { data: proofIdeas, isLoading } = useProofIdeas(jobId);
  const generateProof = useGenerateProof();

  const isGenerating = generateProof.isPending;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-4 size-10 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        <p className="text-sm text-zinc-400">Loading proof ideas…</p>
      </div>
    );
  }

  if ((!proofIdeas || proofIdeas.length === 0) && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon icon="hugeicons:folder-check" className="mb-3 size-10 text-zinc-600" />
        <p className="mb-1 text-sm text-zinc-400">No proof ideas generated yet.</p>
        <p className="mb-4 text-xs text-zinc-500">
          Let AI suggest portfolio projects tailored to this job.
        </p>
        <button
          onClick={() => generateProof.mutate({ jobId })}
          className="cursor-pointer rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Generate Proof Ideas
        </button>
      </div>
    );
  }

  const projects = proofIdeas ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            <Icon icon="hugeicons:folder-check" className="size-4 text-brand-400" />
            AI-Generated Proof Ideas
          </span>
          <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand-400">
            {projects.length} PROJECTS
          </span>
        </div>
        <button
          onClick={() => generateProof.mutate({ jobId })}
          disabled={isGenerating}
          className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-brand-400 transition-colors hover:text-brand-300 disabled:opacity-50"
        >
          <Icon icon="hugeicons:refresh" className={`size-3.5 ${isGenerating ? "animate-spin" : ""}`} />
          {isGenerating ? "Generating…" : "Regenerate Ideas"}
        </button>
      </div>

      <p className="text-sm text-zinc-400">
        These are portfolio projects you can quickly build or reference to prove
        your expertise for this specific job.
      </p>

      {/* Project cards */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6"
          >
            <div className="mb-4">
              <h3 className="mb-2 text-base font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {project.description}
              </p>
            </div>

            {/* Why it helps */}
            <div className="mb-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <Icon
                  icon="hugeicons:checkmark-circle-02"
                  className="size-4 text-emerald-400"
                />
                <span className="text-xs font-semibold text-emerald-400">
                  Why This Helps
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {project.whyItHelps}
              </p>
            </div>

            {/* Demo suggestion */}
            <div className="rounded-xl border border-violet-500/10 bg-violet-500/5 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <Icon
                  icon="hugeicons:play-circle"
                  className="size-4 text-violet-400"
                />
                <span className="text-xs font-semibold text-violet-400">
                  Demo Suggestion
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {project.demoSuggestion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
