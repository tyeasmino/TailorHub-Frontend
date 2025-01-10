import apiRequest from "./apiBase";


export const fetchFitMakers = async () => {
  return await apiRequest('GET', '/fitMakers/fit-makers/');
};


export const fetchFitMakerById = async (id) => {
  return await apiRequest('GET', `/fitMakers/fit-makers/${id}/`);
};


export const updateFitMakerProfile = async (id, updatedData, token) => {
  return await apiRequest('PUT', `/fitMakers/fit-makers/${id}/`, updatedData, {
    Authorization: `Token ${token}`,
  });
};

