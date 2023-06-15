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
  const [emailErrorCheck, setEmailErrorCheck] = useState<string>('');
  const [emailSuccessCheck, setEmailSuccessCheck] = useState<string>('');
  const modalRef = useRef(null);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });

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
      alert('회원가입 실패 ');
      throw error;
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors(prevState => ({ ...prevState, email: '' }));
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors(prevState => ({ ...prevState, password: '' }));
  };

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setErrors(prevState => ({ ...prevState, confirmPassword: '' }));
  };

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setErrors(prevState => ({ ...prevState, nickname: '' }));
  };

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nicknameRegex = /^[가-힣a-zA-Z]{2,10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    let Error = false;

    // 이메일 유효성 검사
    if (!emailRegex.test(email)) {
      setErrors(email => ({ ...email, email: '유효한 이메일 주소를 입력해주세요.' }));
      Error = true;
    }

    // 닉네임 유효성 검사
    if (!nicknameRegex.test(nickname)) {
      setErrors(nickname => ({ ...nickname, nickname: '유효한 닉네임을 입력해주세요.' }));
      Error = true;
    }

    // 비밀번호 유효성 검사
    if (!passwordRegex.test(password)) {
      setErrors(password => ({
        ...password,
        password: '비밀번호는 최소 6자리 이상이어야 하며, 영문과 숫자가 포함되어야 합니다.',
      }));
      Error = true;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setErrors(confirmPassword => ({
        ...confirmPassword,
        confirmPassword: '비밀번호가 일치하지 않습니다.',
      }));
      Error = true;
    }

    if (!Error) {
      addUsers();
    }
  };

  const onEmailCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    try {
      const response = await axios.get(`${SERVER_URL}/api/users/email-check?email=${email}`);
      console.log(email);
      setEmailSuccessCheck('사용가능한 아이디입니다.');
      setEmailErrorCheck('');
    } catch (error: unknown) {
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 409) {
        setEmailErrorCheck('중복된 아이디입니다.');
        setEmailSuccessCheck('');
      } else if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
        setEmailErrorCheck('이메일 형식이 올바르지 않습니다.');
        setEmailSuccessCheck('');
      }
    }
  };

  return (
    <StModalWrapper ref={modalRef} onClick={onBackgroundClick}>
      <StModalContent onSubmit={onSubmit}>
        <StTitleComment>이메일로 가입하기</StTitleComment>
        <label htmlFor="email">이메일</label>
        <StInputSection>
          <StInput type="email" id="email" value={email} onChange={onEmailChange} />
          <StButton onClick={onEmailCheck} type="button">
            중복검사
          </StButton>
        </StInputSection>
        <StErrorSection>
          {errors.email && <StErrorMessage>{errors.email}</StErrorMessage>}
          {emailErrorCheck && <StErrorMessage>{emailErrorCheck}</StErrorMessage>}
          {emailSuccessCheck && <StSuccessMessage>{emailSuccessCheck}</StSuccessMessage>}
        </StErrorSection>

        <label htmlFor="password">비밀번호</label>
        <StInputSection>
          <StInput type="password" id="password" value={password} onChange={onPasswordChange} />
        </StInputSection>
        <StErrorSection>
          {errors.password && <StErrorMessage>{errors.password}</StErrorMessage>}
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
          {errors.confirmPassword && <StErrorMessage>{errors.confirmPassword}</StErrorMessage>}
        </StErrorSection>

        <label htmlFor="nickname">닉네임</label>
        <StInputSection>
          <StInput type="text" id="nickname" value={nickname} onChange={onNicknameChange} />
        </StInputSection>
        <StErrorSection>
          {errors.nickname && <StErrorMessage>{errors.nickname}</StErrorMessage>}
        </StErrorSection>

        <StSubmitButton>가입하기</StSubmitButton>
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
  z-index: 1001;
`;

const StModalContent = styled.form`
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
const StSuccessMessage = styled.label`
  color: green;
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
