import apiRequest from '.';
import { GetLastIdParams, GetAllListParams, GetFilteredListParams } from '@src/types/apiParamsType';

// TODO: 서버 배포 시 API 형식에 맞게 수정
const RESOURCE = '/api/portfolios';

export const getLastId = async ({ category, filter }: GetLastIdParams) => {
  try {
    const isAllCategory = category === 'All';
    const isSelectFilter = filter !== undefined;

    const params = {
      ...(isAllCategory ? { category: '' } : { category }),
      ...(isSelectFilter ? { filter } : { filter: '' }),
    };

    const response = await apiRequest.get(`${RESOURCE}/id`, { params });

    return response.data.data;
  } catch (error) {
    throw new Error('API getLastId error');
  }
};

export const getAllList = async ({ lastId, size = 9, category }: GetAllListParams) => {
  try {
    const params = {
      'last-portfolio-id': lastId,
      size,
      ...(category !== 'All' && { category }),
    };

    // TEST CODE
    // console.log('API params', params);

    const response = await apiRequest.get(RESOURCE, { params });
    return response.data.data.content;
  } catch (error) {
    throw new Error('API getAllList error');
  }
};

export const getFilteredList = async ({
  lastId,
  size = 9,
  category,
  filter,
}: GetFilteredListParams) => {
  try {
    // TODO: 2차 스코프 - 사용자가 포트폴리오에 여러 필터를 적용했을 경우

    const params = {
      'last-portfolio-id': lastId,
      size,
      ...(category !== 'All' && { category }),
      ...(filter !== 'All' && { filter }),
    };

    // TEST CODE
    // console.log('API params', params);

    const response = await apiRequest.get(RESOURCE, { params });

    // TEST CODE
    // console.log('API RES@@ => ', response.data.data.content);

    return response.data.data.content;
  } catch (error) {
    throw new Error('API getFilteredist error');
  }
};

export const createPortfolio = async (formData: FormData) => {
  try {
    // TEST CODE
    const testLoginToken =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZW1haWxAZ21haWwuY29tIiwidXNlcklkIjo0LCJleHAiOjE2ODU0NDU0NTUsImlhdCI6MTY4NTQ0MTg1NX0.YwNR7to5tms2KAGW0wKgdU-omsv95aT1kbcvnXf4cJE';
    const testRefreshToken =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZW1haWxAZ21haWwuY29tIiwidXNlcklkIjo0LCJleHAiOjE2ODY2NTE0NTUsImlhdCI6MTY4NTQ0MTg1NX0.QRKZf8KKb-9sAALkyYwl3ynEAM8a-sdN3kaxR_-B0Xo';

    const response = await apiRequest.post(RESOURCE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: testLoginToken,
        RefreshToken: testRefreshToken,
      },
    });

    // TEST CODE
    console.log(response);
  } catch (error) {
    throw new Error('API createPortfolio error');
  }
};
