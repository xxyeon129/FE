import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';

export const TextAreaField: React.FC<{
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  error?: string;
  count: number;
  maxLength: number;
}> = ({ title, value, onChange, placeholder, error, count, maxLength }) => {
  const Overlength = count == maxLength;

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textareaValue = e.target.value;
    if (textareaValue.length <= maxLength) {
      onChange(e);
    }
  };
  return (
    <StTextWrap>
      <StTitle>{title}</StTitle>
      <StTextArea value={value} onChange={handleTextAreaChange} placeholder={placeholder} />
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

const StTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 10vh;
  border: 1px solid rgba(203, 203, 203, 0.7);
  border-radius: 6px;
  transition: font-size 0.3s;
  resize: none;

  &:focus::placeholder {
    font-size: 0.8em;
    transition: font-size 0.3s;
  }
`;

const StError = styled.div`
  font-size: 14px;
  color: red;
  padding: 0px 10px;
`;

const StCharacterCount = styled.div<{ overlength: boolean }>`
  font-size: 1px;
  padding: 0px 10px;
  color: ${({ overlength }) => (overlength ? 'red' : 'rgba(0, 0, 0, 0.5)')};
  text-align: right;
`;
