"use client";

export function ProjectsStats() {
  const stats = [
    { label: "Total Saved", value: "24" },
    { label: "Analyzed", value: "18" },
    { label: "Proposals Sent", value: "12" },
    { label: "Win Rate", value: "67%" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-white/[0.06] bg-[#13131a] px-4 py-3 text-center"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            {s.label}
          </p>
          <p className="mt-0.5 text-xl font-bold text-white">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
