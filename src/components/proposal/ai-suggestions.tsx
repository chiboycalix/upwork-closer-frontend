"use client";

import { Icon } from "@iconify/react";

const suggestions = [
  {
    icon: "hugeicons:checkmark-circle-02",
    iconColor: "text-emerald-400",
    title: "Add project proof",
    description:
      "Mention a specific GitHub repo or live URL for this tech stack.",
  },
  {
    icon: "hugeicons:flash",
    iconColor: "text-amber-400",
    title: "Stronger CTA",
    description:
      "Suggest a quick 10-min discovery call to discuss their API issues.",
  },
  {
    icon: "hugeicons:search-circle",
    iconColor: "text-violet-400",
    title: "Relevance Check",
    description:
      "Tech stack alignment is 100% accurate for this job.",
  },
];

export function AiSuggestions() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5">
      <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        AI Suggestions
      </h4>
      <div className="space-y-4">
        {suggestions.map((s) => (
          <div key={s.title} className="flex gap-3">
            <Icon icon={s.icon} className={`mt-0.5 size-4 shrink-0 ${s.iconColor}`} />
            <div>
              <p className="text-sm font-medium text-zinc-200">{s.title}</p>
              <p className="text-xs leading-relaxed text-zinc-500">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
