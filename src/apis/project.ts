import apiRequest from '.';
// TEST CODE
import { testLoginToken } from './testToken';

const RESOURCE = '/api/projects';

export const createProject = async (formData: FormData) => {
  try {
    const response = await apiRequest.post(RESOURCE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: testLoginToken,
      },
    });

    return response.data.data;
  } catch (error) {
    return error;
  }
};
