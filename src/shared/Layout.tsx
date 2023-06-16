import { ReactNode } from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';
import Nav from '@src/shared/Nav';
import Header from './Header';
import useAuthModal from '@src/Hook/useAuthModal';
import LoginModal from '@src/components/nav/LoginModal';
import Signup from '@src/components/Signup';
import MobileDropdownMenu from '@src/components/header/MobileDropdownMenu';
import { MobileRow } from '@src/style/mediaQuery';
import LogoutModal from '@src/components/nav/LogoutModal';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const [onLoginCloseModal, onSignUpButtonClick, onSignUpCloseModal, onLogoutCloseModal] =
    useAuthModal({
      setIsLoginModalOpen,
      setIsSignUpModalOpen,
      setIsLogoutModalOpen,
    });

  const onClickMobileMenu = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  return (
    <StLayout>
      <Header onClickMobileMenu={onClickMobileMenu} />

      <Nav setIsLoginModalOpen={setIsLoginModalOpen} setIsLogoutModalOpen={setIsLogoutModalOpen} />
      <StContent>{children}</StContent>

      <MobileRow>
        <>
          {isMobileDropdownOpen && (
            <MobileDropdownMenu
              isMobileDropdownOpen={isMobileDropdownOpen}
              setIsMobileDropdownOpen={setIsMobileDropdownOpen}
            />
          )}
        </>
      </MobileRow>

      {isLoginModalOpen && (
        <LoginModal onClose={onLoginCloseModal} onSignUpClick={onSignUpButtonClick} />
      )}
      {isSignUpModalOpen && <Signup onClose={onSignUpCloseModal} />}
      {isLogoutModalOpen && <LogoutModal onClose={onLogoutCloseModal} />}
    </StLayout>
  );
};

const StLayout = styled.div`
  display: flex;
`;

const StContent = styled.div`
  margin-left: 270px;
  padding-top: 70px;
  width: calc(100% - 270px);
  min-height: 100vh;

  @media ${props => props.theme.size.mobileRow} {
    margin-left: 85px;
    width: calc(100% - 85px);
  }
`;

export default Layout;
