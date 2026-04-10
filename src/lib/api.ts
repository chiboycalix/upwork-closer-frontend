import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Unwrap the { success, data } envelope so callers get the inner data directly
api.interceptors.response.use((response) => {
  const body = response.data;
  if (body && typeof body === "object" && "success" in body && "data" in body) {
    response.data = body.data;
  }
  return response;
});
