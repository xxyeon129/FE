import { PATH_URL, SERVER_URL } from '@src/constants/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KakaoAuth = () => {
  const params = new URL(document.location.toString()).searchParams;
  const GRANT_TYPE = 'authorization_code';
  const CODE = params.get('code');
  const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;
  const CLIENT_ID = `${import.meta.env.VITE_REST_API_KEY}`;

  const navigate = useNavigate();

  // const KAKAO_TOKEN_URL = `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${CODE}`;
  // axios
  //   .post(
  //     KAKAO_TOKEN_URL,
  //     {},
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //       },
  //     }
  //   )
  //   .then(res => {
  //     console.log(res.data);
  //     navigate(PATH_URL.MAIN);
  //   });

  axios.get(`https://portfol.pro/api/users/kakao?code=${CODE}`).then(res => console.log(res));

  return <></>;
};

export default KakaoAuth;
