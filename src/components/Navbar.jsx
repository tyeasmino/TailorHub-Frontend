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
    const [dresses, setDresses] = useState([]);
    const [services, setServices] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Re-fetch profile data
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token"); 

            // Fetch the profile for FitMaker
            if (user && user.fitMaker) {
                const res = await axios.get(
                    `https://tailor-hub-backend.vercel.app/fitMakers/fit-makers/${user.fitMaker}`,
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
                    `https://tailor-hub-backend.vercel.app/fitFinders/fit-finder/${user.fitFinder}`,
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
        if (!token) {
            setError('Authentication required');
            setLoading(false);
            return;
        }
 
        axios.get('https://tailor-hub-backend.vercel.app/orders/mycart/', {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
            .then(response => {
                setCartItems(response.data);   
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching cart items');
                setLoading(false);
            });

        axios.get('https://tailor-hub-backend.vercel.app/inventory/all_items/', {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
            .then(response => {
                if (Array.isArray(response.data.results)) {
                    setDresses(response.data.results);  
                } else {
                    setDresses([]);  
                    setError('Unexpected data format for dresses');
                }
            })
            .catch(err => {
                setError('Error fetching dresses');
            });



        axios.get('https://tailor-hub-backend.vercel.app/measurements/dress_category/', {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
            .then(response => {
                setServices(response.data);   
            })
            .catch(err => {
                setError('Error fetching tailor services');
            });

    }, [token]);


    // Calculate total price and selected dress price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const dress = Array.isArray(dresses) ? dresses.find(d => d.id === item.fabric_or_dress) : null;
            const service = Array.isArray(services) ? services.find(s => s.id === item.tailorService) : null;

            const dressPrice = parseFloat(dress?.discount_price) || 0;
            const serviceCharge = parseFloat(service?.sell_price_per_unit) || 0;
            const quantity = item.fabric_or_dress_quantity || 1;

            // Calculate the subtotal (dress price * quantity + service charge)
            const subtotal = (dressPrice * quantity) + serviceCharge;

            return total + subtotal; // Add the subtotal to the total
        }, 0);
    };
    const total = calculateTotal();

    

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
        <section className='m-auto max-w-screen-xl'>
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
                            <li> <Link to='/profiles'>Profiles</Link> </li>
                            <li> <Link to='/dresses'>Dresses</Link> </li>
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
                        <li><Link to='/profiles'>Profiles</Link></li>
                        <li><Link to='/dresses'>Dresses</Link> </li>
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
                        {/* {user && user.fitMaker && profileData.balance !== null ? (
                            <div className="mr-4">
                                <span className="text-lg font-bold">Balance: ${profileData.balance}</span>
                            </div>
                        ) : null} */}

                        {/* cart part */}
                        {!user || !user.fitMaker ? (

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="badge badge-sm indicator-item"> {cartItems?.length} </span>
                                    </div>
                                </div>
                                <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                                    <div className="card-body">
                                        <span className="text-lg font-bold">{cartItems?.length} Items</span>
                                        <span className="text-info">Subtotal: {total}</span>
                                        <div className="card-actions">
                                            <Link to='/cart'>
                                                <button className="px-8 py-2 text-white rounded-md bg-violet-500 ">View cart</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                                <LiaUserEditSolid className='cursor-pointer text-[35px] pt-2 pl-2' />
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
