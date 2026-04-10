"use client";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export function MailIcon({ className }: { className?: string }) {
  return (
    <Icon
      icon="hugeicons:mail-01"
      className={cn("size-4", className)}
    />
  );
}

export function LockIcon({ className }: { className?: string }) {
  return (
    <Icon
      icon="hugeicons:lock"
      className={cn("size-4", className)}
    />
  );
}

export function EyeIcon({ className }: { className?: string }) {
  return (
    <Icon
      icon="hugeicons:eye"
      className={cn("size-4", className)}
    />
  );
}

export function EyeOffIcon({ className }: { className?: string }) {
  return (
    <Icon
      icon="hugeicons:view-off"
      className={cn("size-4", className)}
    />
  );
}

export function GoogleIcon({ className }: { className?: string }) {
  return (
    <Icon
      icon="logos:google-icon"
      className={cn("size-4", className)}
    />
  );
}

export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <Icon
      icon="hugeicons:arrow-right-02"
      className={cn("size-4", className)}
    />
  );
}
