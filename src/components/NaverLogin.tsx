import React from 'react';

// 함수 컴포넌트 정의
const NaverLogin: React.FC = () => {
  const Naver_Client_ID = '1fetknPu1x5_BOrcjE1H';
  const Naver_Callback_Url = 'http://localhost:3000/api/users/login/naver';
  const Naver_Auth_Url = `https://nid.naver.com/oauth2.0/authorize?client_id=${Naver_Client_ID}&response_type=code&redirect_uri=${Naver_Callback_Url}`;

  // Naver_Auth_Url 연결
  const Naver = () => {
    window.location.href = Naver_Auth_Url;
  };

  return (
    <div>
      <button onClick={Naver}>네이버 로그인</button>
    </div>
  );
};

export default NaverLogin;
