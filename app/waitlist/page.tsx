import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're on the List — Campaignner",
};

export default function WaitlistSuccessPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-display font-semibold text-white">
            You're on the list!
          </h1>
          <p className="text-base text-white/60 leading-relaxed">
            Check your inbox — we've sent a confirmation email. We'll reach out with your
            early-access invite as soon as the Campaignner MVP is ready.
          </p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-2xl p-5 text-left space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-white/30">What happens next</p>
          {[
            ["🔐", "Identity verification opens in phase two."],
            ["📬", "You'll receive an exclusive early-access invite code."],
            ["🗳️", "Explore the Candidate Hub before the public launch."],
          ].map(([emoji, text]) => (
            <div key={text as string} className="flex items-start gap-3">
              <span className="text-base mt-0.5">{emoji}</span>
              <span className="text-sm text-white/60 leading-relaxed">{text}</span>
            </div>
          ))}
        </div>

        <Button
          className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl h-12 text-sm font-semibold gap-2"
        >
          <Link href="/">
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}