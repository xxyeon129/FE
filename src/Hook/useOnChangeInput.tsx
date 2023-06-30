import { useEffect, useState } from 'react';
import { SetterOrUpdater } from 'recoil';

interface useOnChangeInputProps {
  setRecoilState: SetterOrUpdater<string>;
  inputValue?: string;
  validator?: (value: string) => (string | boolean)[];
  REGEX?: RegExp;
}

const useOnChangeInput = ({
  setRecoilState,
  inputValue,
  validator,
  REGEX,
}: useOnChangeInputProps) => {
  const [isInvalid, setIsInvalid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | boolean>('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (REGEX) {
      const RegExInputValue = e.target.value.replace(REGEX, '');
      setRecoilState(RegExInputValue);
      return;
    }

    setRecoilState(() => e.target.value);
  };

  useEffect(() => {
    if (inputValue && validator) {
      const [isInvalid, errorMessage] = validator(inputValue);
      const isInvalidBoolean = Boolean(isInvalid);
      setIsInvalid(isInvalidBoolean);
      typeof errorMessage !== 'boolean' && setErrorMessage(errorMessage);
    }
  }, [inputValue]);

  return {
    onChangeInput,
    isInvalid,
    errorMessage,
  };
};

export default useOnChangeInput;
