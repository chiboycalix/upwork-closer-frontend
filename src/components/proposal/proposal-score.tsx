"use client";

export function ProposalScore() {
  const score = 85;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Proposal Score
        </h4>
        <span className="flex size-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
          i
        </span>
      </div>

      {/* Circular gauge */}
      <div className="flex flex-col items-center">
        <div className="relative size-28">
          <svg className="size-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#15d5c3" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{score}%</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Optimized
            </span>
          </div>
        </div>

        {/* Sub-scores */}
        <div className="mt-4 grid w-full grid-cols-2 gap-3">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Readability
            </p>
            <p className="text-sm font-semibold text-brand-400">High</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Personalization
            </p>
            <p className="text-sm font-semibold text-brand-400">Great</p>
          </div>
        </div>
      </div>
    </div>
  );
}
