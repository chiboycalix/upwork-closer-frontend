"use client";

import { Icon } from "@iconify/react";

export function HistoryPagination() {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-zinc-500">
        Showing <span className="font-medium text-zinc-300">1-10</span> of{" "}
        <span className="font-medium text-zinc-300">1,284</span> proposals
      </p>
      <div className="flex items-center gap-1">
        <button className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] text-zinc-500 transition-colors hover:bg-white/[0.04]">
          <Icon icon="hugeicons:arrow-left-02" className="size-3.5" />
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`flex size-8 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-colors ${
              page === 1
                ? "bg-brand-500 text-white"
                : "border border-white/[0.06] text-zinc-400 hover:bg-white/[0.04]"
            }`}
          >
            {page}
          </button>
        ))}
        <button className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] text-zinc-500 transition-colors hover:bg-white/[0.04]">
          <Icon icon="hugeicons:arrow-right-02" className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
