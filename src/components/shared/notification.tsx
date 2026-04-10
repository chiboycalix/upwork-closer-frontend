"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@iconify/react";

import {
  useNotificationStore,
  type Notification,
  type NotificationType,
} from "@/lib/notification-store";
import { cn } from "@/lib/utils";

const config: Record<
  NotificationType,
  {
    icon: string;
    bg: string;
    border: string;
    iconColor: string;
    iconBg: string;
    titleColor: string;
    messageColor: string;
    closeBg: string;
  }
> = {
  success: {
    icon: "hugeicons:checkmark-circle-02",
    bg: "bg-gradient-to-r from-emerald-50 to-green-50",
    border: "border-emerald-300/60",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100/80",
    titleColor: "text-emerald-900",
    messageColor: "text-emerald-700/80",
    closeBg: "bg-emerald-500 text-white hover:bg-emerald-600",
  },
  error: {
    icon: "hugeicons:cancel-circle",
    bg: "bg-gradient-to-r from-red-50 to-orange-50",
    border: "border-red-300/60",
    iconColor: "text-red-500",
    iconBg: "bg-red-100/80",
    titleColor: "text-red-900",
    messageColor: "text-red-700/80",
    closeBg: "bg-red-500 text-white hover:bg-red-600",
  },
  warning: {
    icon: "hugeicons:alert-02",
    bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
    border: "border-amber-300/60",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100/80",
    titleColor: "text-amber-900",
    messageColor: "text-amber-700/80",
    closeBg: "bg-amber-500 text-white hover:bg-amber-600",
  },
  info: {
    icon: "hugeicons:information-circle",
    bg: "bg-gradient-to-r from-sky-50 to-orange-50/30",
    border: "border-sky-200/60",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-100/80",
    titleColor: "text-sky-900",
    messageColor: "text-sky-700/80",
    closeBg: "bg-sky-500 text-white hover:bg-sky-600",
  },
};

function NotificationCard({ notification }: { notification: Notification }) {
  const remove = useNotificationStore((s) => s.remove);
  const duration = notification.duration ?? 3000;
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => setIsExiting(true);

  const style = config[notification.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={
        isExiting
          ? {
              opacity: 0,
              x: 80,
              scale: 0.9,
              transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
            }
          : { opacity: 1, x: 0, scale: 1 }
      }
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      onAnimationComplete={() => {
        if (isExiting) remove(notification.id);
      }}
      className={cn(
        "pointer-events-auto relative flex w-[380px] max-w-[calc(100vw-2rem)] items-start gap-3 overflow-visible rounded-xl border p-4 shadow-lg shadow-black/5 backdrop-blur-sm",
        style.bg,
        style.border
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg",
          style.iconBg
        )}
      >
        <Icon icon={style.icon} className={cn("size-[18px]", style.iconColor)} />
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className={cn("text-sm font-semibold leading-tight", style.titleColor)}>
          {notification.title}
        </p>
        {notification.message && (
          <p className={cn("mt-1 text-xs leading-relaxed", style.messageColor)}>
            {notification.message}
          </p>
        )}
      </div>

      <button
        onClick={handleClose}
        className={cn(
          "absolute -top-2 -right-2 flex size-7 cursor-pointer items-center justify-center rounded-full border border-white/80 shadow-md transition-colors",
          style.closeBg
        )}
        aria-label="Dismiss notification"
      >
        <Icon icon="hugeicons:cancel-01" className="size-3.5" />
      </button>
    </motion.div>
  );
}

export function NotificationContainer() {
  const notifications = useNotificationStore((s) => s.notifications);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed top-4 right-4 z-[9999] flex flex-col gap-3"
    >
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </AnimatePresence>
    </div>
  );
}
