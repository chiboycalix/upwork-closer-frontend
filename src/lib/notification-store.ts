import { create } from "zustand";

export type NotificationType = "success" | "error" | "info" | "warning";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
};

type NotificationState = {
  notifications: Notification[];
  add: (notification: Omit<Notification, "id">) => void;
  remove: (id: string) => void;
  clearAll: () => void;
};

let counter = 0;

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  add: (notification) => {
    const id = `notif-${++counter}-${Date.now()}`;
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }],
    }));
  },
  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearAll: () => set({ notifications: [] }),
}));

export const notify = {
  success: (title: string, message?: string) =>
    useNotificationStore.getState().add({ type: "success", title, message }),
  error: (title: string, message?: string) =>
    useNotificationStore.getState().add({ type: "error", title, message }),
  info: (title: string, message?: string) =>
    useNotificationStore.getState().add({ type: "info", title, message }),
  warning: (title: string, message?: string) =>
    useNotificationStore.getState().add({ type: "warning", title, message }),
};
