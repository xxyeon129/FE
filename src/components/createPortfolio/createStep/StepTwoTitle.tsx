import { styled } from 'styled-components';

interface StepTwoProps {
  onNextButtonClick: (step: string) => void;
}

const StepTwoTitle = ({ onNextButtonClick }: StepTwoProps) => {
  return <StepTwoContainer>{/* TEST CODE */}Step Two</StepTwoContainer>;
};

const StepTwoContainer = styled.div`
  /* TEST CODE */
  background-color: lightcoral;
  padding: 1rem;
`;

export default StepTwoTitle;
