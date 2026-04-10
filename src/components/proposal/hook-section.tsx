"use client";

import { Icon } from "@iconify/react";

export function HookSection() {
  return (
    <div className="rounded-xl border-l-4 border-brand-500 bg-gradient-to-r from-brand-500/5 to-transparent p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="hugeicons:magic-wand-01" className="size-4 text-brand-400" />
          <span className="text-sm font-semibold text-white">The Hook</span>
        </div>
        <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand-400">
          HIGH CONVERSION
        </span>
      </div>
      <p className="text-sm font-medium leading-relaxed text-zinc-200">
        &ldquo;I noticed your project involves scaling a high-traffic fintech
        API. Having architected similar systems for Series A startups that
        handled 5M+ requests daily, I can ensure your infrastructure remains
        resilient and cost-effective.&rdquo;
      </p>
    </div>
  );
}
