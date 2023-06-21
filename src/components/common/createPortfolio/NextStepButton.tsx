import { keyframes, styled } from 'styled-components';
import { BiLoaderAlt } from 'react-icons/bi';

interface NextStepButtonProps {
  marginRight?: string;
  onClick: (() => void) | ((e: React.FormEvent<HTMLButtonElement>) => void);
  text?: string;
  notAllowed?: string;
  width?: string;
  isLoading?: boolean;
  isIntroButton?: string;
}

const NextStepButton = ({
  marginRight = '0px',
  onClick,
  text = '다음',
  notAllowed = 'false',
  isLoading = false,
  isIntroButton,
}: NextStepButtonProps) => {
  return (
    <StButton
      marginright={marginRight}
      onClick={onClick}
      notallowed={notAllowed}
      isintrobutton={isIntroButton && isIntroButton}
    >
      {isLoading ? <StButtonLoadingIcon /> : text}
    </StButton>
  );
};

const StButton = styled.button<{
  marginright: string;
  notallowed: string;
  isintrobutton?: string;
}>`
  width: ${({ isintrobutton }) => (isintrobutton ? '150px' : '90px')};
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

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    width: ${({ isintrobutton }) => (isintrobutton ? '120px' : '80px')};
    padding: 15px;
    font-size: 16px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    width: ${({ isintrobutton }) => (isintrobutton ? '110px' : '70px')};
    padding: 13px 0;
    font-size: 14px;
  }
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
