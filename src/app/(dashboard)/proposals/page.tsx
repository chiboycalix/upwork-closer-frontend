import type { Metadata } from "next";
import { ProposalHistoryContent } from "@/components/history/proposal-history-content";

export const metadata: Metadata = {
  title: "Proposal History | UpworkCloser",
};

export default function ProposalHistoryPage() {
  return <ProposalHistoryContent />;
}
