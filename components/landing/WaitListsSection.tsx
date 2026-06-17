"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLES = [
  { value: "voter", label: "Voter / Concerned Citizen" },
  { value: "candidate", label: "Political Candidate / Party Rep" },
  { value: "civil", label: "Civil Society / NGO" },
  { value: "media", label: "Journalist / Media Platform" },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function WaitlistSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [state, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !role) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, role }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setFormState("success");
    } catch (err: any) {
      setFormState("error");
      setErrorMsg(err.message || "Unable to submit. Please try again.");
    }
  };

  return (
    <section
      id="waitlist"
      ref={ref}
      className="py-24 md:py-36 bg-[#0a0f1e] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(26,84,203,0.18),transparent)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-10 max-w-xl mx-auto px-6 text-center space-y-10">
        {/* Heading */}
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary"
          >
            Early Access
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tight leading-tight"
          >
            Be first to shape the future of civic engagement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-base text-white/60 leading-relaxed"
          >
            Our MVP launches soon. Join the exclusive waitlist for early access,
            invite codes, and a real voice in shaping how Campaignner
            evolves.
          </motion.p>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-[28px] p-8 backdrop-blur-sm"
        >
          {state === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 space-y-4 text-center"
            >
              <div className="w-14 h-14 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  You're on the list!
                </h3>
                <p className="text-sm text-white/60">
                  We'll email{" "}
                  <span className="text-white/90 font-medium">{email}</span>{" "}
                  with your early-access invite as soon as the MVP is ready.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="fullName"
                    className="text-white/70 text-xs font-semibold"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ibrahim Sule"
                    className="bg-white/8 border-white/15 text-white placeholder:text-white/30 focus-visible:border-white/40 focus-visible:ring-white/20 rounded-xl"
                  />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="waitlist-email"
                    className="text-white/70 text-xs font-semibold"
                  >
                    Email Address <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="waitlist-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-white/8 border-white/15 text-white placeholder:text-white/30 focus-visible:border-white/40 focus-visible:ring-white/20 rounded-xl"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="grid grid-cols-1 gap-2 w-full">
                <Label className="text-white/70 text-xs font-semibold">
                  I am a… <span className="text-red-400">*</span>
                </Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="bg-white/8 border-white/15 text-white/80 focus:ring-white/20 rounded-xl data-[placeholder]:text-white/30 w-full max-w-64">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Error */}
              {state === "error" && (
                <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">
                  {errorMsg}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={state === "loading" || !email || !role}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl h-12 text-sm font-semibold gap-2 mt-1"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Join the Waitlist Now
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-[11px] text-white/30">
                We respect your inbox. Early access invites coming soon. No
                spam.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
