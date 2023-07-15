import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { createExperienceState } from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { STEP } from '@src/constants/createPortfolioConstants';
import { validateExperience } from '@src/components/common/createPortfolio/validator';

import useOnChangeInput from '@src/Hook/useOnChangeInput';
import * as S from '@src/style/common/createStepStyles';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';
import ErrorMessage from '../../common/createPortfolio/ErrorMessage';
import useSnackbarPopup from '@src/Hook/useSnackbarPopup';
import SnackbarPopup from '@src/components/common/SnackbarPopup';
import { useEffect, useState } from 'react';

const Step07Introduce = ({ onNextButtonClick, onPrevButtonClick }: CreatePortfolioStepProps) => {
  const [experience, setExperience] = useRecoilState<string>(createExperienceState);
  const [inputLength, setInputLength] = useState<number>(0);

  const { onChangeInput, isInvalid, errorMessage } = useOnChangeInput({
    setRecoilState: setExperience,
    inputValue: experience,
    validator: validateExperience,
  });

  const { isSnackbarVisible, showSnackbarPopup } = useSnackbarPopup();

  const onClickNextButton = () => {
    if (isInvalid) {
      showSnackbarPopup();
      return;
    }
    onNextButtonClick(STEP.EIGHT);
  };

  useEffect(() => {
    const wordCount = experience.length;
    setInputLength(wordCount);
  }, [experience]);

  const title = '간단한 소개글을 작성해주세요';
  const description = '본인의 업무 경험을 기반으로 핵심 역량과 업무 스킬을 간단히 작성해주세요.';
  const responsiveDescription =
    '본인의 업무 경험을 기반으로 \n핵심 역량과 업무 스킬을 간단히 작성해주세요.';
  return (
    <S.Container>
      <S.ContentContainer>
        <TitleTextLabel
          title={title}
          description={description}
          responsiveDescription={responsiveDescription}
        />
        <StTextareaContainer>
          <StTextarea
            value={experience}
            onChange={onChangeInput}
            maxLength={1500}
            placeholder="포트폴리오에 표시될 소개 내용을 10자 이상 작성해주세요."
          />
          <StWordCount>{inputLength}/1500</StWordCount>
          {isInvalid && <ErrorMessage errorMessage={errorMessage} />}
        </StTextareaContainer>
      </S.ContentContainer>
      <S.ButtonContainer>
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.SIX)} />
        <NextStepButton onClick={onClickNextButton} notAllowed={`${isInvalid}`} />
      </S.ButtonContainer>
      {isSnackbarVisible && (
        <SnackbarPopup
          text="10자 이상 소개글을 작성해주세요!"
          isSnackbarVisible={isSnackbarVisible}
        />
      )}
    </S.Container>
  );
};

const StTextareaContainer = styled.div`
  width: 750px;
  position: relative;

  @media ${({ theme }) => theme.size.tablet} {
    width: 100%;
  }
`;

const StTextarea = styled.textarea`
  width: 100%;
  min-height: 300px;
  border-radius: 10px;
  padding: 15px;
  outline: none;
  font-size: 16px;
  line-height: 160%;

  &:focus {
    outline: 2px solid;
  }

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 0.8rem;
  }
`;

const StWordCount = styled.div`
  position: absolute;
  top: 100;
  margin-top: 3px;
  right: 7px;
  color: gray;

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 0.8rem;
  }
`;

export default Step07Introduce;
