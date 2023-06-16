import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { loginState } from '@src/states';
import { PATH_URL } from '@src/constants/constants';
import { ReactComponent as AuthIcon } from '@src/assets/nav/nav-logout-icon.svg';
import useResetCreatePortfolioRecoilValues from '@src/Hook/useResetCreatePortfolioRecoilValues';
import useResetSelectedFilterRecoilValues from '@src/Hook/useResetSelectedFilterRecoilValues';
import { DesktopAndTablet } from '@src/style/mediaQuery';
import { NavProps } from '@src/shared/Nav';

const Auth = ({ setIsLoginModalOpen, setIsLogoutModalOpen }: NavProps) => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const resetRecoilValues = useResetCreatePortfolioRecoilValues();
  const resetSelectedRecoilValue = useResetSelectedFilterRecoilValues();

  const navigate = useNavigate();

  const onClickAuth = async () => {
    if (isLogin) {
      window.localStorage.clear();
      setIsLogin(false);
      resetRecoilValues();
      resetSelectedRecoilValue();
      setIsLogoutModalOpen(true);
      // navigate(PATH_URL.HOME);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  useEffect(() => {
    const isExistToken = localStorage.getItem('accesstoken');
    isExistToken === null ? setIsLogin(false) : setIsLogin(true);
  }, [isLogin]);

  return (
    <StAuth>
      <StAuthClickContainer onClick={onClickAuth}>
        <AuthIcon />
        <DesktopAndTablet>
          <StLabel>{isLogin ? 'Logout' : 'Login'}</StLabel>
        </DesktopAndTablet>
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
