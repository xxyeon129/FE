import { STEP } from '@src/constants/createPortfolioConstants';
import { styled } from 'styled-components';

interface StepOneProps {
  onNextButtonClick: (step: string) => void;
}

const StepOneIntro = ({ onNextButtonClick }: StepOneProps) => {
  return (
    <StStepOneContainer>
      {/* TEST CODE */}
      Step One
      <StNextStepButton onClick={() => onNextButtonClick(STEP.TWO)}>Next</StNextStepButton>
    </StStepOneContainer>
  );
};

const StStepOneContainer = styled.div`
  /* TEST CODE */
  background-color: lightblue;
  padding: 1rem;
`;

const StNextStepButton = styled.button`
  /* TEST CODE */
  background-color: white;
`;

export default StepOneIntro;
