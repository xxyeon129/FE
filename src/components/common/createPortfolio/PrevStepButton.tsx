import { styled } from 'styled-components';

interface PrevStepButtonProps {
  onClick: () => void;
}

const PrevStepButton = ({ onClick }: PrevStepButtonProps) => {
  return <StButton onClick={onClick}>뒤로</StButton>;
};

const StButton = styled.button`
  max-width: 120px;
  padding: 15px 25px;
  border: 1px solid lightgray;
  border-radius: 10px;
  font-weight: bold;
  color: gray;

  &:hover {
    transition: 0.5s;
    background-color: lightgray;
  }
`;

export default PrevStepButton;
