import { useRecoilState } from 'recoil';

import { createTechStackState } from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { STEP } from '@src/constants/createPortfolioConstants';

import * as S from '@src/style/common/createStepStyles';
import TechStackTag from '../TechStackTag';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';

const Step05TechStack = ({ onNextButtonClick, onPrevButtonClick }: CreatePortfolioStepProps) => {
  const [techStack, setTechStack] = useRecoilState(createTechStackState);

  const title = '사용하고 있는 기술을 알려주세요';
  const description =
    '기술 키워드를 입력 후 Enter를 누르면 태그가 생성됩니다.\nX 아이콘 클릭 시 해당 태그가 삭제됩니다.';

  return (
    <S.Container>
      <TitleTextLabel title={title} description={description} />
      <TechStackTag setTechStack={setTechStack} techStack={techStack} StWidth="600px" />
      <S.ButtonContainer>
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.FOUR)} />
        <NextStepButton onClick={() => onNextButtonClick(STEP.SIX)} />
      </S.ButtonContainer>
    </S.Container>
  );
};

export default Step05TechStack;
