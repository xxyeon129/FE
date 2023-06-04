import { logout } from '@src/apis/user';
import { ReactComponent as AuthIcon } from '@src/assets/nav/nav-logout-icon.svg';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import LoginModal from './LoginModal';
import Signup from '../Signup';
import { useRecoilState } from 'recoil';
import { loginState } from '@src/states';

const Auth = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  console.log('Auth 컴포넌트 렌더링 테스트');

  const onClickAuth = async () => {
    if (isLogin) {
      // TO DO: 월요일에 로그아웃 관련 에러 BE 측에 문의
      // 로그아웃 시 로컬스토리지 비우기, 메인 페이지로 이동
      const res = await logout();
      console.log(res);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const onLoginCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsLogin(true);
  };

  const onSignUpButtonClick = () => {
    setIsSignUpModalOpen(true);
  };

  const onSignUpCloseModal = () => {
    setIsSignUpModalOpen(false);
  };

  useEffect(() => {
    const isExistToken = localStorage.getItem('accesstoken');
    if (isExistToken !== null) setIsLogin(true);
    if (isExistToken === null) setIsLogin(false);
    console.log('useEffect 테스트');
  }, [isLogin]);

  return (
    <StAuth>
      <StAuthClickContainer onClick={onClickAuth}>
        <AuthIcon />
        <StLabel>{isLogin ? 'Logout' : 'Login'}</StLabel>
      </StAuthClickContainer>
      {isLoginModalOpen && (
        <LoginModal onClose={onLoginCloseModal} onSignUpClick={onSignUpButtonClick} />
      )}
      {isSignUpModalOpen && <Signup onClose={onSignUpCloseModal} />}
    </StAuth>
  );
};

const StAuth = styled.div``;

const StAuthClickContainer = styled.span`
  display: flex;
  align-items: center;
  display: inline-flex;
  cursor: pointer;
`;

const StLabel = styled.span`
  margin-left: 10px;
`;

export default Auth;
