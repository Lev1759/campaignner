"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Play, ShieldCheck, MessageSquareText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_PILLS = ["Voters", "Candidates", "Civil Society", "Media"];

const FEATURE_PILLS = [
  { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Verified Participants" },
  { icon: <MessageSquareText className="w-3.5 h-3.5" />, label: "Moderated Discussions" },
  { icon: <BarChart3 className="w-3.5 h-3.5" />, label: "Fact-Checked Insights" },
];

export default function HeroSection() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0f1e]">
      {/* Layered background */}
      <div className="absolute inset-0">
        <img
          src="https://pbs.twimg.com/media/Ejzo6cCX0AApqtB.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        {/* radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(26,84,203,0.25),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1e]/40 to-[#0a0f1e]" />
        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-36 w-full">
        <div className="max-w-3xl">
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 text-white/80 text-xs font-medium px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Civic MVP — Now Open for Early Access
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-[4.5rem] font-display font-semibold leading-[1.08] tracking-tight text-white mb-6"
          >
            Where Democracy{" "}
            <span className="relative inline-block">
              Gets Real
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-brand-primary to-emerald-400 rounded-full" />
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl"
          >
            Campaignner is the platform for transparent accountability and
            meaningful civic engagement — connecting voters, candidates, civil
            society, and media in one respectful space built for{" "}
            <em className="text-white/90 not-italic font-medium">substance over spectacle</em>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <Button
              onClick={scrollToWaitlist}
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 rounded-2xl px-7 font-semibold text-base h-13 gap-2 shadow-xl shadow-white/10"
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="border border-white/20 hover:border-white/40 hover:bg-white/50 text-white rounded-2xl px-7 font-medium text-base h-13 gap-2"
            >
              <Link href="#" className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-white" />
                Watch 90-second demo
              </Link>
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            {FEATURE_PILLS.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-white/60 text-sm">
                <span className="text-emerald-400">{icon}</span>
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* For… trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-10 left-6 right-6 flex flex-wrap items-center gap-3 text-sm text-white/50"
        >
          <span className="font-medium text-white/40 uppercase tracking-widest text-[10px]">Built for</span>
          {TRUST_PILLS.map((p) => (
            <span key={p} className="px-3 py-1 bg-white/8 border border-white/10 rounded-full text-white/60 text-xs">
              {p}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}