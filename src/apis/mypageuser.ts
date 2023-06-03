import axios from 'axios';
import { accessToken } from './token';
import { SERVER_URL } from '@src/constants/constants';

export const getUser = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/users/39`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async formData => {
  try {
    const response = await axios.patch(`${SERVER_URL}/api/users/39`, formData, {
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
    await axios.delete(`${SERVER_URL}/api/users/39`, {
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
    await axios.put(`${SERVER_URL}/api/users/39/password`, passwordData, {
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
