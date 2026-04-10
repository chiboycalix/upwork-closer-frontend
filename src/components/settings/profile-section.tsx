"use client";

import type { UpdateProfilePayload } from "@/hooks/use-settings";

interface ProfileSectionProps {
  value: UpdateProfilePayload;
  onChange: (value: UpdateProfilePayload) => void;
  errors?: Record<string, string>;
}

export function ProfileSection({ value, onChange, errors = {} }: ProfileSectionProps) {
  const initials = value.fullName
    ? value.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : value.email?.charAt(0).toUpperCase() ?? "?";

  const update = (field: keyof UpdateProfilePayload, val: string) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
      <h3 className="mb-4 text-sm font-semibold text-white">Profile</h3>
      <div className="flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white">
          {initials}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">
            {value.fullName || "Set your name"}
          </p>
          <p className="text-xs text-zinc-500">{value.email}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Full Name
          </label>
          <input
            type="text"
            value={value.fullName ?? ""}
            onChange={(e) => update("fullName", e.target.value)}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 focus:border-brand-500/40 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Email Address
          </label>
          <input
            type="email"
            value={value.email ?? ""}
            onChange={(e) => update("email", e.target.value)}
            className={`rounded-lg border bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 focus:outline-none ${
              errors.email
                ? "border-red-500/50 focus:border-red-500/60"
                : "border-white/[0.06] focus:border-brand-500/40"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Upwork Profile URL
          </label>
          <input
            type="url"
            value={value.upworkProfileUrl ?? ""}
            onChange={(e) => update("upworkProfileUrl", e.target.value)}
            placeholder="https://upwork.com/freelancers/..."
            className={`rounded-lg border bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 focus:outline-none ${
              errors.upworkProfileUrl
                ? "border-red-500/50 focus:border-red-500/60"
                : "border-white/[0.06] focus:border-brand-500/40"
            }`}
          />
          {errors.upworkProfileUrl && (
            <p className="text-xs text-red-400">{errors.upworkProfileUrl}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Timezone
          </label>
          <select
            value={value.timezone ?? ""}
            onChange={(e) => update("timezone", e.target.value)}
            className="cursor-pointer rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 focus:border-brand-500/40 focus:outline-none"
          >
            <option value="">Select timezone</option>
            <option value="EST (UTC-5)">EST (UTC-5)</option>
            <option value="CST (UTC-6)">CST (UTC-6)</option>
            <option value="MST (UTC-7)">MST (UTC-7)</option>
            <option value="PST (UTC-8)">PST (UTC-8)</option>
            <option value="GMT (UTC+0)">GMT (UTC+0)</option>
            <option value="CET (UTC+1)">CET (UTC+1)</option>
            <option value="IST (UTC+5:30)">IST (UTC+5:30)</option>
            <option value="WAT (UTC+1)">WAT (UTC+1)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
