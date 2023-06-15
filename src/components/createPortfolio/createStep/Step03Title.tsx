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

const Step03Title = ({ onNextButtonClick, onPrevButtonClick }: CreatePortfolioStepProps) => {
  const [portfolioTitle, setPortfolioTitle] = useRecoilState(createTitleState);

  const {
    onChangeInput,
    isInvalid: isInvalidTitle,
    errorMessage,
  } = useOnChangeInput({
    inputValue: portfolioTitle,
    setRecoilState: setPortfolioTitle,
    validator: validateTitle,
  });

  const onClickNextButton = () => {
    if (isInvalidTitle) return;
    onNextButtonClick(STEP.FOUR);
  };

  const title = '포트폴리오를 잘 나타내는 제목을 입력해주세요';
  const description =
    '제목을 5자 이상, 20자 미만으로 작성해주세요.\n작성하신 제목은 나중에 수정하실 수 있습니다. 자유롭게 작성해주세요!';

  return (
    <S.Container>
      <TitleTextLabel title={title} description={description} />
      <StInputContainer>
        <StInput value={portfolioTitle} onChange={onChangeInput} />
        {isInvalidTitle && <ErrorMessage errorMessage={errorMessage} />}
      </StInputContainer>
      <S.ButtonContainer>
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.TWO)} />
        <NextStepButton onClick={onClickNextButton} notAllowed={`${isInvalidTitle}`} />
      </S.ButtonContainer>
    </S.Container>
  );
};

const StInputContainer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StInput = styled.input`
  border: 2px solid gray;
  border-radius: 10px;
  width: 600px;
  height: 50px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 20px;

  &:focus {
    border: 3px solid;
  }

  @media ${props => props.theme.size.tablet} {
    width: 100%;
  }
`;

export default Step03Title;
