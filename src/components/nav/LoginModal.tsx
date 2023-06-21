import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { loginState } from '@src/states';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useDecodeJWT from '@src/Hook/useDecodeJWT';
import { SERVER_URL } from '@src/constants/constants';
import { MobileRow, DesktopAndTablet, TabletAndMobile } from '@src/style/mediaQuery.ts';
import { ReactComponent as Dot } from '@src/assets/nav/dot-icon.svg';
import KakaoLogin from '../socialLogin/KakaoLogin';
import NaverLogin from '../socialLogin/NaverLogin';
import GoogleLogin from '../socialLogin/GoogleLogin';

type LoginProps = {
  onClose: () => void;
  onSignUpClick: () => void;
  navigatePath?: string;
  setIsKakaoLoginWarnModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginModal = ({
  onClose,
  onSignUpClick,
  navigatePath,
  setIsKakaoLoginWarnModalOpen,
}: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const setIsLogin = useSetRecoilState(loginState);
  const modalRef = useRef(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post<string>(`${SERVER_URL}/api/users/login`, {
        email,
        password,
      });

      const accessToken = response.headers['accesstoken'];
      const refreshToken = response.headers['refreshtoken'];

      localStorage.setItem('accesstoken', accessToken);
      localStorage.setItem('refreshtoken', refreshToken);

      const userId = useDecodeJWT().userId;

      setIsLogin(true);
      navigatePath && navigate(`${navigatePath}${userId}`);
      onClose();
    } catch (error: unknown) {
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
        setErrorMessage('유효하지 않은 아이디나 비밀번호입니다.');
      }
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleLogin();
  };

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(max-width: 1023px)').matches) {
      if (modalRef.current === e.target) {
        onClose();
      }
    }
  };

  const onButtonClick = () => {
    onClose();
  };

  const onSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSignUpClick();
  };

  return (
    <StModalWrapper ref={modalRef} onClick={onBackgroundClick}>
      <StModalContent>
        <StTitleAndButtonSection>
          <StModalTitle>
            간편하게 로그인하고 다양한
            <br /> 포트폴리오를 만나보세요.
          </StModalTitle>

          <StButtonSection>
            <TabletAndMobile>
              {/* <CloseButton onClick={onButtonClick}>닫기</CloseButton> */}
              <StDotIcon onClick={onButtonClick} />
            </TabletAndMobile>
          </StButtonSection>
        </StTitleAndButtonSection>

        <StInputSection>
          <DesktopAndTablet>
            <label htmlFor="">이메일</label>
          </DesktopAndTablet>
          <DesktopAndTablet>
            <StInput type="text" id="email" value={email} onChange={onEmailChange} />
          </DesktopAndTablet>
          <MobileRow>
            <StInput
              type="text"
              id="email"
              placeholder="이메일"
              value={email}
              onChange={onEmailChange}
            />
          </MobileRow>
        </StInputSection>

        <StInputSection>
          <DesktopAndTablet>
            <label htmlFor="password">비밀번호</label>
          </DesktopAndTablet>
          <DesktopAndTablet>
            <StInput type="password" id="password" value={password} onChange={onPasswordChange} />
          </DesktopAndTablet>
          <MobileRow>
            <StInput
              type="password"
              id="password"
              placeholder="비밀번호"
              value={password}
              onChange={onPasswordChange}
            />
          </MobileRow>
        </StInputSection>
        {errorMessage && <StErrorMessage>{errorMessage}</StErrorMessage>}

        <div>
          <LoginButton onClick={onSubmit}>로그인</LoginButton>
        </div>

        <div>
          <span>아직 폴 회원이 아니세요?</span>
          <button onClick={onSignUp}>회원가입</button>
        </div>
        <StSocialLogin>
          {setIsKakaoLoginWarnModalOpen && (
            <KakaoLogin
              setIsKakaoLoginWarnModalOpen={setIsKakaoLoginWarnModalOpen}
              onCloseLoginModal={onClose}
            />
          )}

          <NaverLogin />
          <GoogleLogin />
        </StSocialLogin>
      </StModalContent>
    </StModalWrapper>
  );
};

export default LoginModal;

const buttonStyle = `
padding: 8px 16px;
background-color: #3d3d3d;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;

&:hover {
  background-color: #bcbcbc;
}
`;

const StModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const StTitleAndButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const StDotIcon = styled(Dot)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(10%, -100%);
  width: 20px;
  height: 20px;
  fill: #ccc;
  cursor: pointer;

  transition: transform 0.2s ease;

  &:hover {
    transform: translate(10%, -90%);
  }
`;

const StModalContent = styled.form`
  background-color: white;
  padding: 100px;
  border-radius: 20px;
  margin-top: 100px;
  height: 700px;
  width: 600px;
  align-items: center;

  @media (max-width: 1023px) {
    height: 600px;
    width: 500px;
    padding: 50px;
  }

  @media (max-width: 767px) {
    height: 500px;
    width: 400px;
    padding: 50px;
  }

  @media (max-width: 479px) {
    height: 500px;
    width: 400px;
    padding: 50px;
  }
`;

const StModalTitle = styled.h1`
  @media (max-width: 1023px) {
    font-size: 25px;
  }

  @media (max-width: 767px) {
    font-size: 20px;
  }

  @media (max-width: 479px) {
    font-size: 18px;
  }
`;

const StInputSection = styled.div`
  margin: 30px 0;
`;

const StInput = styled.input`
  flex: 1;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 50px;
  margin: 15px 0;
  width: 100%;

  @media (max-width: 1023px) {
    margin-bottom: -10px;
  }

  @media (max-width: 479px) {
    margin-bottom: -10px;
  }
`;

const LoginButton = styled.button`
  ${buttonStyle}
  width: 100%;
  height: 40px;
  margin: 20px 0;
`;

const StErrorMessage = styled.label`
  color: red;
`;

const StSocialLogin = styled.div`
  margin-top: 20px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
