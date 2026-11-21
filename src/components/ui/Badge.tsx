"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { JourneyStatus } from "@/features/journey/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "outline" | "illustrative";
  status?: JourneyStatus;
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "primary",
  status,
  size = "md",
  className = "",
}: BadgeProps) {
  let computedVariant = variant;

  if (status) {
    switch (status) {
      case "Request Submitted":
        computedVariant = "secondary";
        break;
      case "Under Review":
        computedVariant = "warning";
        break;
      case "Hospital Contacted":
        computedVariant = "primary";
        break;
      case "Appointment Update":
        computedVariant = "success";
        break;
    }
  }

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs font-medium",
    md: "px-3 py-1 text-xs font-semibold tracking-wide",
  };

  const variantClasses = {
    primary:
      "bg-[#3D43C8]/10 text-[#3D43C8] dark:bg-[#A5AAFF]/20 dark:text-[#A5AAFF] border border-[#3D43C8]/20 dark:border-[#A5AAFF]/30",
    secondary:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
    success:
      "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300 border border-emerald-500/25 dark:border-emerald-400/30",
    warning:
      "bg-amber-500/10 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300 border border-amber-500/25 dark:border-amber-400/30",
    outline:
      "border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400",
    illustrative:
      "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full select-none",
        sizeClasses[size],
        variantClasses[computedVariant],
        className
      )}
    >
      {computedVariant === "illustrative" && (
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
      )}
      {children}
    </span>
  );
}
