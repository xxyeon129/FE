import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import useLoginModal from '@src/Hook/useAuthModal';
import LoginModal from '@src/components/nav/LoginModal';

const Login = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const location = useLocation();

  const [onLoginCloseModal, onSignUpButtonClick, onSignUpCloseModal] = useLoginModal({
    setIsLoginModalOpen,
    setIsSignUpModalOpen,
  });

  const onClickLoginButton = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <StLogin>
      <StText>로그인 후 이용 가능한 서비스입니다.</StText>
      <StLoginButton onClick={onClickLoginButton}>로그인</StLoginButton>
      {isLoginModalOpen && (
        <LoginModal
          onClose={onLoginCloseModal}
          onSignUpClick={onSignUpButtonClick}
          navigatePath={location.pathname}
        />
      )}
    </StLogin>
  );
};

const StLogin = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StText = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const StLoginButton = styled.button`
  background-color: ${({ theme }) => theme.color.neonGreen};
  border-radius: 50px;
  padding: 10px 20px;

  font-size: 17px;
  font-weight: bold;

  &:hover {
    transition: 0.5s;
    background-color: ${({ theme }) => theme.color.lightGreen};
    color: white;
  }
`;

export default Login;
