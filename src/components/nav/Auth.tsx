import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { loginState } from '@src/states';
import { PATH_URL } from '@src/constants/constants';
import { ReactComponent as AuthIcon } from '@src/assets/nav/nav-logout-icon.svg';
import Signup from '../Signup';
import LoginModal from './LoginModal';

const Auth = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const navigate = useNavigate();

  const onClickAuth = async () => {
    if (isLogin) {
      window.localStorage.clear();
      setIsLogin(false);
      navigate(PATH_URL.MAIN);
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
