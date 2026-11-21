"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Orb 1: Luminous HealthOrbit Mint / Teal */}
      <motion.div
        animate={reduceMotion ? undefined : {
          x: [0, 45, -35, 0],
          y: [0, -40, 25, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={reduceMotion ? undefined : {
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-28 -left-28 w-[34rem] h-[34rem] rounded-full bg-gradient-to-tr from-[#14B8A6]/20 to-[#2DD4BF]/25 blur-3xl dark:from-[#0D7A6E]/30 dark:to-[#2DD4BF]/15"
      />

      {/* Orb 2: HealthOrbit Soft Warm Coral / Amber glow (for AI warmth) */}
      <motion.div
        animate={reduceMotion ? undefined : {
          x: [0, -50, 35, 0],
          y: [0, 45, -30, 0],
          scale: [1, 0.92, 1.12, 1],
        }}
        transition={reduceMotion ? undefined : {
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -right-28 w-[32rem] h-[32rem] rounded-full bg-gradient-to-bl from-[#FADBD8]/40 to-[#E07A68]/15 blur-3xl dark:from-[#E07A68]/20 dark:to-[#0B5E55]/20"
      />

      {/* Orb 3: HealthOrbit Soft Clinical Blue / Sky Cyan */}
      <motion.div
        animate={reduceMotion ? undefined : {
          x: [0, 30, -40, 0],
          y: [0, -35, 40, 0],
          scale: [0.95, 1.08, 0.95],
        }}
        transition={reduceMotion ? undefined : {
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-32 left-1/3 w-[36rem] h-[26rem] rounded-full bg-gradient-to-tr from-[#85C1E9]/25 to-[#0284C7]/15 blur-3xl dark:from-[#0284C7]/20 dark:to-[#109485]/15"
      />

      {/* Subtle Micro-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d7a6e08_1px,transparent_1px),linear-gradient(to_bottom,#0d7a6e08_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#2dd4bf0a_1px,transparent_1px),linear-gradient(to_bottom,#2dd4bf0a_1px,transparent_1px)]" />
    </div>
  );
}
