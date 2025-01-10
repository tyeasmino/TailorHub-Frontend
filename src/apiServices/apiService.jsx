import axios from "axios"
import apiRequest from "./apiBase";
const API_URL = 'http://127.0.0.1:8000'


// Login API request
export const loginUser = async (formData) => {
    return await apiRequest('POST', '/accounts/login/', formData);
};

export const fetchUserDetails = async (token) => {
    return await apiRequest('GET', '/accounts/user_details/', null, {
      headers: { Authorization: `Token ${token}` },
    });
  };

export const getServices = async () => {
    return await apiRequest('GET', '/fitMakers/services/');
  };