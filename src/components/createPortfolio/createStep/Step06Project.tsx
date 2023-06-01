import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import { StContainer } from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';

const Step06Project = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  return (
    <StContainer>
      STEP 6
      <NextStepButton onClick={() => onNextButtonClick(STEP.SEVEN)} />
    </StContainer>
  );
};

export default Step06Project;
