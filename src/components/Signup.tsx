import React, { useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components';
import { SERVER_URL } from '@src/constants/constants';

type SignupProps = {
  onClose: () => void;
};

function Signup({ onClose }: SignupProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [nicknameError, setNicknameError] = useState<string>('');
  const [emailCheck, setEmailCheck] = useState<string>('');
  const modalRef = useRef(null);

  const addUsers = async () => {
    try {
      const response = await axios.post<string>(`${SERVER_URL}/api/users/signup`, {
        email,
        password,
        nickname,
      });
      alert('회원가입 성공');
      onClose();
      return response;
    } catch (error) {
      alert('회원가입 실패');
      alert(error);
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

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
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
    if (!emailRegex.test(email) || null) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    // 닉네임 유효성 검사
    if (!nicknameRegex.test(nickname) || null) {
      setNicknameError('유효한 닉네임을 입력해주세요.');
      return;
    }

    // 비밀번호 유효성 검사
    if (!passwordRegex.test(password) || null) {
      setPasswordError(
        '유효한 비밀번호를 입력해주세요.\n비밀번호는 최소 6자리 이상이어야 하며, 영문과 숫자가 포함되어야 합니다.'
      );
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    addUsers();
  };

  const onEmailCheck = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/users/email-check?email=${email}`);
      console.log(email);
      setEmailCheck('사용가능한 아이디입니다.');
    } catch (error: unknown) {
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 409) {
        setEmailCheck('중복된 아이디입니다.');
      }
    }
  };

  return (
    <StModalWrapper ref={modalRef} onClick={onBackgroundClick}>
      <StModalContent>
        <StTitleComment>이메일로 가입하기</StTitleComment>
        <label htmlFor="email">이메일</label>
        <StInputSection>
          <StInput type="email" id="email" value={email} onChange={onEmailChange} />
          <StButton onClick={onEmailCheck}>중복검사</StButton>
        </StInputSection>
        <StErrorSection>
          {emailError && <StErrorMessage>{emailError}</StErrorMessage>}
        </StErrorSection>
        <StErrorSection>
          {emailCheck && <StErrorMessage>{emailCheck}</StErrorMessage>}
        </StErrorSection>

        <label htmlFor="password">비밀번호</label>
        <StInputSection>
          <StInput type="password" id="password" value={password} onChange={onPasswordChange} />
        </StInputSection>
        <StErrorSection>
          {passwordError && <StErrorMessage>{passwordError}</StErrorMessage>}
        </StErrorSection>

        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <StInputSection>
          <StInput
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
          />
        </StInputSection>
        <StErrorSection>
          {confirmPasswordError && <StErrorMessage>{confirmPasswordError}</StErrorMessage>}
        </StErrorSection>

        <label htmlFor="nickname">닉네임</label>
        <StInputSection>
          <StInput type="text" id="nickname" value={nickname} onChange={onNicknameChange} />
        </StInputSection>
        <StErrorSection>
          {nicknameError && <StErrorMessage>{nicknameError}</StErrorMessage>}
        </StErrorSection>

        <StSubmitButton onClick={onSubmit}>가입하기</StSubmitButton>
      </StModalContent>
    </StModalWrapper>
  );
}

export default Signup;

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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
`;

const StModalContent = styled.div`
  background-color: white;
  padding: 100px;
  border-radius: 4px;
  margin-top: 100px;
  height: 100%;
  width: 800px;
  align-items: center;
`;

const StInputSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StErrorSection = styled.div`
  margin-bottom: 30px;
  margin-top: -15px;
`;

const StTitleComment = styled.h2`
  margin-bottom: 80px;
`;

const StErrorMessage = styled.label`
  color: red;
`;

const StInput = styled.input`
  flex: 1;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 40px;
  margin-top: 10px;
`;

const StButton = styled.button`
  ${buttonStyle}
`;

const StSubmitButton = styled.button`
  ${buttonStyle}
  width: 150px;
  margin-top: 50px;
`;
