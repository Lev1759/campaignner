"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { UserPlus, Search, MessageCircle, TrendingUp } from "lucide-react";

const STEPS = [
  {
    icon: <UserPlus className="w-5 h-5" />,
    label: "Join & Verify",
    headline: "Create your civic identity",
    body: "Sign up and complete a lightweight identity check. Voters, candidates, journalists, and civil society organisations each get a verified role badge.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    line: "bg-blue-200",
  },
  {
    icon: <Search className="w-5 h-5" />,
    label: "Explore",
    headline: "Discover candidates & issues",
    body: "Browse the Candidate Hub, compare manifesto commitments side-by-side, filter by state, office, and party — all in one structured directory.",
    color: "bg-violet-50 text-violet-600 border-violet-100",
    line: "bg-violet-200",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "Engage",
    headline: "Ask, debate, endorse",
    body: "Put direct questions to candidates, join moderated policy threads, and publicly endorse or challenge positions with evidence.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    line: "bg-emerald-200",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    label: "Track",
    headline: "Hold power accountable",
    body: "Manifesto commitments are versioned and public. Sentiment trackers show how community opinion shifts as campaigns evolve.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    line: "bg-amber-200",
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl font-display font-semibold text-brand-text tracking-tight"
          >
            From sign-up to civic impact in four steps
          </motion.h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* connector line desktop */}
          <div className="hidden md:block absolute top-[38px] left-[12.5%] right-[12.5%] h-px bg-slate-200 z-0" />

          {STEPS.map((step, idx) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center space-y-4"
            >
              {/* Icon circle */}
              <div className={`w-[76px] h-[76px] rounded-full border-2 flex items-center justify-center ${step.color} shadow-sm bg-white`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.color}`}>
                  {step.icon}
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                  Step {idx + 1} · {step.label}
                </p>
                <h3 className="font-display font-semibold text-brand-text text-lg leading-snug">
                  {step.headline}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}