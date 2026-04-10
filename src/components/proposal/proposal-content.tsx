"use client";

import { EditorToolbar } from "@/components/proposal/editor-toolbar";
import { HookSection } from "@/components/proposal/hook-section";
import { ProposalDraft } from "@/components/proposal/proposal-draft";
import { ProposalScore } from "@/components/proposal/proposal-score";
import { AiSuggestions } from "@/components/proposal/ai-suggestions";
import { UploadPortfolio } from "@/components/proposal/upload-portfolio";
import { ProposalActionBar } from "@/components/proposal/proposal-action-bar";

export function ProposalContent() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 space-y-6">
        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Left: editor */}
          <div className="space-y-4">
            <EditorToolbar />
            <HookSection />
            <ProposalDraft />
          </div>

          {/* Right: score + suggestions */}
          <div className="space-y-4">
            <ProposalScore />
            <AiSuggestions />
            <UploadPortfolio />
          </div>
        </div>
      </div>

      <ProposalActionBar />
    </div>
  );
}
