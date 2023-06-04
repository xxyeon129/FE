import { logout } from '@src/apis/user';
import { ReactComponent as LogoutIcon } from '@src/assets/nav/nav-logout-icon.svg';
import { styled } from 'styled-components';

const Logout = () => {
  // TO DO: 로그아웃 BE 측에 문의 후 해결 시 로그아웃 정상적으로 완료된 경우 상태 변경해서 Login으로 변경

  const onClickLogout = async () => {
    // TO DO: 월요일에 로그아웃 관련 에러 BE 측에 문의
    const res = await logout();
    console.log(res);
  };

  return (
    <StLogout>
      <StLogoutClickContainer onClick={onClickLogout}>
        <LogoutIcon />
        <StLabel>Logout</StLabel>
      </StLogoutClickContainer>
    </StLogout>
  );
};

const StLogout = styled.div`
  /* background-color: lightgray; */
`;

const StLogoutClickContainer = styled.span`
  display: flex;
  align-items: center;
  /* background-color: lightgreen; */
  display: inline-flex;
  cursor: pointer;
`;

const StLabel = styled.span`
  margin-left: 10px;
`;

export default Logout;
