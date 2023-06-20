import { useState } from 'react';

const useSnackbarPopup = () => {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);

  const showSnackbarPopup = () => {
    setIsSnackbarVisible(true);
    setTimeout(() => {
      setIsSnackbarVisible(false);
    }, 3000);
  };

  return { isSnackbarVisible, showSnackbarPopup };
};

export default useSnackbarPopup;
