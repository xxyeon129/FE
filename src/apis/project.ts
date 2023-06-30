import { AxiosHeaderValue } from 'axios';
import apiRequest from '.';
import { accessToken, getAccessToken } from './token';

const RESOURCE = '/api/projects';

export const createProject = async (formData: FormData) => {
  try {
    const asyncAccessToken = await getAccessToken();

    const response = await apiRequest.post(RESOURCE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: asyncAccessToken as AxiosHeaderValue,
      },
    });

    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const deleteProject = async (id: number) => {
  try {
    const response = await apiRequest.delete(`${RESOURCE}/${id}`, {
      headers: {
        Authorization: accessToken,
      },
    });

    return response.data.data;
  } catch (error) {
    return error;
  }
};
