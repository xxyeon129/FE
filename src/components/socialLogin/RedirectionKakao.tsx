import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

function RedirectionKakao() {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  const authKakaoLogin = async (code: string) => {
    try {
      const response = await axios.get(`https://ppol.pro/api/users/kakao&response_type=${code}`);
      console.log(response);
      const accesstoken = response.headers['accesstoken'];
      localStorage.setItem('accesstoken', accesstoken);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code) {
      authKakaoLogin(code);
    }
  }, [code]);

  return <div></div>;
}

export default RedirectionKakao;
