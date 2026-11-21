"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Search,
  CheckCircle2,
  Save,
  RefreshCw,
  Eye,
} from "lucide-react";
import {
  getStoredRequests,
  updateRequestStatus,
} from "@/features/journey/storage";
import { VisitRequest, JourneyStatus } from "@/features/journey/types";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/MotionWrapper";

const ALL_STATUSES: JourneyStatus[] = [
  "Request Submitted",
  "Under Review",
  "Hospital Contacted",
  "Appointment Update",
];

export default function CoordinatorPage() {
  const [requests, setRequests] = useState<VisitRequest[]>([]);
  const [selectedReq, setSelectedReq] = useState<VisitRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [newStatus, setNewStatus] = useState<JourneyStatus>("Under Review");
  const [statusNote, setStatusNote] = useState("");
  const [coordNotes, setCoordNotes] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const list = getStoredRequests();
    setRequests(list);
    if (list.length > 0 && !selectedReq) {
      selectRequest(list[0]);
    }
  };

  const selectRequest = (req: VisitRequest) => {
    setSelectedReq(req);
    setNewStatus(req.status);
    setStatusNote(`Status transitioned to ${req.status} via Coordinator Workspace.`);
    setCoordNotes(req.coordinatorNotes || "");
    setSaveSuccess(false);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq) return;

    const updated = updateRequestStatus(
      selectedReq.id,
      newStatus,
      statusNote.trim() || `Status updated to ${newStatus}`,
      coordNotes.trim()
    );

    if (updated) {
      setSelectedReq(updated);
      setRequests((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const filteredRequests = requests.filter((r) => {
    const matchesFilter = filterStatus === "All" || r.status === filterStatus;
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.selectedHospitalName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <FadeIn>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D7A6E] dark:text-[#2DD4BF]">
              Operations & Liaison
            </span>
            <Badge variant="illustrative">NFSU Hackathon Coordinator Workspace</Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F1C1A] dark:text-[#F2FAF8]">
            Demonstration Coordinator Desk
          </h1>
          <p className="text-sm text-[#4E6B63] dark:text-[#8FA8A1] mt-1">
            Simulate non-clinical coordination using sample requests. Changes are saved only in this browser and are not sent to patients or shared with other users.
          </p>
        </FadeIn>
      </div>

      {/* HealthOrbit-style Bento Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <GlassCard className="p-4 border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)]">
          <span className="text-xs font-bold text-[#4E6B63] dark:text-[#8FA8A1] block">
            Total Enquiries
          </span>
          <span className="text-2xl font-bold font-mono text-[#0F1C1A] dark:text-[#F2FAF8] mt-1 block">
            {requests.length}
          </span>
        </GlassCard>
        <GlassCard className="p-4 border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)]">
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block">
            Under Review
          </span>
          <span className="text-2xl font-bold font-mono text-amber-700 dark:text-amber-400 mt-1 block">
            {requests.filter((r) => r.status === "Under Review").length}
          </span>
        </GlassCard>
        <GlassCard className="p-4 border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)]">
          <span className="text-xs font-bold text-[#0D7A6E] dark:text-[#2DD4BF] block">
            Hospital Contacted
          </span>
          <span className="text-2xl font-bold font-mono text-[#0D7A6E] dark:text-[#2DD4BF] mt-1 block">
            {requests.filter((r) => r.status === "Hospital Contacted").length}
          </span>
        </GlassCard>
        <GlassCard className="p-4 border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)]">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
            Appointment Updates
          </span>
          <span className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-1 block">
            {requests.filter((r) => r.status === "Appointment Update").length}
          </span>
        </GlassCard>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Request List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4E6B63] dark:text-[#8FA8A1]" />
              <input
                type="text"
                aria-label="Search sample requests by traveler, ID, or hospital"
                placeholder="Search traveler, ID, or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] text-[#0F1C1A] dark:text-[#F2FAF8]"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] text-[#0F1C1A] dark:text-[#F2FAF8]"
            >
              <option value="All">All Statuses</option>
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Cards List */}
          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {filteredRequests.map((req) => {
              const isSelected = selectedReq?.id === req.id;
              return (
                <button
                  type="button"
                  key={req.id}
                  onClick={() => selectRequest(req)}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-4 rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7A6E] dark:focus-visible:ring-[#2DD4BF] ${
                    isSelected
                      ? "bg-[#DAF0EC] dark:bg-[rgba(45,212,191,0.15)] border-[#0D7A6E] dark:border-[#2DD4BF] shadow-xs"
                      : "bg-white/80 dark:bg-[#0D1C1E]/80 border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)] hover:border-[#0D7A6E]/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-[#0D7A6E] dark:text-[#2DD4BF]">
                      {req.id}
                    </span>
                    <Badge status={req.status} size="sm">
                      {req.status}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-bold text-[#0F1C1A] dark:text-[#F2FAF8]">
                    {req.patientName}
                  </h4>
                  <p className="text-xs text-[#4E6B63] dark:text-[#8FA8A1] truncate">
                    {req.selectedHospitalName}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#4E6B63] dark:text-[#8FA8A1] mt-2 pt-2 border-t border-[#DBE9E6]/60 dark:border-[rgba(16,148,133,0.2)]">
                    <span>Target: {formatDate(req.preferredDate)}</span>
                    <span className="text-[#0D7A6E] dark:text-[#2DD4BF] font-semibold">
                      {req.destinationCity}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Selected Request Action Workspace */}
        <div className="lg:col-span-7">
          {selectedReq ? (
            <GlassCard className="p-6 sm:p-8 space-y-6 border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] card-shine">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#DBE9E6]/70 dark:border-[rgba(16,148,133,0.2)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[#4E6B63] dark:text-[#8FA8A1] font-bold">
                      {selectedReq.id}
                    </span>
                    <Badge status={selectedReq.status}>{selectedReq.status}</Badge>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0F1C1A] dark:text-[#F2FAF8]">
                    {selectedReq.patientName}
                  </h3>
                  <p className="text-xs text-[#4E6B63] dark:text-[#8FA8A1]">
                    Phone: {selectedReq.contactPhone} • Origin: {selectedReq.travelOriginCity}
                  </p>
                </div>

                <Link
                  href={`/journey?id=${selectedReq.id}`}
                  target="_blank"
                  className="text-xs text-[#0D7A6E] dark:text-[#2DD4BF] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Patient Portal</span>
                </Link>
              </div>

              {/* Hospital & Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F4F8F7] dark:bg-[#13282B]/50 border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)]">
                  <span className="font-bold text-[#0D7A6E] dark:text-[#2DD4BF] block mb-1">
                    Destination Hospital:
                  </span>
                  <p className="font-semibold text-[#0F1C1A] dark:text-[#F2FAF8]">
                    {selectedReq.selectedHospitalName}
                  </p>
                  <p className="text-[#4E6B63] dark:text-[#8FA8A1] mt-0.5">
                    Visit Date: {formatDate(selectedReq.preferredDate)}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4F8F7] dark:bg-[#13282B]/50 border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)]">
                  <span className="font-bold text-[#0D7A6E] dark:text-[#2DD4BF] block mb-1">
                    Language & Special Notes:
                  </span>
                  <p className="text-[#0F1C1A] dark:text-[#F2FAF8]">
                    Language: {selectedReq.languagePreference || "Not specified"}
                  </p>
                  <p className="text-[#4E6B63] dark:text-[#8FA8A1] mt-0.5 truncate">
                    Notes: {selectedReq.specialNotes || "None"}
                  </p>
                </div>
              </div>

              {/* Service tags */}
              <div>
                <span className="text-xs font-bold text-[#0F1C1A] dark:text-[#F2FAF8] uppercase tracking-wider block mb-2">
                  Requested Non-Clinical Support:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(selectedReq.services).map(([key, val]) =>
                    val ? (
                      <span
                        key={key}
                        className="text-xs px-2.5 py-0.5 rounded-md bg-[#DAF0EC] dark:bg-[rgba(45,212,191,0.15)] text-[#0D7A6E] dark:text-[#2DD4BF] border border-[#BCE1D8] dark:border-[rgba(45,212,191,0.25)] font-medium"
                      >
                        ✓ {key}
                      </span>
                    ) : null
                  )}
                </div>
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleUpdate} className="space-y-4 pt-4 border-t border-[#DBE9E6]/70 dark:border-[rgba(16,148,133,0.2)]">
                <h4 className="text-sm font-bold text-[#0F1C1A] dark:text-[#F2FAF8] flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#0D7A6E] dark:text-[#2DD4BF]" />
                  <span>Update Coordination Stage & Notes</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F1C1A] dark:text-[#F2FAF8] mb-1">
                      Advance Journey Stage
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as JourneyStatus)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] text-[#0F1C1A] dark:text-[#F2FAF8]"
                    >
                      {ALL_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F1C1A] dark:text-[#F2FAF8] mb-1">
                      Timeline Audit Note
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Outstation registration desk confirmed."
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] text-[#0F1C1A] dark:text-[#F2FAF8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1C1A] dark:text-[#F2FAF8] mb-1">
                    Coordinator Dispatch Notes (Visible to Patient)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter lodging details, emergency entrance landmarks, or facilitator phone numbers..."
                    value={coordNotes}
                    onChange={(e) => setCoordNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] text-[#0F1C1A] dark:text-[#F2FAF8]"
                  />
                </div>

                {saveSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Journey milestone updated and saved to patient live portal!</span>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                    Save & Dispatch Milestone
                  </Button>
                </div>
              </form>
            </GlassCard>
          ) : (
            <div className="text-center py-20 bg-white/40 dark:bg-[#0D1C1E]/30 rounded-2xl border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)]">
              <ClipboardList className="w-12 h-12 text-[#4E6B63] dark:text-[#8FA8A1] mx-auto mb-3 opacity-60" />
              <p className="text-sm text-[#4E6B63] dark:text-[#8FA8A1]">Select an enquiry to manage coordination</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
