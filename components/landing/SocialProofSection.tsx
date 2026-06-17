"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Users, FileText, BarChart3 } from "lucide-react";

const STATS = [
  { icon: <MapPin className="w-5 h-5" />, value: "36", suffix: " States", label: "Full nationwide coverage, including FCT" },
  { icon: <Users className="w-5 h-5" />, value: "4", suffix: " Roles", label: "Voters, Candidates, Civil Society, Media" },
  { icon: <FileText className="w-5 h-5" />, value: "14", suffix: " Sectors", label: "Manifesto sectors tracked per candidate" },
  { icon: <BarChart3 className="w-5 h-5" />, value: "100%", suffix: "", label: "Publicly auditable policy commitments" },
];

const TESTIMONIALS = [
  {
    quote: "Campaignner is the structured civic layer Nigerian democracy has always needed. This is what transparency looks like in practice.",
    name: "Policy Researcher",
    org: "Centre for Democracy & Development",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=80",
  },
  {
    quote: "Finally a platform where I can compare candidates on substance — not just social media noise. The manifesto comparison tool alone is worth it.",
    name: "First-time Voter",
    org: "Kano State",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80",
  },
  {
    quote: "As a candidate, I want a place to publish my actual policy positions and have voters hold me to them. That's what Campaignner offers.",
    name: "Gubernatorial Candidate",
    org: "Southwest Nigeria",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=80",
  },
];

export default function SocialProofSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-20">

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="rounded-[20px] border border-slate-200/80 bg-white p-6 space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-primary/8 text-brand-primary flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-3xl font-display font-semibold text-brand-text tracking-tight">
                  {stat.value}
                  <span className="text-lg text-brand-primary">{stat.suffix}</span>
                </p>
                <p className="text-xs text-brand-muted mt-1 leading-snug">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary"
            >
              Early Voices
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-4xl font-display font-semibold text-brand-text"
            >
              What people are saying
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.15 + idx * 0.1 }}
                className="bg-white rounded-[24px] border border-slate-200/80 p-7 space-y-5 hover:shadow-md transition-shadow"
              >
                {/* Quote mark */}
                <span className="text-4xl text-brand-primary/20 font-serif leading-none select-none">"</span>
                <p className="text-sm text-brand-text leading-relaxed -mt-4">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold text-brand-text">{t.name}</p>
                    <p className="text-[10px] text-brand-muted">{t.org}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}