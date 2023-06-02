import axios from 'axios';
import { accessToken } from './token';

const BASE_URL = 'http://3.34.102.60:8080/api/users';

export const getUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/38`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async formData => {
  try {
    const response = await axios.patch(`${BASE_URL}/38`, formData, {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    await axios.delete(`${BASE_URL}/38`, {
      headers: {
        Authorization: accessToken,
      },
    });
    console.log('User account deleted');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePassword = async passwordData => {
  try {
    await axios.put(`${BASE_URL}/38/password`, passwordData, {
      headers: {
        Authorization: accessToken,
      },
    });
    console.log('Password updated successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
