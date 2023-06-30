import { useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '@src/constants/constants';

function RedirectionGoogle() {
  const code = new URL(window.location.href).searchParams.get('code');

  const authGoogleLogin = async (code: string) => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/users/google?code=${code}`);
      const accesstoken = response.headers['accesstoken'];
      const refreshtoken = response.headers['refreshtoken'];
      localStorage.setItem('accesstoken', accesstoken);
      localStorage.setItem('refreshtoken', refreshtoken);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code) {
      authGoogleLogin(code);
    }
  }, [code]);

  return <></>;
}

export default RedirectionGoogle;
