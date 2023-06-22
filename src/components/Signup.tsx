import React, { useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components';
import { SERVER_URL } from '@src/constants/constants';
import { ReactComponent as Eye } from '@src/assets/nav/input-i-icon.svg';
import { ReactComponent as Dot } from '@src/assets/nav/dot-icon.svg';
import { MobileRow, DesktopAndTablet, TabletAndMobile } from '@src/style/mediaQuery.ts';
import { useNavigate } from 'react-router-dom';
import ProposalLoginModal from './ProposalLoginModal';
import useSnackbarPopup from '@src/Hook/useSnackbarPopup';
import SnackbarPopup from '@src/components/common/SnackbarPopup';

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loginNow, setLoginNow] = useState<boolean>(false);
  const [emailCode, setEmailCode] = useState<string>('');
  const [inputEmailCode, setInputEmailCode] = useState<string>('');
  const [emailCodeError, setEmailCodeError] = useState<string>('');
  const [emailCodeSuccess, setEmailCodeSuccess] = useState<string>('');

  const { isSnackbarVisible, showSnackbarPopup } = useSnackbarPopup();

  const modalRef = useRef(null);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    emailcode: '',
  });

  const addUsers = async () => {
    try {
      const response = await axios.post<string>(`${SERVER_URL}/api/users/signup`, {
        email,
        password,
        nickname,
      });
      showSnackbarPopup();
      setLoginNow(true);
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

  const onEmailCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmailCode(e.target.value);
  };

  const onEmailCodeCheck = () => {
    if (inputEmailCode === emailCode) {
      setEmailCodeError('');
      setEmailCodeSuccess('이메일 인증이 성공했습니다.');
    } else {
      setEmailCodeError('올바른 이메일 확인 코드를 입력해주세요.');
      setEmailCodeSuccess('');
    }
  };

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(max-width: 1023px)').matches) {
      if (modalRef.current === e.target) {
        onClose();
      }
    }
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nicknameRegex = /^[a-zA-Z가-힣0-9]{1,10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
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
        password:
          '비밀번호는 최소 6자리 이상이어야 하며, 영문과 숫자 특수문자 1개이상 포함되어야 합니다.',
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
    try {
      const response = await axios.get(`${SERVER_URL}/api/users/email`, {
        params: {
          receiverEmail: email,
        },
      });
      alert(response.data.message);
      setEmailCode(response.data.data);
    } catch (error) {
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 409) {
        alert('이미 인증된 이메일입니다.');
      }
    }
  };

  const onButtonClick = () => {
    onClose();
  };

  return (
    <StModalWrapper ref={modalRef} onClick={onBackgroundClick}>
      <StModalContent onSubmit={onSubmit}>
        <StTitleAndButtonSection>
          <StTitleComment>이메일로 가입하기</StTitleComment>

          <StButtonSection>
            <TabletAndMobile>
              <StDotIcon onClick={onButtonClick} />
              {/* <CloseButton onClick={onButtonClick}>닫기</CloseButton> */}
            </TabletAndMobile>
          </StButtonSection>
        </StTitleAndButtonSection>

        <DesktopAndTablet>
          <label htmlFor="email">이메일</label>
        </DesktopAndTablet>

        <StInputSection>
          <DesktopAndTablet>
            <StInput type="email" id="email" value={email} onChange={onEmailChange} />
          </DesktopAndTablet>
          <MobileRow>
            <StInput
              type="email"
              id="email"
              placeholder="이메일"
              value={email}
              onChange={onEmailChange}
            />
          </MobileRow>
          <StButton onClick={onEmailCheck} type="button">
            이메일인증
          </StButton>
        </StInputSection>
        <StErrorSection>
          {errors.email && <StErrorMessage>{errors.email}</StErrorMessage>}
          {emailErrorCheck && <StErrorMessage>{emailErrorCheck}</StErrorMessage>}
          {emailSuccessCheck && <StSuccessMessage>{emailSuccessCheck}</StSuccessMessage>}
        </StErrorSection>

        {/* 이메일코드 */}
        <StInputSection>
          <DesktopAndTablet>
            <StInput
              type="text"
              placeholder="이메일 확인 코드"
              id="emailcode"
              value={inputEmailCode}
              onChange={onEmailCodeChange}
            />
          </DesktopAndTablet>
          <MobileRow>
            <StInput
              type="text"
              placeholder="이메일 확인 코드"
              id="emailcode"
              value={inputEmailCode}
              onChange={onEmailCodeChange}
            />
          </MobileRow>
          <StButton onClick={onEmailCodeCheck} type="button">
            코드확인
          </StButton>
        </StInputSection>
        <StErrorSection>
          {emailCodeError && <StErrorMessage>{emailCodeError}</StErrorMessage>}
          {emailCodeSuccess && <StSuccessMessage>{emailCodeSuccess}</StSuccessMessage>}
        </StErrorSection>

        <DesktopAndTablet>
          <label htmlFor="password">비밀번호</label>
        </DesktopAndTablet>
        <StInputSection>
          <DesktopAndTablet>
            <StInput
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="비밀번호 입력 (문자,숫자,특수문자 포함 6자 이상)"
            />
          </DesktopAndTablet>
          <MobileRow>
            <StInput
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="비밀번호 입력 (문자,숫자,특수문자 포함 6자 이상)"
              value={password}
              onChange={onPasswordChange}
            />
          </MobileRow>
          <StEyeIcon onClick={onShowPassword} />
        </StInputSection>
        <StErrorSection>
          {errors.password && <StErrorMessage>{errors.password}</StErrorMessage>}
        </StErrorSection>
        <DesktopAndTablet>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
        </DesktopAndTablet>
        <StInputSection>
          <DesktopAndTablet>
            <StInput
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
            />
          </DesktopAndTablet>
          <MobileRow>
            <StInput
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
            />
          </MobileRow>
          <StEyeIcon onClick={onShowConfirmPassword} />
        </StInputSection>
        <StErrorSection>
          {errors.confirmPassword && <StErrorMessage>{errors.confirmPassword}</StErrorMessage>}
        </StErrorSection>
        <DesktopAndTablet>
          <label htmlFor="nickname">닉네임</label>
        </DesktopAndTablet>
        <StInputSection>
          <DesktopAndTablet>
            <StInput
              type="text"
              id="nickname"
              value={nickname}
              onChange={onNicknameChange}
              placeholder="닉네임 입력 (문자,숫자, 포함 2자 이상)"
            />
          </DesktopAndTablet>
          <MobileRow>
            <StInput
              type="text"
              id="nickname"
              placeholder="닉네임 입력 (문자,숫자, 포함 2자 이상)"
              value={nickname}
              onChange={onNicknameChange}
            />
          </MobileRow>
        </StInputSection>
        <StErrorSection>
          {errors.nickname && <StErrorMessage>{errors.nickname}</StErrorMessage>}
        </StErrorSection>

        <StButtonContainer>
          <StSubmitButton>가입하기</StSubmitButton>
        </StButtonContainer>
      </StModalContent>
      {loginNow && (
        <ProposalLoginModal
          email={email}
          password={password}
          onCloseModal={() => setLoginNow(false)}
          onSiginupClose={onClose}
        />
      )}

      {isSnackbarVisible && (
        <SnackbarPopup text="회원가입 성공" type="done" isSnackbarVisible={isSnackbarVisible} />
      )}
    </StModalWrapper>
  );
}

