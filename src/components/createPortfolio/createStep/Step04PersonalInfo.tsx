import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';

import { createEmailState } from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { STEP } from '@src/constants/createPortfolioConstants';
import { validateEmail } from '@src/components/common/createPortfolio/validator';

import * as S from '@src/style/common/createStepStyles';
import useOnChangeInput from '@src/Hook/useOnChangeInput';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import AdditionalPersonalInfo from '../AdditionalPersonalInfo';
import ErrorMessage from '../../common/createPortfolio/ErrorMessage';
import useSnackbarPopup from '@src/Hook/useSnackbarPopup';
import SnackbarPopup from '@src/components/common/SnackbarPopup';
import EmailForm from '../EmailForm';
import { useState } from 'react';

const Step04PersonalInfo = ({ onNextButtonClick, onPrevButtonClick }: CreatePortfolioStepProps) => {
  const [email, setEmail] = useRecoilState<string>(createEmailState);

  const { isInvalid: isInvalidEmail, errorMessage } = useOnChangeInput({
    inputValue: email,
    setRecoilState: setEmail,
    validator: validateEmail,
  });

  const { isSnackbarVisible, showSnackbarPopup } = useSnackbarPopup();

  const onClickButton = () => {
    if (isInvalidEmail) {
      showSnackbarPopup();
      return;
    }
    onNextButtonClick(STEP.FIVE);
  };

  const title = '포트폴리오에 표시될 개인 정보를 입력해주세요';
  const description = '작성하신 정보는 포트폴리오 생성 후 언제든 수정하실 수 있습니다.';

  return (
    <S.Container>
      <S.ContentContainer>
        <TitleTextLabel title={title} description={description} />
        <StPersonalInfoForm>
          <EmailForm isInvalidEmail={isInvalidEmail} errorMessage={errorMessage} />
          <AdditionalPersonalInfo sharedStyle={sharedStyle} />
        </StPersonalInfoForm>
      </S.ContentContainer>

      <S.ButtonContainer>
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.THREE)} />
        <NextStepButton onClick={onClickButton} notAllowed={`${isInvalidEmail}`} />
      </S.ButtonContainer>
      {isSnackbarVisible && (
        <SnackbarPopup
          text="이메일 형식을 올바르게 입력해주세요!"
          isSnackbarVisible={isSnackbarVisible}
        />
      )}
    </S.Container>
  );
};

const StPersonalInfoForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 750px;

  @media ${({ theme }) => theme.size.tablet} {
    width: 100%;
  }
`;

const sharedStyle = `
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 10px;
`;

export default Step04PersonalInfo;
