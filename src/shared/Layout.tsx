import { ReactNode } from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';
import { MobileRow } from '@src/style/mediaQuery';
import { onClickKakaoLogin, onCloseKakaoModal } from './utils/kakaoLogin';
import { ReactComponent as LogoutModalIcon } from '@src/assets/nav/logout-modal-icon.svg';
import { ReactComponent as InProgressModalIcon } from '@src/assets/mypage-profile.svg';
import { ReactComponent as SocialLoginWarnModalIcon } from '@src/assets/portfolioDetail/port-delete-icon.svg';
import Nav from '@src/shared/Nav';
import Header from './Header';
import useAuthModal from '@src/Hook/useAuthModal';
import LoginModal from '@src/components/nav/LoginModal';
import Signup from '@src/components/Signup';
import MobileDropdownMenu from '@src/components/header/MobileDropdownMenu';
import Modal from '@src/components/common/Modal';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isInProgressModalOpen, setIsInProgressModalOpen] = useState<boolean>(false);
  const [isKakaoLoginWarnModalOpen, setIsKakaoLoginWarnModalOpen] = useState<boolean>(false);

  const [onCloseLoginModal, onClickSignUpButton, onCloseSignUpModal, onCloseLogoutModal] =
    useAuthModal({
      setIsLoginModalOpen,
      setIsSignUpModalOpen,
      setIsLogoutModalOpen,
    });

  const onCloseInProgressModal = () => {
    setIsInProgressModalOpen(false);
  };

  const onClickMobileMenu = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  return (
    <StLayout>
      <Header
        onClickMobileMenu={onClickMobileMenu}
        setIsInProgressModalOpen={setIsInProgressModalOpen}
      />

      <Nav setIsLoginModalOpen={setIsLoginModalOpen} setIsLogoutModalOpen={setIsLogoutModalOpen} />
      <StContent>{children}</StContent>

      <MobileRow>
        <>
          {isMobileDropdownOpen && (
            <MobileDropdownMenu
              isMobileDropdownOpen={isMobileDropdownOpen}
              setIsMobileDropdownOpen={setIsMobileDropdownOpen}
              setIsInProgressModalOpen={setIsInProgressModalOpen}
            />
          )}
        </>
      </MobileRow>

      {isLoginModalOpen && (
        <LoginModal
          onClose={onCloseLoginModal}
          onSignUpClick={onClickSignUpButton}
          setIsKakaoLoginWarnModalOpen={setIsKakaoLoginWarnModalOpen}
        />
      )}
      {isSignUpModalOpen && <Signup onClose={onCloseSignUpModal} />}
      {isLogoutModalOpen && (
        <Modal
          Icon={LogoutModalIcon}
          mainText="로그아웃 되었습니다."
          mainButtonText="확인"
          onClose={onCloseLogoutModal}
        />
      )}
      {isInProgressModalOpen && (
        <Modal
          Icon={InProgressModalIcon}
          mainText="준비 중인 기능입니다!"
          subText="더 나은 서비스를 개발 중입니다"
          mainButtonText="확인"
          onClose={onCloseInProgressModal}
        />
      )}
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
