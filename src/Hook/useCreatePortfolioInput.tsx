import { useState } from 'react';

const useCreatePortfolioInput = () => {
  const [inputData, setInputData] = useState('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputData(() => e.target.value);
  };

  return {
    inputData,
    onChangeInput,
  };
};

export default useCreatePortfolioInput;
