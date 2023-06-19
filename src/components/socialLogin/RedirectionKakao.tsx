import { useEffect } from 'react';
import { kakaoLogin } from '@src/apis/user';
import { useSetRecoilState } from 'recoil';
import { loginState } from '@src/states';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';

const RedirectionKakao = () => {
  const params = new URL(document.location.toString()).searchParams;
  const CODE = params.get('code');

  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const authKakaoLogin = async (code: string) => {
    try {
      const response = await kakaoLogin(code);
      const accesstoken = response.headers['accesstoken'];
      localStorage.setItem('accesstoken', accesstoken);
      setIsLogin(true);
      navigate(PATH_URL.HOME);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CODE && authKakaoLogin(CODE);
  }, []);

  return <></>;
};

export default RedirectionKakao;
