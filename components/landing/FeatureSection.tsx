"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Vote,
  Megaphone,
  Newspaper,
  Users,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const AUDIENCE_CARDS = [
  {
    emoji: <Vote className="w-6 h-6" />,
    role: "Voters",
    headline: "Ask the questions that matter",
    body: "Put tough questions directly to candidates, access verified policy breakdowns, and connect with like-minded citizens for coordinated local action.",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    emoji: <Megaphone className="w-6 h-6" />,
    role: "Candidates & Parties",
    headline: "Build trust that lasts beyond election day",
    body: "Respond transparently to constituent concerns, publish evidence-backed positions, and grow an engaged following you actually own.",
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    emoji: <Newspaper className="w-6 h-6" />,
    role: "Media & Civil Society",
    headline: "Host debate that moves the needle",
    body: "Facilitate fact-checked discussions, track public sentiment in real time, and amplify civic stories to audiences who are already engaged.",
    accent: "bg-violet-50 text-violet-600",
  },
];

const PLATFORM_VALUES = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Verified Identities",
    body: "Every participant — voter, candidate, journalist — is identity-verified. No bots. No sock puppets. Just real civic voices.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Structured Discourse",
    body: "Discussions are threaded, moderated, and tagged by topic. Quality rises to the top, noise is surfaced for review.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Transparency Engine",
    body: "Candidate positions, voting records, and manifesto commitments are published, versioned, and publicly auditable.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-24">

        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary"
          >
            The Idea
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-4xl md:text-5xl font-display font-semibold text-brand-text tracking-tight leading-tight"
          >
            Tired of toxic echo chambers{" "}
            <br className="hidden md:block" />
            and performative politics?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto"
          >
            Campaignner is a purpose-built platform where voters, candidates,
            journalists, and civil society engage in{" "}
            <strong className="text-brand-text font-semibold">evidence-based discussion</strong>,
            policy deep-dives, and accountable public discourse. Think of it as
            the respectful town hall that never closes.
          </motion.p>
        </div>

        {/* Audience cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {AUDIENCE_CARDS.map((card) => (
            <motion.div
              key={card.role}
              variants={itemVariants}
              className="group bg-white rounded-[24px] border border-slate-200/80 p-8 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 space-y-4"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.accent}`}>
                {card.emoji}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-2">
                  {card.role}
                </p>
                <h3 className="text-xl font-display font-semibold text-brand-text leading-snug mb-3">
                  {card.headline}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">{card.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform values strip */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-100 pt-16"
        >
          {PLATFORM_VALUES.map((v) => (
            <motion.div key={v.title} variants={itemVariants} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/8 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                {v.icon}
              </div>
              <div>
                <h4 className="font-semibold text-brand-text mb-1">{v.title}</h4>
                <p className="text-sm text-brand-muted leading-relaxed">{v.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}