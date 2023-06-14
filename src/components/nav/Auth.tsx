import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { loginState } from '@src/states';
import { PATH_URL } from '@src/constants/constants';
import { ReactComponent as AuthIcon } from '@src/assets/nav/nav-logout-icon.svg';

interface AuthProps {
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Auth = ({ setIsLoginModalOpen, setIsSignUpModalOpen }: AuthProps) => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

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
    </StAuth>
  );
};

const StAuth = styled.div`
  margin-bottom: 50px;
`;

const StAuthClickContainer = styled.span`
  display: flex;
  align-items: center;
  display: inline-flex;
  cursor: pointer;
`;

const StLabel = styled.span`
  margin-left: 10px;
  &:hover {
    transition: 0.5s;
    font-weight: bold;
  }
`;

export default Auth;
