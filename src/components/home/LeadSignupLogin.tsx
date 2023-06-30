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
        POL의 모든 기능을 이용해
        <br /> 멋진 포트폴리오를 만들어보세요
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
  > br {
    display: none;
  }

  @media screen and (max-width: 950px) {
    transition: 0.3s;
    font-size: 20px;
  }
  @media screen and (max-width: 815px) {
    transition: 0.3s;
    font-size: 18px;
  }
  @media screen and (max-width: 775px) {
    transition: 0.3s;
    font-size: 16px;
  }
  @media ${({ theme }) => theme.size.mobileRow} {
    transition: 0.3s;
    font-size: 22px;
  }
  @media screen and (max-width: 695px) {
    transition: 0.3s;
    font-size: 18px;
  }
  @media screen and (max-width: 585px) {
    transition: 0.3s;
    font-size: 16px;
    line-height: 140%;
    > br {
      display: block;
    }
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  font-size: 18px;

  @media screen and (max-width: 615px) {
    transition: 0.7s;
    font-size: 18px;
  }

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.7s;
    font-size: 12px;
  }
`;

const buttonStyle = `
  width: 158px;
  padding: 15px 0;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 800;
  flex-shrink: 0;

  @media screen and (max-width: 615px) {
    transition: 0.7s;
    width: 130px;
    padding: 13px 0;
    font-size: 15px;
  }
  @media screen and (max-width: 480px) {
    transition: 0.7s;
    width: 100px;
    padding: 10px 0;
    font-size: 12px;
  }
`;

const StSigninButton = styled.button`
  ${buttonStyle}
  margin-right: 17px;
  background-color: ${({ theme }) => theme.color.neonGreen};

  &:hover {
    transition: 0.5s;
    color: white;
    background-color: ${({ theme }) => theme.color.lightGreen};
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    margin-right: 10px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    margin-right: 5px;
  }
`;

const StLoginButton = styled.button`
  ${buttonStyle}
  margin-left: 17px;
  background-color: ${({ theme }) => theme.color.lightGray};

  &:hover {
    transition: 0.5s;
    color: white;
    background-color: ${({ theme }) => theme.color.fontColor};
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    margin-left: 10px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    margin-left: 5px;
  }
`;

export default LeadSignupLogin;
