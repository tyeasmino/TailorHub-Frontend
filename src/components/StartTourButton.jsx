import { useTour } from '@reactour/tour'
import React from 'react'

const StartTourButton = () => {
    const {setIsOpen} = useTour()
  return (
    <button 
        onClick={() => setIsOpen(true)}
        className='text-sm bg-black text-white px-5 py-2'>
        Start Tour
    </button>
  )
}

export default StartTourButton