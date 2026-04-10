import type { Metadata } from "next";
import { ProposalContent } from "@/components/proposal/proposal-content";

export const metadata: Metadata = {
  title: "Proposal Generator | UpworkCloser",
};

export default function ProposalPage() {
  return <ProposalContent />;
}
