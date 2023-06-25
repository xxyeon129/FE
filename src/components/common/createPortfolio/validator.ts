const ERROR_MESSAGE = {
  TITLE_UNDER_5: '제목을 5글자 이상 입력해주세요.',
  EMAIL: '올바른 이메일 주소를 입력해주세요.',
  EXPERIENCE: '10자 이상 입력해주세요.',
};

export const TELEPHONE_REGEX = {
  ONLY_NUMBER: /[^0-9]/g,
  KOR_FIRST_THREE_NUMBER: /^(\d{3})(\d{4})(\d{4})$/,
  KOR_FIRST_TWO_NUMBER: /^(\d{2})(\d{4})(\d{4})$/,
  US_NUMBER: /^(\d{3})(\d{3})(\d{4})$/,
};

export const validateTitle = (value: string) => {
  const isInvalidTitle = value.length < 5;
  return [isInvalidTitle, isInvalidTitle && ERROR_MESSAGE.TITLE_UNDER_5];
};

export const validateEmail = (value: string) => {
  const EMAIL_REGEX =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
  const isInvalid = !EMAIL_REGEX.test(value);
  return [isInvalid, isInvalid && ERROR_MESSAGE.EMAIL];
};

export const validateExperience = (value: string) => {
  const isInvalid = value.length < 10;
  return [isInvalid, isInvalid && ERROR_MESSAGE.EXPERIENCE];
};
