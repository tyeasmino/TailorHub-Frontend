import apiRequest from "./apiBase";

 
export const fetchFitFinders = async () => {
  return await apiRequest('GET', '/fitFinders/fit-finder/');
};

export const fetchFitFinderById = async (id) => {
  return await apiRequest('GET', `/fitFinders/fit-finder/${id}/`);
};

export const updateFitFinderProfile = async (id, updatedData, token) => {
  return await apiRequest('PUT', `/fitFinders/fit-finder/${id}/`, updatedData, {
    Authorization: `Token ${token}`,
  });
};
