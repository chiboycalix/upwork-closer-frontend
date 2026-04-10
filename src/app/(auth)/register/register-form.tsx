"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { Input } from "@/components/ui/input";
import {
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  LockIcon,
  MailIcon,
} from "@/components/ui/icons";
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";
import { useRegister } from "@/hooks/use-auth";
import { notify } from "@/lib/notification-store";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  function onSubmit(data: RegisterFormValues) {
    registerMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          notify.success("Account created", "A verification code has been sent to your email.");
          router.push(`/verify?email=${encodeURIComponent(data.email)}`);
        },
        onError: (err) => {
          const message =
            err instanceof AxiosError
              ? err.response?.data?.message ?? "Registration failed"
              : err.message;
          notify.error("Registration failed", message);
        },
      }
    );
  }

  const serverError =
    registerMutation.error instanceof AxiosError
      ? registerMutation.error.response?.data?.message ?? "Registration failed"
      : registerMutation.error?.message;

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Create an account</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Start closing more Upwork projects today.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        {serverError && (
          <p className="text-xs text-red-400 text-center">{serverError}</p>
        )}
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            autoComplete="email"
            {...register("email")}
            icon={<MailIcon />}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            Password
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

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirm-password"
            className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            Confirm Password
          </label>
          <Input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("confirmPassword")}
            icon={<LockIcon />}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:opacity-50"
        >
          {registerMutation.isPending ? "Creating account…" : "Create Account"}
          {!registerMutation.isPending && <ArrowRightIcon className="size-3.5" />}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>

      {/* Google */}
      <button
        type="button"
        className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-zinc-300 transition-all hover:bg-white/[0.06] hover:text-white"
      >
        <GoogleIcon />
        Google
      </button>

      {/* Switch to login */}
      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-brand-400 hover:text-brand-300 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
