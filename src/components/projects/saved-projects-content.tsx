"use client";

import { ProjectsHeader } from "@/components/projects/projects-header";
import { ProjectsStats } from "@/components/projects/projects-stats";
import { ProjectsGrid } from "@/components/projects/projects-grid";

export function SavedProjectsContent() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <ProjectsHeader />
      <ProjectsStats />
      <ProjectsGrid />
    </div>
  );
}
