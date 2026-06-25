import type { Metadata } from "next";
import { Lexend, Inter } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://campaignner.com";
const BRAND_TITLE = "Campaignner — Verified Civic Engagement Platform";
const BRAND_DESCRIPTION =
  "Campaignner is a verified civic engagement platform — connecting voters, candidates, civil society, and media in one accountable space for evidence-based political discourse.";
const OG_IMAGE = `${SITE_URL}/og/campaignner-og.png`; 
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

 
  title: {
    default: BRAND_TITLE,
    template: "%s | Campaignner",
  },
  description: BRAND_DESCRIPTION,
  applicationName: "Campaignner",
  keywords: [
    "Campaignner",
    "civic engagement platform Nigeria",
    "verified voter platform",
    "candidate accountability Nigeria",
    "Nigeria elections transparency",
    "civic tech Nigeria",
    "political portfolio",
    "candidate manifesto",
  ],
  authors: [{ name: "Campaignner" }],
  creator: "Campaignner",
  publisher: "Campaignner",

  // Tells Google exactly how to index/crawl — prevents accidental noindex
  // and explicitly allows large image previews for richer SERP snippets.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/favicon.ico", 
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", 
  },
  manifest: "/site.webmanifest", 

  openGraph: {
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
    url: SITE_URL,
    siteName: "Campaignner",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Campaignner — Verified Civic Engagement Platform",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@campaignner", 
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
    images: [OG_IMAGE],
  },

  
  other: {
    "application-name": "Campaignner",
  },
};


function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Campaignner",
    alternateName: "Campaignner Civic Platform",
    url: SITE_URL,
    logo: `${SITE_URL}/og/Campaignner-logo.svg`,
    description: BRAND_DESCRIPTION,
    sameAs: [
     
      "https://x.com/CampaignnerHQ",
      "https://www.facebook.com/campaignner",
    ],
  };

  return (
    <script
      type="application/ld+json"
      
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

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
      <head>
        <OrganizationSchema />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}




