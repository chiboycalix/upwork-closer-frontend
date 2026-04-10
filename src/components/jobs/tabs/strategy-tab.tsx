"use client";

import { Icon } from "@iconify/react";
import { useStrategy, useCreateStrategy } from "@/hooks/use-job-detail";

/** Safely flatten AI response into string[] — handles string[], object values, or a plain string */
function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => (typeof v === "string" ? v : JSON.stringify(v)));
  if (typeof value === "string") return [value];
  if (value && typeof value === "object") return Object.values(value).map((v) => (typeof v === "string" ? v : JSON.stringify(v)));
  return [];
}

interface StrategyTabProps {
  jobId: string;
}

export function StrategyTab({ jobId }: StrategyTabProps) {
  const { data: strategy, isLoading } = useStrategy(jobId);
  const createStrategy = useCreateStrategy();

  const isGenerating = createStrategy.isPending;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-4 size-10 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        <p className="text-sm text-zinc-400">Loading strategy…</p>
      </div>
    );
  }

  if (!strategy && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon icon="hugeicons:target-02" className="mb-3 size-10 text-zinc-600" />
        <p className="mb-1 text-sm text-zinc-400">No strategy generated yet.</p>
        <p className="mb-4 text-xs text-zinc-500">
          Let AI create a winning strategy for this job.
        </p>
        <button
          onClick={() => createStrategy.mutate({ jobId })}
          className="cursor-pointer rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Generate Strategy
        </button>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-4 size-10 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        <p className="text-sm text-zinc-400">AI is crafting your strategy…</p>
      </div>
    );
  }

  if (!strategy) return null;

  return (
    <div className="space-y-6">
      {/* Positioning angle banner */}
      <div className="rounded-2xl border border-brand-500/20 bg-gradient-to-br from-[#13131a] to-brand-950/30 p-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="hugeicons:target-02" className="size-5 text-brand-400" />
            <h3 className="text-sm font-semibold text-brand-400">
              Your Positioning Angle
            </h3>
          </div>
          <button
            onClick={() => createStrategy.mutate({ jobId })}
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-brand-400 transition-colors hover:text-brand-300"
          >
            <Icon icon="hugeicons:refresh" className="size-3.5" />
            Regenerate
          </button>
        </div>
        <p className="text-sm leading-relaxed text-zinc-300">
          {typeof strategy.positioningAngle === "string" ? strategy.positioningAngle : JSON.stringify(strategy.positioningAngle)}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* How to win */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Icon icon="hugeicons:trophy" className="size-4 text-brand-400" />
            <h3 className="text-sm font-semibold text-white">How to Win</h3>
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            {typeof strategy.howToWin === "string" ? strategy.howToWin : JSON.stringify(strategy.howToWin)}
          </p>
        </div>

        {/* What to avoid */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Icon icon="hugeicons:cancel-circle" className="size-4 text-red-400" />
            <h3 className="text-sm font-semibold text-white">What to Avoid</h3>
          </div>
          <div className="space-y-3">
            {toStringArray(strategy.whatToAvoid).map((tip, i) => (
              <div key={i} className="flex gap-3">
                <Icon
                  icon="hugeicons:remove-circle"
                  className="mt-0.5 size-4 shrink-0 text-red-400/60"
                />
                <p className="text-sm leading-relaxed text-zinc-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What to emphasize */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Icon icon="hugeicons:star" className="size-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">What to Emphasize</h3>
        </div>
        <div className="space-y-3">
          {toStringArray(strategy.whatToEmphasize).map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-[10px] font-bold text-brand-400">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-zinc-300">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
