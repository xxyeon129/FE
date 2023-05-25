import apiRequest from '.';

// TODO: 서버 배포 시 API 형식에 맞게 수정
const RESOURCE = '/portfolios';

export const getAllList = (category: string) => {
  try {
    if (category === 'All') {
      return apiRequest.get(RESOURCE);
    }
    return apiRequest.get(`${RESOURCE}/?category=${category}`);
  } catch (error) {
    throw new Error('API getAllList error');
  }
};

export const getFilteredList = (category: string, filter: string) => {
  try {
    // TODO: 사용자가 포트폴리오에 여러 필터를 적용했을 경우 조정 필요 - 백엔드와 상의
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

export const createPortfolio = (formData: FormData) => {
  try {
    return apiRequest.post(RESOURCE, formData);
  } catch (error) {
    throw new Error('API createPortfolio error');
  }
};
