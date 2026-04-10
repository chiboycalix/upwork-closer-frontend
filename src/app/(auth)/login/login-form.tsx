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
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { useLogin } from "@/hooks/use-auth";
import { notify } from "@/lib/notification-store";
import { useAuthStore } from "@/store/auth-store";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const setToken = useAuthStore((s) => s.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data: LoginFormValues) {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        console.log({res})
        setToken(res.accessToken);
        notify.success("Welcome back!", "You have been signed in successfully.");
        router.push("/");
      },
      onError: (err) => {
        const message =
          err instanceof AxiosError
            ? err.response?.data?.message ?? "Login failed"
            : err.message;
        notify.error("Login failed", message);
      },
    });
  }

  const serverError =
    loginMutation.error instanceof AxiosError
      ? loginMutation.error.response?.data?.message ?? "Login failed"
      : loginMutation.error?.message;

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Welcome back</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Please enter your details to sign in.
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
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:opacity-50"
        >
          {loginMutation.isPending ? "Signing in…" : "Sign In"}
          {!loginMutation.isPending && <ArrowRightIcon className="size-3.5" />}
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

      {/* Switch to register */}
      <p className="mt-6 text-center text-sm text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-brand-400 hover:text-brand-300 transition-colors"
        >
          Create an account
        </Link>
      </p>
    </>
  );
}
