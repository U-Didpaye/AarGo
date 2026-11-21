import React from "react";
import Link from "next/link";
import { Compass, Home, Route } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <GlassCard className="max-w-md w-full p-8 text-center card-shine border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)]">
        <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-[#0D7A6E] dark:border-[#2DD4BF] animate-spin-slow opacity-80" />
          <div className="absolute inset-1 rounded-full border border-dashed border-[#E07A68] dark:border-[#38BDF8] animate-spin-reverse opacity-75" />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0D7A6E] to-[#109485] dark:from-[#2DD4BF] dark:to-[#0284C7] flex items-center justify-center text-white shadow-md z-10">
            <Compass className="w-6 h-6 dark:text-[#071112]" />
          </div>
        </div>

        <span className="text-4xl font-extrabold font-mono text-[#0D7A6E] dark:text-[#2DD4BF] block mb-2">
          404
        </span>

        <h2 className="text-xl font-extrabold text-[#0F1C1A] dark:text-[#F2FAF8] mb-2">
          Destination Route Not Found
        </h2>

        <p className="text-xs sm:text-sm text-[#4E6B63] dark:text-[#8FA8A1] mb-6 leading-relaxed">
          The non-clinical coordination page you requested is not available or has moved. Let us guide you back to your medical journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Link href="/journey">
            <Button variant="secondary" size="md" icon={<Route className="w-4 h-4" />}>
              My Journey
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
