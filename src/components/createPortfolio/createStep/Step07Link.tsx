import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import { StContainer } from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';

const Step07Link = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  return (
    <StContainer>
      STEP 7
      <NextStepButton onClick={() => onNextButtonClick(STEP.EIGHT)} />
    </StContainer>
  );
};

export default Step07Link;
