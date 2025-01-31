// apiService.js
import axios from 'axios';

const API_URL = 'https://tailor-hub-backend.vercel.app';  // Centralize API URL

// Helper function to handle API requests
const apiRequest = async (method, url, data = null) => {
  try {
    const config = {
      method,
      url: `${API_URL}${url}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,  // Data is optional for GET requests
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export default apiRequest;
