import apiRequest from '.';
import { accessToken } from './token';

const RESOURCE = '/api/projects';

export const createProject = async (formData: FormData) => {
  try {
    const response = await apiRequest.post(RESOURCE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: accessToken,
      },
    });

    return response.data.data;
  } catch (error) {
    return error;
  }
};
