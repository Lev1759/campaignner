'use client';

import React, { useState } from 'react';
import Logo from './landing/Logo';
import HowItWorksSection from './landing/HowItWorksSection';
import FeaturesSection from './landing/FeatureSection';

export default function CampaignnerLanding() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      alert("✅ Thank you! You've been added to the Bantrant Civic waitlist.\n\nEarly access invites will be sent soon.");
      setFormData({ fullName: '', email: '', role: '' });
      setIsSubmitting(false);
    }, 750);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Logo />

          <div className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#for-you" className="hover:text-emerald-600">Platform</a>
            <a href="#for-you" className="hover:text-emerald-600">For Everyone</a>
            <a href="#waitlist" className="hover:text-emerald-600">Join</a>
          </div>

          <a href="#waitlist" className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-medium hover:bg-emerald-700 transition">
            Get Early Access
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen bg-zinc-950 text-white pt-20 flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-2 rounded-full text-sm mb-8 border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> MVP Early Access Open
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
              Where Democracy<br />Gets Real
            </h1>

            <p className="text-xl md:text-2xl text-zinc-300 mb-12 max-w-xl">
              A respectful, transparent space for voters, candidates, journalists, and civil society to engage meaningfully.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#waitlist" className="inline-flex items-center justify-center gap-3 bg-white text-zinc-900 px-10 py-4 rounded-3xl font-semibold text-lg hover:bg-zinc-100 transition">
                Join the Waitlist →
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-3 border border-white/50 hover:bg-white/10 px-8 py-4 rounded-3xl text-lg transition">
                Watch Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section id="for-you" className="py-28 bg-white">
        <FeaturesSection />
        <HowItWorksSection />
        
        {/* <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-semibold tracking-tight">Built for Real Civic Impact</h2>
            <p className="mt-4 text-xl text-zinc-600">A better alternative to toxic political discourse</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-3xl font-medium leading-snug tracking-tight">
                Tired of echo chambers and shouting matches?
              </p>
              <p className="mt-8 text-lg text-zinc-600">
                Bantrant Civic brings back structured, evidence-based discussion with verified users, thoughtful moderation, and tools that reward good-faith participation.
              </p>
            </div>

            <div className="space-y-14">
              {[
                ["🗳️", "Voters", "Ask candidates direct questions, access policy breakdowns, and mobilize around local issues."],
                ["📣", "Candidates", "Engage authentically, respond transparently, and build trust with your constituents."],
                ["📰", "Media & Civil Society", "Host debates, fact-check in real time, and amplify important civic stories."]
              ].map(([emoji, title, desc], i) => (
                <div key={i} className="flex gap-6">
                  <div className="text-4xl flex-shrink-0">{emoji}</div>
                  <div>
                    <h3 className="font-semibold text-2xl mb-2">{title}</h3>
                    <p className="text-zinc-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-28 bg-zinc-950 text-white">
        <div className="max-w-lg mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold tracking-tight mb-4">Be Among the First</h2>
          <p className="text-zinc-400 text-lg mb-10">Help shape the future of respectful civic technology</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-8 py-4 text-lg focus:outline-none focus:border-emerald-600 placeholder:text-zinc-500"
              required
            />
            
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-8 py-4 text-lg focus:outline-none focus:border-emerald-600 placeholder:text-zinc-500"
              required
            />

            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl px-8 py-4 text-lg focus:outline-none focus:border-emerald-600 text-white"
              required
            >
              <option value="">I am a...</option>
              <option value="voter">Voter / Concerned Citizen</option>
              <option value="candidate">Political Candidate / Party</option>
              <option value="civil">Civil Society / NGO</option>
              <option value="media">Journalist / Media</option>
            </select>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 rounded-3xl font-semibold text-xl transition"
            >
              {isSubmitting ? "Joining..." : "Join the Waitlist"}
            </button>
          </form>

          <p className="text-xs text-zinc-500 mt-8">We respect your inbox. No spam.</p>
        </div>
      </section>
    </div>
  );
}