import React from 'react';
import { ReactComponent as Kakaologin } from '@src/assets/socailLogin/kakaologin.svg';

// 함수 컴포넌트 정의
const KakaoLogin: React.FC = () => {
  // const Kakao_Client_ID = 'acf4c39ccdb7be5096df83b38e86fe27';
  // const Naver_Callback_Url = 'https://ppol.pro/api/users/kakao&response_type=code';
  const Kakao_Auth_Url = `kauth.kakao.com/oauth/authorize?client_id=acf4c39ccdb7be5096df83b38e86fe27&redirect_uri=https://ppol.pro/api/users/kakao&response_type=code`;

  // Naver_Auth_Url 연결
  const Kakao = () => {
    window.location.href = Kakao_Auth_Url;
  };

  return (
    <div>
      <Kakaologin onClick={Kakao} />
    </div>
  );
};

export default KakaoLogin;
