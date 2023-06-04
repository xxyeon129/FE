import apiRequest from '.';
import { accessToken } from './token';

const RESOURCE = '/api/users';

export const getUser = async ({ id }: { id: number }) => {
  try {
    const response = await apiRequest.get(`${RESOURCE}/${id}`);

    return response.data.data;
  } catch (error) {
    throw new Error('API getUser error');
  }
};

export const logout = async () => {
  try {
    // TO DO: 월요일에 BE 측에 에러 문의
    const response = await apiRequest.get(`${RESOURCE}/logout`, {
      headers: { Authorization: accessToken },
    });
    return response;
  } catch (error) {
    throw new Error('API logout error');
  }
};
