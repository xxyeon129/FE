const kakaoLoginRedirect = () => {
  const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;
  const CLIENT_ID = `${import.meta.env.VITE_REST_API_KEY}`;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = KAKAO_AUTH_URL;
};

export const onClickKakaoLogin = (
  setIsKakaoLoginWarnModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsKakaoLoginWarnModalOpen(false);
  kakaoLoginRedirect();
};

export const onCloseKakaoModal = (
  setIsKakaoLoginWarnModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsKakaoLoginWarnModalOpen(false);
  setIsLoginModalOpen(true);
};
