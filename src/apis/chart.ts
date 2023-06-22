import apiRequest from '.';

const RESOURCE = '/api/statistics';

export const getPhotographerChart = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}/photographer`);
    return response.data.data;
  } catch (error) {
    throw new Error('API getPhotographerChart error');
  }
};
