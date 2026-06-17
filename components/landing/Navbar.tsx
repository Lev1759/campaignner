"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BiSolidMegaphone } from "react-icons/bi";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Candidates", href: "/candidates" },
  { label: "For Candidates", href: "/candidates/register" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? "bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/8 shadow-xl shadow-black/20"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl text-xs font-semibold h-9 gap-1.5 px-4"
              onClick={() =>
                document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Join Waitlist
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMobileOpen((p) => !p)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0a0f1e]/95 backdrop-blur-md border-b border-white/8 py-4 px-6 space-y-1 md:hidden"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm text-white/70 hover:text-white border-b border-white/5 last:border-0"
              >
                {label}
              </Link>
            ))}
            <div className="pt-4">
              <Button
                className="w-full bg-brand-primary text-white rounded-xl h-11 text-sm font-semibold"
                onClick={() => {
                  setMobileOpen(false);
                  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Join the Waitlist
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}