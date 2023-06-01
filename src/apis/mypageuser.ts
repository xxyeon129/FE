import axios from 'axios';

const BASE_URL = 'http://3.34.102.60:8080/api/users';

export const getUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/36`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dGVzdEBuYXZlci5jb20iLCJ1c2VySWQiOjM2LCJleHAiOjE2ODU2MzU5MTcsImlhdCI6MTY4NTYzMjMxN30.Aoh11cvD5IaC01CyGk7wbQfD8i1yUy_3-hcehqm5cCU`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async formData => {
  try {
    const response = await axios.patch(`${BASE_URL}/36`, formData, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dGVzdEBuYXZlci5jb20iLCJ1c2VySWQiOjM2LCJleHAiOjE2ODU2MzU5MTcsImlhdCI6MTY4NTYzMjMxN30.Aoh11cvD5IaC01CyGk7wbQfD8i1yUy_3-hcehqm5cCU`,
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dGVzdEBuYXZlci5jb20iLCJ1c2VySWQiOjM2LCJleHAiOjE2ODU2MzU5MTcsImlhdCI6MTY4NTYzMjMxN30.Aoh11cvD5IaC01CyGk7wbQfD8i1yUy_3-hcehqm5cCU`,
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dGVzdEBuYXZlci5jb20iLCJ1c2VySWQiOjM2LCJleHAiOjE2ODU2MzU5MTcsImlhdCI6MTY4NTYzMjMxN30.Aoh11cvD5IaC01CyGk7wbQfD8i1yUy_3-hcehqm5cCU`,
      },
    });
    console.log('Password updated successfully');
  } catch (error) {
    console.error(error);
  }
};
