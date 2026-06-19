import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import type { Metadata } from "next";

const PAGE_URL = "https://campaignner.com/candidates/register";
const PAGE_TITLE = "Register as a Candidate | Campaignner";
const PAGE_DESCRIPTION =
  "Create your verified candidate profile on Campaignner in three steps. Publish your biography, political portfolio, and manifesto across 14 government sectors — free and takes just 10 minutes.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "candidate registration",
    "register as a candidate Nigeria",
    "political candidate sign up",
    "create candidate profile",
    "Campaignner registration",
    "manifesto publishing platform",
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
        url: "https://campaignner.com/og/register.png",
        width: 1200,
        height: 630,
        alt: "Campaignner — Candidate Registration Form",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["https://campaignner.com/og/register.png"],
  },
  robots: {
    // Logged-in form flow: index the entry point, but signal it's a utility page
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://campaignner.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "For Candidates",
      item: "https://campaignner.com/for-candidates",
    },
    { "@type": "ListItem", position: 3, name: "Register", item: PAGE_URL },
  ],
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row">
        <Navbar />
        <div className="flex-1 flex flex-col py-20">
          <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
       <Footer />
    </>
  );
}

// import Navbar from "@/components/landing/Navbar";

// function Candidatelayout({ children }: any) {
//   return (
//     <div className="min-h-screen max-w-7xl mx-auto bg-zinc-100 flex flex-col md:flex-row">
//       <Navbar />

//       <div className="flex-1 flex flex-col">
//         <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Candidatelayout;
