import axios from "axios"
import apiRequest from "./apiBase";
const API_URL = 'http://127.0.0.1:8000'



export const fetchUserDetails = async (token) => {
    return await apiRequest('GET', '/accounts/user_details/', null, {
      headers: { Authorization: `Token ${token}` },
    });
  };

export const getServices = async () => {
    return await apiRequest('GET', '/fitMakers/services/');
};



// all measurements  
export const getDressMeasurements = async () => {
    return await apiRequest('GET', '/measurements/dress_measurements/');
};


export const uploadImage = async (image) => {
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
    return '';  
};