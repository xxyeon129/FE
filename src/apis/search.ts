import axios from 'axios';
import { SERVER_URL } from '@src/constants/constants';

export const search = async (term: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/portfolios/autocomplete?keyword=${term}`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const searchPage = async (pageNum: number, searchTerm?: string) => {
  // console.log(pageNum);
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/portfolios/search?keyword=${searchTerm}&page=${pageNum}&size=15`
    );
    return response.data.data;
  } catch (error) {}
};
