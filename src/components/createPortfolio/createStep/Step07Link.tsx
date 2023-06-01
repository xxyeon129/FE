import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';

const Step07Link = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  return (
    <S.Container>
      STEP 7
      <NextStepButton onClick={() => onNextButtonClick(STEP.EIGHT)} />
    </S.Container>
  );
};

export default Step07Link;
