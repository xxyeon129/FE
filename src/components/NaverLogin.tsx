import React from 'react';

// 함수 컴포넌트 정의
const NaverLogin: React.FC = () => {
  const Naver_Client_ID = 'bA_xFHysO1Zxe8CywEoE';
  const Naver_Callback_Url = 'http://3.34.102.60:8080/api/users/naver';
  const Naver_Auth_Url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=bA_xFHysO1Zxe8CywEoE&redirect_uri=http://3.34.102.60:8080/api/users/naver&state=state`;

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
