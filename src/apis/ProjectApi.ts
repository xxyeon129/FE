import axios from 'axios';
import { accessToken } from './token';
import { SERVER_URL } from '@src/constants/constants';
import { useSetRecoilState } from 'recoil';
import { projectDataAtom } from '@src/states/createProjectState';

export const createProject = async (formData: FormData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/projects`, formData, {
      headers: {
        Authorization: accessToken,
      },
    });
    const responseData = response.data;

    const setProjectData = useSetRecoilState(projectDataAtom);
    setProjectData(responseData);

    console.log('setProjectData : ', projectDataAtom);
    return responseData;
  } catch (error: unknown) {
    return error;
  }
};

export const getProject = async projectId => {
  const response = await axios.get(`${SERVER_URL}/api/projects/${projectId}`);
  return response.data.data;
};

export const updateProject = async (formData: FormData, projectId) => {
  await axios.patch(`${SERVER_URL}/api/projects/${projectId}`, formData, {
    headers: {
      Authorization: accessToken,
    },
  });
};
