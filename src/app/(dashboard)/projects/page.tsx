import type { Metadata } from "next";
import { SavedProjectsContent } from "@/components/projects/saved-projects-content";

export const metadata: Metadata = {
  title: "Saved Projects | UpworkCloser",
};

export default function SavedProjectsPage() {
  return <SavedProjectsContent />;
}
