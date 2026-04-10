"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  useProposals,
  useGenerateProposal,
} from "@/hooks/use-job-detail";

const tones = ["Formal", "Confident", "Friendly"] as const;

interface ProposalTabProps {
  jobId: string;
}

export function ProposalTab({ jobId }: ProposalTabProps) {
  const [activeTone, setActiveTone] =
    useState<(typeof tones)[number]>("Confident");
  const { data: proposals, isLoading } = useProposals(jobId);
  const generateProposal = useGenerateProposal();

  const latestProposal = proposals?.[0];
  const [draft, setDraft] = useState("");

  // Sync draft when data arrives
  const displayDraft = draft || latestProposal?.content || "";

  const isGenerating = generateProposal.isPending;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-4 size-10 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        <p className="text-sm text-zinc-400">Loading proposals…</p>
      </div>
    );
  }

  if (!latestProposal && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon icon="hugeicons:quill-write-02" className="mb-3 size-10 text-zinc-600" />
        <p className="mb-1 text-sm text-zinc-400">No proposal generated yet.</p>
        <p className="mb-4 text-xs text-zinc-500">
          Choose a tone and let AI write your proposal.
        </p>
        <div className="mb-4 flex items-center gap-2">
          {tones.map((tone) => (
            <button
              key={tone}
              onClick={() => setActiveTone(tone)}
              className={`cursor-pointer rounded-full px-3 py-1 text-[10px] font-medium transition-colors ${
                activeTone === tone
                  ? "bg-white text-black"
                  : "border border-white/[0.08] text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
        <button
          onClick={() =>
            generateProposal.mutate({
              jobId,
              tone: activeTone.toLowerCase(),
            })
          }
          className="cursor-pointer rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Generate Proposal
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isGenerating && (
        <div className="flex items-center gap-3 rounded-xl border border-brand-500/20 bg-brand-500/5 px-4 py-3">
          <div className="size-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          <p className="text-sm text-brand-400">Generating proposal…</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Left: editor */}
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Editing Mode
              </span>
            </div>
            <button
              onClick={() =>
                generateProposal.mutate({
                  jobId,
                  tone: activeTone.toLowerCase(),
                })
              }
              disabled={isGenerating}
              className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-brand-400 transition-colors hover:text-brand-300 disabled:opacity-50"
            >
              <Icon icon="hugeicons:refresh" className="size-3.5" />
              Regenerate
            </button>
          </div>

          {/* Draft editor */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Full Proposal Draft
              </p>
              <div className="flex items-center gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setActiveTone(tone)}
                    className={`cursor-pointer rounded-full px-3 py-1 text-[10px] font-medium transition-colors ${
                      activeTone === tone
                        ? "bg-white text-black"
                        : "border border-white/[0.08] text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={displayDraft}
              onChange={(e) => setDraft(e.target.value)}
              rows={18}
              className="w-full resize-none bg-transparent text-sm leading-relaxed text-zinc-300 placeholder:text-zinc-600 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => navigator.clipboard.writeText(displayDraft)}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400"
            >
              <Icon icon="hugeicons:copy-01" className="size-4" />
              Copy to Clipboard
            </button>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Tone info */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5">
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Current Tone
            </h4>
            <p className="text-sm font-semibold text-white">{latestProposal?.tone || activeTone}</p>
            <p className="mt-1 text-xs text-zinc-500">
              Switch tones above and regenerate to get a different style.
            </p>
          </div>

          {/* Proposal count */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5">
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Versions Generated
            </h4>
            <p className="text-2xl font-bold text-white">{proposals?.length ?? 0}</p>
            <p className="mt-1 text-xs text-zinc-500">
              Each regeneration creates a new version.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
