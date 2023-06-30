import { styled } from 'styled-components';

interface PrevStepButtonProps {
  onClick: () => void;
}

const PrevStepButton = ({ onClick }: PrevStepButtonProps) => {
  return <StButton onClick={onClick}>뒤로</StButton>;
};

const StButton = styled.button`
  width: 90px;
  padding: 15px 25px;
  border: 1px solid lightgray;
  border-radius: 8px;
  font-weight: 800;
  font-size: 18px;
  color: gray;

  &:hover {
    transition: 0.5s;
    background-color: lightgray;
  }

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    width: 80px;
    padding: 15px;
    font-size: 16px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    width: 70px;
    padding: 13px 0;
    font-size: 14px;
  }
`;

export default PrevStepButton;