export default Signup;

const buttonStyle = `
// padding: 8px 16px;
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
  padding: 70px;
  border-radius: 20px;
  height: 800px;
  width: 600px;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1023px) {
    width: 500px;
    height: 750px;
    padding: 50px;
  }

  @media (max-width: 767px) {
    width: 500px;
    height: 650px;
    padding: 50px;
  }

  @media (max-width: 479px) {
    width: 400px;
    height: 540px;
    padding: 50px;
  }
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
  transform: translate(50%, -200%);
  width: 20px;
  height: 20px;
  fill: #ccc;
  cursor: pointer;

  transition: transform 0.2s ease;

  &:hover {
    transform: translate(50%, -190%);
  }
`;

const StInputSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  gap: 10px;
`;

const StInput = styled.input`
  flex: 1;
  padding: 8px;
  /* margin-right: 8px; */
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 40px;
  margin-top: 10px;

  @media (max-width: 479px) {
    margin: 0;
    margin-top: -5px;
  }
`;

const StEyeIcon = styled(Eye)`
  position: absolute;
  top: 55%;
  right: 15px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  fill: #ccc;
  cursor: pointer;
`;

const StErrorSection = styled.div`
  margin-bottom: 30px;
  margin-top: -15px;
  font-size: 14px;

  @media (max-width: 1023px) {
    font-size: 14px;
  }

  @media (max-width: 767px) {
    font-size: 12px;
  }

  @media (max-width: 479px) {
    font-size: 10px;
  }
`;

const StTitleComment = styled.h1`
  margin-bottom: 30px;

  @media (max-width: 1023px) {
    font-size: 23px;
  }

  @media (max-width: 767px) {
    font-size: 23px;
  }

  @media (max-width: 479px) {
    font-size: 18px;
  }
`;

const StErrorMessage = styled.label`
  color: red;
`;
const StSuccessMessage = styled.label`
  color: green;
`;

const StButton = styled.button`
  ${buttonStyle}
  height: 40px;
  margin-top: 10px;

  @media (max-width: 479px) {
    height: 40px;
    width: 75px;
    margin-top: -5px;
    align-items: center;
    justify-content: center;
  }
`;

const StSubmitButton = styled.button`
  ${buttonStyle}
  width: 150px;
  height: 40px;
  margin-top: 5px;

  @media (max-width: 1023px) {
    width: 100px;
  }

  @media (max-width: 767px) {
    width: 100px;
  }

  @media (max-width: 479px) {
    width: 100px;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
