import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import { MdOutlineSettingsPhone } from 'react-icons/md';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { CgWebsite } from 'react-icons/cg';
import { RiFacebookCircleLine } from 'react-icons/ri';

const AllProfiles = ({ homeView = false }) => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = homeView
                    ? `https://tailor-hub-backend.vercel.app/fitMakers/fit-makers-profiles/?limit=3`
                    : `https://tailor-hub-backend.vercel.app/fitMakers/fit-makers-profiles/`;

                const response = await axios.get(url);
                setProfiles(homeView ? response.data.results.slice(0, 3) : response.data.results);
                setNextPage(response.data.next);
                setPreviousPage(response.data.previous);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [homeView, location.search]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="max-w-screen-2xl p-10 m-auto flex flex-col gap-10">
            <h1 className="text-black dark:text-white text-center font-semibold text-3xl mb-10">
                {homeView ? "Top Profiles" : "All Profiles"}
            </h1>


            {homeView ? (
                // Custom Layout for Home Page
                <div className="flex flex-col gap-10">
                    <div className='flex flex-col md:flex-row gap-5 max-w-screen-xl m-auto'>

                        {profiles.map((profile, index) => (
                            <div
                                key={profile.id}
                                className={`w-full md:w-1/3 flex flex-col  md:flex-row items-center  bg-white shadow-lg p-3 rounded-lg`}
                            >
                                {/* {index % 2 === 0 ? ( */}
                                <>
                                    <Link to={`/profiles/${profile.id}`} className="w-full p-3 md:w-1/3 rounded-lg" >
                                        <img
                                            alt={profile?.name}
                                            src={profile?.image}
                                        />
                                    </Link>

                                    <div className="w-full md:w-2/3 p-3 text-left">
                                        <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
                                        <p className="text-gray-500 mt-1">Started: {profile?.shop_started}</p>
                                        <p className="text-gray-500 mt-1">Address: {profile?.shop_address}</p>
                                        <p className="text-gray-500 mt-1">Open Hours: {profile?.shop_hours || 'Not Added Yet'}</p>

                                        {/* Contact Links */}
                                        <div className="mt-4 flex gap-4 text-lg">
                                            {profile?.whatsapp && (
                                                <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
                                                    <FaWhatsapp className="text-green-500 hover:text-green-700" />
                                                </a>
                                            )}
                                            {profile?.website && (
                                                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                                                    <CgWebsite className="text-blue-500 hover:text-blue-700" />
                                                </a>
                                            )}
                                            {profile?.facebook && (
                                                <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
                                                    <RiFacebookCircleLine className="text-blue-600 hover:text-blue-800" />
                                                </a>
                                            )}
                                            {profile?.instagram && (
                                                <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                                                    <FaInstagram className="text-pink-500 hover:text-pink-700" />
                                                </a>
                                            )}
                                            <MdOutlineSettingsPhone className="text-gray-600" />
                                        </div>
                                    </div>
                                </>
                                {/* ) : (
                                <>
                                    <div className="w-full md:w-2/3 text-left">
                                        <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
                                        <p className="text-gray-500 mt-1">Started: {profile?.shop_started}</p>
                                        <p className="text-gray-500 mt-1">Address: {profile?.shop_address}</p>
                                        <p className="text-gray-500 mt-1">Open Hours: {profile?.shop_hours}</p>
 
                                        <div className="mt-4 flex gap-4 text-lg">
                                            {profile?.whatsapp && (
                                                <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
                                                    <FaWhatsapp className="text-green-500 hover:text-green-700" />
                                                </a>
                                            )}
                                            {profile?.website && (
                                                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                                                    <CgWebsite className="text-blue-500 hover:text-blue-700" />
                                                </a>
                                            )}
                                            {profile?.facebook && (
                                                <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
                                                    <RiFacebookCircleLine className="text-blue-600 hover:text-blue-800" />
                                                </a>
                                            )}
                                            {profile?.instagram && (
                                                <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                                                    <FaInstagram className="text-pink-500 hover:text-pink-700" />
                                                </a>
                                            )}
                                            <MdOutlineSettingsPhone className="text-gray-600" />
                                        </div>
                                    </div>
                                    <Link to={`/profiles/${profile.id}`}>
                                        <img
                                            className="w-full md:w-1/2   rounded-lg"
                                            alt={profile?.name}
                                            src={profile?.image}
                                        />
                                    </Link>
                                </>
                            )} */}
                            </div>
                        ))}
                    </div>


                    {/* Button to View All Profiles */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => navigate('/profiles')}
                            className="px-6 py-3 bg-violet-500 text-white rounded-md text-sm font-semibold hover:bg-indigo-800 transition"
                        >
                            View All Profiles
                        </button>
                    </div>
                </div>
            ) : (
                // Full View: Grid Layout
                <>
                    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
                        {profiles.map(profile => (
                            <article key={profile.id}>
                                <Profile profile={profile} />
                            </article>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between mt-8 items-center">
                        <button
                            onClick={() => navigate(`?page=${previousPage}`)}
                            disabled={!previousPage}
                            className={`px-4 py-2 bg-gray-500 text-white rounded-md ${!previousPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Prev
                        </button>

                        <button
                            onClick={() => navigate(`?page=${nextPage}`)}
                            disabled={!nextPage}
                            className={`px-4 py-2 bg-gray-500 text-white rounded-md ${!nextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </section>
    );
};

export default AllProfiles;
