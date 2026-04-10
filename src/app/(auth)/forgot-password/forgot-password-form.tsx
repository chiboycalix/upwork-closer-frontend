"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { Input } from "@/components/ui/input";
import { MailIcon, ArrowRightIcon } from "@/components/ui/icons";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validations/auth";
import { useForgotPassword } from "@/hooks/use-auth";
import { notify } from "@/lib/notification-store";

export function ForgotPasswordForm() {
  const forgotMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(data: ForgotPasswordFormValues) {
    forgotMutation.mutate(data, {
      onSuccess: (res) => {
        notify.success("Check your email", res.message);
      },
      onError: (err) => {
        const message =
          err instanceof AxiosError
            ? err.response?.data?.message ?? "Something went wrong"
            : err.message;
        notify.error("Request failed", message);
      },
    });
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Forgot Password</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            Work Email
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

        {/* Submit */}
        <button
          type="submit"
          disabled={forgotMutation.isPending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:opacity-50"
        >
          {forgotMutation.isPending ? "Sending…" : "Send Reset Link"}
          {!forgotMutation.isPending && (
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
