import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CandidateHero from "@/components/candidate/candidate-landing/CandidateHero";
import CandidateBenefits from "@/components/candidate/candidate-landing/CandidateBenefits";
import CandidateEdge from "@/components/candidate/candidate-landing/CandidateEdge";
import CandidateCTA from "@/components/candidate/candidate-landing/CandidateCTA";

const PAGE_URL = "https://campaignner.com/candidate";
const PAGE_TITLE = "Run for Office With a Profile Voters Trust | Campaignner";
const PAGE_DESCRIPTION =
  "Create a verified candidate profile on Campaignner — publish your manifesto, portfolio, and public record, get discovered by undecided voters, and turn attention into endorsements. Free to register.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "candidate registration Nigeria",
    "political candidate profile",
    "campaign manifesto platform",
    "INEC candidate directory",
    "Nigeria election candidates",
    "verified political candidate",
    "Campaignner candidates",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Campaignner",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "https://campaignner.com/og/candidate.png",
        width: 1200,
        height: 630,
        alt: "Campaignner — Candidate Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["https://campaignner.com/og/candidate.png"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Campaignner Candidate Registration",
  description: PAGE_DESCRIPTION,
  provider: {
    "@type": "Organization",
    name: "Campaignner",
    url: "https://campaignner.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Political Candidates and Parties",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NGN",
    availability: "https://schema.org/InStock",
    url: PAGE_URL,
  },
};

export default function ForCandidatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen font-sans antialiased">
        <CandidateHero />
        <CandidateBenefits />
        <CandidateEdge />
        <CandidateCTA />
      </main>
    </>
  );
}