import Link from "next/link";
import { Mail } from "lucide-react";
import { FaXTwitter, FaLinkedin, FaFacebookF  } from "react-icons/fa6";
import Logo from "./Logo";

const LINKS = {
  Platform: [
    { label: "Candidate Hub", href: "/candidates" },
    { label: "Register as Candidate", href: "/candidates/register" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Early Access", href: "#waitlist" },
  ],
  Company: [
    { label: "About Campainner", href: "/about" },
    { label: "Press", href: "/press" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "INEC Disclaimer", href: "/disclaimer" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-white/5 text-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-12">

          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <Logo />
            <p className="text-xs sm:text-sm leading-relaxed max-w-xs text-gray-700">
              A purpose-built platform for structured, respectful, and impactful
              civic conversation in Nigeria.
            </p>
           
          </div>
             <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <FaXTwitter className="w-6 h-6" />, href: "#" },
                { icon: <FaLinkedin className="w-6 h-6" />, href: "#" },
                { icon: <FaFacebookF className="w-6 h-6" />, href: "#" },
                { icon: <Mail className="w-6 h-6" />, href: "mailto:hello@campaignner.com" },
              ].map(({ icon, href }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  className="w-8 h-8 rounded-lg text-black hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  {icon}
                </Link>
              ))}
            </div>
          {/* Links
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group} className="md:col-span-2 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                {group}
              </p>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm hover:text-white/80 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))} */}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Campaignner. All rights reserved.</p>
          <p className="text-gray-500">
            Not affiliated with INEC or any political party. Civic transparency platform only.
          </p>
        </div>
      </div>
    </footer>
  );
}