import axios from "axios";
import { useEffect, useState } from "react";

const useProfile = (type, userId, token) => {
    const [profileData, setProfileData] = useState({
        user: '',
        image: '',
        address: '',
        phone: '',
        whatsapp: '',
        facebook: '',
        instagram: '',
        website: '',
        shop_started: '',  
        shop_address: '',  
        shop_hours: '',  
        services: [],  
        preferred_fitMaker: '',  
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setProfileData({ ...profileData, [name]: files[0] });
        } else {
            setProfileData({ ...profileData, [name]: value });
        }
    };

    const fetchProfile = async () => {
        try {
            const endpoint = type === 'fitMakers' ? `fitMakers/fit-makers` : 'fitFinders/fit-finder';
            const res = await axios.get(
                `https://tailor-hub-backend.vercel.app/${endpoint}/${userId}/`,
                { headers: { Authorization: `Token ${token}` } }
            );

            if (res.data) {
                setProfileData({
                    ...profileData,
                    ...res.data,
                });
            }
        } catch (error) {
            console.log('Error fetching profile:', error);
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

    
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!token) {
            alert('You are not logged in.');
            return;
        }

        const updatedProfileData = { ...profileData };
        const profileImageUrl = await uploadImage(profileData.image);

        updatedProfileData.image = profileImageUrl || profileData.image;

        const endpoint = type === 'fitMakers' ? 'fitMakers/fit-makers' : 'fitFinders/fit-finder';
        try {
            const res = await axios.put(
                `https://tailor-hub-backend.vercel.app/${endpoint}/${userId}/`,
                updatedProfileData,
                { headers: { Authorization: `Token ${token}` } }
            );

            if (res.status === 200) {
                setProfileData(updatedProfileData);
            } else {
                console.log('Profile update failed.');
            }
        } catch (error) {
            console.log('Error during the profile update:', error);
        }
    };

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
