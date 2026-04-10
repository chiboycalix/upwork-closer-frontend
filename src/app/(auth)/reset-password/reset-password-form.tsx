"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { Input } from "@/components/ui/input";
import {
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
} from "@/components/ui/icons";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/validations/auth";
import { useResetPassword } from "@/hooks/use-auth";
import { notify } from "@/lib/notification-store";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const resetMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  function onSubmit(data: ResetPasswordFormValues) {
    if (!token) {
      notify.error("Invalid link", "No reset token found. Please request a new link.");
      return;
    }

    resetMutation.mutate(
      { token, password: data.password },
      {
        onSuccess: (res) => {
          notify.success("Password updated", res.message);
          router.push("/login");
        },
        onError: (err) => {
          const message =
            err instanceof AxiosError
              ? err.response?.data?.message ?? "Reset failed"
              : err.message;
          notify.error("Reset failed", message);
        },
      },
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Reset Password</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Please enter your new password below. Make sure it&apos;s at least 8
          characters long.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        {/* New Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            New Password
          </label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("password")}
            icon={<LockIcon />}
            endIcon={
              <button
                type="button"
                tabIndex={-1}
                className="cursor-pointer hover:text-zinc-300 transition-colors"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            Confirm New Password
          </label>
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("confirmPassword")}
            icon={<LockIcon />}
            endIcon={
              <button
                type="button"
                tabIndex={-1}
                className="cursor-pointer hover:text-zinc-300 transition-colors"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={resetMutation.isPending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:opacity-50"
        >
          {resetMutation.isPending ? "Updating…" : "Update Password"}
          {!resetMutation.isPending && (
            <ArrowRightIcon className="size-3.5" />
          )}
        </button>
      </form>

      {/* Back to login */}
      <p className="mt-6 text-center text-sm text-zinc-400">
        <Link
          href="/login"
          className="font-medium text-brand-400 hover:text-brand-300 transition-colors"
        >
          &larr; Back to Login
        </Link>
      </p>
    </>
  );
}
