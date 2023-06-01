const ERROR_MESSAGE = {
  TITLE: '제목을 2글자 이상 입력해주세요.',
  EMAIL: '공백 없이 @를 포함한 올바른 이메일 주소를 입력해주세요.',
};

export const validateTitle = (title: string) => {
  const isInvalid = title.length < 2;
  return [isInvalid, isInvalid && ERROR_MESSAGE.TITLE];
};

export const validateEmail = (email: string) => {
  const isInvalid = !email.trim().includes('@');
  return [isInvalid, isInvalid && ERROR_MESSAGE.EMAIL];
};
