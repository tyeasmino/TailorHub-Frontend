import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineLightMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { TbNeedleThread } from "react-icons/tb";
import { Link, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { LiaUserEditSolid } from 'react-icons/lia';
import axios from 'axios';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
    const [profileData, setProfileData] = useState({ image: '', balance: null });
    const location = useLocation();

    // Re-fetch profile data
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            // Fetch the profile for FitMaker
            if (user && user.fitMaker) {
                const res = await axios.get(
                    `http://127.0.0.1:8000/fitMakers/fit-makers/${user.fitMaker}`,
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );

                if (res.data) {
                    setProfileData((prevData) => ({
                        ...prevData,
                        ...res.data,
                    }));
                }
            }

            // Fetch the profile for FitFinder
            if (user && user.fitFinder) {
                const res = await axios.get(
                    `http://127.0.0.1:8000/fitFinders/fit-finder/${user.fitFinder}`,
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );

                if (res.data) {
                    setProfileData((prevData) => ({
                        ...prevData,
                        ...res.data,
                    }));
                }
            }
        } catch (error) {
            console.error("Error fetching profile: ", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));

        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    // Function to handle any changes that might trigger balance update
    const updateBalance = () => {
        fetchProfile(); // Trigger profile re-fetch after action
    };

    const isOnProtectedPage = location.pathname === '/dashboard' || location.pathname === '/profile'
        || location.pathname === '/measurement' || location.pathname === '/inventory';

    return (
        <section className='mx-64 max-w-screen-2xl'>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Home</a></li>
                            <li><a>Pages</a></li>
                            <li><a>Products</a></li>
                            <li><a>Blog</a></li>
                            <li><a>Shop</a></li>
                            <li><a>Contact</a></li>
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl"> <TbNeedleThread /> TailorHub</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/">Home</Link></li>
                        <li><a>Pages</a></li>
                        <li><a>Products</a></li>
                        <li><a>Blog</a></li>
                        <li><a>Shop</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex items-center">

                        {/* dark mode */}
                        <div className="dropdown dropdown-end">
                            <div className="btn btn-ghost btn-circle">
                                <p onClick={() => setDarkMode(!darkMode)} className=' cursor-pointer text-[25px]'>
                                    {darkMode ? <MdOutlineLightMode /> : <MdLightMode />}
                                </p>
                            </div>
                        </div>

                        {/* Conditionally Render Balance for fitMaker */}
                        {user && user.fitMaker && profileData.balance !== null ? (
                            <div className="mr-4">
                                <span className="text-lg font-bold">Balance: ${profileData.balance}</span>
                            </div>
                        ) : null}

                        {/* cart part */}
                        {!user || !user.fitMaker ? (
                            <Link to='/cart'>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                        <div className="indicator">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <span className="badge badge-sm indicator-item">0</span>
                                        </div>
                                    </div>
                                    <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                                        <div className="card-body">
                                            <span className="text-lg font-bold">8 Items</span>
                                            <span className="text-info">Subtotal: $999</span>
                                            <div className="card-actions">
                                                <button className="btn btn-primary btn-block">View cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ) : null}

                        <div className="dropdown dropdown-end">
                            {user ? (
                                <>
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            {/* user profile img */}
                                            {profileData.image ? (
                                                <img src={profileData.image} />
                                            ) : (
                                                <LiaUserEditSolid className='cursor-pointer text-[25px]' />
                                            )}
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                        {/* Conditionally render profile-related links */}
                                        {!isOnProtectedPage && (
                                            <>
                                                <li>
                                                    <Link to="/dashboard">Dashboard</Link>
                                                </li>
                                            </>
                                        )}

                                        {/* Logout button is always visible */}
                                        <li>
                                            <button onClick={logout}>Logout</button>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <div className='flex gap-2'>
                                    <div className="btn btn-ghost btn-circle">
                                        <Link to='/login' className=' cursor-pointer '> SignIn </Link>
                                    </div>
                                    <div className="btn btn-ghost btn-circle">
                                        <Link to='/registration' className=' cursor-pointer '> SignUp </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Navbar;
