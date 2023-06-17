import { useEffect } from 'react';
import { kakaoLogin } from '@src/apis/user';

function RedirectionKakao() {
  const params = new URL(document.location.toString()).searchParams;
  const CODE = params.get('code');

  const authKakaoLogin = async (code: string) => {
    try {
      const response = await kakaoLogin(code);
      const accesstoken = response.headers['accesstoken'];
      localStorage.setItem('accesstoken', accesstoken);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CODE && authKakaoLogin(CODE);
  }, []);

  return <></>;
}

export default RedirectionKakao;
