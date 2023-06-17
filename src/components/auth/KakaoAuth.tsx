import { PATH_URL, SERVER_URL } from '@src/constants/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoAuth = () => {
  const params = new URL(document.location.toString()).searchParams;
  const CODE = params.get('code');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://portfol.pro/api/users/kakao?code=${CODE}`).then(res => console.log(res));
  }, []);

  return <></>;
};

export default KakaoAuth;
