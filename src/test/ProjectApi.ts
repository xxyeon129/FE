import { SERVER_URL } from '@src/constants/constants';
import axios from 'axios';

const BASE_URL = 'http://3.34.102.60:8080/api';

export const createProject = async (formData: FormData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/projects`, formData, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzcGFpbkBuYXZlci5jb20iLCJ1c2VySWQiOjcsImV4cCI6MTY4NTM4NTEzNSwiaWF0IjoxNjg1MzgxNTM1fQ.VvwkzvweWUuyS60baQiTn5A-jWf8bBPSvqR-Sw0484Q',
      },
    });
    return response.data;
  } catch (error: unknown) {
    return error;
  }
};

export const getProject = async () => {
  const response = await axios.get(`${SERVER_URL}/projects/15`);
  return response.data.data;
};

export const updateProject = async (formData: FormData) => {
  await axios.patch(`${SERVER_URL}/projects/15`, formData, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzcGFpbkBuYXZlci5jb20iLCJ1c2VySWQiOjcsImV4cCI6MTY4NTM4NTEzNSwiaWF0IjoxNjg1MzgxNTM1fQ.VvwkzvweWUuyS60baQiTn5A-jWf8bBPSvqR-Sw0484Q',
    },
  });
};
