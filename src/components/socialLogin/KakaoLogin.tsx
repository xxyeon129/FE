import { ReactComponent as KakaoIcon } from '@src/assets/socailLogin/kakaologin.svg';
import { styled } from 'styled-components';

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
      <StKakaoIcon onClick={onClickKakaoLoginButton} />
    </div>
  );
};

const StKakaoIcon = styled(KakaoIcon)`
  cursor: pointer;
`;

export default KakaoLogin;
