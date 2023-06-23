import { ReactComponent as KakaoIcon } from '@src/assets/socailLogin/kakaologin.svg';
import { styled } from 'styled-components';

interface KakaoLoginProps {
  setIsKakaoLoginWarnModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseLoginModal: () => void;
}

const KakaoLogin = ({ setIsKakaoLoginWarnModalOpen, onCloseLoginModal }: KakaoLoginProps) => {
  const onClickKakaoLoginButton = () => {
    onCloseLoginModal();
    setIsKakaoLoginWarnModalOpen(true);
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
