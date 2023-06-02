import axios from 'axios';

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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxcXd3QG5hdmVyLmNvbSIsInVzZXJJZCI6MzgsImV4cCI6MTY4NTcwMDg0MywiaWF0IjoxNjg1Njk3MjQzfQ.wH1dBXZE2V--sLy-E1Uw3YnHMA8tMaqJ-SMsmKi8qus`,
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxcXd3QG5hdmVyLmNvbSIsInVzZXJJZCI6MzgsImV4cCI6MTY4NTcwMDg0MywiaWF0IjoxNjg1Njk3MjQzfQ.wH1dBXZE2V--sLy-E1Uw3YnHMA8tMaqJ-SMsmKi8qus`,
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxcXd3QG5hdmVyLmNvbSIsInVzZXJJZCI6MzgsImV4cCI6MTY4NTcwMDg0MywiaWF0IjoxNjg1Njk3MjQzfQ.wH1dBXZE2V--sLy-E1Uw3YnHMA8tMaqJ-SMsmKi8qus`,
      },
    });
    console.log('Password updated successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
