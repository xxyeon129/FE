import React from 'react';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';
import { ChangeEvent } from 'react';

interface FormFieldsProps {
  title: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error: string;
    setErrorText: (text: string) => void;
  };
  term: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error: string;
    setErrorText: (text: string) => void;
  };
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
  term,
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
      <InputField
        title="프로젝트 기간"
        value={term.value}
        onChange={term.onChange}
        placeholder="프로젝트 기간을 입력하세요"
        error={term.error}
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
