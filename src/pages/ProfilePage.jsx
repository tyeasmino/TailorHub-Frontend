import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import FitMakerProfile from '../components/FitMakerProfile';
import FitFinderProfile from '../components/FitFinderProfile';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

  return (
    <section>
        {(user && user.fitMaker) ? 
        (<> <FitMakerProfile /> </>) : (<></>)}

        {(user && user.fitFinder) ? 
        (<> <FitFinderProfile /> </>) : (<></>)}
    </section>
  )
}

export default ProfilePage