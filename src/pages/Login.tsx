import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as ErrorIcon } from '@src/assets/not-found-icon.svg';
import { ReactComponent as ErrorDarkModeIcon } from '@src/assets/not-found-dark-mode-icon.svg';
import { ReactComponent as SocialLoginWarnModalIcon } from '@src/assets/portfolioDetail/port-delete-icon.svg';
import useAuthModal from '@src/Hook/useAuthModal';
import { onClickKakaoLogin, onCloseKakaoModal } from '@src/shared/utils/kakaoLogin';
import LoginModal from '@src/components/nav/LoginModal';
import Signup from '@src/components/Signup';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';
import Modal from '@src/components/common/Modal';

const Login = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isKakaoLoginWarnModalOpen, setIsKakaoLoginWarnModalOpen] = useState<boolean>(false);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);

  const location = useLocation();

  const [onCloseLoginModal, onClickSignUpButton, onCloseSignUpModal] = useAuthModal({
    setIsLoginModalOpen,
    setIsSignUpModalOpen,
  });

  const onClickLoginButton = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <StLogin>
      {isDarkMode ? <ErrorDarkModeIcon /> : <ErrorIcon />}
      <StTextContainer>
        <StText>로그인 후 이용 가능한 서비스입니다!</StText>
        <StDescription>간편하게 로그인 후 다양한 POL 서비스를 이용해보세요.</StDescription>
      </StTextContainer>
      <StLoginButton onClick={onClickLoginButton}>로그인</StLoginButton>
      {isLoginModalOpen && (
        <LoginModal
          onClose={onCloseLoginModal}
          onSignUpClick={onClickSignUpButton}
          setIsKakaoLoginWarnModalOpen={setIsKakaoLoginWarnModalOpen}
          navigatePath={location.pathname}
        />
      )}
      {isSignUpModalOpen && <Signup onClose={onCloseSignUpModal} />}
      {isKakaoLoginWarnModalOpen && (
        <Modal
          Icon={SocialLoginWarnModalIcon}
          mainText="카카오톡 간편가입 주의"
          subText={`카카오톡 로그인 시 전체 동의를 해주셔야\n간편가입이 가능합니다!`}
          mainButtonText="확인"
          subButtonText="취소"
          onClose={() => onClickKakaoLogin(setIsKakaoLoginWarnModalOpen)}
          onCloseKakaoModal={() =>
            onCloseKakaoModal(setIsKakaoLoginWarnModalOpen, setIsLoginModalOpen)
          }
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
  gap: 1rem;
`;

const StTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 250%;
`;

const StText = styled.h2`
  /* font-size: 20px; */
  font-weight: 900;
  text-align: center;
`;

const StDescription = styled.div`
  line-height: 150%;
  font-size: 18px;
  text-align: center;
  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 15px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 13px;
  }
`;

const StLoginButton = styled.button`
  background-color: ${({ theme }) => theme.color.neonGreen};
  font-size: 17px;
  font-weight: 800;
  padding: 15px 25px;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    transition: 0.5s;
    background-color: ${({ theme }) => theme.color.lightGreen};
    color: white;
  }

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 15px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 13px;
  }
`;

export default Login;
