const TestKakaoLogin = () => {
  const onClickKakaoLogin = () => {
    const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;
    const CLIENT_ID = `${import.meta.env.VITE_REST_API_KEY}`;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=acf4c39ccdb7be5096df83b38e86fe27&redirect_uri=https://ppol.pro/api/users/kakao&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return <button onClick={onClickKakaoLogin}>@@KAKAO LOGIN@@</button>;
};

export default TestKakaoLogin;
