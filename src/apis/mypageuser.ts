import axios from 'axios';

const BASE_URL = 'http://3.34.102.60:8080/api/users';

export const getUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/36`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async formData => {
  try {
    const response = await axios.patch(`${BASE_URL}/36`, formData, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dGVzdDJAbmF2ZXIuY29tIiwidXNlcklkIjozNywiZXhwIjoxNjg1NjQxMTkyLCJpYXQiOjE2ODU2Mzc1OTJ9.LJJMZXwsHmAgFlbeAg7NspHWUDk6GBBGvrhs_xOIpqk`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async () => {
  try {
    await axios.delete(`${BASE_URL}/36`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dGVzdDJAbmF2ZXIuY29tIiwidXNlcklkIjozNywiZXhwIjoxNjg1NjQxMTkyLCJpYXQiOjE2ODU2Mzc1OTJ9.LJJMZXwsHmAgFlbeAg7NspHWUDk6GBBGvrhs_xOIpqk`,
      },
    });
    console.log('User account deleted');
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async passwordData => {
  try {
    await axios.put(`${BASE_URL}/36/password`, passwordData, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dGVzdDJAbmF2ZXIuY29tIiwidXNlcklkIjozNywiZXhwIjoxNjg1NjQxMTkyLCJpYXQiOjE2ODU2Mzc1OTJ9.LJJMZXwsHmAgFlbeAg7NspHWUDk6GBBGvrhs_xOIpqk`,
      },
    });
    console.log('Password updated successfully');
  } catch (error) {
    console.error(error);
  }
};
