import axios from 'axios';
import { useEffect } from 'react';

const RedirectionNaver = () => {
  const code = new URL(window.location.href).searchParams.get('code');

  const authNaverLogin = async (code: string) => {
    try {
      const response = await axios.get(
        `https://portfol.pro/api/users/naver?code=${code}&state=state`
      );
      const accesstoken = response.headers['accesstoken'];
      localStorage.setItem('accesstoken', accesstoken);
      const refreshtoken = response.headers['refreshtoken'];
      localStorage.setItem('refreshtoken', refreshtoken);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code) {
      authNaverLogin(code);
    }
  }, [code]);

  return <div></div>;
};

export default RedirectionNaver;
