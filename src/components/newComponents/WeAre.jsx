import React from 'react'
import about from '../../assets/WeAre/about-thumb.png'
import about_icon from '../../assets/WeAre/about_icon.png'
import about_icon2 from '../../assets/WeAre/about_icon2.png'
import { FaArrowTrendUp } from "react-icons/fa6";


const WeAre = () => {
    return (
        <section className='bg-[#F6F6F6] dark:bg-transparent py-10 md:py-0'>
            <section className='max-w-screen-xl px-5 md:px-0 md:py-20 mx-auto flex flex-col md:flex-row gap-5 md:gap-20 items-center justify-between'>
                <div className='w-full md:w-1/2'>
                    <img src={about} alt="" />
                </div>
                <div className='w-full md:w-1/2 flex flex-col gap-10'>
                    <h1 className='md:text-4xl font-bold'>We're Most Powerful and Best Tailor Service Provider Agency</h1>

                    <ul className='flex flex-col gap-3'>
                        <li className='flex flex-col md:flex-row gap-3 items-start'>
                            <img src={about_icon} alt="" />
                            <p>Our highly skilled tailors bring years of experience, ensuring every stitch is crafted with perfection for a flawless fit that enhances your style.</p>
                        </li>

                        <li className='flex flex-col md:flex-row gap-3 items-start'>
                            <img src={about_icon2} alt="" />
                            <p>We combine top-tier materials with expert tailoring to deliver luxurious, custom-made outfits that suit your budget without compromising on quality.</p>
                        </li>

                        <li className='flex flex-col md:flex-row gap-3 items-start'>
                            <img src={about_icon} alt="" />
                            <p>Whether you need alterations, custom designs, or bespoke suits, we guarantee a seamless experience with timely delivery and attention to every detail.</p>
                        </li>
                    </ul>

                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className='bg-white dark:bg-transparent flex flex-col gap-5 rounded-md border-b-4 border-[#1387FF] group  hover:border-[#FE8730] p-7'>
                            <div className='flex items-center gap-4'>
                                <span className='text-4xl font-bold text-[#1387FF] group-hover:text-[#FE8730]'>85%</span>
                                <FaArrowTrendUp className='text-green-500' />
                            </div>
                            <p> Increases buisness with less efforts </p>
                        </div>
                        <div className='bg-white dark:bg-transparent flex flex-col gap-5  rounded-md border-b-4 border-[#1387FF] group  hover:border-[#FE8730] p-7'>
                            <div className='flex items-center gap-4'>
                                <span className='text-4xl font-bold text-[#1387FF] group-hover:text-[#FE8730]'>TM+</span>
                                <FaArrowTrendUp className='text-green-500' />
                            </div>
                            <p> Customers information protection is our first Priority </p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default WeAre