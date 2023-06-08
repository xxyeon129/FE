import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { loginState } from '@src/states';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useDecodeJWT from '@src/Hook/useDecodeJWT';

type LoginProps = {
  onClose: () => void;
  onSignUpClick: () => void;
  navigatePath?: string;
};

const LoginModal = ({ onClose, onSignUpClick, navigatePath }: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setIsLogin = useSetRecoilState(loginState);
  const modalRef = useRef(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post<string>('http://3.34.102.60:8080/api/users/login', {
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
    } catch (error) {
      console.error('로그인 실패:', error);
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
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const onSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSignUpClick();
  };

  return (
    <StModalWrapper ref={modalRef} onClick={onBackgroundClick}>
      <StModalContent>
        <div>
          <h1>
            간편하게 로그인하고 다양한
            <br /> 포트폴리오를 만나보세요.
          </h1>
        </div>

        <StInputSection>
          <label htmlFor="">이메일</label>
          <StInput type="text" id="email" value={email} onChange={onEmailChange} />
        </StInputSection>

        <StInputSection>
          <label htmlFor="password">비밀번호</label>
          <StInput type="password" id="password" value={password} onChange={onPasswordChange} />
        </StInputSection>

        <div>
          <LoginButton onClick={onSubmit}>로그인</LoginButton>
        </div>

        <div>
          <span>아직 폴 회원이 아니세요?</span>
          <button onClick={onSignUp}>회원가입</button>
        </div>
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
  /* width: 100vw;
  height: 100vh; */
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const StModalContent = styled.div`
  margin-top: 105px;
  background-color: white;
  padding: 20px;
  height: 100%;
  width: 800px;
  justify-content: center;
  padding: 100px;
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
  margin-top: 10px;
  width: 100%;
`;

const LoginButton = styled.button`
  ${buttonStyle}
  width: 100%;
  height: 40px;
  margin: 20px 0;
`;
