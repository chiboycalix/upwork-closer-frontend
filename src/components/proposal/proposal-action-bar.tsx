"use client";

import { Icon } from "@iconify/react";

const tones = ["Formal", "Confident", "Friendly"];

export function ProposalActionBar() {
  return (
    <div className="sticky bottom-0 z-10 flex items-center justify-between border-t border-white/[0.06] bg-[#0a0a0f]/90 px-6 py-3 backdrop-blur-md">
      {/* Left: tone selector */}
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Adjust Tone
        </span>
        <div className="flex gap-1">
          {tones.map((tone, i) => (
            <button
              key={tone}
              className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                i === 0
                  ? "bg-white text-black"
                  : "border border-white/[0.08] text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        <button className="cursor-pointer text-xs font-medium text-zinc-300 transition-colors hover:text-white">
          Save Draft
        </button>
        <button className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400">
          <Icon icon="hugeicons:copy-01" className="size-4" />
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}
