import { getAllList } from '@src/apis/portfolio';
import { useEffect } from 'react';

const Main = () => {
  useEffect(() => {
    const fetchAllList = async () => {
      const serverData = await getAllList();
      console.log(serverData);
    };
    fetchAllList();
  }, []);

  return <>Main</>;
};

export default Main;
