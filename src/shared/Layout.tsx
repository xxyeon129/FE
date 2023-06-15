import { ReactNode } from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';
import Nav from '@src/shared/Nav';
import Header from './Header';
import useLoginModal from '@src/Hook/useLoginModal';
import LoginModal from '@src/components/nav/LoginModal';
import Signup from '@src/components/Signup';
import MobileDropdownMenu from '@src/components/header/MobileDropdownMenu';
import { MobileRow } from '@src/style/mediaQuery';

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
      <Header onClickMobileMenu={onClickMobileMenu} />

      <Nav setIsLoginModalOpen={setIsLoginModalOpen} setIsSignUpModalOpen={setIsSignUpModalOpen} />
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

  @media ${props => props.theme.size.mobile} {
    margin-left: 85px;
    width: 100%;
  }
`;

export default Layout;
