"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        hoverEffect
          ? {
              y: -4,
              transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
      className={cn(
        "rounded-2xl p-6 glass-card relative overflow-hidden",
        "bg-white/75 dark:bg-[#151821]/80",
        "border border-slate-200/80 dark:border-slate-800/80",
        "shadow-sm dark:shadow-glass-dark",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
