"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  CalendarPlus,
  Route,
  Sparkles,
  ClipboardList,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { Button } from "../ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/discover", label: "Discover Hospitals", icon: Compass },
    { href: "/plan", label: "Plan My Visit", icon: CalendarPlus },
    { href: "/journey", label: "My Journey", icon: Route },
    { href: "/assistant", label: "Gemini Assistant", icon: Sparkles, badge: "AI" },
    { href: "/coordinator", label: "Coordinator Desk", icon: ClipboardList },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-[#DBE9E6]/80 dark:border-[rgba(16,148,133,0.25)] bg-[#F4F8F7]/80 dark:bg-[#071112]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo with HealthOrbit Dual-Ring Orbit Animation */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
            {/* Outer Sage Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#0D7A6E] dark:border-[#2DD4BF] animate-spin-slow opacity-75" />
            {/* Inner Coral/Cyan Ring */}
            <div className="absolute inset-1 rounded-full border border-dashed border-[#E07A68] dark:border-[#38BDF8] animate-spin-reverse opacity-70" />
            {/* Center Core Nucleus with Compass Icon */}
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#0D7A6E] to-[#109485] dark:from-[#2DD4BF] dark:to-[#0284C7] flex items-center justify-center text-white shadow-sm z-10 group-hover:scale-105 transition-transform">
              <Compass className="w-3.5 h-3.5 dark:text-[#071112]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-[#0F1C1A] dark:text-[#F2FAF8]">
                Aarogya<span className="text-[#0D7A6E] dark:text-[#2DD4BF]">Go</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-[#DAF0EC] text-[#0D7A6E] dark:bg-[rgba(45,212,191,0.15)] dark:text-[#2DD4BF] border border-[#BCE1D8] dark:border-[rgba(45,212,191,0.3)]">
                NFSU
              </span>
            </div>
            <p className="text-[10px] text-[#4E6B63] dark:text-[#8FA8A1] font-medium tracking-wide">
              Healthcare Without Borders
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? "text-[#0D7A6E] dark:text-[#2DD4BF] bg-[#DAF0EC]/80 dark:bg-[rgba(45,212,191,0.12)]"
                    : "text-[#4E6B63] dark:text-[#8FA8A1] hover:text-[#0F1C1A] dark:hover:text-[#F2FAF8] hover:bg-[#DAF0EC]/40 dark:hover:bg-[#0D1C1E]/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 rounded-full bg-gradient-to-r from-[#E07A68] to-[#EA580C] text-white shadow-xs">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-xl border border-[#0D7A6E]/30 dark:border-[#2DD4BF]/40 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl text-[#4E6B63] dark:text-[#8FA8A1] hover:bg-[#DAF0EC]/60 dark:hover:bg-[#0D1C1E] transition-colors"
          >
            {theme === "light" ? (
              <Moon className="w-4.5 h-4.5" />
            ) : (
              <Sun className="w-4.5 h-4.5 text-amber-300" />
            )}
          </button>

          {/* Quick Action */}
          <Link href="/plan" className="hidden sm:inline-flex">
            <Button size="sm" variant="primary" icon={<CalendarPlus className="w-4 h-4" />}>
              Plan My Visit
            </Button>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#4E6B63] dark:text-[#8FA8A1] hover:bg-[#DAF0EC]/50 dark:hover:bg-[#0D1C1E]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#DBE9E6] dark:border-[rgba(16,148,133,0.25)] bg-[#F4F8F7]/95 dark:bg-[#071112]/95 backdrop-blur-xl px-4 py-4 space-y-2"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold ${
                    isActive
                      ? "text-[#0D7A6E] dark:text-[#2DD4BF] bg-[#DAF0EC] dark:bg-[rgba(45,212,191,0.15)]"
                      : "text-[#4E6B63] dark:text-[#8FA8A1] hover:bg-[#DAF0EC]/50 dark:hover:bg-[#0D1C1E]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E07A68] text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link href="/plan" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full" variant="primary">
                  Start Planning
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
