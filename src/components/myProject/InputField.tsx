// InputField.tsx
import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';

export const InputField: React.FC<{
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  count: number;
  maxLength: number;
}> = ({ title, value, onChange, placeholder, error, count, maxLength }) => {
  const Overlength = count == maxLength;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      onChange(e);
    }
  };

  return (
    <StTextWrap>
      <StTitle>{title}</StTitle>
      <StInput type="text" value={value} onChange={handleInputChange} placeholder={placeholder} />
      {error && <StError>{error}</StError>}
      <StCharacterCount overlength={Overlength}>
        {count}/{maxLength}
      </StCharacterCount>
    </StTextWrap>
  );
};

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
  color: black;
  &:focus::placeholder {
    font-size: 0.8em;
    transition: font-size 0.3s;
  }
`;

const StError = styled.div`
  font-size: 14px;
  padding: 0px 10px;
  color: red;
`;

const StCharacterCount = styled.div<{ overlength: boolean }>`
  font-size: 1px;
  padding: 0px 10px;
  color: ${({ overlength }) => (overlength ? 'red' : 'rgba(0, 0, 0, 0.5)')};
  text-align: right;
`;
