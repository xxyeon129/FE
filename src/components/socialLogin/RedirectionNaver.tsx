import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { PATH_URL, SERVER_URL } from '@src/constants/constants';
import { loginState } from '@src/states';

const RedirectionNaver = () => {
  const code = new URL(window.location.href).searchParams.get('code');

  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const authNaverLogin = async (code: string) => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/users/naver?code=${code}&state=state`);
      const accesstoken = response.headers['accesstoken'];
      localStorage.setItem('accesstoken', accesstoken);
      const refreshtoken = response.headers['refreshtoken'];
      localStorage.setItem('refreshtoken', refreshtoken);

      setIsLogin(true);
      navigate(PATH_URL.HOME);

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
