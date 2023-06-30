import apiRequest from '.';
import { GetLastIdParams, GetAllListParams, GetFilteredListParams } from '@src/types/apiParamsType';
import { getAccessToken, getRefreshToken } from './token';

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

    const response = await apiRequest.get(RESOURCE, { params });

    return { serverLastId: response.data.message, serverData: response.data.data.content };
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
    const params = {
      'last-portfolio-id': lastId,
      size,
      ...(category !== 'All' && { category }),
      ...(filter !== 'All' && { filter }),
    };

    const response = await apiRequest.get(RESOURCE, { params });

    return { serverLastId: response.data.message, serverData: response.data.data.content };
  } catch (error) {
    throw new Error('API getFilteredist error');
  }
};

type AxiosHeaderValue = string | undefined;

export const getMyPortfolio = async () => {
  try {
    const asyncAccessToken = await getAccessToken();
    const asyncRefreshToken = await getRefreshToken();

    const response = await apiRequest.get(`${RESOURCE}/myportfolios`, {
      headers: {
        Authorization: asyncAccessToken as AxiosHeaderValue,
        RefreshToken: asyncRefreshToken as AxiosHeaderValue,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('API getMyPortfolio error');
  }
};

export const createPortfolio = async (formData: FormData) => {
  try {
    const asyncAccessToken = await getAccessToken();
    const asyncRefreshToken = await getRefreshToken();

    const response = await apiRequest.post(RESOURCE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: asyncAccessToken as AxiosHeaderValue,
        RefreshToken: asyncRefreshToken as AxiosHeaderValue,
      },
    });
  } catch (error) {
    throw new Error('API createPortfolio error');
  }
};

export const deletePortfolio = async (id: number) => {
  const asyncAccessToken = await getAccessToken();
  const asyncRefreshToken = await getRefreshToken();

  try {
    const response = await apiRequest.delete(`${RESOURCE}/${id}`, {
      headers: {
        Authorization: asyncAccessToken as AxiosHeaderValue,
        RefreshToken: asyncRefreshToken as AxiosHeaderValue,
      },
    });

    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const getPopularPortfolio = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}/popularity`);
    return response.data.data;
  } catch (error) {
    throw new Error('API getPopularPortfolio error');
  }
};
