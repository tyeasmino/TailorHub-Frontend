import React from 'react'
import sewingMachine from '../assets/sewingMachine.png'
import bgIMG from '../assets/bg.gif'


const HeroSection = () => {
    return (
        <section>
            <div className='bg-purple dark:bg-dark'>
                <div className='max-w-screen-xl flex items-center justify-between py-20 gap-20 m-auto '>
                    <div className='w-1/2'>
                        <h6 className='text-pink text-sm'>Best Dress For Your Programs....</h6>
                        <h3 className='text-5xl  font-bold'>New Fabric Collection Trends in 2025</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing
                        in phasellus non in justo.</p>
                        <button className='mt-5 bg-pink text-white px-8 py-2 rounded'>Shop Now</button>
                    </div>

                    <div className='w-1/2'>
                        <img src={bgIMG} className='px-20' alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection