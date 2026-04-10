import type { Metadata } from "next";
import { JobsListContent } from "@/components/jobs/jobs-list-content";

export const metadata: Metadata = {
  title: "My Jobs | UpworkCloser",
};

export default function JobsPage() {
  return <JobsListContent />;
}
