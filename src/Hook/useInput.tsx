import { useState, ChangeEvent } from 'react';

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setError('');
  };

  const setErrorText = (text: string) => {
    setError(text);
  };

  return { value, error, onChange, setErrorText };
};
