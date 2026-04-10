import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token:
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null,

  setToken: (token: string) => {
    sessionStorage.setItem("accessToken", token);
    set({ token });
  },

  logout: () => {
    sessionStorage.removeItem("accessToken");
    set({ token: null });
  },

  isAuthenticated: () => !!get().token,
}));
