"use client";

import type { UpdatePreferencesPayload } from "@/hooks/use-settings";

const notifications = [
  {
    label: "Proposal sent confirmation",
    description: "Get notified when a proposal is successfully submitted",
    key: "notifyProposalSent" as const,
  },
  {
    label: "Weekly performance report",
    description: "Receive a summary of your proposal stats every Monday",
    key: "notifyWeeklyReport" as const,
  },
  {
    label: "AI score alerts",
    description: "Alert when a proposal scores below 80%",
    key: "notifyAiScoreAlerts" as const,
  },
  {
    label: "New job match notifications",
    description: "Get notified when jobs match your saved preferences",
    key: "notifyJobMatches" as const,
  },
];

interface NotificationsSectionProps {
  value: UpdatePreferencesPayload;
  onChange: (value: UpdatePreferencesPayload) => void;
}

export function NotificationsSection({ value, onChange }: NotificationsSectionProps) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
      <h3 className="mb-4 text-sm font-semibold text-white">Notifications</h3>
      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.label}
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-zinc-200">{n.label}</p>
              <p className="text-xs text-zinc-600">{n.description}</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={!!value[n.key]}
                onChange={(e) =>
                  onChange({ ...value, [n.key]: e.target.checked })
                }
                className="peer sr-only"
              />
              <div className="h-5 w-9 rounded-full bg-white/[0.08] transition-colors after:absolute after:left-[2px] after:top-[2px] after:size-4 after:rounded-full after:bg-zinc-400 after:transition-all peer-checked:bg-brand-500 peer-checked:after:translate-x-full peer-checked:after:bg-white" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
