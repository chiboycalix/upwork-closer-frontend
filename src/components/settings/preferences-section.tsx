"use client";

import type { UpdatePreferencesPayload } from "@/hooks/use-settings";

const preferences = [
  {
    label: "Default Tone",
    description: "Tone used when generating proposals",
    options: ["Formal", "Confident", "Friendly", "Technical"],
    key: "defaultTone" as const,
  },
  {
    label: "AI Model",
    description: "Choose the AI model for analysis and generation",
    options: ["GPT-4o", "GPT-4", "GPT-3.5 Turbo"],
    key: "aiModel" as const,
  },
  {
    label: "Default Platform",
    description: "Primary freelancing platform",
    options: ["Upwork", "Toptal", "LinkedIn", "All"],
    key: "defaultPlatform" as const,
  },
];

interface PreferencesSectionProps {
  value: UpdatePreferencesPayload;
  onChange: (value: UpdatePreferencesPayload) => void;
}

export function PreferencesSection({ value, onChange }: PreferencesSectionProps) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
      <h3 className="mb-4 text-sm font-semibold text-white">
        AI & Proposal Preferences
      </h3>
      <div className="space-y-5">
        {preferences.map((pref) => (
          <div
            key={pref.label}
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-zinc-200">{pref.label}</p>
              <p className="text-xs text-zinc-600">{pref.description}</p>
            </div>
            <select
              value={(value[pref.key] as string) ?? pref.options[0]}
              onChange={(e) =>
                onChange({ ...value, [pref.key]: e.target.value })
              }
              className="cursor-pointer rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-300 focus:border-brand-500/40 focus:outline-none"
            >
              {pref.options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
