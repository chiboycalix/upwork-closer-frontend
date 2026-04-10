"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { notify } from "@/lib/notification-store";
import { useCreateJob } from "@/hooks/use-jobs";

export function JobInputCard() {
  const router = useRouter();
  const createJob = useCreateJob();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit() {
    if (!description.trim()) {
      notify.error("Missing description", "Please paste a job description.");
      return;
    }
    if (description.trim().length < 20) {
      notify.error(
        "Too short",
        "Job description must be at least 20 characters."
      );
      return;
    }

    createJob.mutate(
      {
        title: title.trim() || undefined,
        description: description.trim(),
      },
      {
        onSuccess: (job) => {
          notify.success("Job created", "AI is now analyzing the job posting.");
          setTitle("");
          setDescription("");
          router.push(`/jobs/${job.id}`);
        },
        onError: () => {
          notify.error("Failed", "Could not create the job. Please try again.");
        },
      }
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#13131a] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">
          Analyze a New Job
        </h3>
        <span className="flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand-400">
          <span className="size-1.5 rounded-full bg-brand-400" />
          AI Ready
        </span>
      </div>

      {/* Optional title */}
      <input
        type="text"
        placeholder="Job title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3 w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-brand-500/30 focus:outline-none"
      />

      {/* Description */}
      <textarea
        placeholder="Paste the Upwork job description here..."
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-brand-500/30 focus:outline-none"
      />

      {/* Actions */}
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={handleSubmit}
          disabled={createJob.isPending}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400 disabled:opacity-50"
        >
          {createJob.isPending ? "Analyzing..." : "Analyze Job"}
          {!createJob.isPending && (
            <Icon icon="hugeicons:arrow-right-02" className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
