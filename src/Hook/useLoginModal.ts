import { useSetRecoilState } from 'recoil';
import { loginState } from '@src/states';

interface useLoginModalProps {
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useLoginModal = ({ setIsLoginModalOpen, setIsSignUpModalOpen }: useLoginModalProps) => {
  const setIsLogin = useSetRecoilState(loginState);

  const onLoginCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsLogin(true);
  };

  const onSignUpButtonClick = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const onSignUpCloseModal = () => {
    setIsSignUpModalOpen(false);
  };

  return [onLoginCloseModal, onSignUpButtonClick, onSignUpCloseModal];
};

export default useLoginModal;
