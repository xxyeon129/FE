import React, { useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

type SignupProps = {
  onClose: () => void;
};

function Signup({ onClose }: SignupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const modalRef = useRef(null);

  const addUsers = async () => {
    try {
      const response = await axios.post<string>('http://3.34.102.60:8080/api/users/signup', {
        email,
        password,
        nickname,
      });
      alert('회원가입 성공');
      onClose();
      return response;
    } catch (error) {
      console.error('회원가입 API 에러 : ', error);
      throw error;
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError('');
  };

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nicknameRegex = /^[가-힣a-zA-Z]{2,10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    // 이메일 유효성 검사
    if (!emailRegex.test(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    // 닉네임 유효성 검사
    if (!nicknameRegex.test(nickname)) {
      setNicknameError('유효한 닉네임을 입력해주세요.');
      return;
    }

    // 비밀번호 유효성 검사
    if (!passwordRegex.test(password)) {
      setPasswordError(
        '유효한 비밀번호를 입력해주세요.\n비밀번호는 최소 6자리 이상이어야 하며, 영문과 숫자가 포함되어야 합니다.'
      );
      return;
    }
    addUsers();
  };

  return (
    <ModalWrapper ref={modalRef} onClick={onBackgroundClick}>
      <ModalContent>
        <h2>회원가입</h2>
        <div>
          <label htmlFor="email">이메일:</label>
          <input type="email" id="email" value={email} onChange={onEmailChange} />
          <div>{emailError && <ErrorMessage>{emailError}</ErrorMessage>}</div>
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" value={password} onChange={onPasswordChange} />
          <div>{passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}</div>
        </div>
        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input type="text" id="nickname" value={nickname} onChange={onNicknameChange} />
          <div>{nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}</div>
        </div>
        <button onClick={onSubmit}>가입하기</button>
      </ModalContent>
    </ModalWrapper>
  );
}

export default Signup;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
`;

const ErrorMessage = styled.label`
  color: red;
`;
