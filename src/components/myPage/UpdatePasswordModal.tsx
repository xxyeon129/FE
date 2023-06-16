import React from 'react';
import { ReactComponent as PasswordUpdate } from 'src/assets/mypage-password.svg';
import styled from 'styled-components';
import { Desktop, DesktopAndTablet, Mobile, TabletAndMobile } from '@src/style/mediaQuery';
interface UpdatePasswordModalProps {
  onClose: () => void;
}

const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({ onClose }) => {
  return (
    <>
      <DesktopAndTablet>
        <ModalWrapper>
          <ModalContent>
            <StModalLayout>
              <PasswordUpdate />
              <div>
                <div>비밀번호가 변경되었습니다.</div>
              </div>
            </StModalLayout>
            <StDelUser>
              <StDeleteButton onClick={onClose}>확인</StDeleteButton>
            </StDelUser>
          </ModalContent>
        </ModalWrapper>
      </DesktopAndTablet>
      <Mobile>
        <ModalWrapper>
          <ModalContent>
            <StModalLayout>
              <PasswordUpdate />
              <div>
                <div>비밀번호가 변경되었습니다.</div>
              </div>
            </StModalLayout>
            <StDelUser>
              <StDeleteButton onClick={onClose}>확인</StDeleteButton>
            </StDelUser>
          </ModalContent>
        </ModalWrapper>
      </Mobile>
    </>
  );
};

export default UpdatePasswordModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 15px;
  background: #fefefe;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 600px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

const StModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;

  div {
    margin-top: 30px;
    width: 100%;
    top: 275px;
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
  }
`;
const StDelUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 100px;
  gap: 0.5em;
`;

const StDeleteButton = styled.button`
  width: 160px;
  height: 52px;
  background: #c7c7c7;
  border-radius: 8px;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 35px;
  text-align: center;
  color: #000000;

  &:first-child {
    background: #c7c7c7;
  }

  &:last-child {
    background: #6bf65f;
  }
`;
