import { useEffect } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '@src/states';
import { ReactComponent as AuthIcon } from '@src/assets/nav/nav-logout-icon.svg';
import useResetCreatePortfolioRecoilValues from '@src/Hook/useResetCreatePortfolioRecoilValues';
import useResetSelectedFilterRecoilValues from '@src/Hook/useResetSelectedFilterRecoilValues';
import { DesktopAndTablet } from '@src/style/mediaQuery';
import { NavProps } from '@src/shared/Nav';
import { isDarkModeState } from '@src/states/darkModeState';

const Auth = ({ setIsLoginModalOpen, setIsLogoutModalOpen }: NavProps) => {
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);
  const resetRecoilValues = useResetCreatePortfolioRecoilValues();
  const resetSelectedRecoilValue = useResetSelectedFilterRecoilValues();

  const onClickAuth = async () => {
    if (isLogin) {
      window.localStorage.clear();
      setIsLogin(false);
      resetRecoilValues();
      resetSelectedRecoilValue();
      setIsLogoutModalOpen(true);
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
        <StAuthIcon isdarkmode={`${isDarkMode}`} />
        <DesktopAndTablet>
          <StLabel>{isLogin ? 'Logout' : 'Login'}</StLabel>
        </DesktopAndTablet>
      </StAuthClickContainer>
    </StAuth>
  );
};

const StAuth = styled.div`
  margin-bottom: 20px;
  @media ${({ theme }) => theme.size.mobileRow} {
    display: flex;
    justify-content: center;
  }
`;

const StAuthClickContainer = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StAuthIcon = styled(AuthIcon)<{ isdarkmode: string }>`
  & path {
    stroke: ${({ isdarkmode }) => isdarkmode === 'true' && 'white'};
  }
`;

const StLabel = styled.span`
  margin-left: 10px;
  &:hover {
    transition: 0.5s;
    font-weight: bold;
  }
`;

export default Auth;
