import axios from 'axios';

const BASE_URL = 'http://3.34.102.60:8080/api';

export const createProject = async (formData: FormData) => {
  try {
    const response = await axios.post(`http://3.34.102.60:8080/api/projects`, formData, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzcGFpbkBuYXZlci5jb20iLCJ1c2VySWQiOjcsImV4cCI6MTY4NjU1MTg2MCwiaWF0IjoxNjg1MzQyMjYwfQ.ldnX3SmeXPm0R0Vte2N7FFHufiyjuXwFhYCMU5gBCvM',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
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
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzcGFpbkBuYXZlci5jb20iLCJ1c2VySWQiOjcsImV4cCI6MTY4NTM1OTM0MSwiaWF0IjoxNjg1MzU1NzQxfQ.M1OkYHJ0MqrvuP8gn6jcubXkjwY5AUagY5CghdmM3N4',
    },
  });
};
