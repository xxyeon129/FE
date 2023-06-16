import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';

export const TextAreaField: React.FC<{
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  error?: string;
}> = ({ title, value, onChange, placeholder, error }) => (
  <StTextWrap>
    <StTitle>{title}</StTitle>
    <StTextArea value={value} onChange={onChange} placeholder={placeholder} />
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

const StTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 10vh;
  border: 1px solid rgba(203, 203, 203, 0.7);
  border-radius: 6px;
  transition: font-size 0.3s;
  font-size: 15px;

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
