"use client";

import { Icon } from "@iconify/react";

export function HistoryInsights() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Weekly success insight */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5">
        <h4 className="mb-2 text-sm font-semibold text-white">
          Weekly Success Insight
        </h4>
        <p className="text-xs leading-relaxed text-zinc-400">
          Your &ldquo;AI Score&rdquo; has improved by 8% this week. Proposals
          with a score above 92 see a 3.5x higher response rate on Upwork for
          mobile dev roles.
        </p>
        <div className="mt-3 flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="size-1.5 rounded-full bg-brand-400" />
            Response Rate: 24%
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="size-1.5 rounded-full bg-zinc-500" />
            Avg. Time to Send: 4.2 min
          </span>
        </div>
      </div>

      {/* Optimization tip */}
      <div className="rounded-2xl border border-brand-500/20 bg-gradient-to-br from-[#13131a] to-brand-950/30 p-5">
        <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-brand-400">
          Optimization Tip
        </h4>
        <p className="text-sm italic leading-relaxed text-zinc-300">
          &ldquo;Adding a personalized portfolio link in the first 2 sentences
          increases visibility score by +12.&rdquo;
        </p>
        <button className="mt-3 flex cursor-pointer items-center gap-1 text-xs font-medium text-brand-400 transition-colors hover:text-brand-300">
          See More Tips
          <Icon icon="hugeicons:arrow-right-02" className="size-3" />
        </button>
      </div>
    </div>
  );
}
