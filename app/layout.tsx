import type { Metadata } from "next";
import { Lexend, Inter } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Campaignner | Engage · Discuss · Transform",
  description:
    "The platform for transparent accountability and meaningful civic engagement in Nigeria. Connect voters, candidates, civil society, and media in one respectful space.",
  applicationName: "Campaignner",
  alternates: {
    canonical: "https://campaignner.com",
  },
    openGraph: {
    title: "Campaignner — Where Democracy Gets Real",
    description:
      "Structured political discourse, transparent candidate profiles, and real civic accountability. Built for Africa.",
    url: "https://campaignner.com",
    images: [
      {
        url: "https://campaignner.com/og/campaignner.png",
        width: 1200,
        height: 630,
        alt: "Campaignner — Where Democracy Gets Real ",
      },
    ], 
    siteName: "Campaignner",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campaignner — Where Democracy Gets Real",
    description:
      "Transparent candidate profiles, evidence-based debate, and civic accountability tools. Join the waitlist.",
      images: ["https://campaignner.com/og/campaignner.png"],
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
      className={`${lexend.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
