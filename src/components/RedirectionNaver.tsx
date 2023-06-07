import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

function RedirectionNaver() {
  const code = new URL(window.location.href).searchParams.get('code');

  const authNaverLogin = async code => {
    try {
      const response = await axios.get(`/users/kakao?code=${code}`);
      console.log('response', response);
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
