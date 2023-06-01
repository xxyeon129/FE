import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import { StContainer } from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';

const Step05TechStack = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  return (
    <StContainer>
      STEP 5
      <NextStepButton onClick={() => onNextButtonClick(STEP.SIX)} />
    </StContainer>
  );
};

export default Step05TechStack;
