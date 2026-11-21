"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { JourneyStatus } from "@/features/journey/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "outline" | "illustrative" | "ai";
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
    sm: "px-2.5 py-0.5 text-xs font-semibold",
    md: "px-3 py-1 text-xs font-bold tracking-wide",
  };

  const variantClasses = {
    primary:
      "bg-[#DAF0EC] text-[#0D7A6E] dark:bg-[rgba(45,212,191,0.15)] dark:text-[#2DD4BF] border border-[#BCE1D8] dark:border-[rgba(45,212,191,0.3)]",
    secondary:
      "bg-slate-100 text-slate-700 dark:bg-[#13282B] dark:text-[#8FA8A1] border border-slate-200 dark:border-slate-800",
    success:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40",
    warning:
      "bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40",
    outline:
      "border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] text-[#4E6B63] dark:text-[#8FA8A1]",
    illustrative:
      "bg-[#FBE4DE] text-[#9C3826] dark:bg-[rgba(224,122,104,0.18)] dark:text-[#F8A393] border border-[#F8C8BD] dark:border-[rgba(224,122,104,0.3)]",
    ai:
      "bg-gradient-to-r from-[#0D7A6E]/10 to-[#E07A68]/15 text-[#0D7A6E] dark:text-[#2DD4BF] border border-[#109485]/30",
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
        <span className="w-1.5 h-1.5 rounded-full bg-[#E07A68] animate-pulse" />
      )}
      {children}
    </span>
  );
}
