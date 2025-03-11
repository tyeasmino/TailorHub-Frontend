import React from 'react'
import appbg from '../../assets/100Apps/category.jpg'
import shape1 from '../../assets/100Apps/pricin-shape2.png'
import shape2 from '../../assets/100Apps/category_shape3.png'
import icon1 from '../../assets/100Apps/category-icon01.png'
import icon2 from '../../assets/100Apps/category-icon02.png'
import icon3 from '../../assets/100Apps/category-icon03.png'
import icon4 from '../../assets/100Apps/category-icon04.png'
import icon5 from '../../assets/100Apps/category-icon05.png'
import icon6 from '../../assets/100Apps/category-icon06.png'
import icon7 from '../../assets/100Apps/category-icon07.png'

const AppIntegrations = () => {


    return (
        <>
            <style>
                {`
                    @keyframes floatAnimation {
                        0% { transform: translate(0, 0); }
                        25% { transform: translate(20px, -20px); } 
                        50% { transform: translate(0, -40px); }
                        75% { transform: translate(-20px, -20px); }
                        100% { transform: translate(0, 0); }
                    }

                    @keyframes bounceTwice {
                        0%, 100% { transform: translateY(0); }  
                        25% { transform: translateY(-10px); }  /* First bounce */
                        50% { transform: translateY(0); }  
                        75% { transform: translateY(-5px); }  /* Second bounce */
                    }

                     
                `}
            </style>


            <section className="mt-5 md:mt-0 py-20 bg-[#F6F6F6]" >
                <section className='relative max-w-screen-xl mx-auto py-30 flex flex-col gap-14'>
                    <h1 className='md:text-4xl text-heading dark:text-white text-center font-semibold'>More than 100+ Tailor Shop Connected</h1>

                    <img className="absolute left-0 animate-[floatAnimation_5s_infinite_linear]"
                        src={shape1} alt=""
                    />
                    <img className="absolute right-0 animate-[floatAnimation_5s_infinite_linear]"
                        src={shape2} alt=""
                    />

                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col md:flex-row items-center justify-center gap-5'>
                            {/* card 1 */}
                            <div className='bg-white rounded-md flex items-center gap-5 py-5 w-[300px] px-5 group'>
                                <img src={icon1} alt="" className="w-[50px] h-[40px] group-hover:animate-[bounceTwice_0.6s_ease-in-out]" />
                                <span className='dark:text-black font-semibold text-xl'>Stitch & Style</span>
                            </div>

                            {/* card 2 */}
                            <div className='bg-white rounded-md flex items-center gap-5 py-5 w-[300px] px-5 group'>
                                <img src={icon2} alt="" className="w-[50px] h-[40px] group-hover:animate-[bounceTwice_0.6s_ease-in-out]" />
                                <span className='dark:text-black font-semibold text-xl'>The Perfect Fit</span>
                            </div>

                            {/* card 3 */}
                            <div className='bg-white rounded-md flex items-center gap-5 py-5 w-[300px] px-5 group'>
                                <img src={icon3} alt="" className="w-[50px] h-[40px] group-hover:animate-[bounceTwice_0.6s_ease-in-out]" />
                                <span className='dark:text-black font-semibold text-xl'>TailorCraft</span>
                            </div>

                            {/* card 4 */}
                            <div className='bg-white rounded-md flex items-center gap-5 py-5 w-[300px] px-5 group'>
                                <img src={icon4} alt="" className="w-[50px] h-[40px] group-hover:animate-[bounceTwice_0.6s_ease-in-out]" />
                                <span className='dark:text-black font-semibold text-xl'>Elite Stitches</span>
                            </div>

                        </div>
                        <div className='flex flex-col md:flex-row items-center justify-center gap-5'>
                            {/* card 5 */}
                            <div className='bg-white rounded-md flex items-center gap-5 py-5 w-[300px] px-5 group'>
                                <img src={icon5} alt="" className="w-[50px] h-[40px] group-hover:animate-[bounceTwice_0.6s_ease-in-out]" />
                                <span className='font-semibold text-xl'>Seamline Studio</span>
                            </div>

                            {/* card 6 */}
                            <div className='bg-white rounded-md flex items-center gap-5 py-5 w-[300px] px-5 group'>
                                <img src={icon6} alt="" className="w-[50px] h-[40px] group-hover:animate-[bounceTwice_0.6s_ease-in-out]" />
                                <span className='font-semibold text-xl'>The Bespoke Touch</span>
                            </div>

                            {/* card 7 */}
                            <div className='bg-white rounded-md flex items-center gap-5 py-5 w-[300px] px-5 group'>
                                <img src={icon7} alt="" className="w-[50px] h-[40px] group-hover:animate-[bounceTwice_0.6s_ease-in-out]" />
                                <span className='font-semibold text-xl'>Thread & Needle</span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default AppIntegrations