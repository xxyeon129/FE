import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { loginState } from '@src/states';
import axios from 'axios';

type LoginProps = {
  onClose: () => void;
  onSignUpClick: () => void;
};

const LoginModal = ({ onClose, onSignUpClick }: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setIsLogin = useSetRecoilState(loginState);
  const modalRef = useRef(null);

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

      setIsLogin(true);
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
          <span>
            간편하게 로그인하고 다양한
            <br /> 포트폴리오를 만나보세요.
          </span>
        </div>
        <label htmlFor="">이메일</label>
        <div>
          <input type="text" id="email" value={email} onChange={onEmailChange} />
        </div>
        <label htmlFor="password">비밀번호:</label>
        <div>
          <input type="password" id="password" value={password} onChange={onPasswordChange} />
        </div>
        <div>
          <button onClick={onSubmit}>로그인</button>
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

const StModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StModalContent = styled.div`
  margin-top: 105px;
  background-color: white;
  padding: 20px;
  height: 100%;
  width: 800px;
  justify-content: center;
`;
