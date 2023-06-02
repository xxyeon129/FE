import useOnChangeInput from '@src/Hook/useOnChangeInput';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { createExperienceState } from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

const Step07Introduce = ({ onNextButtonClick, onPrevButtonClick }: CreatePortfolioStepProps) => {
  const [experience, setExperience] = useRecoilState(createExperienceState);

  const { onChangeInput } = useOnChangeInput(setExperience);

  const title = '간단한 소개글을 작성해주세요';
  const description = '본인의 업무 경험을 기반으로 핵심 역량과 업무 스킬을 간단히 작성해주세요.';

  return (
    <S.Container>
      <TitleTextLabel title={title} description={description} />
      <StTextareaContainer>
        <StTextarea
          value={experience}
          onChange={onChangeInput}
          placeholder="포트폴리오에 표시될 소개 내용을 요약하여 작성해주세요."
        />
      </StTextareaContainer>
      <S.ButtonContainer>
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.SIX)} />
        <NextStepButton onClick={() => onNextButtonClick(STEP.EIGHT)} />
      </S.ButtonContainer>
    </S.Container>
  );
};

const StTextareaContainer = styled.div`
  width: 600px;
`;

const StTextarea = styled.textarea`
  width: 100%;
  min-height: 300px;
  border-radius: 10px;
  padding: 10px;
`;

export default Step07Introduce;
