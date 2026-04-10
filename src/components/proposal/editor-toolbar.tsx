"use client";

import { Icon } from "@iconify/react";

export function EditorToolbar() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
      <div className="flex items-center gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Editing Mode
        </span>
        <div className="flex items-center gap-1">
          <button className="cursor-pointer rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            <Icon icon="hugeicons:text-bold" className="size-4" />
          </button>
          <button className="cursor-pointer rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            <Icon icon="hugeicons:text-italic" className="size-4" />
          </button>
          <button className="cursor-pointer rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            <Icon icon="hugeicons:left-to-right-list-bullet" className="size-4" />
          </button>
        </div>
      </div>
      <button className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-brand-400 transition-colors hover:text-brand-300">
        <Icon icon="hugeicons:refresh" className="size-3.5" />
        Regenerate
      </button>
    </div>
  );
}
