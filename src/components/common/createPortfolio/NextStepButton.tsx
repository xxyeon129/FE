import { styled } from 'styled-components';

interface NextStepButtonProps {
  marginRight?: string;
  onClick: (() => void) | ((e: React.FormEvent<HTMLButtonElement>) => void);
  text?: string;
  notAllowed?: string;
}

const NextStepButton = ({
  marginRight = '0px',
  onClick,
  text = '다음',
  notAllowed = 'false',
}: NextStepButtonProps) => {
  return (
    <StButton marginright={marginRight} onClick={onClick} notallowed={notAllowed}>
      {text}
    </StButton>
  );
};

const StButton = styled.button<{ marginright: string; notallowed: string }>`
  max-width: 120px;
  padding: 15px 25px;
  border-radius: 10px;
  font-weight: bold;
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
