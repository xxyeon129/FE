import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

function RedirectionNaver() {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  const authNaverLogin = async (code: string) => {
    try {
      const response = await axios.get(`https://ppol.pro/api/users/naver?code=${code}&state=state`);
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
      authNaverLogin(code);
    }
  }, [code]);

  return <div></div>;
}

export default RedirectionNaver;
