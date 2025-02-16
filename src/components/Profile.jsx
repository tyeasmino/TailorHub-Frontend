import React, { useEffect, useState } from 'react' 
import { Link } from 'react-router';
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineSettingsPhone } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";


const Profile = ({ profile }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="mx-3 flex flex-col shadow-lg group relative rounded-lg overflow-hidden bg-white">
            <div className="relative">
                <Link to={`/profiles/${profile.id}`}>
                    <img
                        className="w-full min-h-36 max-h-36 object-scale-down object-center transition-transform duration-300 group-hover:scale-105"
                        src={profile?.image}
                        alt={profile?.name}
                    />
                </Link>
            </div>

            {/* profile Details */}
            <div className="py-3 px-4 min-h-36 max-h-36 flex flex-col justify-end">
                <h6 className="text-pink-600 group-hover:text-black font-semibold">{profile.name}</h6>
                <p className="text-gray-500 text-sm mt-1">{profile?.shop_started}</p> {/* Display brief description */}
                <p className="text-gray-500 text-sm mt-1">{profile?.shop_address}</p> {/* Display brief description */}
                <p className="text-gray-500 text-sm mt-1">{profile?.shop_hours}</p> {/* Display brief description */}

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg flex gap-2 items-center font-semibold text-violet-500">
                        <MdOutlineSettingsPhone />
                        {profile?.whatsapp && <Link to={profile?.whatsapp}> <FaWhatsapp /> </Link>}
                        {profile?.website && <Link to={profile?.website}> <CgWebsite /> </Link>}
                        {profile?.facebook && <Link to={profile?.facebook}> <RiFacebookCircleLine /> </Link>}
                        {profile?.instagram && <Link to={profile?.instagram}> <FaInstagram /> </Link>}
                    </span>
                    <span>
                        {/* Eye Icon */}
                        <div className="">
                            <Link to={`/profilees/${profile.id}`}>
                                <TbEye className="text-violet-500 text-2xl" />
                            </Link>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Profile