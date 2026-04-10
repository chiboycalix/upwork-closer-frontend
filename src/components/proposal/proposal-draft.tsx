"use client";

export function ProposalDraft() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        Full Proposal Draft
      </p>
      <div className="space-y-4 text-sm leading-relaxed text-zinc-300">
        <p>Hi there,</p>
        <p>
          Your requirement for a Senior Backend Engineer to optimize your
          current AWS stack perfectly aligns with my expertise. I specialize in
          Node.js performance tuning and database optimization.
        </p>
        <p>
          In my recent project for a logistics firm, I reduced their monthly
          cloud spend by 35% while improving response times by 200ms through
          strategic caching and query restructuring.
        </p>
        <p>I would approach your project in three phases:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <span className="font-medium text-white">Phase 1</span>: Deep audit
            of existing bottlenecks.
          </li>
          <li>
            <span className="font-medium text-white">Phase 2</span>:
            Implementation of Redis-based caching layers.
          </li>
          <li>
            <span className="font-medium text-white">Phase 3</span>: Final
            stress testing and documentation.
          </li>
        </ul>
        <p>
          I am confident that we can get your MVP ready for the next round of
          funding by end of month.
        </p>
        <p>Looking forward to discussing this further.</p>
        <p>
          Best regards,
          <br />
          Alex
        </p>
      </div>
    </div>
  );
}
