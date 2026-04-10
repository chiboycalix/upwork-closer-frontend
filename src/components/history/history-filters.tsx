"use client";

import { Icon } from "@iconify/react";

export function HistoryFilters() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white">
          <Icon icon="hugeicons:filter" className="size-3.5" />
          Filters
        </button>
        <select className="cursor-pointer rounded-lg border border-white/[0.06] bg-transparent px-3 py-1.5 text-xs text-zinc-400 focus:border-brand-500/40 focus:outline-none">
          <option>All Categories</option>
        </select>
        <select className="cursor-pointer rounded-lg border border-white/[0.06] bg-transparent px-3 py-1.5 text-xs text-zinc-400 focus:border-brand-500/40 focus:outline-none">
          <option>Last 30 Days</option>
        </select>
        <select className="cursor-pointer rounded-lg border border-white/[0.06] bg-transparent px-3 py-1.5 text-xs text-zinc-400 focus:border-brand-500/40 focus:outline-none">
          <option>Score: All</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button className="cursor-pointer text-xs text-zinc-500 transition-colors hover:text-zinc-300">
          Clear All
        </button>
        <button className="cursor-pointer rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white">
          Export CSV
        </button>
      </div>
    </div>
  );
}
