import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campaignner | Engage · Discuss · Transform",
  description:
    "The platform for transparent accountability and meaningful civic engagement in Nigeria. Connect voters, candidates, civil society, and media in one respectful space.",
  openGraph: {
    title: "Campaignner — Where Democracy Gets Real",
    description:
      "Structured political discourse, transparent candidate profiles, and real civic accountability. Built for Nigeria.",
    url: "https://campaignner.com",
    siteName: "Campaignner",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campaignner — Where Democracy Gets Real",
    description:
      "Transparent candidate profiles, evidence-based debate, and civic accountability tools. Join the waitlist.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
