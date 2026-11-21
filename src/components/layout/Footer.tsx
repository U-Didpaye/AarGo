"use client";

import React from "react";
import Link from "next/link";
import { Compass, ShieldAlert, ExternalLink, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#DBE9E6]/90 dark:border-[rgba(16,148,133,0.25)] bg-white/60 dark:bg-[#071112]/80 backdrop-blur-md mt-20">
      {/* Non-Clinical Safety Warning Banner with HealthOrbit Warm Amber Accent */}
      <div className="bg-[#FBE4DE]/80 dark:bg-[rgba(224,122,104,0.15)] border-b border-[#F8C8BD] dark:border-[rgba(224,122,104,0.25)] py-3.5 px-4 text-xs text-[#9C3826] dark:text-[#F8A393]">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#E07A68] shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="font-bold">Non-Clinical Safety Notice:</strong> AarogyaGo is an AI-assisted healthcare journey coordination platform for non-clinical logistics (travel, lodging, interpreter, and hospital arrival facilitation). We do <strong>not</strong> diagnose, prescribe, triage emergencies, or replace clinical judgement. Always consult certified medical practitioners for healthcare decisions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity with Dual-Ring Mark */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full border border-dashed border-[#0D7A6E] dark:border-[#2DD4BF] animate-spin-slow opacity-75" />
                <div className="absolute inset-1 rounded-full border border-dashed border-[#E07A68] dark:border-[#38BDF8] animate-spin-reverse opacity-70" />
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#0D7A6E] to-[#109485] dark:from-[#2DD4BF] dark:to-[#0284C7] flex items-center justify-center text-white shadow-xs z-10">
                  <Compass className="w-3 h-3 dark:text-[#071112]" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-[#0F1C1A] dark:text-[#F2FAF8]">
                Aarogya<span className="text-[#0D7A6E] dark:text-[#2DD4BF]">Go</span>
              </span>
            </div>
            <p className="text-sm text-[#4E6B63] dark:text-[#8FA8A1] max-w-md leading-relaxed">
              Healthcare Without Borders. Unifying hospital discovery, travel planning, accommodation, and arrival assistance for planned medical journeys into one calm, connected experience.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#4E6B63] dark:text-[#8FA8A1] pt-1">
              <Award className="w-4 h-4 text-[#0D7A6E] dark:text-[#2DD4BF]" />
              <span>Developed for Hack Days @ <strong>NFSU Nagpur</strong> (Major League Hacking)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1C1A] dark:text-[#F2FAF8] mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-[#4E6B63] dark:text-[#8FA8A1]">
              <li>
                <Link href="/discover" className="hover:text-[#0D7A6E] dark:hover:text-[#2DD4BF] transition-colors">
                  Hospital Directory
                </Link>
              </li>
              <li>
                <Link href="/plan" className="hover:text-[#0D7A6E] dark:hover:text-[#2DD4BF] transition-colors">
                  Plan Visit Request
                </Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-[#0D7A6E] dark:hover:text-[#2DD4BF] transition-colors">
                  Patient Journey Tracking
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-[#0D7A6E] dark:hover:text-[#2DD4BF] transition-colors">
                  Gemini Trip Assistant
                </Link>
              </li>
              <li>
                <Link href="/coordinator" className="hover:text-[#0D7A6E] dark:hover:text-[#2DD4BF] transition-colors">
                  Coordinator Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Project & Source */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1C1A] dark:text-[#F2FAF8] mb-3">
              Project & Source
            </h4>
            <div className="space-y-2 text-xs text-[#4E6B63] dark:text-[#8FA8A1]">
              <p>
                A connected healthcare journey coordination platform.
              </p>
              <div className="pt-2">
                <a
                  href="https://github.com/U-Didpaye/AarGo.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#0D7A6E] dark:text-[#2DD4BF] hover:underline font-semibold"
                >
                  <span>GitHub: U-Didpaye/AarGo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#DBE9E6]/70 dark:border-[rgba(16,148,133,0.2)] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#4E6B63] dark:text-[#8FA8A1] gap-4">
          <p>
            &copy; 2026 AarogyaGo. All demonstration medical data is illustrative.
          </p>
          <p className="font-semibold text-[#0F1C1A] dark:text-[#F2FAF8] text-xs sm:text-sm">
            Made with creativity by Ujwal Didpaye
          </p>
        </div>
      </div>
    </footer>
  );
}
