import React from 'react';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';
import { ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { styled } from 'styled-components';

interface FormFieldsProps {
  title: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error: string;
    setErrorText: (text: string) => void;
  };
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  people: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error: string;
    setErrorText: (text: string) => void;
  };
  position: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error: string;
    setErrorText: (text: string) => void;
  };
  description: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error: string;
    setErrorText: (text: string) => void;
  };
}

export const FormFields: React.FC<FormFieldsProps> = ({
  title,
  // term,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  people,
  position,
  description,
}) => {
  return (
    <>
      <InputField
        title="프로젝트 제목"
        value={title.value}
        onChange={title.onChange}
        placeholder="프로젝트 제목을 입력하세요"
        error={title.error}
      />
      <DatePickerWrapper>
        <StTitle>프로젝트 기간</StTitle>
        <StInputWrapper>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            placeholderText="시작일"
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
            placeholderText="마감일"
          />
        </StInputWrapper>
      </DatePickerWrapper>

      <InputField
        title="프로젝트 인원"
        value={people.value}
        onChange={people.onChange}
        placeholder="프로젝트 인원을 입력하세요"
        error={people.error}
      />
      <InputField
        title="해당 포지션"
        value={position.value}
        onChange={position.onChange}
        placeholder="포지션을 입력하세요. ex) UX/UI 디자이너"
        error={position.error}
      />
      <TextAreaField
        title="프로젝트 설명"
        value={description.value}
        onChange={description.onChange}
        placeholder="프로젝트 설명을 입력하세요"
        error={description.error}
      />
    </>
  );
};
const DatePickerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .react-datepicker__input-container input {
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
  }
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
  }
`;

const StTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
  width: 100%;
  margin-bottom: 1px;
`;

const StInputWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;
