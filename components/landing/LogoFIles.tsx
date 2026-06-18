import React from 'react'
import { BiSolidMegaphone } from 'react-icons/bi'

const LogoFIles = () => {
  return (
    <div className='grid grid-cols-2 max-w-5xl mx-auto py-60 gap-8'>
        <BiSolidMegaphone className="text-black font-bold w-60 h-60" />
        <BiSolidMegaphone className="text-blue-500 font-bold w-60 h-60" />
        <BiSolidMegaphone className="text-yellow-500 font-bold w-60 h-60" />
        <BiSolidMegaphone className="text-green-500 font-bold w-60 h-60" />
        <BiSolidMegaphone className="text-sky-500 font-bold w-60 h-60" />
        <BiSolidMegaphone className="text-orange-500 font-bold w-60 h-60" />
        <BiSolidMegaphone className="text-white font-bold w-60 h-60" />
    </div>
  )
}

export default LogoFIles;