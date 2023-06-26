import { keyframes, styled } from 'styled-components';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { MdCheckCircle } from 'react-icons/md';

interface SnackbarPopupProps {
  text: string;
  type?: string;
  isSnackbarVisible: boolean;
}

const SnackbarPopup = ({ text, type = 'exclamation', isSnackbarVisible }: SnackbarPopupProps) => {
  return (
    <StSnackbar className={isSnackbarVisible ? 'show' : ''} type={type}>
      <StIconWrapper>
        {type === 'exclamation' ? <BsExclamationCircleFill /> : <MdCheckCircle />}
      </StIconWrapper>
      <StText>{text}</StText>
    </StSnackbar>
  );
};

const fadeIn = keyframes`
  from{
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from{
    bottom: 30px;
    opacity: 1;
  }
  to{
    bottom: 0;
    opacity: 0;
  }
`;

const StSnackbar = styled.div<{ type: string }>`
  visibility: hidden;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 999;
  right: 2%;
  bottom: 30px;
  min-width: 250px;
  border-radius: 6px;
  padding: 20px;
  font-size: 17px;
  background-color: ${({ theme, type }) =>
    type === 'exclamation' ? theme.color.errorRed : '#5e5e5e'};
  color: white;

  &.show {
    visibility: visible;
    animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.5s;
  }
`;

const StText = styled.span`
  margin-left: 1rem;
`;

const StIconWrapper = styled.div`
  font-size: 23px;
  display: flex;
  align-items: center;
  svg {
    font-size: inherit;
  }
`;

export default SnackbarPopup;
