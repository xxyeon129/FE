import { styled } from 'styled-components';
import { Button, ModalBackground as StModalBackground } from '@src/style/common/commonStyles';
import { AuthModalProps } from '@src/types/modalType';
import { ReactComponent as LogoutIcon } from '@src/assets/nav/logout-modal-icon.svg';

const LogoutModal = ({ onClose }: AuthModalProps) => {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <StModalBackground onClick={onClose}>
      <StLogoutModal onClick={keepModalOpen}>
        <StModalContentContainer>
          <LogoutIcon />
          <StLogoutText>로그아웃 되었습니다.</StLogoutText>
        </StModalContentContainer>
        <Button onClick={onClose} width="140px" fontsize="20px" padding="12px 0">
          확인
        </Button>
      </StLogoutModal>
    </StModalBackground>
  );
};

const StLogoutModal = styled.div`
  width: 400px;
  height: 530px;
  border-radius: 30px;
  background-color: white;
  padding: 100px 50px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
`;

const StModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const StLogoutText = styled.h2``;

export default LogoutModal;
