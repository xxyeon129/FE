import { useState } from 'react';

// TechStackTag에서 현재 사용하지 않음

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
