import React from 'react'
import { TbCurrencyTaka } from "react-icons/tb";
import panjabi from '../assets/panjabi.jpg'
import whiteImg from '../assets/white.png'
import girl from '../assets/girl.jpg'
import boy from '../assets/boy.jpg'
import { TbShoppingCartPlus } from "react-icons/tb";
import { TbEye } from "react-icons/tb";




const FeaturedDress = () => {
    return (
        <section className='max-w-screen-xl m-auto py-20'>
            <h2 className='text-heading  text-center font-semibold text-3xl' >Featured Dress</h2>

            <div className='flex justify-between mt-10'>
                <div className="shadow-lg group relative">
                    <div className="top relative">
                        {/* Cart Icon */}
                        <TbShoppingCartPlus className="absolute top-2 left-2 opacity-0 dark:group-hover:text-black group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Eye Icon */}
                        <TbEye className="absolute top-2 left-8 opacity-0 dark:group-hover:text-black group-hover:opacity-100 transition-opacity duration-300" />

                        <img className="w-52 h-60 p-2 object-center overflow-hidden rounded-t-lg bg-dress_bg" src={panjabi} alt="Panjabi" />
                    </div>

                    <div className="py-3 text-center  group-hover:bg-purple  transition-all duration-300">
                        <h6 className="text-pink group-hover:text-black font-semibold">Panjabi</h6>
                        <span className="text-heading group-hover:text-black font-semibold text-sm text-center flex items-center justify-center">
                            <TbCurrencyTaka />390
                        </span>
                    </div>
                </div>
                
                <div className="shadow-lg group relative">
                    <div className="top relative">
                        {/* Cart Icon */}
                        <TbShoppingCartPlus className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Eye Icon */}
                        <TbEye className="absolute top-2 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <img className="w-52 h-60 p-2  object-center overflow-hidden rounded-t-lg bg-dress_bg" src={whiteImg}   />
                    </div>

                    <div className="py-3 text-center  group-hover:bg-purple  transition-all duration-300">
                        <h6 className="text-pink group-hover:text-black font-semibold">Frock</h6>
                        <span className="text-heading group-hover:text-black font-semibold text-sm text-center flex items-center justify-center">
                            <TbCurrencyTaka />370
                        </span>
                    </div>
                </div>

                <div className="shadow-lg group relative">
                    <div className="top relative">
                        {/* Cart Icon */}
                        <TbShoppingCartPlus className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Eye Icon */}
                        <TbEye className="absolute top-2 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <img className="w-52 h-60   object-center overflow-hidden rounded-t-lg bg-dress_bg" src={girl} alt="Panjabi" />
                    </div>

                    <div className="py-3 text-center  group-hover:bg-purple  transition-all duration-300">
                        <h6 className="text-pink group-hover:text-black font-semibold">Panjabi</h6>
                        <span className="text-heading group-hover:text-black font-semibold text-sm text-center flex items-center justify-center">
                            <TbCurrencyTaka />430
                        </span>
                    </div>
                </div>
                
                <div className="shadow-lg group relative">
                    <div className="top relative">
                        {/* Cart Icon */}
                        <TbShoppingCartPlus className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Eye Icon */}
                        <TbEye className="absolute top-2 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <img className="w-52 h-60  object-center overflow-hidden rounded-t-lg bg-dress_bg" src={boy}   />
                    </div>

                    <div className="py-3 text-center  group-hover:bg-purple  transition-all duration-300">
                        <h6 className="text-pink group-hover:text-black font-semibold">Panjabi</h6>
                        <span className="text-heading group-hover:text-black font-semibold text-sm text-center flex items-center justify-center">
                            <TbCurrencyTaka />390
                        </span>
                    </div>
                </div>

                <div className="shadow-lg group relative">
                    <div className="top relative">
                        {/* Cart Icon */}
                        <TbShoppingCartPlus className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Eye Icon */}
                        <TbEye className="absolute top-2 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <img className="w-52 h-60 p-2  object-center overflow-hidden rounded-t-lg bg-dress_bg" src={whiteImg}   />
                    </div>

                    <div className="py-3 text-center  group-hover:bg-purple  transition-all duration-300">
                        <h6 className="text-pink group-hover:text-black font-semibold">Frock</h6>
                        <span className="text-heading group-hover:text-black font-semibold text-sm text-center flex items-center justify-center">
                            <TbCurrencyTaka />370
                        </span>
                    </div>
                </div>

                 
            </div>


        </section>
    )
}

export default FeaturedDress