import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { MdOutlineSettingsPhone } from 'react-icons/md';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { RiFacebookCircleLine } from 'react-icons/ri';


import tt1 from '../assets/topten/topten1.jpg'
import tt2 from '../assets/topten/topten2.jpg'
import tt3 from '../assets/topten/topten2.jpeg'

const ProfileDetailsPage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    // Fetch profile details
    useEffect(() => {
        const fetchprofileDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://tailor-hub-backend.vercel.app/fitMakers/fit-makers-profiles/${id}/`);
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile details:", error);
                setError("Error fetching the profile details. Please try again later.");
                setLoading(false);
            }
        };

        fetchprofileDetails();
    }, [id]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className="max-w-screen-xl my-20 m-auto">
             
            {/* Shop Details */}
            <section className='flex gap-5'>
                <img className="w-1/4 " src={tt1} alt="" />
                <img className="w-1/4 " src={tt2} alt="" />
                <img className="w-1/4 " src={tt3} alt="" />
            </section>

            <section className="flex items-center gap-10">
                <div className="">
                    <img
                        className="w-[200px] rounded-full"
                        src={profile?.image}
                    />
                </div>
                <div className="w-4/6 p-5 shadow-sm flex flex-col gap-5">
                    {/* <h1 className="text-3xl font-bold text-gray-600">Name: {profile?.name} </h1> */}
                    <div className="flex gap-1 text-gray-500">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfStroke />
                        <FaRegStar />
                    </div>
                    <div>
                        <span className="text-gray-500">We are here from <strong> {profile?.shop_started} </strong> to serve you. </span> <br />
                        <span className="text-gray-500"> Address: <strong> {profile?.shop_address} </strong> </span> <br />
                        <span className="text-gray-500"> Office Time: <strong> {profile?.shop_hours} </strong> </span>
                    </div>

                    {/* Contact Links */}
                    <div className="mt-2 flex gap-4 text-lg">
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
            </section>

            {/* Shop's Product Details */}
            <section>
                <section className='flex justify-between my-5'>
                    <div className='flex gap-5'>
                        <div className='font-semibold bg-violet-500 text-white px-8 py-2'>All Dress</div>
                        <div className='font-semibold bg-black text-white px-8 py-2'>Upcoming Dress</div>
                        <div className='font-semibold bg-black text-white px-8 py-2'>Upcoming Dress</div>
                    </div>
                    <div className='flex gap-5'>
                        <div className='bg-black text-white px-8 py-2'>Aditional Information</div>
                        <div className='bg-black text-white px-8 py-2'>Ratings</div>
                    </div>                    
                </section>
            </section>             
        </section>
    );
};

export default ProfileDetailsPage;
