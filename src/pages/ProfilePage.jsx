import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import FitMakerProfile from '../components/fitMaker/FitMakerProfile';
import FitFinderProfile from '../components/fitFinder/FitFinderProfile';
import Sidebar from '../components/Sidebar';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className='flex'>
      <Sidebar />

      <section className='mx-64 max-w-screen-2xl w-full'>
        {(user && user.fitMaker) ?
          (<> <FitMakerProfile /> </>) : (<></>)}

        {(user && user.fitFinder) ?
          (<> <FitFinderProfile /> </>) : (<></>)}
      </section>
    </section>
  )
}

export default ProfilePage