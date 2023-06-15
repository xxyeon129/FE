import { styled } from 'styled-components';

interface NextStepButtonProps {
  marginRight?: string;
  onClick: (() => void) | ((e: React.FormEvent<HTMLButtonElement>) => void);
  text?: string;
  notAllowed?: string;
  width?: string;
}

const NextStepButton = ({
  marginRight = '0px',
  onClick,
  text = '다음',
  notAllowed = 'false',
  width = '90px',
}: NextStepButtonProps) => {
  return (
    <StButton width={width} marginright={marginRight} onClick={onClick} notallowed={notAllowed}>
      {text}
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

export default NextStepButton;
