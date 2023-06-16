import { useSetRecoilState } from 'recoil';
import { loginState } from '@src/states';

interface useLoginModalProps {
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useAuthModal = ({
  setIsLoginModalOpen,
  setIsSignUpModalOpen,
  setIsLogoutModalOpen,
}: useLoginModalProps) => {
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

  const onLogoutCloseModal = () => {
    setIsLogoutModalOpen(false);
  };

  return [onLoginCloseModal, onSignUpButtonClick, onSignUpCloseModal, onLogoutCloseModal];
};

export default useAuthModal;
