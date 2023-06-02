import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';

const Step08Link = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  return (
    <S.Container>
      STEP 8
      <NextStepButton onClick={() => onNextButtonClick(STEP.NINE)} />
    </S.Container>
  );
};

export default Step08Link;
