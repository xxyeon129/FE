import React from 'react';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';
import { ChangeEvent } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomDatePicker } from './DatePicker';
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
  dateError: string;
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
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  dateError,
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
      <CustomDatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        error={dateError}
      />
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
