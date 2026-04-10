"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { OtpInput } from "@/components/ui/otp-input";
import { verifyOtpSchema, type VerifyOtpFormValues } from "@/lib/validations/auth";
import { useVerifyOtp, useResendOtp } from "@/hooks/use-auth";
import { notify } from "@/lib/notification-store";
import { useAuthStore } from "@/store/auth-store";

export function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [resendMessage, setResendMessage] = useState("");
  const verifyMutation = useVerifyOtp();
  const resendMutation = useResendOtp();
  const setToken = useAuthStore((s) => s.setToken);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: "" },
  });

  function onSubmit(data: VerifyOtpFormValues) {
    setResendMessage("");
    verifyMutation.mutate(
      { email, otp: data.otp },
      {
        onSuccess: (res) => {
          setToken(res.accessToken);
          notify.success("Email verified", "Your account is now active.");
          router.push("/");
        },
        onError: (err) => {
          const message =
            err instanceof AxiosError
              ? err.response?.data?.message ?? "Verification failed"
              : err.message;
          notify.error("Verification failed", message);
        },
      }
    );
  }

  function handleResend() {
    setResendMessage("");
    resendMutation.mutate(
      { email },
      {
        onSuccess: () => {
          notify.success("Code resent", "A new code has been sent to your email.");
          setResendMessage("A new code has been sent to your email.");
        },
        onError: () => {
          notify.error("Resend failed", "Failed to resend code. Please try again.");
          setResendMessage("Failed to resend code. Please try again.");
        },
      }
    );
  }

  const verifyError =
    verifyMutation.error instanceof AxiosError
      ? verifyMutation.error.response?.data?.message ?? "Verification failed"
      : verifyMutation.error?.message;

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold text-white">Check your email</h2>
        <p className="mt-2 text-sm text-zinc-400">
          We&apos;ve sent a 4-digit verification code to your registered email
          address.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center gap-6"
      >
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OtpInput value={field.value} onChange={field.onChange} />
          )}
        />

        {errors.otp && (
          <p className="text-xs text-red-400">{errors.otp.message}</p>
        )}

        {verifyError && (
          <p className="text-xs text-red-400">{verifyError}</p>
        )}

        {resendMessage && (
          <p className="text-xs text-brand-400">{resendMessage}</p>
        )}

        <button
          type="submit"
          disabled={verifyMutation.isPending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:opacity-50"
        >
          {verifyMutation.isPending ? "Verifying…" : "Verify Code"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Didn&apos;t receive a code?{" "}
        <button
          type="button"
          disabled={resendMutation.isPending}
          onClick={handleResend}
          className="cursor-pointer font-medium text-brand-400 hover:text-brand-300 transition-colors disabled:opacity-50"
        >
          {resendMutation.isPending ? "Sending…" : "Resend code"}
        </button>
      </p>
    </>
  );
}
