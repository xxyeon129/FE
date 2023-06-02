import useOnChangeInput from '@src/Hook/useOnChangeInput';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { createExperienceState } from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

const Step07ProjectSummary = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  const [experience, setExperience] = useRecoilState(createExperienceState);

  const { onChangeInput } = useOnChangeInput(setExperience);

  const title = '프로젝트 경험을 요약해서 알려주세요';
  const description =
    '담당하신 프로젝트 중 우선순위가 높은 프로젝트를 선별해 최신순으로 작성하시면 됩니다.';

  return (
    <S.Container>
      <TitleTextLabel title={title} description={description} />
      <StTextareaContainer>
        <StTextarea
          value={experience}
          onChange={onChangeInput}
          placeholder="프로젝트 경험을 요약해서 작성해주세요."
        />
      </StTextareaContainer>
      <S.ButtonContainer>
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

export default Step07ProjectSummary;
