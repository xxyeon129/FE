import { ReactComponent as Kakaologin } from '@src/assets/socailLogin/kakaologin.svg';

interface KakaoLoginProps {
  setIsSocialLoginWarnModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseLoginModal: () => void;
}

const KakaoLogin = ({ setIsSocialLoginWarnModalOpen, onCloseLoginModal }: KakaoLoginProps) => {
  const onClickKakaoLoginButton = () => {
    onCloseLoginModal();
    setIsSocialLoginWarnModalOpen(true);
  };

  return (
    <div>
      <Kakaologin onClick={onClickKakaoLoginButton} />
    </div>
  );
};

export default KakaoLogin;
