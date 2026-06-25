import Link from "next/link";

export default function Logo() {
    return (
       <div>
            <Link href="/" className="flex items-center group gap-1.5">
            
              {/* <BiSolidMegaphone className="text-blue-500 font-bold w-8 h-8" /> */}
            
            <div className="">
                <img src="/Campaignner-logo.svg" alt="Campaignner logo" className="w-full h-10 sm:w-full sm:h-12 " />
            </div>
            {/* <span className="text-md sm:text-xl font-bold text-black tracking-tighter">
              Campaignner 
            </span> */}
            <span className="text-[10px] text-gray-500 font-stretch-50% -translate-y-1 ml-0.5">NG</span>
          </Link>
        </div>
    )
}



// export function Logo2() {
//     return (
//         <div>
//             <Link href="/" className="flex items-center group">
            
//               <BiSolidMegaphone className="text-blue-500 font-bold w-8 h-8" />
            
//             {/* <div className="relative bg-white rounded-lg">
//                 <img src="/campaignner_icon.png" alt="Campaignner logo" className="absolute inset-0 w-10 h-10 " />
//             </div> */}
//             <span className="text-2xl text-black tracking-tighter">
//               ampaignner 
//             </span>
//             <span className="text-[8px] text-gray-500 font-stretch-50% -translate-y-2 ml-1">NG</span>
//           </Link>
//         </div>
//     )
// }