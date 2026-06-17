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
    <footer className="bg-[#070b16] border-t border-white/5 text-white/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed max-w-xs">
              A purpose-built platform for structured, respectful, and impactful
              civic conversation in Nigeria.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <FaXTwitter className="w-4 h-4" />, href: "#" },
                { icon: <FaLinkedin className="w-4 h-4" />, href: "#" },
                { icon: <FaFacebookF className="w-4 h-4" />, href: "#" },
                { icon: <Mail className="w-4 h-4" />, href: "mailto:hello@campaignner.com" },
              ].map(({ icon, href }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
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
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Campaignner. All rights reserved.</p>
          <p className="text-white/30">
            Not affiliated with INEC or any political party. Civic transparency platform only.
          </p>
        </div>
      </div>
    </footer>
  );
}