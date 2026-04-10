"use client";

import { Icon } from "@iconify/react";

export function JobAnalysisCard() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          New Job Analysis
        </h3>
        <span className="flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand-400">
          <span className="size-1.5 rounded-full bg-brand-400" />
          GPT-4o ACTIVE
        </span>
      </div>

      {/* Textarea */}
      <textarea
        placeholder="Paste the Upwork job description here to analyze the client's needs and generate a winning response..."
        rows={4}
        className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-brand-500/30 focus:outline-none"
      />

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex cursor-pointer items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300">
            <Icon icon="hugeicons:attachment-01" className="size-3.5" />
            Attach Context
          </button>
          <button className="flex cursor-pointer items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300">
            <Icon icon="hugeicons:settings-02" className="size-3.5" />
            Select Tone
          </button>
        </div>
        <button className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400">
          Analyze Job
          <Icon icon="hugeicons:arrow-right-02" className="size-4" />
        </button>
      </div>
    </div>
  );
}
