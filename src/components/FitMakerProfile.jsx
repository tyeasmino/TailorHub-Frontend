import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchFitMakerById, updateFitMakerProfile } from '../apiServices/fitMakerService';
import axios from 'axios';




const FitMakerProfile = () => {
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState({
        user: '',
        image: '',
        shop_started: '',
        shop_address: '',
        shop_hours: '',
        phone: '',
        whatsapp: '',
        website: '',
        facebook: '',
        instagram: '',
    });


    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (e.target.multiple) {
            // If the input is a multiple select, get all selected options
            const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
            setProfileData({
                ...profileData,
                [name]: selectedValues,
            });
        } else if (type === 'file') {
            setProfileData({
                ...profileData,
                [name]: files[0], // Assign the file to the respective field
            });
        } else {
            setProfileData({
                ...profileData,
                [name]: value,
            });
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
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
            } catch (error) {
                console.error("Error fetching profile: ", error);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);



    // Helper function to upload images and return the URL
    const uploadImage = async (image) => {
        if (image && image instanceof File) {
            const formData = new FormData();
            formData.append('image', image);

            try {
                const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=648e380c7b8d76ec81662ddc06d73ec5', {
                    method: 'POST',
                    body: formData,
                });

                const imgbbData = await imgbbResponse.json();

                if (imgbbData.status === 200) {
                    return imgbbData.data.url; // Return the URL of the uploaded image
                } else {
                    alert('Image upload failed!');
                    return '';
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Image upload failed!');
                return '';
            }
        }
        return ''; // If no image provided, return empty string
    };


    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            alert("You are not logged in.");
            return;
        }

        // Upload profile image if it exists
        let profileImageUrl = await uploadImage(profileData.image);

        const updatedProfileData = {
            ...profileData, 
            image: profileImageUrl || profileData.image,
        };

        console.log('Updated Profile Data:', updatedProfileData);

        try {
            const res = await axios.put(
                `http://127.0.0.1:8000/fitMakers/fit-makers/${user.fitMaker}/`,
                updatedProfileData,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (res.status === 200) {
                console.log("Profile updated successfully.");
                setProfileData((prevData) => ({
                    ...prevData,
                    ...updatedProfileData, // Update the profile with new data
                }));
            } else {
                console.log("Profile update failed.");
            }
        } catch (error) {
            console.error("Error during the profile update:", error);
        }
    };


    return (

        <section className='max-w-screen-lg p-10 my-20 m-auto shadow'>
            <div className='flex flex-col gap-5 relative'>
                <div>
                    <h2 className='text-heading text-center text-3xl font-bold'>Update Your Profile</h2>
                    <p className='text-center'>Ensure your profile is updated to get orders</p>
                </div>


                <form onSubmit={handleUpdateProfile}>
                    <div className='flex gap-5'>
                        <div className='w-1/2 m-5'>
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

                            <div className='flex gap-8   mb-5'>
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
                                    className=" file-input mt-2 file-input-bordered w-full " />
                                {profileData.image && profileData.image instanceof File && (
                                    <p className="text-xs text-pink mt-1">New Image Uploaded</p>
                                )}
                                {profileData.image && !(profileData.image instanceof File) && (
                                    <img src={profileData.image} alt="Attachment Preview" className="max-w-[100px] max-h-[100px]  mt-2 rounded-xl" />
                                )}
                            </div>
                        </div>
                        <div className='w-1/2 m-5'>
                            <h6 className='  text-[20px] font-bold text-heading'>Contact Details</h6>


                            <div className='flex gap-8   mb-5'>
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

                            <div className='flex m-2 gap-8'>


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
                    </div>
                    <div className='flex items-end justify-end mx-5'>
                        <button className='bg-heading px-5 py-2 text-white rounded' type="submit">Update Profile</button>
                    </div>
                </form>



            </div>




        </section>
    );
};

export default FitMakerProfile;
