import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedDress from '../components/FeaturedDress'
import Services from '../components/Services' 
import UpcomingDress from '../components/UpcomingDress'
import AllProfiles from './AllProfiles'
import AppIntegrations from '../components/newComponents/AppIntegrations'
import Brands from '../components/newComponents/Brands'
import HostingPlan from '../components/newComponents/HostingPlan'
import WeAre from '../components/newComponents/WeAre'


const Home = () => {
  return (
    <section>
        <HeroSection />
        <FeaturedDress />
        <AppIntegrations />
        <AllProfiles homeView={true} />
        <Services />
        <Brands />
        <UpcomingDress />
        <WeAre />
        <HostingPlan />
    </section>
  )
}

export default Home