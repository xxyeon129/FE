import React from 'react';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';
import { ChangeEvent, useState } from 'react';
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
  const [titleLength, setTitleLength] = useState(title.value.length);
  const [peopleLength, setPeopleLength] = useState(people.value.length);
  const [positionLength, setPositionLength] = useState(position.value.length);
  const [descriptionLength, setDescriptionLength] = useState(description.value.length);
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    title.onChange(e);
    setTitleLength(value.length);
    if (value.length < 1 || value.length > 50) {
      title.setErrorText('제목은 1자 이상 50자 이하여야 합니다.');
    } else {
      title.setErrorText('');
    }
  };

  const handlePeopleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    people.onChange(e);
    setPeopleLength(value.length);
    if (value.length < 1 || value.length > 50) {
      people.setErrorText('프로젝트 인원은 1자 이상 50자 이하여야 합니다.');
    } else {
      people.setErrorText('');
    }
  };

  const handlePositionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    position.onChange(e);
    setPositionLength(value.length);
    if (value.length < 1 || value.length > 20) {
      position.setErrorText('해당 포지션은 1자 이상 20자 이하여야 합니다.');
    } else {
      position.setErrorText('');
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    description.onChange(e);
    setDescriptionLength(value.length);
    if (value.length < 1 || value.length > 1500) {
      description.setErrorText('프로젝트 설명은 1자 이상 1500자 이하여야 합니다.');
    } else {
      description.setErrorText('');
    }
  };

  return (
    <>
      <InputField
        title="프로젝트 제목"
        value={title.value}
        onChange={handleTitleChange}
        placeholder="프로젝트 제목을 입력하세요 (1 ~ 50자)"
        error={title.error}
        count={titleLength}
        maxLength={50}
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
        onChange={handlePeopleChange}
        placeholder="프로젝트 인원을 입력하세요  ex) ~명 or OOO... (1 ~ 50자)"
        error={people.error}
        count={peopleLength}
        maxLength={50}
      />
      <InputField
        title="해당 포지션"
        value={position.value}
        onChange={handlePositionChange}
        placeholder="포지션을 입력하세요. ex) UX/UI 디자이너 (1 ~ 20자)"
        error={position.error}
        count={positionLength}
        maxLength={20}
      />
      <TextAreaField
        title="프로젝트 설명"
        value={description.value}
        onChange={handleDescriptionChange}
        placeholder="프로젝트 설명을 입력하세요 (1 ~ 1500자)"
        error={description.error}
        count={descriptionLength}
        maxLength={1500}
      />
    </>
  );
};
