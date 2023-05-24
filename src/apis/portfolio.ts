import apiRequest from '.';

// TODO: 서버 배포 시 API 형식에 맞게 수정
const RESOURCE = '/portfolios';

export const getAllList = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`);
    return response;
  } catch (error) {
    throw new Error('API getAllList error');
  }
};

export const getFilteredList = async (queryString: string) => {
  try {
    const response = await apiRequest.get(`${RESOURCE}/?${queryString}`);
    return response;
  } catch (error) {
    throw new Error('API getFilteredist error');
  }
};
