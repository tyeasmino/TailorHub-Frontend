// useProfile.js (Custom Hook)
import { useState, useEffect } from 'react';
import axios from 'axios';

const useProfile = (type, userId, token) => {
    // Initializing profileData state
    const [profileData, setProfileData] = useState({
        user: '',
        image: '',
        address: '',
        phone: '',
        whatsapp: '',
        website: '',
        facebook: '',
        instagram: '',
        shop_started: '',  // Only for FitMakers
        shop_address: '',  // Only for FitMakers
        shop_hours: '',    // Only for FitMakers
        services: [],      // Only for FitMakers
        preferred_fitMaker: '', // Only for FitFinders
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setProfileData({ ...profileData, [name]: files[0] });
        } else {
            setProfileData({ ...profileData, [name]: value });
        }
    };

    // Fetch profile data based on user type (FitMaker / FitFinder)
    const fetchProfile = async () => {
        try {
            // Use the correct endpoint for fitFinders
            const endpoint = type === 'fitMakers' ? 'fitMakers/fit-makers' : 'fitFinders/fit-finder';  // Correct the endpoint path
    
            // Fetch the data using the correct URL structure
            const res = await axios.get(
                `http://127.0.0.1:8000/${endpoint}/${userId}/`,  // Use the correct endpoint with userId
                { headers: { Authorization: `Token ${token}` } }
            );
            
            // Log the response for debugging
            console.log('Fetched Profile Data:', res.data);
    
            if (res.data) {
                // Assuming response is an object, directly merge the response data
                setProfileData({
                    ...profileData,
                    ...res.data, // Directly merge res.data
                });
            }
        } catch (error) {
            console.log('Error fetching profile:', error); // Log any errors
        }
    };
    
    

    // Upload image function for profile image
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
                    return imgbbData.data.url;
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
        return ''; // No image provided
    };

    // Update profile logic
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
    
        if (!token) {
            alert('You are not logged in.');
            return;
        }
    
        let profileImageUrl = await uploadImage(profileData.image);
    
        const updatedProfileData = {
            ...profileData,
            image: profileImageUrl || profileData.image,
        };
    
        try {
            const endpoint = type === 'fitMakers' ? 'fitMakers/fit-makers' : 'fitFinders/fit-finder';  // Correct endpoint
            
            // Ensure userId is correctly passed and not null
            if (userId) {
                const res = await axios.put(
                    `http://127.0.0.1:8000/${endpoint}/${userId}/`,  // Make sure the userId is being passed correctly
                    updatedProfileData,
                    { headers: { Authorization: `Token ${token}` } }
                );
                if (res.status === 200) {
                    setProfileData({ ...profileData, ...updatedProfileData });
                } else {
                    console.log('Profile update failed.');
                }
            } else {
                console.log("User ID is null or undefined");
            }
        } catch (error) {
            console.log('Error during the profile update:', error);
        }
    };
    

    // Fetch profile data when component mounts
    useEffect(() => {
        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    return {
        profileData,
        handleChange,
        handleUpdateProfile,
    };
};

export default useProfile;
