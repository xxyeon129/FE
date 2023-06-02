import axios from 'axios';

export const search = async term => {
  try {
    const response = await axios.get(
      `http://3.34.102.60:8080/api/portfolios/autocomplete?keyword=${term}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchPage = async (pageNum: number, searchTerm?: string) => {
  console.log(pageNum);
  try {
    const response = await axios.get(
      `http://3.34.102.60:8080/api/portfolios/search?keyword=${searchTerm}&page=${pageNum}&size=12`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
