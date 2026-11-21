"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Route,
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Sparkles,
  FileCheck,
  User,
  Printer,
  AlertCircle,
} from "lucide-react";
import { getStoredRequests, JOURNEY_STORAGE_EVENT } from "@/features/journey/storage";
import { VisitRequest, JourneyStatus } from "@/features/journey/types";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/MotionWrapper";

const STAGES: JourneyStatus[] = [
  "Request Submitted",
  "Under Review",
  "Hospital Contacted",
  "Appointment Update",
];

function JourneyDashboardContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");

  const [allRequests, setAllRequests] = useState<VisitRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<VisitRequest | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const refreshRequests = (preferredId?: string) => {
    const list = getStoredRequests();
    setAllRequests(list);

    const targetId = preferredId || selectedRequest?.id || queryId;
    if (targetId) {
      const match = list.find(
        (r) => r.id.toLowerCase() === targetId.trim().toLowerCase()
      );
      if (match) {
        setSelectedRequest(match);
        setSearchInput(match.id);
        return;
      }
    }

    if (list.length > 0 && !selectedRequest) {
      setSelectedRequest(list[0]);
      setSearchInput(list[0].id);
    }
  };

  useEffect(() => {
    refreshRequests(queryId || undefined);

    const handleSync = () => {
      refreshRequests();
    };

    window.addEventListener("storage", handleSync);
    window.addEventListener(JOURNEY_STORAGE_EVENT, handleSync);

    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener(JOURNEY_STORAGE_EVENT, handleSync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!searchInput.trim()) return;

    const match = allRequests.find(
      (r) => r.id.toLowerCase() === searchInput.trim().toLowerCase()
    );

    if (match) {
      setSelectedRequest(match);
    } else {
      setErrorMessage(`No coordination journey found for reference "${searchInput}".`);
    }
  };

  const getStageIndex = (status: JourneyStatus) => {
    return STAGES.indexOf(status);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 no-print">
        <FadeIn>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D7A6E] dark:text-[#2DD4BF]">
              Journey Tracking Demo
            </span>
            <Badge variant="primary">Patient Portal</Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F1C1A] dark:text-[#F2FAF8]">
            My Medical Journey Tracker
          </h1>
          <p className="text-sm text-[#4E6B63] dark:text-[#8FA8A1] mt-1">
            Explore live non-clinical milestones for your planned visit. Changes updated in the Coordinator Desk sync here automatically.
          </p>
        </FadeIn>
      </div>

      {/* Search Bar & Switcher */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between no-print">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4E6B63] dark:text-[#8FA8A1]" />
            <input
              type="text"
              aria-label="Search sample journey by request ID"
              placeholder="Enter Request ID (e.g. ARG-2026-7821)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] text-[#0F1C1A] dark:text-[#F2FAF8] uppercase font-mono"
            />
          </div>
          <Button type="submit" variant="primary" size="md">
            Track
          </Button>
        </form>

        {/* Quick select saved requests */}
        {allRequests.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-[#4E6B63] dark:text-[#8FA8A1] whitespace-nowrap font-medium">Switch Journey:</span>
            {allRequests.slice(0, 4).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setSelectedRequest(r);
                  setSearchInput(r.id);
                  setErrorMessage("");
                }}
                className={`text-xs px-2.5 py-1 rounded-lg border font-mono font-bold transition-all ${
                  selectedRequest?.id === r.id
                    ? "bg-[#0D7A6E] text-white border-[#0D7A6E] dark:bg-[#2DD4BF] dark:text-[#071112]"
                    : "bg-white dark:bg-[#0D1C1E] border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] text-[#4E6B63] dark:text-[#8FA8A1]"
                }`}
              >
                {r.id}
              </button>
            ))}
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2 no-print">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {selectedRequest ? (
        <div className="space-y-8">
          {/* Main Status Banner with HealthOrbit subtle teal border */}
          <GlassCard className="p-6 sm:p-8 border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] card-shine">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DBE9E6]/70 dark:border-[rgba(16,148,133,0.2)] gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-xs font-mono font-bold text-[#4E6B63] dark:text-[#8FA8A1]">
                    ID: {selectedRequest.id}
                  </span>
                  <Badge status={selectedRequest.status}>{selectedRequest.status}</Badge>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F1C1A] dark:text-[#F2FAF8]">
                  {selectedRequest.selectedHospitalName}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#4E6B63] dark:text-[#8FA8A1] mt-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#0D7A6E] dark:text-[#2DD4BF]" />
                    Patient: <strong className="text-[#0F1C1A] dark:text-[#F2FAF8]">{selectedRequest.patientName}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0D7A6E] dark:text-[#2DD4BF]" />
                    Origin: {selectedRequest.travelOriginCity} &rarr; {selectedRequest.destinationCity}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#0D7A6E] dark:text-[#2DD4BF]" />
                    Target Date: {formatDate(selectedRequest.preferredDate)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center no-print">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Printer className="w-3.5 h-3.5" />}
                  onClick={() => window.print()}
                >
                  Print Summary
                </Button>
                <Link
                  href={`/assistant?hospital=${encodeURIComponent(
                    selectedRequest.selectedHospitalName
                  )}&city=${encodeURIComponent(
                    selectedRequest.destinationCity
                  )}&date=${encodeURIComponent(selectedRequest.preferredDate)}`}
                >
                  <Button variant="coral" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
                    AI Prep Plan
                  </Button>
                </Link>
              </div>
            </div>

            {/* 4-Stage Animated Progress Timeline with HealthOrbit Teal Gradient */}
            <div className="pt-8 pb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1C1A] dark:text-[#F2FAF8] mb-6">
                Coordination Journey Timeline
              </h3>

              <div className="relative">
                {/* Connecting track */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#DAF0EC] dark:bg-[#13282B] -translate-y-1/2 -z-0" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(getStageIndex(selectedRequest.status) / (STAGES.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden md:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#0D7A6E] via-[#109485] to-[#2DD4BF] -translate-y-1/2 -z-0"
                />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                  {STAGES.map((stage, idx) => {
                    const currentIdx = getStageIndex(selectedRequest.status);
                    const isPassed = idx < currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div
                        key={stage}
                        className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                          isCurrent
                            ? "bg-[#DAF0EC] dark:bg-[rgba(45,212,191,0.15)] border-[#0D7A6E] dark:border-[#2DD4BF] shadow-xs ring-1 ring-[#0D7A6E]/30"
                            : isPassed
                            ? "bg-white dark:bg-[#13282B]/60 border-[#BCE1D8] dark:border-[rgba(45,212,191,0.3)]"
                            : "bg-white/40 dark:bg-[#0D1C1E]/40 border-[#DBE9E6]/60 dark:border-slate-800 opacity-60"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold text-[#4E6B63] dark:text-[#8FA8A1]">
                            STAGE 0{idx + 1}
                          </span>
                          {isPassed ? (
                            <CheckCircle2 className="w-4 h-4 text-[#0D7A6E] dark:text-[#2DD4BF]" />
                          ) : isCurrent ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#0D7A6E] dark:bg-[#2DD4BF] animate-ping" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-[#0F1C1A] dark:text-[#F2FAF8]">
                          {stage}
                        </h4>
                        <p className="text-[11px] text-[#4E6B63] dark:text-[#8FA8A1] mt-1">
                          {idx === 0 && "Request logged in portal"}
                          {idx === 1 && "Coordinator reviewing travel & stay"}
                          {idx === 2 && "Outstation hospital desk reached"}
                          {idx === 3 && "Registration slot scheduled"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Requested Non-Clinical Services Pills */}
            <div className="mt-8 pt-6 border-t border-[#DBE9E6]/70 dark:border-[rgba(16,148,133,0.2)]">
              <span className="text-xs font-bold text-[#0F1C1A] dark:text-[#F2FAF8] uppercase tracking-wider block mb-2.5">
                Facilitation Services Enrolled
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedRequest.services).map(([key, val]) => {
                  if (!val) return null;
                  const labels: Record<string, string> = {
                    appointmentCoordination: "Appointment Queue Coordination",
                    accommodationSupport: "Nearby Lodging / Dharmashala",
                    localTransport: "Station / Airport Transit",
                    languageInterpreter: "Regional Language Interpreter",
                    wheelchairSpecialAssistance: "Wheelchair & Ramp Entry",
                    dietaryOrCulturalPreferences: "Attendant Canteen Support",
                  };
                  return (
                    <span
                      key={key}
                      className="text-xs px-3 py-1 rounded-lg bg-[#DAF0EC] dark:bg-[rgba(45,212,191,0.15)] text-[#0D7A6E] dark:text-[#2DD4BF] border border-[#BCE1D8] dark:border-[rgba(45,212,191,0.25)] font-medium"
                    >
                      ✓ {labels[key] || key}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Coordinator Notes */}
            {selectedRequest.coordinatorNotes && (
              <div className="mt-6 p-4 rounded-xl bg-[#F4F8F7] dark:bg-[#13282B]/50 border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0D7A6E] dark:text-[#2DD4BF] block mb-1">
                  Coordinator Desk Dispatch Notes
                </span>
                <p className="text-xs sm:text-sm text-[#0F1C1A] dark:text-[#F2FAF8] leading-relaxed">
                  {selectedRequest.coordinatorNotes}
                </p>
              </div>
            )}
          </GlassCard>

          {/* Status History Audit Log */}
          <GlassCard className="p-6 border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)]">
            <h3 className="text-sm font-bold text-[#0F1C1A] dark:text-[#F2FAF8] mb-4 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#0D7A6E] dark:text-[#2DD4BF]" />
              <span>Activity & Status History Log</span>
            </h3>

            <div className="space-y-3">
              {selectedRequest.statusHistory.map((h, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#F4F8F7] dark:bg-[#13282B]/40 border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.2)] flex items-start justify-between text-xs gap-3"
                >
                  <div>
                    <span className="font-bold text-[#0F1C1A] dark:text-[#F2FAF8]">
                      {h.status}
                    </span>
                    <p className="text-[#4E6B63] dark:text-[#8FA8A1] mt-0.5">{h.note}</p>
                  </div>
                  <span className="text-[11px] text-[#4E6B63] dark:text-[#8FA8A1] shrink-0 font-mono">
                    {formatDate(h.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      ) : (
        <div className="text-center py-16 bg-white/40 dark:bg-[#0D1C1E]/30 rounded-2xl border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)]">
          <Route className="w-12 h-12 text-[#4E6B63] dark:text-[#8FA8A1] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-[#0F1C1A] dark:text-[#F2FAF8]">
            No coordination request selected
          </h3>
          <p className="text-xs text-[#4E6B63] dark:text-[#8FA8A1] mt-1">
            Submit a new visit request or search by reference ID above.
          </p>
          <Link href="/plan" className="inline-block mt-4">
            <Button variant="primary" size="sm">
              Create New Request
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function JourneyPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-[#4E6B63]">Loading journey tracker...</div>}>
      <JourneyDashboardContent />
    </Suspense>
  );
}
