"use client";

import { QueryProvider } from "@/providers/query-provider";
import { NotificationContainer } from "@/components/shared/notification";
import { TooltipProvider } from "@/components/ui/tooltip";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <TooltipProvider>
        {children}
        <NotificationContainer />
      </TooltipProvider>
    </QueryProvider>
  );
}