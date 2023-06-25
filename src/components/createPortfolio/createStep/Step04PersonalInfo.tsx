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
import useSnackbarPopup from '@src/Hook/useSnackbarPopup';
import SnackbarPopup from '@src/components/common/SnackbarPopup';
import EmailForm from '../EmailForm';
import PhoneForm from '../PhoneForm';
import LocationForm from '../LocationForm';

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
          <StEmailFormWrapper>
            <StFormDescriptionText>
              <span className="asteriskMark">*</span>필수 입력
            </StFormDescriptionText>
            <EmailForm isInvalidEmail={isInvalidEmail} errorMessage={errorMessage} />
          </StEmailFormWrapper>
          <StAdditionalInfoContainer>
            <StFormDescriptionText>선택 입력</StFormDescriptionText>
            <StAdditionalInfoWrapper>
              <StPhoneFormWrapper>
                <PhoneForm />
              </StPhoneFormWrapper>
              <LocationForm />
            </StAdditionalInfoWrapper>
          </StAdditionalInfoContainer>
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

const StFormDescriptionText = styled.span`
  color: ${({ theme }) => theme.color.lightGreen};
  font-weight: 550;

  .asteriskMark {
    color: ${({ theme }) => theme.color.lightGreen};
    font-size: 18px;
    font-weight: 800;
  }
`;

const StEmailFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 4;
`;

const StPhoneFormWrapper = styled.div`
  z-index: 3;
`;

const StAdditionalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StAdditionalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default Step04PersonalInfo;
