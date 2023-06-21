import DatePicker from 'react-datepicker';
import { styled } from 'styled-components';
import { useState } from 'react';
interface CustomDatePickerProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  error: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  error,
}) => {
  return (
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
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </DatePickerWrapper>
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
const ErrorMessage = styled.div`
  font-size: 14px;
  padding: 0px 10px;
  color: red;
`;
