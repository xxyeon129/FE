import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';

import { createTitleState } from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { STEP } from '@src/constants/createPortfolioConstants';
import { validateTitle } from '@src/components/common/createPortfolio/validator';

import * as S from '@src/style/common/createStepStyles';
import useOnChangeInput from '@src/Hook/useOnChangeInput';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import ErrorMessage from '../../common/createPortfolio/ErrorMessage';
import useSnackbarPopup from '@src/Hook/useSnackbarPopup';
import SnackbarPopup from '@src/components/common/SnackbarPopup';

const Step03Title = ({ onNextButtonClick, onPrevButtonClick }: CreatePortfolioStepProps) => {
  const [portfolioTitle, setPortfolioTitle] = useRecoilState<string>(createTitleState);

  const {
    onChangeInput,
    isInvalid: isInvalidTitle,
    errorMessage,
  } = useOnChangeInput({
    inputValue: portfolioTitle,
    setRecoilState: setPortfolioTitle,
    validator: validateTitle,
  });
  const { isSnackbarVisible, showSnackbarPopup } = useSnackbarPopup();

  const onClickNextButton = () => {
    if (isInvalidTitle) {
      showSnackbarPopup();
      return;
    }
    onNextButtonClick(STEP.FOUR);
  };

  const title = '포트폴리오를 잘 나타내는 \n제목을 입력해주세요';
  const description =
    '제목을 5자 이상, 30자 미만으로 작성해주세요.\n작성하신 제목은 나중에 수정하실 수 있습니다. 자유롭게 작성해주세요!';
  const responsiveDescription =
    '제목을 5자 이상, 30자 미만으로 작성해주세요.\n작성하신 제목은 나중에 수정하실 수 있습니다. \n자유롭게 작성해주세요!';

  return (
    <S.Container>
      <S.ContentContainer>
        <TitleTextLabel
          title={title}
          description={description}
          responsiveDescription={responsiveDescription}
        />
        <StInputContainer>
          <StInputWrapper>
            <StInput
              placeholder="Ex) 1년차 직무 포트폴리오입니다."
              value={portfolioTitle}
              onChange={onChangeInput}
              maxLength={29}
            />
            {isInvalidTitle && <ErrorMessage errorMessage={errorMessage} />}
          </StInputWrapper>
        </StInputContainer>
      </S.ContentContainer>
      <S.ButtonContainer>
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.TWO)} />
        <NextStepButton onClick={onClickNextButton} notAllowed={`${isInvalidTitle}`} />
      </S.ButtonContainer>
      {isSnackbarVisible && (
        <SnackbarPopup text="5자 이상 제목을 입력해주세요!" isSnackbarVisible={isSnackbarVisible} />
      )}
    </S.Container>
  );
};

const StInputContainer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StInputWrapper = styled.div`
  @media ${props => props.theme.size.tablet} {
    width: 100%;
  }
`;

const StInput = styled.input`
  border: none;
  outline: 2px solid gray;
  border-radius: 10px;
  width: 750px;
  height: 70px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 25px;

  &::placeholder {
    color: #b5b5b5;
  }

  &:focus {
    outline: 3px solid;
  }

  @media ${({ theme }) => theme.size.tablet} {
    width: 100%;
  }
`;

export default Step03Title;
