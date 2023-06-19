import { ReactComponent as Kakaologin } from '@src/assets/socailLogin/kakaologin.svg';

const KakaoLogin = () => {
  const onClickKakaoLoginButton = () => {
    const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;
    const CLIENT_ID = `${import.meta.env.VITE_REST_API_KEY}`;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <Kakaologin onClick={onClickKakaoLoginButton} />
    </div>
  );
};

export default KakaoLogin;
