import { useEffect, useState } from 'react';
import { SetterOrUpdater } from 'recoil';

interface useOnChangeInputProps {
  setRecoilState: SetterOrUpdater<string>;
  inputValue?: string;
  validator?: (value: string) => (string | boolean)[];
  setIsCheckboxChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}

const useOnChangeInput = ({
  setRecoilState,
  inputValue,
  validator,
  setIsCheckboxChecked,
}: useOnChangeInputProps) => {
  const [isInvalid, setIsInvalid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | boolean>('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRecoilState(() => e.target.value);
    setIsCheckboxChecked && setIsCheckboxChecked(false);
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
