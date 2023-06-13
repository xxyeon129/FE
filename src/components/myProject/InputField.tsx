// InputField.tsx
import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';

export const InputField: React.FC<{
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}> = ({ title, value, onChange, placeholder, error }) => (
  <StTextWrap>
    <StTitle>{title}</StTitle>
    <StInput type="text" value={value} onChange={onChange} placeholder={placeholder} />
    {error && <StError>{error}</StError>}
  </StTextWrap>
);

const StTextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
  width: 100%;
  margin-bottom: 1px;
`;

const StInput = styled.input`
  width: 100%;
  height: 40px;
  left: 55px;
  top: 326px;
  background: #ffffff;
  border: 1px solid rgba(203, 203, 203, 0.7);
  border-radius: 6px;
  padding: 10px;

  &:focus::placeholder {
    font-size: 0.8em;
    transition: font-size 0.3s;
  }
`;

const StError = styled.div`
  font-size: 14px;
  color: red;
`;
