import { useSetRecoilState } from 'recoil';
import { loginState } from '@src/states';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';

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
  const navigate = useNavigate();

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
    navigate(PATH_URL.HOME);
  };

  return [onLoginCloseModal, onSignUpButtonClick, onSignUpCloseModal, onLogoutCloseModal];
};

export default useAuthModal;
