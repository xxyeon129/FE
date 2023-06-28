import { useState } from 'react';
import { styled } from 'styled-components';
import { fadeInAnimationType } from '@src/types/commonType';
import { ReactComponent as SocialLoginWarnModalIcon } from '@src/assets/portfolioDetail/port-delete-icon.svg';
import { onClickKakaoLogin, onCloseKakaoModal } from '@src/shared/utils/kakaoLogin';
import Modal from '../common/Modal';
import LoginModal from '../nav/LoginModal';
import useAuthModal from '@src/Hook/useAuthModal';
import Signup from '../Signup';

interface LeadSignupLoginProps {
  fadeInAnimationText: fadeInAnimationType;
  fadeInAnimationButton: fadeInAnimationType;
}

const LeadSignupLogin = (props: LeadSignupLoginProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isKakaoLoginWarnModalOpen, setIsKakaoLoginWarnModalOpen] = useState<boolean>(false);

  const [onCloseLoginModal, onClickSignUpButton, onCloseSignUpModal, onCloseLogoutModal] =
    useAuthModal({
      setIsLoginModalOpen,
      setIsSignUpModalOpen,
    });

  const onClickSignupButton = () => {
    setIsSignUpModalOpen(true);
  };

  const onClickLoginButton = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <StLeadSignupLoginConatiner>
      <StText {...props.fadeInAnimationText}>
        POL의 모든 기능을 이용해 멋진 포트폴리오를 만들어보세요
      </StText>
      <StButtonContainer {...props.fadeInAnimationButton}>
        <StSigninButton onClick={onClickSignupButton}>회원가입</StSigninButton>
        또는
        <StLoginButton onClick={onClickLoginButton}>로그인</StLoginButton>
      </StButtonContainer>
      {isLoginModalOpen && (
        <LoginModal
          onClose={onCloseLoginModal}
          onSignUpClick={onClickSignUpButton}
          setIsKakaoLoginWarnModalOpen={setIsKakaoLoginWarnModalOpen}
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
    </StLeadSignupLoginConatiner>
  );
};

const StLeadSignupLoginConatiner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const StText = styled.h2`
  text-align: center;
  font-weight: 800;
`;

const StButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  font-size: 18px;
`;

const buttonStyle = `
  width: 158px;
  padding:15px 0;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 800;
  flex-shrink: 0;
`;

const StSigninButton = styled.button`
  ${buttonStyle}
  margin-right: 17px;
  background-color: ${({ theme }) => theme.color.neonGreen};
`;

const StLoginButton = styled.button`
  ${buttonStyle}
  margin-left: 17px;
  background-color: ${({ theme }) => theme.color.lightGray};
`;

export default LeadSignupLogin;
