const ERROR_MESSAGE = {
  TITLE_UNDER_5: '제목을 5글자 이상 입력해주세요.',
  TITLE_OVER_20: '제목을 20글자 미만으로 입력해주세요.',
  EMAIL: '올바른 이메일 주소를 입력해주세요.',
  EXPERIENCE: '10자 이상 입력해주세요.',
};

export const validateTitle = (value: string) => {
  const isUnderValue = value.length < 5;
  const isOverValue = value.length > 19;
  if (isUnderValue) {
    return [isUnderValue, isUnderValue && ERROR_MESSAGE.TITLE_UNDER_5];
  }
  if (isOverValue) {
    return [isOverValue, isOverValue && ERROR_MESSAGE.TITLE_OVER_20];
  }
  const vauleIsValid = false;
  const noErrorMessage = '';
  return [vauleIsValid, noErrorMessage];
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
