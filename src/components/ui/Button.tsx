"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "coral";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "left",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none tracking-tight";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-4.5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#0D7A6E] hover:bg-[#0B5E55] text-white shadow-sm dark:bg-[#2DD4BF] dark:text-[#071112] dark:hover:bg-[#5EEAD4] focus:ring-[#0D7A6E]/50 shadow-[0_4px_14px_rgba(13,122,110,0.25)]",
    secondary:
      "bg-[#DAF0EC] hover:bg-[#C2E7E0] text-[#0D7A6E] dark:bg-[#0D1C1E] dark:hover:bg-[#13282B] dark:text-[#2DD4BF] border border-[#BCE1D8] dark:border-[rgba(16,148,133,0.3)]",
    coral:
      "bg-[#E07A68] hover:bg-[#C96756] text-white shadow-[0_4px_14px_rgba(224,122,104,0.35)] focus:ring-[#E07A68]/50",
    outline:
      "border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] hover:bg-[#F4F8F7] dark:hover:bg-[#0D1C1E] text-[#0F1C1A] dark:text-[#F2FAF8]",
    ghost:
      "hover:bg-[#DAF0EC]/60 dark:hover:bg-[#0D1C1E]/80 text-[#0F1C1A] dark:text-[#F2FAF8]",
    glass:
      "bg-white/70 dark:bg-[#0D1C1E]/70 backdrop-blur-md border border-white/60 dark:border-[rgba(16,148,133,0.3)] hover:bg-white/90 dark:hover:bg-[#0D1C1E]/90 text-[#0F1C1A] dark:text-[#F2FAF8] shadow-sm",
  };

  return (
    <motion.button
      whileTap={!disabled && !isLoading ? { scale: 0.97 } : undefined}
      whileHover={
        !disabled && !isLoading
          ? { y: -1, transition: { duration: 0.15 } }
          : undefined
      }
      disabled={disabled || isLoading}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        icon && iconPosition === "left" && <span>{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === "right" && <span>{icon}</span>}
    </motion.button>
  );
}
