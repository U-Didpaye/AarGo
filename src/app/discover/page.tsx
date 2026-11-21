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

  const filteredHospitals = useMemo(() => {
    return SAMPLE_HOSPITALS.filter((hosp) => {
      const matchesSearch =
        hosp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hosp.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hosp.specialties.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCity =
        selectedCity === "All Cities" || hosp.city.toLowerCase() === selectedCity.toLowerCase();

      const matchesSpecialty =
        selectedSpecialty === "All Specialties" ||
        hosp.specialties.some(
          (s) => s.toLowerCase() === selectedSpecialty.toLowerCase()
        );

      return matchesSearch && matchesCity && matchesSpecialty;
    });
  }, [searchQuery, selectedCity, selectedSpecialty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3D43C8] dark:text-[#A5AAFF]">
              Hospital Discovery
            </span>
            <Badge variant="illustrative">Illustrative Sample Directory</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Explore Medical Destinations
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
            Compare premier institutions across India with clear visibility into non-clinical logistics: airport transit times, nearby companion accommodations, and language facilitation.
          </p>
        </FadeIn>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by hospital name, city, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3D43C8]/40 dark:focus:ring-[#A5AAFF]/40 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City Selector */}
          <div className="w-full md:w-56">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3D43C8]/40 text-slate-800 dark:text-slate-200"
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
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3D43C8]/40 text-slate-800 dark:text-slate-200"
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
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <strong>{filteredHospitals.length}</strong> medical centers
          </span>
          {(selectedCity !== "All Cities" ||
            selectedSpecialty !== "All Specialties" ||
            searchQuery) && (
            <button
              onClick={() => {
                setSelectedCity("All Cities");
                setSelectedSpecialty("All Specialties");
                setSearchQuery("");
              }}
              className="text-[#3D43C8] dark:text-[#A5AAFF] hover:underline"
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
            className="flex flex-col justify-between cursor-pointer group hover:border-[#3D43C8]/40 dark:hover:border-[#A5AAFF]/50"
            onClick={() => setSelectedHospital(hosp)}
          >
            <div>
              {/* Top tag & city */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge variant="illustrative">Sample Partner</Badge>
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#3D43C8] dark:text-[#A5AAFF]" />
                  <span>{hosp.city}</span>
                </div>
              </div>

              {/* Title & Accreditation */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#3D43C8] dark:group-hover:text-[#A5AAFF] transition-colors">
                {hosp.name}
              </h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                {hosp.accreditation}
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mt-3 leading-relaxed">
                {hosp.description}
              </p>

              {/* Specialties */}
              <div className="mt-4">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                  Core Specialties
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {hosp.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Logistics highlights */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{hosp.languagesSupported.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Train className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{hosp.nearbyTransit}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-2">
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
        <div className="text-center py-16 bg-white/50 dark:bg-[#151821]/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            No medical centers match your search
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Try adjusting your city filter or search query.
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
              className="bg-white dark:bg-[#151821] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedHospital(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="illustrative">Illustrative Profile</Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedHospital.city}, {selectedHospital.state}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedHospital.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {selectedHospital.address}
                  </p>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedHospital.description}
                </p>

                {/* Specialties */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Specialized Departments
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedHospital.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Logistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      <Train className="w-4 h-4 text-[#3D43C8] dark:text-[#A5AAFF]" />
                      <span>Transit & Proximity</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedHospital.nearbyTransit}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      <Hotel className="w-4 h-4 text-[#3D43C8] dark:text-[#A5AAFF]" />
                      <span>Nearby Accommodations</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedHospital.guestAccommodationNearby}
                    </p>
                  </div>
                </div>

                {/* Languages Supported */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Language Facilitators Available
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedHospital.languagesSupported.map((lang, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Non-Clinical Amenities */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Patient & Companion Amenities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                    {selectedHospital.amenities.map((am, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Modal CTA */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                  <Button variant="outline" size="md" onClick={() => setSelectedHospital(null)}>
                    Close
                  </Button>
                  <Link href={`/plan?hospital=${selectedHospital.id}`}>
                    <Button size="md" variant="primary" icon={<CalendarPlus className="w-4 h-4" />}>
                      Coordinate Visit to this Hospital
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
