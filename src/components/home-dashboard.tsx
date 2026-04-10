"use client";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/store/use-counter-store";

type AppStatus = {
  message: string;
  fetchedAt: string;
};

async function fetchAppStatus(): Promise<AppStatus> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    message: "TanStack Query is connected and running.",
    fetchedAt: new Date().toLocaleTimeString(),
  };
}

export function HomeDashboard() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["app-status"],
    queryFn: fetchAppStatus,
  });

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-8 px-6 py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">State Setup</h1>
        <p className="text-muted-foreground">
          Zustand manages local state while TanStack Query handles async server
          state.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border border-border p-5">
        <h2 className="text-lg font-medium">Zustand Counter</h2>
        <p className="text-4xl font-semibold tabular-nums">{count}</p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={decrement} variant="outline">
            Decrement
          </Button>
          <Button onClick={increment}>Increment</Button>
          <Button onClick={reset} variant="secondary">
            Reset
          </Button>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border p-5">
        <h2 className="text-lg font-medium">TanStack Query Status</h2>
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Loading..." : data?.message}
        </p>
        <p className="text-sm text-muted-foreground">
          Last fetched: {data?.fetchedAt ?? "-"}
        </p>
        <div className="flex items-center gap-3">
          <Button onClick={() => void refetch()} variant="outline">
            Refetch
          </Button>
          {isFetching ? (
            <span className="text-xs text-muted-foreground">Refreshing...</span>
          ) : null}
        </div>
      </section>
    </div>
  );
}