"use client";

import React from "react";
import Link from "next/link";
import { Compass, ShieldAlert, ExternalLink, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-[#0B0D12]/70 backdrop-blur-md mt-20">
      {/* Non-Clinical Safety Warning Banner */}
      <div className="bg-amber-500/10 dark:bg-amber-500/15 border-b border-amber-500/20 py-3.5 px-4 text-xs text-amber-900 dark:text-amber-200">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Non-Clinical Safety Notice:</strong> AarogyaGo is an AI-assisted healthcare journey coordination platform for non-clinical logistics (travel, lodging, interpreter, and hospital arrival facilitation). We do <strong>not</strong> diagnose, prescribe, triage emergencies, or replace clinical judgement. Always consult certified medical practitioners for healthcare decisions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3D43C8] to-[#8C92FF] flex items-center justify-center text-white shadow-sm">
                <Compass className="w-4.5 h-4.5" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                Aarogya<span className="text-[#3D43C8] dark:text-[#A5AAFF]">Go</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Healthcare Without Borders. Unifying hospital discovery, travel planning, accommodation, and arrival assistance for planned medical journeys into one calm, connected experience.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <Award className="w-4 h-4 text-[#3D43C8] dark:text-[#A5AAFF]" />
              <span>Developed for Hack Days @ <strong>NFSU Nagpur</strong> (Major League Hacking)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/discover" className="hover:text-[#3D43C8] dark:hover:text-[#A5AAFF] transition-colors">
                  Hospital Directory
                </Link>
              </li>
              <li>
                <Link href="/plan" className="hover:text-[#3D43C8] dark:hover:text-[#A5AAFF] transition-colors">
                  Plan Visit Request
                </Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-[#3D43C8] dark:hover:text-[#A5AAFF] transition-colors">
                  Patient Journey Tracking
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-[#3D43C8] dark:hover:text-[#A5AAFF] transition-colors">
                  Gemini Trip Assistant
                </Link>
              </li>
              <li>
                <Link href="/coordinator" className="hover:text-[#3D43C8] dark:hover:text-[#A5AAFF] transition-colors">
                  Coordinator Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Project & Source */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Project & Source
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <p>
                A connected healthcare journey coordination platform.
              </p>
              <div className="pt-2">
                <a
                  href="https://github.com/U-Didpaye/AarGo.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#3D43C8] dark:text-[#A5AAFF] hover:underline"
                >
                  <span>GitHub: U-Didpaye/AarGo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200/60 dark:border-slate-800/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>
            &copy; 2026 AarogyaGo. All demonstration medical data is illustrative.
          </p>
          <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            Made with creativity by Ujwal Didpaye
          </p>
        </div>
      </div>
    </footer>
  );
}
