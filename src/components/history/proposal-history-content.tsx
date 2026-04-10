"use client";

import { HistoryStats } from "@/components/history/history-stats";
import { HistoryFilters } from "@/components/history/history-filters";
import { ProposalTable } from "@/components/history/proposal-table";
import { HistoryPagination } from "@/components/history/history-pagination";
import { HistoryInsights } from "@/components/history/history-insights";

export function ProposalHistoryContent() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Proposal History</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Track, analyze, and optimize your outreach performance across all
            platforms.
          </p>
        </div>
        <HistoryStats />
      </div>

      {/* Filters */}
      <HistoryFilters />

      {/* Table */}
      <ProposalTable />

      {/* Pagination */}
      <HistoryPagination />

      {/* Insights */}
      <HistoryInsights />
    </div>
  );
}
