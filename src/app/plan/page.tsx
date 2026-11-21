"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  CalendarPlus,
  CheckCircle2,
  Building2,
  User,
  Hotel,
  Car,
  Languages,
  Accessibility,
  Utensils,
  ArrowRight,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { SAMPLE_HOSPITALS, CITIES } from "@/features/hospitals/data";
import { saveRequest } from "@/features/journey/storage";
import { VisitRequest, ServiceRequirements } from "@/features/journey/types";
import { generateRequestId } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/MotionWrapper";

function PlanVisitContent() {
  const searchParams = useSearchParams();
  const preselectedHospId = searchParams.get("hospital");

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [patientName, setPatientName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [travelOriginCity, setTravelOriginCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("Nagpur");
  const [selectedHospitalId, setSelectedHospitalId] = useState("hosp-ngp-01");
  const [preferredDate, setPreferredDate] = useState("");
  const [alternateDate, setAlternateDate] = useState("");
  const [languagePreference, setLanguagePreference] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

  const [services, setServices] = useState<ServiceRequirements>({
    appointmentCoordination: true,
    accommodationSupport: true,
    localTransport: false,
    languageInterpreter: false,
    wheelchairSpecialAssistance: false,
    dietaryOrCulturalPreferences: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRequest, setSubmittedRequest] = useState<VisitRequest | null>(null);

  // Set default date to 10 days from today
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 10);
    setPreferredDate(today.toISOString().split("T")[0]);
  }, []);

  // Handle hospital query param
  useEffect(() => {
    if (preselectedHospId) {
      const found = SAMPLE_HOSPITALS.find((h) => h.id === preselectedHospId);
      if (found) {
        setSelectedCity(found.city);
        setSelectedHospitalId(found.id);
      }
    }
  }, [preselectedHospId]);

  const toggleService = (key: keyof ServiceRequirements) => {
    setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) errs.patientName = "Patient name is required.";
    if (!contactPhone.trim()) errs.contactPhone = "Contact phone number is required.";
    if (!travelOriginCity.trim()) errs.travelOriginCity = "Please enter your home/origin city.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!preferredDate) errs.preferredDate = "Preferred visit date is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hosp = SAMPLE_HOSPITALS.find((h) => h.id === selectedHospitalId);
    const newId = generateRequestId();

    const newRequest: VisitRequest = {
      id: newId,
      createdAt: new Date().toISOString(),
      patientName: patientName.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      destinationCity: selectedCity,
      selectedHospitalId,
      selectedHospitalName: hosp ? hosp.name : "Selected Medical Center",
      preferredDate,
      alternateDate: alternateDate || undefined,
      travelOriginCity: travelOriginCity.trim(),
      services,
      languagePreference: languagePreference.trim() || undefined,
      specialNotes: specialNotes.trim() || undefined,
      status: "Request Submitted",
      statusHistory: [
        {
          status: "Request Submitted",
          timestamp: new Date().toISOString(),
          note: "New journey coordination inquiry created.",
        },
      ],
      coordinatorNotes: "Assigned to NFSU Demonstration Coordinator Desk.",
    };

    saveRequest(newRequest);
    setSubmittedRequest(newRequest);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  if (submittedRequest) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlassCard className="p-8 sm:p-12 border-emerald-300 dark:border-emerald-800">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <Badge variant="success" size="md">
              Journey Request Created
            </Badge>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
              Your Visit is Being Coordinated!
            </h2>

            <div className="my-6 p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto">
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Unique Tracking Reference
              </span>
              <span className="text-xl font-mono font-bold text-[#3D43C8] dark:text-[#A5AAFF]">
                {submittedRequest.id}
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              We have recorded your non-clinical coordination request for <strong>{submittedRequest.selectedHospitalName}</strong> on <strong>{submittedRequest.preferredDate}</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={`/journey?id=${submittedRequest.id}`}>
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                  Track Live Status
                </Button>
              </Link>
              <Link
                href={`/assistant?hospital=${encodeURIComponent(
                  submittedRequest.selectedHospitalName
                )}&city=${encodeURIComponent(
                  submittedRequest.destinationCity
                )}&date=${encodeURIComponent(submittedRequest.preferredDate)}`}
              >
                <Button variant="outline" size="lg" icon={<Sparkles className="w-4 h-4 text-indigo-500" />}>
                  Prepare with Gemini AI
                </Button>
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <FadeIn>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3D43C8] dark:text-[#A5AAFF]">
              Visit Planning
            </span>
            <Badge variant="secondary">Step {step} of 3</Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Coordinate Your Medical Visit
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Specify your destination, dates, and non-clinical support needs so your journey can be facilitated seamlessly.
          </p>
        </FadeIn>
      </div>

      {/* Progress Tabs */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
        {[
          { num: 1, label: "Patient & Origin" },
          { num: 2, label: "Hospital & Dates" },
          { num: 3, label: "Services & Review" },
        ].map((item) => (
          <div
            key={item.num}
            onClick={() => {
              if (item.num < step) setStep(item.num as 1 | 2 | 3);
            }}
            className={`p-3 rounded-xl border text-center transition-all ${
              step === item.num
                ? "bg-[#3D43C8]/10 dark:bg-[#A5AAFF]/15 border-[#3D43C8] dark:border-[#A5AAFF] text-[#3D43C8] dark:text-[#A5AAFF] font-semibold"
                : step > item.num
                ? "bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer"
                : "bg-transparent border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed"
            }`}
          >
            <span className="text-xs block font-mono">Step 0{item.num}</span>
            <span className="text-xs sm:text-sm truncate">{item.label}</span>
          </div>
        ))}
      </div>

      <GlassCard className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: PATIENT & CONTACT */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-5"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-[#3D43C8] dark:text-[#A5AAFF]" />
                <span>Patient & Contact Details</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name of Patient *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rameshwar Sharma"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3D43C8]/40 text-slate-900 dark:text-white"
                />
                {errors.patientName && (
                  <p className="text-xs text-rose-500 mt-1">{errors.patientName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98223 45110"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3D43C8]/40 text-slate-900 dark:text-white"
                  />
                  {errors.contactPhone && (
                    <p className="text-xs text-rose-500 mt-1">{errors.contactPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. patient@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3D43C8]/40 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Traveling From (Origin City / Town) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Raipur, Chhattisgarh or Amravati, Maharashtra"
                  value={travelOriginCity}
                  onChange={(e) => setTravelOriginCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3D43C8]/40 text-slate-900 dark:text-white"
                />
                {errors.travelOriginCity && (
                  <p className="text-xs text-rose-500 mt-1">{errors.travelOriginCity}</p>
                )}
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="button" variant="primary" onClick={handleNextStep}>
                  Next: Hospital & Dates
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DESTINATION & DATES */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-5"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#3D43C8] dark:text-[#A5AAFF]" />
                <span>Destination & Visit Timing</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Destination City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      const city = e.target.value;
                      setSelectedCity(city);
                      const matched = SAMPLE_HOSPITALS.find((h) => h.city === city);
                      if (matched) setSelectedHospitalId(matched.id);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    {CITIES.filter((c) => c !== "All Cities").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Selected Hospital Center *
                  </label>
                  <select
                    value={selectedHospitalId}
                    onChange={(e) => setSelectedHospitalId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    {SAMPLE_HOSPITALS.filter(
                      (h) => h.city.toLowerCase() === selectedCity.toLowerCase()
                    ).map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Visit Date *
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-rose-500 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Alternate / Buffer Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={alternateDate}
                    onChange={(e) => setAlternateDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="button" variant="primary" onClick={handleNextStep}>
                  Next: Services & Review
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SERVICES & REVIEW */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Non-Clinical Facilitation Services Needed
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    key: "appointmentCoordination",
                    title: "Appointment Coordination",
                    desc: "Assistance checking registration desk queue & department OPD slots.",
                    icon: CalendarPlus,
                  },
                  {
                    key: "accommodationSupport",
                    title: "Lodging & Accommodations",
                    desc: "Guest house or Dharmashala options within 3 km.",
                    icon: Hotel,
                  },
                  {
                    key: "localTransport",
                    title: "Station / Airport Transit",
                    desc: "Pre-arranged local transport upon city arrival.",
                    icon: Car,
                  },
                  {
                    key: "languageInterpreter",
                    title: "Regional Language Facilitator",
                    desc: "Bilingual assistance at reception & registration desks.",
                    icon: Languages,
                  },
                  {
                    key: "wheelchairSpecialAssistance",
                    title: "Wheelchair & Ramp Access",
                    desc: "Mobility aid reserved at main entry gate.",
                    icon: Accessibility,
                  },
                  {
                    key: "dietaryOrCulturalPreferences",
                    title: "Companion & Food Guidance",
                    desc: "Clean attendant dining options & canteen passes.",
                    icon: Utensils,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isChecked = services[item.key as keyof ServiceRequirements];
                  return (
                    <div
                      key={item.key}
                      onClick={() => toggleService(item.key as keyof ServiceRequirements)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? "bg-[#3D43C8]/10 dark:bg-[#A5AAFF]/15 border-[#3D43C8]/50 dark:border-[#A5AAFF]/60"
                          : "bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 text-[#3D43C8] rounded accent-[#3D43C8]"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-4 h-4 text-[#3D43C8] dark:text-[#A5AAFF]" />
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Language Preference for Coordinator
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hindi, Marathi, Bengali, English"
                  value={languagePreference}
                  onChange={(e) => setLanguagePreference(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Additional Non-Clinical Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Elderly patient, needs elevator access, arriving on early morning train."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Non-clinical reminder banner */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Reminder: AarogyaGo coordinates practical visit logistics, lodging, and reception facilitation only. We do not provide clinical treatment or diagnosis.
                </span>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit" variant="primary" size="lg" icon={<CheckCircle2 className="w-4 h-4" />}>
                  Confirm & Submit Coordination Request
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </GlassCard>
    </div>
  );
}

export default function PlanPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading visit planner...</div>}>
      <PlanVisitContent />
    </Suspense>
  );
}
