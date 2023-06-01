import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { createTechStack } from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { useRecoilState } from 'recoil';
import TechStackTag from '../TechStackTag';

const Step05TechStack = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  const [techStack, setTechStack] = useRecoilState(createTechStack);

  const title = '사용하고 있는 기술을 알려주세요';
  const description =
    '기술 키워드를 입력 후 Enter를 누르면 태그가 생성됩니다.\nX 아이콘 클릭 시 해당 태그가 삭제됩니다.';

  return (
    <S.Container>
      <TitleTextLabel title={title} description={description} />
      <TechStackTag setTechStack={setTechStack} techStack={techStack} />
      <S.ButtonContainer>
        <NextStepButton onClick={() => onNextButtonClick(STEP.SIX)} />
      </S.ButtonContainer>
    </S.Container>
  );
};

export default Step05TechStack;
