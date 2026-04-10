"use client";

export function UploadPortfolio() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-5">
      <h4 className="mb-1 text-sm font-semibold text-white">
        Want a 95% score?
      </h4>
      <p className="mb-3 text-xs leading-relaxed text-zinc-500">
        Upload your portfolio PDF to let the AI reference specific case studies.
      </p>
      <button className="w-full cursor-pointer rounded-lg border border-white/[0.08] bg-white/[0.03] py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white">
        Upload Portfolio
      </button>
    </div>
  );
}
