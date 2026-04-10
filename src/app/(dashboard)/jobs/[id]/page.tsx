import type { Metadata } from "next";
import { JobDetailContent } from "@/components/jobs/job-detail-content";

export const metadata: Metadata = {
  title: "Job Detail | UpworkCloser",
};

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <JobDetailContent jobId={id} />;
}
