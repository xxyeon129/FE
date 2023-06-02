import { styled } from 'styled-components';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { useRecoilState } from 'recoil';
import {
  createEmailState,
  createLocationState,
  createResidenceState,
  createTelephoneState,
} from '@src/states';
import useOnChangeInput from '@src/Hook/useOnChangeInput';
import { validateEmail } from '@src/components/common/createPortfolio/validator';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';

const Step04PersonalInfo = ({ onNextButtonClick, onPrevButtonClick }: CreatePortfolioStepProps) => {
  const [email, setEmail] = useRecoilState(createEmailState);
  const [telephone, setTelephone] = useRecoilState(createTelephoneState);
  const [residence, setResidence] = useRecoilState(createResidenceState);
  const [location, setLocation] = useRecoilState(createLocationState);

  const { onChangeInput: onChangeEmail } = useOnChangeInput(setEmail);
  const { onChangeInput: onChangeTelephone } = useOnChangeInput(setTelephone);
  const { onChangeInput: onChangeResidence } = useOnChangeInput(setResidence);
  const { onChangeInput: onChangeLocation } = useOnChangeInput(setLocation);

  const [isInvalidEmail, errorMessage] = validateEmail(email);

  const onClickButton = () => {
    if (isInvalidEmail) return;
    onNextButtonClick(STEP.FIVE);
  };

  const title = '포트폴리오에 표시될 개인 정보를 입력해주세요';
  const description = '작성하신 정보는 포트폴리오 생성 후 언제든 수정하실 수 있습니다.';

  return (
    <S.Container>
      <TitleTextLabel title={title} description={description} />
      <StInputContainer>
        <StEmailContainer>
          <StOutLineDiv>
            <StInputDescription>email</StInputDescription>
            <StPersonalInfoInput
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="포트폴리오에 표시될 email을 입력해주세요."
            />
          </StOutLineDiv>
          {isInvalidEmail && <StErrorMessage>{errorMessage}</StErrorMessage>}
        </StEmailContainer>
        <StAdditionalInfomationOutLineDiv>
          <StAdditionalInfomationItem>
            <StInputDescription>전화번호</StInputDescription>
            <StPersonalInfoInput
              value={telephone}
              onChange={onChangeTelephone}
              placeholder="포트폴리오에 표시될 전화번호를 입력해주세요."
            />
          </StAdditionalInfomationItem>
          <StAdditionalInfomationItem>
            <StInputDescription>거주지</StInputDescription>
            <StPersonalInfoInput
              value={residence}
              onChange={onChangeResidence}
              placeholder="포트폴리오에 표시될 거주지를 입력해주세요."
            />
          </StAdditionalInfomationItem>
          <StAdditionalInfomationItem>
            <StInputDescription>희망 근무지역</StInputDescription>
            <StPersonalInfoInput
              value={location}
              onChange={onChangeLocation}
              placeholder="포트폴리오에 표시될 희망 근무지역을 입력해주세요."
            />
          </StAdditionalInfomationItem>
        </StAdditionalInfomationOutLineDiv>
      </StInputContainer>
      <S.ButtonContainer>
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.THREE)} />
        <NextStepButton onClick={onClickButton} notAllowed={`${isInvalidEmail}`} />
      </S.ButtonContainer>
    </S.Container>
  );
};

const StInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StEmailContainer = styled.div``;

const sharedStyle = `
  width: 600px;
  height: 65px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 10px;
`;

const StOutLineDiv = styled.div`
  ${sharedStyle}

  border: 1px solid gray;
  border-radius: 10px;
`;

const StErrorMessage = styled.div`
  margin: 8px 0 0 5px;
  font-size: 15px;
  color: red;
`;

const StAdditionalInfomationOutLineDiv = styled.div`
  width: 600px;
  height: 195px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const StAdditionalInfomationItem = styled.div`
  ${sharedStyle}

  border-bottom: 1px solid gray;

  &:last-child {
    border: none;
  }
`;

const StInputDescription = styled.div`
  color: gray;
  font-size: 15px;
`;

const StPersonalInfoInput = styled.input`
  height: 100%;
  border: none;

  &::placeholder {
    color: #b5b5b5;
  }
`;

export default Step04PersonalInfo;
