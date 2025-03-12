import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import useProfile from '../../apiServices/userProfile'


const FitMakerProfile = () => {
    const { user } = useContext(AuthContext)
    const token = localStorage.getItem("token")

    const { profileData, handleChange, handleUpdateProfile } = useProfile(
        'fitMakers',  
        user.fitMaker,  
        token
    )
 
    return (
        <section className='max-w-screen-lg p-5 md:p-10 md:my-20 m-auto shadow'>
            <div className='flex flex-col gap-5 relative'>
                <div>
                    <h2 className='md:text-3xl font-bold text-gray-800 text-center'>Update Your Profile</h2>
                    <p className=' text-center'>Ensure your profile is updated to get orders</p>
                </div>


                <form onSubmit={handleUpdateProfile}>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className='md:w-1/2 m-5'>
                            <input
                                type="text" name="user" id="user" hidden
                                value={profileData.user} onChange={handleChange}
                            />

                            <h6 className='text-[20px] font-bold text-heading'>Shop Details</h6>

                            <div className='flex flex-col   mb-5'>
                                <label className='font-semibold text-sm' htmlFor="shop_address">Shop Address</label>
                                <input
                                    type="text"
                                    name="shop_address"
                                    value={profileData.shop_address}
                                    onChange={handleChange}
                                    placeholder="Shop Address"
                                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                                />
                            </div>

                            <div className='flex flex-col md:flex-row gap-8   mb-5'>
                                <div className='flex w-full  flex-col '>
                                    <label className='font-semibold text-sm' htmlFor="shop_started">Shop Started Date</label>
                                    <input
                                        type="date"
                                        name="shop_started"
                                        value={profileData.shop_started}
                                        onChange={handleChange}
                                        placeholder="Shop Started"
                                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                                    />
                                </div>


                                <div className='flex w-full  flex-col '>
                                    <label className='font-semibold text-sm' htmlFor="shop_hours">Shop Hours</label>
                                    <input
                                        type="text"
                                        name="shop_hours"
                                        value={profileData.shop_hours}
                                        onChange={handleChange}
                                        placeholder="Shop Hours"
                                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col   mb-5'>
                                <label className='font-semibold text-sm' htmlFor="shop_address">Shop Logo/Profile Logo</label>


                                <input type="file" name="image" onChange={handleChange}
                                    className="file-input mt-2 file-input-bordered w-full " />
                                {profileData.image && profileData.image instanceof File && (
                                    <p className="text-xs text-pink mt-1">New Image Uploaded</p>
                                )}
                                {profileData.image && !(profileData.image instanceof File) && (
                                    <img src={profileData.image} alt="Attachment Preview" className="max-w-[100px] max-h-[100px]  mt-2 rounded-xl" />
                                )}
                            </div>
                        </div>
                        <div className='md:w-1/2 m-5'>
                            <h6 className='  text-[20px] font-bold text-heading'>Contact Details</h6>


                            <div className='flex flex-col md:flex-row gap-8   mb-5'>
                                <div className='flex w-full  flex-col '>
                                    <label className='font-semibold text-sm' htmlFor="phone">Phone</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone"
                                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                                    />
                                </div>

                                <div className='flex w-full flex-col'>
                                    <label className='font-semibold text-sm' htmlFor="whatsapp">WhatsApp</label>
                                    <input
                                        type="text"
                                        name="whatsapp"
                                        value={profileData.whatsapp}
                                        onChange={handleChange}
                                        placeholder="WhatsApp"
                                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                                    />
                                </div>
                            </div>


                            <div className='flex w-full flex-col mb-5'>
                                <label className='font-semibold text-sm' htmlFor="website">Website</label>
                                <input
                                    type="text"
                                    name="website"
                                    value={profileData.website}
                                    onChange={handleChange}
                                    placeholder="Website"
                                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                                />
                            </div>

                            <div className='flex w-full flex-col mb-5'>
                                <label className='font-semibold text-sm' htmlFor="facebook">Facebook</label>
                                <input
                                    type="text"
                                    name="facebook"
                                    value={profileData.facebook}
                                    onChange={handleChange}
                                    placeholder="Facebook"
                                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                                />
                            </div>

                            <div className='flex w-full flex-col mb-5'>
                                <label className='font-semibold text-sm' htmlFor="instagram">Instagram</label>
                                <input
                                    type="text"
                                    name="instagram"
                                    value={profileData.instagram}
                                    onChange={handleChange}
                                    placeholder="Instagram"
                                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex text-center md:items-end justify-center md:justify-end mx-5'>
                        <button className='bg-heading px-5 py-2 text-white rounded' type="submit">Update Profile</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default FitMakerProfile;
