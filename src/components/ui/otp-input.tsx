"use client";

import { useRef, useCallback, type KeyboardEvent, type ClipboardEvent } from "react";

import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export function OtpInput({ length = 4, value, onChange }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const focusInput = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, length - 1));
      inputsRef.current[clamped]?.focus();
    },
    [length]
  );

  function handleChange(index: number, char: string) {
    if (!/^\d?$/.test(char)) return;

    const next = digits.slice();
    next[index] = char;
    const joined = next.join("");
    onChange(joined);

    if (char && index < length - 1) {
      focusInput(index + 1);
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        handleChange(index, "");
      } else if (index > 0) {
        handleChange(index - 1, "");
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight") {
      focusInput(index + 1);
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, length);
    if (pasted) {
      onChange(pasted.padEnd(length, "").slice(0, length));
      focusInput(Math.min(pasted.length, length - 1));
    }
  }

  return (
    <div className="flex items-center justify-center gap-3">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value.slice(-1))}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "size-14 rounded-xl border border-white/10 bg-white/5 text-center text-xl font-bold text-white",
            "focus:border-brand-500/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
            "placeholder:text-zinc-600 transition-all"
          )}
          placeholder="·"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}
