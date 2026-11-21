"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Building2,
  MapPin,
  Languages,
  Train,
  Hotel,
  Check,
  X,
  CalendarPlus,
  Copy,
} from "lucide-react";
import { SAMPLE_HOSPITALS, CITIES, SPECIALTIES } from "@/features/hospitals/data";
import { Hospital } from "@/features/journey/types";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/MotionWrapper";

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [copiedLogistics, setCopiedLogistics] = useState(false);

  const filteredHospitals = useMemo(() => {
    return SAMPLE_HOSPITALS.filter((hosp) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        hosp.name.toLowerCase().includes(q) ||
        hosp.city.toLowerCase().includes(q) ||
        hosp.specialties.some((s) => s.toLowerCase().includes(q)) ||
        hosp.languagesSupported.some((l) => l.toLowerCase().includes(q));

      const matchesCity =
        selectedCity === "All Cities" || hosp.city.toLowerCase() === selectedCity.toLowerCase();

      // Flexible specialty matching
      let matchesSpecialty = true;
      if (selectedSpecialty !== "All Specialties") {
        const target = selectedSpecialty.toLowerCase();
        matchesSpecialty = hosp.specialties.some((spec) => {
          const s = spec.toLowerCase();
          if (s.includes(target) || target.includes(s)) return true;
          if (target.includes("cardio") && (s.includes("cardiac") || s.includes("cardio"))) return true;
          if (target.includes("ortho") && (s.includes("joint") || s.includes("bone") || s.includes("spine"))) return true;
          if (target.includes("transplant") && s.includes("transplant")) return true;
          return false;
        });
      }

      return matchesSearch && matchesCity && matchesSpecialty;
    });
  }, [searchQuery, selectedCity, selectedSpecialty]);

  const handleCopyHospitalLogistics = (hosp: Hospital) => {
    const text = `${hosp.name} (${hosp.city}, ${hosp.state})\nAddress: ${hosp.address}\nTransit & Distance: ${hosp.nearbyTransit}\nAttendant Lodging: ${hosp.guestAccommodationNearby}\nLanguages Supported: ${hosp.languagesSupported.join(", ")}\nAccreditation: ${hosp.accreditation}`;
    navigator.clipboard.writeText(text);
    setCopiedLogistics(true);
    setTimeout(() => setCopiedLogistics(false), 2200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D7A6E] dark:text-[#2DD4BF]">
              Hospital Discovery
            </span>
            <Badge variant="illustrative">Illustrative Sample Directory</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F1C1A] dark:text-[#F2FAF8]">
            Explore Medical Destinations
          </h1>
          <p className="text-sm text-[#4E6B63] dark:text-[#8FA8A1] mt-2 max-w-2xl">
            Compare premier institutions across India with clear visibility into non-clinical logistics: airport transit times, nearby companion accommodations, and language facilitation.
          </p>
        </FadeIn>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4E6B63] dark:text-[#8FA8A1]" />
            <input
              type="text"
              aria-label="Search hospitals by name, city, or specialty"
              placeholder="Search by hospital name, city, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] focus:outline-none focus:ring-2 focus:ring-[#0D7A6E]/40 dark:focus:ring-[#2DD4BF]/40 text-[#0F1C1A] dark:text-[#F2FAF8] placeholder:text-[#4E6B63]/60 dark:placeholder:text-[#8FA8A1]/60"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search query"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City Selector */}
          <div className="w-full md:w-56">
            <label htmlFor="citySelector" className="sr-only">
              Filter by City
            </label>
            <select
              id="citySelector"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] focus:outline-none focus:ring-2 focus:ring-[#0D7A6E]/40 text-[#0F1C1A] dark:text-[#F2FAF8]"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Specialty Selector */}
          <div className="w-full md:w-60">
            <label htmlFor="specialtySelector" className="sr-only">
              Filter by Specialty
            </label>
            <select
              id="specialtySelector"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#0D1C1E] border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.3)] focus:outline-none focus:ring-2 focus:ring-[#0D7A6E]/40 text-[#0F1C1A] dark:text-[#F2FAF8]"
            >
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between text-xs text-[#4E6B63] dark:text-[#8FA8A1]">
          <span>
            Showing <strong>{filteredHospitals.length}</strong> medical centers
          </span>
          {(selectedCity !== "All Cities" ||
            selectedSpecialty !== "All Specialties" ||
            searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCity("All Cities");
                setSelectedSpecialty("All Specialties");
                setSearchQuery("");
              }}
              className="text-[#0D7A6E] dark:text-[#2DD4BF] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((hosp) => (
          <GlassCard
            key={hosp.id}
            className="flex flex-col justify-between cursor-pointer group hover:border-[#0D7A6E]/50 dark:hover:border-[#2DD4BF]/50 card-shine"
            onClick={() => setSelectedHospital(hosp)}
          >
            <div>
              {/* Top tag & city */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge variant="illustrative">Sample Partner</Badge>
                <div className="flex items-center gap-1 text-xs font-bold text-[#4E6B63] dark:text-[#8FA8A1]">
                  <MapPin className="w-3.5 h-3.5 text-[#0D7A6E] dark:text-[#2DD4BF]" />
                  <span>{hosp.city}</span>
                </div>
              </div>

              {/* Title & Accreditation */}
              <h3 className="text-lg font-bold text-[#0F1C1A] dark:text-[#F2FAF8] group-hover:text-[#0D7A6E] dark:group-hover:text-[#2DD4BF] transition-colors">
                {hosp.name}
              </h3>
              <p className="text-xs text-[#0D7A6E] dark:text-[#2DD4BF] font-semibold mt-0.5">
                {hosp.accreditation}
              </p>

              <p className="text-xs text-[#4E6B63] dark:text-[#8FA8A1] line-clamp-3 mt-3 leading-relaxed">
                {hosp.description}
              </p>

              {/* Specialties */}
              <div className="mt-4">
                <span className="text-[11px] font-bold text-[#4E6B63] dark:text-[#8FA8A1] uppercase tracking-wider block mb-1.5">
                  Core Specialties
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {hosp.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-md bg-[#DAF0EC] dark:bg-[#13282B] text-[#0D7A6E] dark:text-[#2DD4BF] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Logistics highlights */}
              <div className="mt-4 pt-3 border-t border-[#DBE9E6]/60 dark:border-[rgba(16,148,133,0.2)] space-y-1.5 text-xs text-[#4E6B63] dark:text-[#8FA8A1]">
                <div className="flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5 text-[#0D7A6E] dark:text-[#2DD4BF] shrink-0" />
                  <span className="truncate">{hosp.languagesSupported.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Train className="w-3.5 h-3.5 text-[#0D7A6E] dark:text-[#2DD4BF] shrink-0" />
                  <span className="truncate">{hosp.nearbyTransit}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-5 mt-4 border-t border-[#DBE9E6]/60 dark:border-[rgba(16,148,133,0.2)] flex items-center justify-between gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedHospital(hosp);
                }}
              >
                View Logistics
              </Button>
              <Link
                href={`/plan?hospital=${hosp.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Button size="sm" variant="primary" icon={<CalendarPlus className="w-3.5 h-3.5" />}>
                  Plan Visit
                </Button>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center py-16 bg-white/50 dark:bg-[#0D1C1E]/50 rounded-2xl border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)]">
          <Building2 className="w-12 h-12 text-[#4E6B63] dark:text-[#8FA8A1] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-[#0F1C1A] dark:text-[#F2FAF8]">
            No medical centers match your search
          </h3>
          <p className="text-xs text-[#4E6B63] dark:text-[#8FA8A1] mt-1">
            Try adjusting your city filter, specialty, or search keyword.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setSelectedCity("All Cities");
              setSelectedSpecialty("All Specialties");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Hospital Logistics Detail Modal */}
      <AnimatePresence>
        {selectedHospital && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-[#0D1C1E] rounded-2xl border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.35)] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
            >
              {/* Close Button */}
              <button
                type="button"
                aria-label="Close hospital details modal"
                onClick={() => setSelectedHospital(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-[#DAF0EC]/50 dark:hover:bg-[#13282B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="illustrative">Illustrative Profile</Badge>
                    <span className="text-xs text-[#4E6B63] dark:text-[#8FA8A1] font-semibold">
                      {selectedHospital.city}, {selectedHospital.state}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#0F1C1A] dark:text-[#F2FAF8]">
                    {selectedHospital.name}
                  </h2>
                  <p className="text-xs text-[#4E6B63] dark:text-[#8FA8A1] mt-1">
                    {selectedHospital.address}
                  </p>
                </div>

                <p className="text-sm text-[#0F1C1A] dark:text-[#F2FAF8] leading-relaxed">
                  {selectedHospital.description}
                </p>

                {/* Specialties */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D7A6E] dark:text-[#2DD4BF] mb-2">
                    Specialized Departments
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedHospital.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#DAF0EC] dark:bg-[#13282B] text-[#0D7A6E] dark:text-[#2DD4BF] border border-[#BCE1D8] dark:border-[rgba(45,212,191,0.25)] font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Logistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#F4F8F7] dark:bg-[#13282B]/60 border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0D7A6E] dark:text-[#2DD4BF] mb-1.5">
                      <Train className="w-4 h-4 text-[#0D7A6E] dark:text-[#2DD4BF]" />
                      <span>Transit & Proximity</span>
                    </div>
                    <p className="text-xs text-[#4E6B63] dark:text-[#8FA8A1] leading-relaxed">
                      {selectedHospital.nearbyTransit}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F4F8F7] dark:bg-[#13282B]/60 border border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0D7A6E] dark:text-[#2DD4BF] mb-1.5">
                      <Hotel className="w-4 h-4 text-[#0D7A6E] dark:text-[#2DD4BF]" />
                      <span>Nearby Accommodations</span>
                    </div>
                    <p className="text-xs text-[#4E6B63] dark:text-[#8FA8A1] leading-relaxed">
                      {selectedHospital.guestAccommodationNearby}
                    </p>
                  </div>
                </div>

                {/* Languages Supported */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D7A6E] dark:text-[#2DD4BF] mb-2">
                    Language Facilitators Available
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedHospital.languagesSupported.map((lang, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-[#DAF0EC] dark:bg-[#13282B] text-[#0D7A6E] dark:text-[#2DD4BF] font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Non-Clinical Amenities */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D7A6E] dark:text-[#2DD4BF] mb-2">
                    Patient & Companion Amenities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4E6B63] dark:text-[#8FA8A1]">
                    {selectedHospital.amenities.map((am, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#0D7A6E] dark:text-[#2DD4BF] shrink-0" />
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Modal CTA */}
                <div className="pt-4 border-t border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)] flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopyHospitalLogistics(selectedHospital)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D7A6E] dark:text-[#2DD4BF] hover:underline"
                  >
                    {copiedLogistics ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Logistics Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Transit & Stay Details</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="md" onClick={() => setSelectedHospital(null)}>
                      Close
                    </Button>
                    <Link href={`/plan?hospital=${selectedHospital.id}`}>
                      <Button size="md" variant="primary" icon={<CalendarPlus className="w-4 h-4" />}>
                        Coordinate Visit
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
