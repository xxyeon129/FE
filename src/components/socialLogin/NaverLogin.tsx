import { ReactComponent as NaverIcon } from '@src/assets/socailLogin/naverlogin.svg';
import { styled } from 'styled-components';

// 함수 컴포넌트 정의
const NaverLogin = () => {
  // const Naver_Client_ID = 'bA_xFHysO1Zxe8CywEoE';
  // const Naver_Callback_Url = 'http://3.34.102.60:8080/api/users/naver';
  const Naver_Auth_Url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=bA_xFHysO1Zxe8CywEoE&redirect_uri=https://ppol.pro/api/users/naver&state=state`;

  // Naver_Auth_Url 연결
  const Naver = () => {
    window.location.href = Naver_Auth_Url;
  };

  return (
    <div>
      <StNaverIcon onClick={Naver} />
    </div>
  );
};

const StNaverIcon = styled(NaverIcon)`
  cursor: pointer;
`;

export default NaverLogin;
