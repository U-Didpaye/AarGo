"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  CalendarPlus,
  Route,
  Sparkles,
  Building2,
  Hotel,
  Car,
  Languages,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  UserCheck,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/MotionWrapper";
import { SAMPLE_HOSPITALS } from "@/features/hospitals/data";

export default function HomePage() {
  const pillars = [
    {
      title: "Hospital Discovery",
      desc: "Explore multi-city medical centers, non-clinical amenities, distance from transit, and language desks.",
      icon: Building2,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Visit Planning & Enquiry",
      desc: "Consolidate visit dates, companions, and non-clinical facilitation requests into one clear record.",
      icon: CalendarPlus,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Lodging & Accommodations",
      desc: "Curated options near hospital campuses: guest houses, Dharmashalas, and medical lodges.",
      icon: Hotel,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Local Transit Assistance",
      desc: "Pre-planned station/airport pickup and wheelchair-friendly local vehicle coordination.",
      icon: Car,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Language & Regional Liaison",
      desc: "Connect with regional language facilitators for smooth hospital reception check-ins.",
      icon: Languages,
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "End-to-End Tracking",
      desc: "Real-time transparent status stages from initial request to arrival confirmation.",
      icon: Route,
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Discover & Compare",
      desc: "Search verified hospital profiles with transparent non-clinical logistics and transit proximity.",
    },
    {
      num: "02",
      title: "Submit Visit Request",
      desc: "Specify your dates, attendant requirements, lodging preferences, and language needs.",
    },
    {
      num: "03",
      title: "Gemini AI Preparation",
      desc: "Receive instant customized non-clinical document checklists and packing guidance.",
    },
    {
      num: "04",
      title: "Track Journey Live",
      desc: "Monitor coordination milestones and receive updates before and during your travel.",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3D43C8]/10 dark:bg-[#A5AAFF]/15 border border-[#3D43C8]/25 dark:border-[#A5AAFF]/30 text-xs font-semibold text-[#3D43C8] dark:text-[#A5AAFF]">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>NFSU Hack Days 2026 — Major League Hacking</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Healthcare Without{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D43C8] via-[#6366F1] to-[#A5AAFF]">
                  Borders.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Organizing a planned medical journey shouldn't feel like navigating a maze. AarogyaGo unifies hospital discovery, outstation lodging, local transit, and language assistance into one calm, AI-assisted patient journey.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/plan">
                  <Button
                    size="lg"
                    variant="primary"
                    icon={<CalendarPlus className="w-5 h-5" />}
                  >
                    Plan My Visit
                  </Button>
                </Link>
                <Link href="/discover">
                  <Button
                    size="lg"
                    variant="glass"
                    icon={<Compass className="w-5 h-5" />}
                  >
                    Explore Hospitals
                  </Button>
                </Link>
                <Link href="/assistant">
                  <Button
                    size="lg"
                    variant="outline"
                    icon={<Sparkles className="w-5 h-5 text-indigo-500" />}
                  >
                    Gemini AI Planner
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* Trust and Non-Clinical Badges */}
            <FadeIn delay={0.5}>
              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>100% Non-Clinical Logistics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3D43C8] dark:text-[#A5AAFF]" />
                  <span>Transparent Status Tracking</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-indigo-500" />
                  <span>Attendant & Escort Care</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Visual Card Column - QuietPulse Motion Card */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.3} direction="left">
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#3D43C8] to-[#A5AAFF] opacity-30 blur-xl dark:opacity-40 animate-pulse-subtle" />

                <GlassCard className="relative p-6 sm:p-8 space-y-6 border-indigo-200/50 dark:border-indigo-900/40">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-[#3D43C8] dark:text-[#A5AAFF] flex items-center justify-center font-bold">
                        AG
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                          Live Journey Prototype
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          ID: ARG-2026-7821
                        </p>
                      </div>
                    </div>
                    <Badge status="Under Review">Under Review</Badge>
                  </div>

                  {/* Summary items */}
                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/50">
                      <span className="text-slate-500 dark:text-slate-400">Destination</span>
                      <span className="font-medium text-slate-900 dark:text-slate-200">
                        AIIMS Nagpur
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/50">
                      <span className="text-slate-500 dark:text-slate-400">Origin City</span>
                      <span className="font-medium text-slate-900 dark:text-slate-200">
                        Raipur, Chhattisgarh
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/50">
                      <span className="text-slate-500 dark:text-slate-400">Target Date</span>
                      <span className="font-medium text-slate-900 dark:text-slate-200">
                        05 Dec 2026
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500 dark:text-slate-400">Services Active</span>
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        Stay + Wheelchair + Transit
                      </span>
                    </div>
                  </div>

                  {/* Mini Timeline */}
                  <div className="pt-2">
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Coordination Progress
                    </p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "50%" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-gradient-to-r from-[#3D43C8] to-[#A5AAFF] h-full rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
                      <span>Submitted</span>
                      <span className="text-[#3D43C8] dark:text-[#A5AAFF] font-semibold">Under Review</span>
                      <span>Hospital Contact</span>
                    </div>
                  </div>

                  <Link href="/journey" className="block pt-2">
                    <Button variant="secondary" size="sm" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                      View Full Journey Dashboard
                    </Button>
                  </Link>
                </GlassCard>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pillars of Non-Clinical Journey Coordination */}
      <section className="py-16 bg-slate-100/60 dark:bg-[#151821]/40 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#3D43C8] dark:text-[#A5AAFF] mb-2">
              Unifying The Patient Experience
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Every Non-Clinical Service in One Connected Flow
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
              Patients and caregivers typically juggle dozens of disjointed calls, travel sites, and hospital counters. AarogyaGo orchestrates all the practical essentials.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={idx}>
                  <GlassCard className="h-full flex flex-col justify-between p-6">
                    <div>
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${pillar.color} flex items-center justify-center text-white mb-4 shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                        {pillar.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#3D43C8] dark:text-[#A5AAFF] mb-2">
            Clear & Predictable
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Four Steps from Inquiry to Arrival
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <FadeIn key={i} delay={0.15 * i}>
              <div className="relative p-6 rounded-2xl glass-card h-full flex flex-col justify-between border-slate-200/70 dark:border-slate-800/70">
                <div>
                  <span className="text-3xl font-black text-slate-300 dark:text-slate-700 font-mono block mb-3">
                    {st.num}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Gemini AI Assistant Spotlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <GlassCard className="p-8 sm:p-12 border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 dark:from-[#151821] dark:via-[#151821] dark:to-[#1E222F]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Powered by Google Gemini 2.5</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Intelligent Medical Journey Preparation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Need to know which non-clinical documents to bring, how to coordinate lodging near AIIMS Nagpur, or how to navigate reception desks? The AarogyaGo Gemini Assistant creates personalized journey checklists, transit timelines, and attendant preparation guides.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  📁 Document Preparation
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  🏨 Outstation Lodging
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  ♿ Wheelchair Logistics
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  🗣️ Language Desk Protocols
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Link href="/assistant">
                <Button size="lg" variant="primary" icon={<Sparkles className="w-5 h-5" />}>
                  Launch Gemini Assistant
                </Button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Featured Illustrative Hospitals Preview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#3D43C8] dark:text-[#A5AAFF] mb-1">
              Network Discovery
            </h2>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Featured Medical Centers
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Sample partner profiles with illustrative logistics and non-clinical desk details.
            </p>
          </div>
          <Link href="/discover">
            <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              View All Hospitals
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_HOSPITALS.slice(0, 3).map((hosp) => (
            <GlassCard key={hosp.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="illustrative">Illustrative Profile</Badge>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {hosp.city}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {hosp.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {hosp.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {hosp.specialties.slice(0, 3).map((sp, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {hosp.languagesSupported.slice(0, 2).join(", ")}
                </span>
                <Link href={`/plan?hospital=${hosp.id}`}>
                  <Button size="sm" variant="outline">
                    Plan Visit
                  </Button>
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Safety Bottom Callout */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl p-6 bg-slate-100 dark:bg-[#151821]/80 border border-slate-200 dark:border-slate-800 text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            AarogyaGo Platform Guarantee
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            We are dedicated to patient travel ease, hospitality, and communication facilitation. AarogyaGo does not perform medical diagnosis, prescribe drugs, or substitute clinical judgment.
          </p>
        </div>
      </section>
    </div>
  );
}
