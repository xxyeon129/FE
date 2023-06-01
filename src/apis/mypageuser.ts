import axios from 'axios';

const BASE_URL = 'http://3.34.102.60:8080/api/users';

export const getUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/19`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async formData => {
  try {
    const response = await axios.patch(`${BASE_URL}/19`, formData, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjb3p5Ym95QG5hdmVyLmNvbSIsInVzZXJJZCI6MTksImV4cCI6MTY4NTY1MTgwMiwiaWF0IjoxNjg1NjQ4MjAyfQ.FnqLvcUZibK3AYPRNbrG11bu_SxuiacsiRKY-MU1yEI`,
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
    await axios.delete(`${BASE_URL}/19`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjb3p5Ym95QG5hdmVyLmNvbSIsInVzZXJJZCI6MTksImV4cCI6MTY4NTY1MTgwMiwiaWF0IjoxNjg1NjQ4MjAyfQ.FnqLvcUZibK3AYPRNbrG11bu_SxuiacsiRKY-MU1yEI`,
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
    await axios.put(`${BASE_URL}/19/password`, passwordData, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjb3p5Ym95QG5hdmVyLmNvbSIsInVzZXJJZCI6MTksImV4cCI6MTY4NTY1MTgwMiwiaWF0IjoxNjg1NjQ4MjAyfQ.FnqLvcUZibK3AYPRNbrG11bu_SxuiacsiRKY-MU1yEI`,
      },
    });
    console.log('Password updated successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
