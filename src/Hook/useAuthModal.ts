import { useSetRecoilState } from 'recoil';
import { loginState } from '@src/states';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';

interface useLoginModalProps {
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogoutModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const useAuthModal = ({
  setIsLoginModalOpen,
  setIsSignUpModalOpen,
  setIsLogoutModalOpen,
}: useLoginModalProps) => {
  // const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const onCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    // 필요 없는 코드라서 주석처리 - 추후 오류가 날 경우 복구하기 위해 삭제 보류
    // setIsLogin(true);
  };

  const onClickSignUpButton = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const onCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const onCloseLogoutModal = () => {
    setIsLogoutModalOpen && setIsLogoutModalOpen(false);
    navigate(PATH_URL.HOME);
  };

  return [onCloseLoginModal, onClickSignUpButton, onCloseSignUpModal, onCloseLogoutModal];
};

export default useAuthModal;
