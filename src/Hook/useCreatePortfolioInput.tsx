import { useState } from 'react';

const useCreatePortfolioInput = () => {
  const [inputData, setInputData] = useState('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputData(() => e.target.value);
  };

  return {
    inputData,
    onChangeInput,
    setInputData,
  };
};

export default useCreatePortfolioInput;
