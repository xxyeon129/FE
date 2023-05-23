import { SERVER_URL } from '@src/constants/constants';
import axios from 'axios';
import { useEffect } from 'react';

const Main = () => {
  useEffect(() => {
    axios.get(`${SERVER_URL}/portfolios`).then(res => console.log(res.data));
  }, []);

  return <>Main</>;
};

export default Main;
