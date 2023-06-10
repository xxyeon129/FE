import axios, { AxiosHeaderValue } from 'axios';
import { getAccessToken } from './token';
import { SERVER_URL } from '@src/constants/constants';

export const createProject = async (formData: FormData) => {
  const asyncAccessToken = await getAccessToken();
  try {
    const response = await axios.post(`${SERVER_URL}/api/projects`, formData, {
      headers: {
        Authorization: asyncAccessToken as AxiosHeaderValue,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    return error;
  }
};

export const getProject = async (projectId: number | null) => {
  const response = await axios.get(`${SERVER_URL}/api/projects/${projectId}`);
  return response.data.data;
};

export const updateProject = async (formData: FormData, projectId: number | null) => {
  const asyncAccessToken = await getAccessToken();

  await axios.patch(`${SERVER_URL}/api/projects/${projectId}`, formData, {
    headers: {
      Authorization: asyncAccessToken as AxiosHeaderValue,
    },
  });
};
