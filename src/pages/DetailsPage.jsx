import React, { useState } from 'react'
import blueFlower from '../assets/fabric/blueflower.png'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { GiSelfLove } from "react-icons/gi";

const DetailsPage = () => {
     // Step 1: Initialize the state with 0 as the initial value.
  const [quantity, setQuantity] = useState(0);

  // Step 2: Define the functions to increase and decrease the quantity.
  const handleIncrease = () => {
    setQuantity(quantity + 1);  // Increase the quantity by 1.
  };

  const handleDecrease = () => {
    if (quantity > 0) {  // Ensure the number doesn't go below 0.
      setQuantity(quantity - 1);  // Decrease the quantity by 1.
    }
  };


    return (
        <section className='max-w-screen-lg my-20 m-auto '>
            <section className='flex items-center gap-10'>
                <div className='w-2/5 p-5'>
                    <img className='w-full overflow-hidden rounded-md object-cover h-full' src={blueFlower} alt="" />
                </div>
                <div className='w-3/5 p-5 flex flex-col gap-5'>
                    <h1 className='text-3xl font-bold text-gray-600'>Classy Modern Smart Watch</h1>
                    <div className='flex gap-1 text-yellow-400'>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfStroke />
                        <FaRegStar />
                    </div>
                    <div>
                        <del className='text-gray-400'>$99.00</del> <span className='text-violet-500 font-bold'>$79.00</span>
                    </div>
                    <div className='text-gray-400'>
                        I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.
                    </div>

                    <div className='flex gap-10'>
                        <div>
                            <small className='text-gray-400'>Type</small> <br />
                            <strong>Watch</strong>
                        </div>
                        <div>
                            <small className='text-gray-400'>Model Number</small> <br />
                            <strong>Forerunner 290XT</strong>
                        </div>
                    </div>

                    <div>
                        <strong>Fabric Color</strong>
                        <span className='flex gap-1'>
                            <input type="radio" name="radio-1" className="radio radio-sm " defaultChecked /> 
                            <input type="radio" name="radio-1" className="radio radio-sm radio-primary"  /> 
                            <input type="radio" name="radio-1" className="radio radio-sm radio-secondary" /> 
                            <input type="radio" name="radio-1" className="radio radio-sm radio-accent" />
                        </span>
                    </div>

                    <div>
                        <strong>Wrist Size</strong>
                        <div className='flex gap-2'>
                            <button className='border border-violet-500 px-5 py-1 rounded-md'> <strong className='text-violet-500'>S</strong> <span className='text-gray-500 font-semibold'>$69</span> </button> 
                            <button className='border border-gray-400 px-5 py-1 rounded-md'> <strong className=''>M</strong> <span className='text-gray-500 font-semibold'>$79</span> </button> 
                            <button className='border border-gray-400 px-5 py-1 rounded-md'> <strong className=''>L</strong> <span className='text-gray-500 font-semibold'>$89</span> </button> 
                            <button className='border border-gray-400 px-5 py-1 rounded-md'> <strong className=''>XL</strong> <span className='text-gray-500 font-semibold'>$99</span> </button> 
                        </div>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <div >
                            <div className=''>
                                <span onClick={handleDecrease} className='border text-gray-400 cursor-pointer rounded-l-md px-3 py-1'>-</span>
                                <span className='border px-8 py-1'> {quantity} </span>
                                <span onClick={handleIncrease} className='border text-gray-400 cursor-pointer rounded-r-md px-3 py-1'>+</span>
                            </div>
                        </div>
                        <button className='bg-violet-500 px-5 py-1 rounded-md text-white cursor-pointer'>Add to Cart</button>
                        <GiSelfLove className='text-violet-500'/>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default DetailsPage