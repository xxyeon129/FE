import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';

const Step06Project = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  return (
    <S.Container>
      STEP 6
      <NextStepButton onClick={() => onNextButtonClick(STEP.SEVEN)} />
    </S.Container>
  );
};

export default Step06Project;
