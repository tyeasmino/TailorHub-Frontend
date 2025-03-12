import { useTour } from '@reactour/tour'
import React from 'react'
import { SiTourbox } from "react-icons/si";

const StartTourButton = () => {
    const {setIsOpen} = useTour()
  return (
    <button 
        onClick={() => setIsOpen(true)}
        className=' bg-black text-white px-5 py-2'>
          <SiTourbox /> 
    </button>
  )
}

export default StartTourButton