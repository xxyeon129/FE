import apiRequest from '.';

// TODO: 서버 배포 시 API 형식에 맞게 수정
const RESOURCE = '/api/portfolios';

interface GetAllListParams {
  lastId: number;
  size?: number;
  category?: string;
}

export const getAllList = async ({ lastId, size = 9, category }: GetAllListParams) => {
  try {
    // if (category === 'All') {
    //   return apiRequest.get(RESOURCE);
    // }
    // return apiRequest.get(`${RESOURCE}/?category=${category}`);
    // ?last-portfolio-id=${lastId}&size=${size}`
    const response = await apiRequest.get(RESOURCE, {
      params: {
        'last-portfolio-id': lastId,
        size,
      },
    });
    return response.data.data.content;
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
    return apiRequest.post(RESOURCE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    throw new Error('API createPortfolio error');
  }
};
