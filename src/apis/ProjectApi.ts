import axios from 'axios';

const BASE_URL = 'http://3.34.102.60:8080/api';

export const createProject = async (formData: FormData) => {
  try {
    const response = await axios.post(`http://3.34.102.60:8080/api/projects`, formData, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzcGFpbkBuYXZlci5jb20iLCJ1c2VySWQiOjcsImV4cCI6MTY4NTYxMTc2OCwiaWF0IjoxNjg1NjA4MTY4fQ.1SQ_dY86eC1q24ZajWtjtVDJUTYFEJpFONz3SwPqb2g',
      },
    });
    return response.data;
  } catch (error: unknown) {
    return error;
  }
};

export const getProject = async () => {
  const response = await axios.get(`${BASE_URL}/projects/15`);
  return response.data.data;
};

export const updateProject = async (formData: FormData) => {
  await axios.patch(`${BASE_URL}/projects/15`, formData, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzcGFpbkBuYXZlci5jb20iLCJ1c2VySWQiOjcsImV4cCI6MTY4NTYxMTc2OCwiaWF0IjoxNjg1NjA4MTY4fQ.1SQ_dY86eC1q24ZajWtjtVDJUTYFEJpFONz3SwPqb2g',
    },
  });
};
