"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Eye, FileCheck, MessageSquareHeart, BarChart4, BadgeCheckIcon } from "lucide-react";

const BENEFITS = [
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Get discovered by undecided voters",
    body: "Your profile surfaces in the Candidate Hub when voters filter by your office, party, and state — reaching people actively researching their ballot, not just your existing followers.",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    icon: <FileCheck className="w-5 h-5" />,
    title: "Turn promises into proof",
    body: "Publish your manifesto across 14 government sectors and your full public service record. Voters compare you on substance — not soundbites.",
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: <MessageSquareHeart className="w-5 h-5" />,
    title: "Convert attention into endorsements",
    body: "Supporters follow and publicly endorse your candidacy in one tap, with built-in sharing to X, WhatsApp, and Facebook — free organic reach for your campaign.",
    accent: "bg-violet-50 text-violet-600",
  },
  {
    icon: <BadgeCheckIcon className="w-5 h-5" />,
    title: "Earn the verified badge",
    body: "Verified profiles are trusted and ranked higher in search and comparison tools — a credibility signal social media simply can't offer.",
    accent: "bg-amber-50 text-amber-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function CandidateBenefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary"
          >
            Why Register
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-4xl font-display font-semibold text-brand-text tracking-tight"
          >
            Built for candidates who run on substance
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {BENEFITS.map((b) => (
            <motion.div
              key={b.title}
              variants={itemVariants}
              className="flex gap-4 p-6 rounded-[20px] border border-slate-200/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${b.accent}`}>
                {b.icon}
              </div>
              <div>
                <h3 className="font-semibold text-brand-text mb-1.5 leading-snug">{b.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{b.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}