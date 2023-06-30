import { ReactComponent as NaverIcon } from '@src/assets/socailLogin/naverlogin.svg';
import { styled } from 'styled-components';

const NaverLogin = () => {
  const Naver_Auth_Url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=bA_xFHysO1Zxe8CywEoE&redirect_uri=https://ppol.pro/api/users/naver&state=state`;

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
