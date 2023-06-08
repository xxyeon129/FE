import { ReactNode } from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';
import Nav from '@src/shared/Nav';
import Header from './Header';
import useLoginModal from '@src/Hook/useLoginModal';
import LoginModal from '@src/components/nav/LoginModal';
import Signup from '@src/components/Signup';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const [onLoginCloseModal, onSignUpButtonClick, onSignUpCloseModal] = useLoginModal({
    setIsLoginModalOpen,
    setIsSignUpModalOpen,
  });

  return (
    <StLayout>
      <Nav setIsLoginModalOpen={setIsLoginModalOpen} setIsSignUpModalOpen={setIsSignUpModalOpen} />
      <Header />
      <StContent>{children}</StContent>
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
  margin-left: 250px;
  padding-top: 52px;
  width: calc(100% - 250px);
  min-height: 100vh;
`;

export default Layout;
