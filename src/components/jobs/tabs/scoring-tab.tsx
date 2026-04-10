"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  useProposals,
  useScoreProposal,
  type ScoreResult,
} from "@/hooks/use-job-detail";

interface ScoringTabProps {
  jobId: string;
}

export function ScoringTab({ jobId }: ScoringTabProps) {
  const { data: proposals, isLoading } = useProposals(jobId);
  const scoreProposal = useScoreProposal();
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  const isScoring = scoreProposal.isPending;

  const handleScore = (proposalId: string) => {
    scoreProposal.mutate(
      { proposalId },
      { onSuccess: (data) => setScoreResult(data) },
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-4 size-10 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        <p className="text-sm text-zinc-400">Loading…</p>
      </div>
    );
  }

  if (!proposals || proposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon icon="hugeicons:chart-line-data-02" className="mb-3 size-10 text-zinc-600" />
        <p className="mb-1 text-sm text-zinc-400">No proposals to score yet.</p>
        <p className="text-xs text-zinc-500">
          Generate a proposal first, then come back to score it.
        </p>
      </div>
    );
  }

  const result = scoreResult;
  const score = result?.score ?? 0;
  const maxScore = 100;
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (score / maxScore) * circumference;

  return (
    <div className="space-y-6">
      {/* Proposal selector + score trigger */}
      {!result && !isScoring && (
        <div className="space-y-4">
          <p className="text-sm text-zinc-400">
            Select a proposal to score with AI:
          </p>
          {proposals.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-[#13131a] p-5"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  Proposal #{i + 1}{" "}
                  <span className="text-xs text-zinc-500">({p.tone})</span>
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-zinc-400">
                  {p.content.slice(0, 150)}…
                </p>
              </div>
              <button
                onClick={() => handleScore(p.id)}
                className="ml-4 shrink-0 cursor-pointer rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2 text-xs font-semibold text-white"
              >
                Score This
              </button>
            </div>
          ))}
        </div>
      )}

      {isScoring && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-4 size-10 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          <p className="text-sm text-zinc-400">AI is scoring your proposal…</p>
        </div>
      )}

      {result && (
        <>
          {/* Score header */}
          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            {/* Score gauge */}
            <div className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-[#13131a] p-8">
              <div className="relative size-40">
                <svg className="size-full -rotate-90" viewBox="0 0 140 140">
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="url(#scoringGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                  />
                  <defs>
                    <linearGradient id="scoringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#15d5c3" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">{score}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    out of {maxScore}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setScoreResult(null)}
                className="mt-6 cursor-pointer text-xs font-medium text-brand-400 hover:text-brand-300"
              >
                Score another proposal
              </button>
            </div>

            {/* Feedback + Weaknesses */}
            <div className="space-y-4">
              {/* Feedback / Strengths */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Icon
                    icon="hugeicons:checkmark-circle-02"
                    className="size-4 text-emerald-400"
                  />
                  <h3 className="text-sm font-semibold text-emerald-400">
                    Feedback
                  </h3>
                  <span className="ml-auto rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                    {result.feedback.length} items
                  </span>
                </div>
                <div className="space-y-2.5">
                  {result.feedback.map((s, i) => (
                    <div key={i} className="flex gap-2.5">
                      <div className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                      <span className="text-sm text-zinc-300">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weaknesses */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Icon
                    icon="hugeicons:alert-02"
                    className="size-4 text-amber-400"
                  />
                  <h3 className="text-sm font-semibold text-amber-400">
                    Weaknesses
                  </h3>
                  <span className="ml-auto rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                    {result.weaknesses.length} found
                  </span>
                </div>
                <div className="space-y-2.5">
                  {result.weaknesses.map((w, i) => (
                    <div key={i} className="flex gap-2.5">
                      <div className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-400" />
                      <span className="text-sm text-zinc-300">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Improvements */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon icon="hugeicons:arrow-up-02" className="size-4 text-brand-400" />
              <h3 className="text-sm font-semibold text-white">
                How to Improve Your Score
              </h3>
            </div>
            <div className="space-y-3">
              {result.improvements.map((imp, i) => (
                <div key={i} className="flex gap-3">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-[10px] font-bold text-brand-400">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-zinc-300">{imp}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
