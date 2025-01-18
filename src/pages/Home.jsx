import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedDress from '../components/FeaturedDress'
import Services from '../components/Services' 
import UpcomingDress from '../components/UpcomingDress'

const Home = () => {
  return (
    <section>
        <HeroSection />
        <FeaturedDress />
        <Services />
        <UpcomingDress />
    </section>
  )
}

export default Home