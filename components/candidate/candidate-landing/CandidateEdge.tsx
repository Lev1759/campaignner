"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check, X } from "lucide-react";

const COMPARISON = [
  { feature: "Searchable by office, party & state", campaignner: true, social: false },
  { feature: "Permanent, version-tracked manifesto", campaignner: true, social: false },
  { feature: "Side-by-side comparison with rivals", campaignner: true, social: false },
  { feature: "Verified identity badge", campaignner: true, social: false },
  { feature: "One-click public endorsements", campaignner: true, social: true },
  { feature: "Immune to algorithm reach throttling", campaignner: true, social: false },
];

export default function CandidateEdge() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-24 bg-[#f8fafc]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12 space-y-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary"
          >
            The Campaignner Edge
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-4xl font-display font-semibold text-brand-text tracking-tight"
          >
            More durable than a social media post
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-[24px] border border-slate-200/80 shadow-sm overflow-hidden"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] items-center px-5 sm:px-7 py-4 border-b border-slate-100 bg-slate-50/60">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Feature</span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary text-center">Campaignner</span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-muted text-center">Social Media</span>
          </div>

          {COMPARISON.map((row, idx) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15 + idx * 0.06 }}
              className={`grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] items-center px-5 sm:px-7 py-4 ${
                idx !== COMPARISON.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <span className="text-sm text-brand-text font-medium pr-3">{row.feature}</span>
              <span className="flex justify-center">
                {row.campaignner ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center">
                    <X className="w-3.5 h-3.5 text-rose-500" />
                  </span>
                )}
              </span>
              <span className="flex justify-center">
                {row.social ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center">
                    <X className="w-3.5 h-3.5 text-rose-500" />
                  </span>
                )}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}