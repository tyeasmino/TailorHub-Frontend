import React, { useContext } from 'react'
import FitMakerDashboard from '../components/fitMaker/FitMakerDashboard'
import FitFinderDashboard from '../components/fitFinder/FitFinderDashboard'
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);


  return (
    <section className='max-w-screen-2xl p-10 m-auto'>
      {(user && user.fitMaker) ?
        (<> <FitMakerDashboard /> </>) : (<></>)}

      {(user && user.fitFinder) ?
        (<> <FitFinderDashboard /> </>) : (<></>)}
    </section>
  )
}

export default Dashboard