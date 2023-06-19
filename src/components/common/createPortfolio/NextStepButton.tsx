import { keyframes, styled } from 'styled-components';
import { BiLoaderAlt } from 'react-icons/bi';

interface NextStepButtonProps {
  marginRight?: string;
  onClick: (() => void) | ((e: React.FormEvent<HTMLButtonElement>) => void);
  text?: string;
  notAllowed?: string;
  width?: string;
  isLoading?: boolean;
}

const NextStepButton = ({
  marginRight = '0px',
  onClick,
  text = '다음',
  notAllowed = 'false',
  width = '90px',
  isLoading = false,
}: NextStepButtonProps) => {
  return (
    <StButton width={width} marginright={marginRight} onClick={onClick} notallowed={notAllowed}>
      {isLoading ? <StButtonLoadingIcon /> : text}
    </StButton>
  );
};

const StButton = styled.button<{ width: string; marginright: string; notallowed: string }>`
  width: ${({ width }) => width};
  padding: 15px 25px;
  border-radius: 8px;
  font-weight: 900;
  font-size: 18px;
  margin-right: ${({ marginright }) => marginright};

  background-color: ${({ theme }) => theme.color.neonGreen};

  &:not([notallowed='true']):hover {
    transition: 0.5s;
    background-color: ${({ theme }) => theme.color.lightGreen};
    color: white;
  }

  cursor: ${({ notallowed }) => notallowed === 'true' && 'not-allowed'};
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StButtonLoadingIcon = styled(BiLoaderAlt)`
  animation: ${spinAnimation} 1s infinite linear;
  font-size: 20px;
  color: black;
`;

export default NextStepButton;
