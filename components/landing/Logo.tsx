import Link from "next/link";
import { BiSolidMegaphone } from "react-icons/bi";

export default function Logo() {
    return (
        <div>
            <Link href="/" className="flex items-center gap-2.5 group">
            <div className="px-1.5 py-0.5 rounded bg-blue-500 flex items-center justify-center shadow-md shadow-brand-primary/30">
              <BiSolidMegaphone className="text-white font-bold w-7 h-7" />
            </div>
            <span className="text-3xl font-display font-semibold text-white tracking-tight">
              Campaignner 
            </span>
            <span className="text-[8px] text-white/50 font-stretch-50%">NG</span>
          </Link>
        </div>
    )
}