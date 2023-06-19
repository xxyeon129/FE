import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

interface PassWordEditFormProps {
  handleCurrentPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordCheckChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSavePassword: () => void;
  oldpassword: string;
  newpassword: string;
  checknewpassword: string;
  oldpasswordError: string;
  newpasswordError: string;
  checknewpasswordError: string;
  apiError: string;
}

const PassWordEditForm: React.FC<PassWordEditFormProps> = ({
  handleCurrentPasswordChange,
  handlePasswordChange,
  handlePasswordCheckChange,
  handleSavePassword,
  oldpassword,
  newpassword,
  checknewpassword,
  oldpasswordError,
  newpasswordError,
  checknewpasswordError,
  apiError,
}) => {
  return (
    <StPwContent>
      <h4>비밀번호</h4>
      <StTextWrapper>
        <StTitle>현재 비밀번호</StTitle>
        <StInput
          type="password"
          name="password"
          value={oldpassword}
          onChange={handleCurrentPasswordChange}
          placeholder="현재 비밀번호"
        />
        {oldpasswordError && <StError>{oldpasswordError}</StError>}
      </StTextWrapper>
      <StTextWrapper>
        <StTitle>비밀번호</StTitle>
        <StInput
          type="password"
          name="password"
          value={newpassword}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
        />
        {newpasswordError && <StError>{newpasswordError}</StError>}
      </StTextWrapper>
      <StTextWrapper>
        <StTitle>비밀번호 확인</StTitle>
        <StInput
          type="password"
          name="passwordCheck"
          value={checknewpassword}
          onChange={handlePasswordCheckChange}
          placeholder="비밀번호 확인"
        />
        {checknewpasswordError && <StError>{checknewpasswordError}</StError>}
        {apiError && <StError>{apiError}</StError>}
      </StTextWrapper>
      <div>
        <StGoodButton onClick={handleSavePassword}>변경하기</StGoodButton>
      </div>
    </StPwContent>
  );
};

export default PassWordEditForm;

const StPwContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h4 {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    margin-bottom: 77px;
  }
`;

const StTextWrapper = styled.div`
  margin-bottom: 25px;
  width: 100%;
`;

const StTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const StInput = styled.input`
  padding: 10px;
  width: 100%;
  background: #ffffff;
  border: 1px solid rgba(203, 203, 203, 0.7);
  border-radius: 6px;
`;

const StError = styled.div`
  font-size: 14px;
  color: red;
  padding: 0px 10px;
`;

const StGoodButton = styled.button`
  width: 126px;
  height: 36px;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 35px;
  border-radius: 8px;

  text-align: center;

  background-color: #6bf65f;
  &:hover {
    background-color: #4ae040;
    color: white;
  }
`;
