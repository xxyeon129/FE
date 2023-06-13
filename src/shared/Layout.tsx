import { ReactNode } from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';
import Nav from '@src/shared/Nav';
import Header from './Header';
import useLoginModal from '@src/Hook/useLoginModal';
import LoginModal from '@src/components/nav/LoginModal';
import Signup from '@src/components/Signup';
import MobileDropdownMenu from '@src/components/header/MobileDropdownMenu';
import { Mobile } from '@src/style/mediaQuery';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState<boolean>(false);

  const [onLoginCloseModal, onSignUpButtonClick, onSignUpCloseModal] = useLoginModal({
    setIsLoginModalOpen,
    setIsSignUpModalOpen,
  });

  const onClickMobileMenu = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  return (
    <StLayout>
      <Nav setIsLoginModalOpen={setIsLoginModalOpen} setIsSignUpModalOpen={setIsSignUpModalOpen} />
      <Header onClickMobileMenu={onClickMobileMenu} />
      <StContent>{children}</StContent>
      {isLoginModalOpen && (
        <LoginModal onClose={onLoginCloseModal} onSignUpClick={onSignUpButtonClick} />
      )}
      {isSignUpModalOpen && <Signup onClose={onSignUpCloseModal} />}
      <Mobile>
        <>
          {isMobileDropdownOpen && (
            <MobileDropdownMenu
              isMobileDropdownOpen={isMobileDropdownOpen}
              setIsMobileDropdownOpen={setIsMobileDropdownOpen}
            />
          )}
        </>
      </Mobile>
    </StLayout>
  );
};

const StLayout = styled.div`
  display: flex;
`;

const StContent = styled.div`
  margin-left: 250px;
  padding-top: 52px;
  width: calc(100% - 250px);
  min-height: 100vh;
`;

export default Layout;
