"use client";

export function HistoryStats() {
  return (
    <div className="flex gap-3">
      <div className="rounded-xl border border-white/[0.06] bg-[#13131a] px-5 py-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Total Sent
        </p>
        <p className="text-2xl font-bold text-white">1,284</p>
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-[#13131a] px-5 py-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Avg. AI Score
        </p>
        <p className="text-2xl font-bold text-brand-400">94.2%</p>
      </div>
    </div>
  );
}
