import { styled } from 'styled-components';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { useRecoilState } from 'recoil';
import { createEmailState } from '@src/states';
import useOnChangeInput from '@src/Hook/useOnChangeInput';
import { validateEmail } from '@src/components/common/createPortfolio/validator';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';
import AdditionalPersonalInfo from '../AdditionalPersonalInfo';

const Step04PersonalInfo = ({ onNextButtonClick, onPrevButtonClick }: CreatePortfolioStepProps) => {
  const [email, setEmail] = useRecoilState(createEmailState);

  const {
    onChangeInput: onChangeEmail,
    isInvalid: isInvalidEmail,
    errorMessage,
  } = useOnChangeInput({ inputValue: email, setRecoilState: setEmail, validator: validateEmail });

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
        <AdditionalPersonalInfo sharedStyle={sharedStyle} />
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
