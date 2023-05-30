import { useState } from 'react';

const useCreatePortfolioDropdown = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  // const [selectOption, setSelectOption] = useState(null);

  const handleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  // const onClickOption = () => {
  //   setSelectOption();

  // }

  return { isOpenDropdown, handleDropdown };
};

export default useCreatePortfolioDropdown;
