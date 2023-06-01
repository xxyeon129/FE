import { styled } from 'styled-components';

interface NextStepButtonProps {
  marginRight?: string;
  onClick: () => void;
  text?: string;
}

const NextStepButton = ({ marginRight = '0px', onClick, text = '다음' }: NextStepButtonProps) => {
  return (
    <StButton marginright={marginRight} onClick={onClick}>
      {text}
    </StButton>
  );
};

const StButton = styled.button<{ marginright: string }>`
  max-width: 120px;
  padding: 15px 25px;
  border-radius: 10px;
  font-weight: bold;
  margin-right: ${({ marginright }) => marginright};

  background-color: ${({ theme }) => theme.color.neonGreen};

  &:hover {
    transition: 0.5s;
    background-color: ${({ theme }) => theme.color.lightGreen};
    color: white;
  }
`;

export default NextStepButton;
