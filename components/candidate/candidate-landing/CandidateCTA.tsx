"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CandidateCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#0a0f1e] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(26,84,203,0.22),transparent)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-display font-semibold text-white tracking-tight leading-tight"
        >
          Your record speaks louder when voters can see it
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-base text-white/60 leading-relaxed"
        >
          Set up your verified candidate profile in under 10 minutes —
          portfolio, manifesto, and campaign media, all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl px-8 font-semibold text-base h-13 gap-2 shadow-xl shadow-brand-primary/20 w-full sm:w-auto"
          >
            <Link href="/candidates/register">
              Register Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <span className="flex items-center gap-1.5 text-white/40 text-xs">
            <Clock className="w-3.5 h-3.5" />
            Takes about 10 minutes
          </span>
        </motion.div>
      </div>
    </section>
  );
}