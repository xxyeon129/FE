import apiRequest from '.';

const RESOURCE = '/api/statistics';

export const getAllChart = async () => {
  try {
    const response = await apiRequest.get(RESOURCE);
    return response.data.data;
  } catch (error) {
    throw new Error('API getAllChart error');
  }
};

export const getPhotographerChart = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}/photographer`);
    return response.data.data;
  } catch (error) {
    throw new Error('API getPhotographerChart error');
  }
};

export const getDesignerChart = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}/photographer`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw new Error('API getDesignerChart error');
  }
};

export const getDeveloperChart = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}/api/statistics/develop`);
    const data = response.data.data;
    return data;
  } catch (error) {
    throw new Error('API getDevleoperChart error');
  }
};
