import axios from 'axios';

const BASE_URL = 'http://3.34.102.60:8080/api';

export const createProject = async (formData: FormData) => {
  try {
    const response = await axios.post(`http://3.34.102.60:8080/api/projects`, formData, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzcGFpbkBuYXZlci5jb20iLCJ1c2VySWQiOjcsImV4cCI6MTY4NTQ0ODU0NywiaWF0IjoxNjg1NDQ0OTQ3fQ.ltn8AluCBRXFWXRu9cDqqxs7Pl-K0qG70H7jxftn4eU',
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
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzcGFpbkBuYXZlci5jb20iLCJ1c2VySWQiOjcsImV4cCI6MTY4NTQ0ODU0NywiaWF0IjoxNjg1NDQ0OTQ3fQ.ltn8AluCBRXFWXRu9cDqqxs7Pl-K0qG70H7jxftn4eU',
    },
  });
};
