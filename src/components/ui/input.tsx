"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, endIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-500/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-10",
            endIcon && "pr-10",
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
