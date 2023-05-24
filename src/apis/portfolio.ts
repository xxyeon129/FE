import apiRequest from '.';

// TODO: 서버 배포 시 API 형식에 맞게 수정
const RESOURCE = '/portfolios';

export const getAllList = async (category: string) => {
  try {
    if (category === 'All') {
      const response = await apiRequest.get(RESOURCE);
      return response;
    }
    const response = await apiRequest.get(`${RESOURCE}/?category=${category}`);
    return response;
  } catch (error) {
    throw new Error('API getAllList error');
  }
};

export const getFilteredList = (category: string, filter: string) => {
  try {
    if (category === 'All') {
      switch (filter) {
        case '전체':
          return apiRequest.get(`${RESOURCE}`);
        case '개발 전체':
          return apiRequest.get(`${RESOURCE}/?category=Develop`);
        case '디자인 전체':
          return apiRequest.get(`${RESOURCE}/?category=Design`);
        case '사진 전체':
          return apiRequest.get(`${RESOURCE}/?category=Photographer`);
        default:
          break;
      }
    }
    return apiRequest.get(`${RESOURCE}/?category=${category}&filter=${filter}`);
  } catch (error) {
    throw new Error('API getFilteredist error');
  }
};
