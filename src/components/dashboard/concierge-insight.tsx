"use client";

import { Icon } from "@iconify/react";

export function ConciergeInsight() {
  return (
    <div className="rounded-2xl border border-brand-500/20 bg-gradient-to-br from-[#13131a] to-brand-950/30 p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon icon="hugeicons:bulb" className="size-4 text-brand-400" />
        <h4 className="text-sm font-semibold text-brand-400">
          Concierge Insight
        </h4>
      </div>
      <p className="text-sm leading-relaxed text-zinc-300">
        &ldquo;Clients in the{" "}
        <span className="font-medium text-brand-400">Fintech</span> sector
        currently value security-first communication. Try emphasizing your
        compliance experience in your next 3 proposals.&rdquo;
      </p>
    </div>
  );
}
