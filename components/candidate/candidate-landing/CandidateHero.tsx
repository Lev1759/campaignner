"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, BadgeCheckIcon, ShieldCheck, TrendingUp, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_STATS = [
  { icon: <Users2 className="w-5.5 h-5.5" />, label: "Nationwide, full LGA coverage" },
  { icon: <BadgeCheckIcon className="w-5.5 h-5.5" />, label: "Verified candidate badge" },
  { icon: <TrendingUp className="w-5.5 h-5.5" />, label: "Public endorsement tracking" },
];

export default function CandidateHero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f1e] pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(26,84,203,0.28),transparent)]" />
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 text-white/80 text-xs font-medium px-4 py-2 rounded-full mb-7"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          For Political Party Candidates
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-4xl md:text-6xl font-display font-semibold leading-[1.1] tracking-tight text-white mb-6"
        >
          Your campaign deserves a record{" "}
          <span className="relative inline-block">
            voters can trust
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-brand-primary to-blue-400 rounded-full" />
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-lg text-white/65 leading-relaxed max-w-2xl mx-auto mb-9"
        >
          Social media posts disappear into noise. A Campaignner profile is
          permanent, verifiable, and built to convert undecided voters —
          showing your portfolio, your manifesto, and your record in one place.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-2xl px-8 font-semibold text-base h-13 gap-2 shadow-xl shadow-white/10 w-full sm:w-auto"
          >
            <Link href="/candidate/register" className="flex items-center gap-0.5">
              Create Your Profile
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="border border-white/20 hover:border-white/40 hover:bg-white/5 text-white rounded-2xl px-8 font-medium text-base h-13 w-full sm:w-auto"
          >
            <Link href="/candidates">See Demo Candidate Profiles</Link>
          </Button>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center  justify-center gap-x-6 gap-y-2 text-sm text-white/45"
        >
          {TRUST_STATS.map((s) => (
            <span key={s.label} className="flex items-center gap-1.5">
              <span className="text-blue-400">{s.icon}</span>
              {s.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}