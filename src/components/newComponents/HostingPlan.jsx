import React from 'react'
import { FiArrowUpRight } from "react-icons/fi";
import icon from '../../assets/hostingplan/icon.png'
import hostingbg from '../../assets/hostingplan/testi_bg.jpg'
import picon1 from '../../assets/hostingplan/pricing-icon-01.png'
import picon2 from '../../assets/hostingplan/pricing-icon-02.png'
import picon3 from '../../assets/hostingplan/pricing-icon-03.png'
import picon4 from '../../assets/hostingplan/pricing-icon-04.png'



const HostingPlan = () => {
    return (
        <section style={{ backgroundImage: `url(${hostingbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='max-w-screen-xl mx-auto py-20'>
                <div className='mt-200 md:mt-40'>
                    <h1 className='max-w-screen-sm mx-auto mb-20 md:text-4xl font-bold text-center' >Get the More Powerful With Tailor Services Plans</h1>

                    <section className='flex px-5 md:px-0 flex-col md:flex-row gap-5'>
                        {/* card 1 */}
                        <div className='md:w-1/4 border-t-4 border-blue-50 bg-white p-8 flex flex-col gap-5 group hover:border-t-4 hover:border-[#1387FF]'>
                            <img
                                className='w-fit transition-all duration-500 transform group-hover:translate-y-2 group-hover:animate-bounce'
                                src={picon1} alt=""
                            />
                            <div className='flex gap-2 items-end'>
                                <div className='flex items-start gap-1'>
                                    <span className='font-semibold text-[#1387FF] group-hover:text-[#FE8730]'>$</span>
                                    <span className='font-semibold text-3xl text-[#1387FF] group-hover:text-[#FE8730]'>67.20</span>
                                </div>
                                <span className='text-gray-500 font-semibold'>/ Mo</span>
                            </div>

                            <div className='w-full h-[0.5px] bg-gray-300'></div>

                            <div className='flex flex-col gap-2'>
                                <h1 className='font-bold text-xl'>Wordpress Hosting</h1>
                                <p>Continually optimize web host</p>
                            </div>

                            <button className='relative flex items-center justify-center rounded w-full border border-[#1387FF] px-10 py-3 overflow-hidden group'>
                                <span className='relative z-10 text-[#1387FF] group-hover:text-white'>Get Started</span>
                                <FiArrowUpRight className='text-[#1387FF] group-hover:text-white z-10' />
                                <span className='absolute inset-0 bg-[#1387FF] w-0 group-hover:w-full transition-all duration-300 ease-in-out'></span>
                            </button>



                            <ul className='flex flex-col gap-3'>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> 10 MySQL Database </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> 6GB SSD Storage </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> Money Back Guarantee </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> Automatic Backup System </li>
                            </ul>
                        </div>

                        {/* card 2 */}
                        <div className='md:w-1/4 border-t-4 border-blue-50 bg-white p-8 flex flex-col gap-5 group hover:border-t-4 hover:border-[#1387FF]'>
                            <img
                                className='w-fit transition-all duration-500 transform group-hover:translate-y-2 group-hover:animate-bounce'
                                src={picon2} alt=""
                            />
                            <div className='flex gap-2 items-end'>
                                <div className='flex items-start gap-1'>
                                    <span className='font-semibold text-[#1387FF] group-hover:text-[#FE8730]'>$</span>
                                    <span className='font-semibold text-3xl text-[#1387FF] group-hover:text-[#FE8730]'>76.20</span>
                                </div>
                                <span className='text-gray-500 font-semibold'>/ Mo</span>
                            </div>

                            <div className='w-full h-[0.5px] bg-gray-300'></div>

                            <div className='flex flex-col gap-2'>
                                <h1 className='font-bold text-xl'>Dedicated Hosting</h1>
                                <p>Continually optimize web host</p>
                            </div>

                            <button className='relative flex items-center justify-center rounded w-full border border-[#1387FF] px-10 py-3 overflow-hidden group'>
                                <span className='relative z-10 text-[#1387FF] group-hover:text-white'>Get Started</span>
                                <FiArrowUpRight className='text-[#1387FF] group-hover:text-white z-10' />
                                <span className='absolute inset-0 bg-[#1387FF] w-0 group-hover:w-full transition-all duration-300 ease-in-out'></span>
                            </button>



                            <ul className='flex flex-col gap-3'>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> 10 MySQL Database </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> 6GB SSD Storage </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> Money Back Guarantee </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> Automatic Backup System </li>
                            </ul>
                        </div>


                        {/* card 3 */}
                        <div className='md:w-1/4 border-t-4 border-blue-50 bg-white p-8 flex flex-col gap-5 group hover:border-t-4 hover:border-[#1387FF]'>
                            <img
                                className='w-fit transition-all duration-500 transform group-hover:translate-y-2 group-hover:animate-bounce'
                                src={picon3} alt=""
                            />
                            <div className='flex gap-2 items-end'>
                                <div className='flex items-start gap-1'>
                                    <span className='font-semibold text-[#1387FF] group-hover:text-[#FE8730]'>$</span>
                                    <span className='font-semibold text-3xl text-[#1387FF] group-hover:text-[#FE8730]'>87.20</span>
                                </div>
                                <span className='text-gray-500 font-semibold'>/ Mo</span>
                            </div>

                            <div className='w-full h-[0.5px] bg-gray-300'></div>

                            <div className='flex flex-col gap-2'>
                                <h1 className='font-bold text-xl'>VPS Hosting</h1>
                                <p>Continually optimize web host</p>
                            </div>

                            <button className='relative flex items-center justify-center rounded w-full border border-[#1387FF] px-10 py-3 overflow-hidden group'>
                                <span className='relative z-10 text-[#1387FF] group-hover:text-white'>Get Started</span>
                                <FiArrowUpRight className='text-[#1387FF] group-hover:text-white z-10' />
                                <span className='absolute inset-0 bg-[#1387FF] w-0 group-hover:w-full transition-all duration-300 ease-in-out'></span>
                            </button>



                            <ul className='flex flex-col gap-3'>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> 10 MySQL Database </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> 6GB SSD Storage </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> Money Back Guarantee </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> Automatic Backup System </li>
                            </ul>
                        </div>


                        {/* card 4*/}
                        <div className='md:w-1/4 border-t-4 border-blue-50 bg-white p-8 flex flex-col gap-5 group hover:border-t-4 hover:border-[#1387FF]'>
                            <img
                                className='w-fit transition-all duration-500 transform group-hover:translate-y-2 group-hover:animate-bounce'
                                src={picon4} alt=""
                            />
                            <div className='flex gap-2 items-end'>
                                <div className='flex items-start gap-1'>
                                    <span className='font-semibold text-[#1387FF] group-hover:text-[#FE8730]'>$</span>
                                    <span className='font-semibold text-3xl text-[#1387FF] group-hover:text-[#FE8730]'>67.20</span>
                                </div>
                                <span className='text-gray-500 font-semibold'>/ Mo</span>
                            </div>

                            <div className='w-full h-[0.5px] bg-gray-300'></div>

                            <div className='flex flex-col gap-2'>
                                <h1 className='font-bold text-xl'>Joomla Hosting</h1>
                                <p>Continually optimize web host</p>
                            </div>

                            <button className='relative flex items-center justify-center rounded w-full border border-[#1387FF] px-10 py-3 overflow-hidden group'>
                                <span className='relative z-10 text-[#1387FF] group-hover:text-white'>Get Started</span>
                                <FiArrowUpRight className='text-[#1387FF] group-hover:text-white z-10' />
                                <span className='absolute inset-0 bg-[#1387FF] w-0 group-hover:w-full transition-all duration-300 ease-in-out'></span>
                            </button>



                            <ul className='flex flex-col gap-3'>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> 10 MySQL Database </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> 6GB SSD Storage </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> Money Back Guarantee </li>
                                <li className='flex items-center gap-3'> <img src={icon} alt="" /> Automatic Backup System </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}

export default HostingPlan