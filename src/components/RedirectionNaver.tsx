import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

function RedirectionNaver() {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  const authNaverLogin = async (code: string) => {
    try {
      const response = await axios.get(
        `http://3.34.102.60:8080/api/users/naver?code=${code}&state=state`
      );
      console.log(response);
      const authorization = response.headers['authorization'];
      localStorage.setItem('authorization', authorization);
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
