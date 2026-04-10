import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface RegisterPayload {
  email: string;
  password: string;
}

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

interface ResendOtpPayload {
  email: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  tokenType: string;
}

interface MessageResponse {
  message: string;
}

export function useRegister() {
  return useMutation<MessageResponse, Error, RegisterPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/register", payload);
      return data;
    },
  });
}

export function useVerifyOtp() {
  return useMutation<AuthResponse, Error, VerifyOtpPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/verify-otp", payload);
      return data;
    },
  });
}

export function useResendOtp() {
  return useMutation<MessageResponse, Error, ResendOtpPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/resend-otp", payload);
      return data;
    },
  });
}

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/login", payload);
      return data;
    },
  });
}

interface ForgotPasswordPayload {
  email: string;
}

interface ResetPasswordPayload {
  token: string;
  password: string;
}

export function useForgotPassword() {
  return useMutation<MessageResponse, Error, ForgotPasswordPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/forgot-password", payload);
      return data;
    },
  });
}

export function useResetPassword() {
  return useMutation<MessageResponse, Error, ResetPasswordPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/reset-password", payload);
      return data;
    },
  });
}
