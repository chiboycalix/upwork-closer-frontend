"use client";

import { Icon } from "@iconify/react";

export function ProjectsHeader() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Saved Projects</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Bookmarked job postings and analysis results you want to revisit.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <select className="cursor-pointer rounded-lg border border-white/[0.06] bg-transparent px-3 py-1.5 text-xs text-zinc-400 focus:border-brand-500/40 focus:outline-none">
          <option>All Projects</option>
          <option>Favorites</option>
          <option>Archived</option>
        </select>
        <select className="cursor-pointer rounded-lg border border-white/[0.06] bg-transparent px-3 py-1.5 text-xs text-zinc-400 focus:border-brand-500/40 focus:outline-none">
          <option>Newest First</option>
          <option>Highest Score</option>
          <option>Alphabetical</option>
        </select>
      </div>
    </div>
  );
}
