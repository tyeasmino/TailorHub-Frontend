import React, { useContext } from 'react'
import FitMakerDashboard from '../components/fitMaker/FitMakerDashboard'
import FitFinderDashboard from '../components/fitFinder/FitFinderDashboard'
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const { user } = useContext(AuthContext);


  return (
    <section className='flex'>
      <Sidebar />

      <section className='mx-64 p-10 max-w-screen-2xl w-full'>
        {(user && user.fitMaker) ?
          (<> <FitMakerDashboard /> </>) : (<></>)}

        {(user && user.fitFinder) ?
          (<> <FitFinderDashboard /> </>) : (<></>)}
      </section>
    </section>
  )
}

export default Dashboard