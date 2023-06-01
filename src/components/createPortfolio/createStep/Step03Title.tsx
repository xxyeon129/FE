import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { StContainer } from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { createTitleState } from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import useOnChangeInput from '@src/Hook/useOnChangeInput';
import { validateTitle } from '@src/components/common/createPortfolio/validator';

const Step03Title = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  const [portfolioTitle, setPortfolioTitle] = useRecoilState(createTitleState);

  const { onChangeInput } = useOnChangeInput(setPortfolioTitle);

  const [isInvalidTitle, errorMessage] = validateTitle(portfolioTitle);

  const onClickButton = () => {
    if (isInvalidTitle) return;
    onNextButtonClick(STEP.FOUR);
  };

  const title = '포트폴리오를 잘 나타내는 제목을 입력해주세요';
  const description = '작성하신 제목은 나중에 수정하실 수 있습니다.';

  return (
    <StContainer>
      <TitleTextLabel title={title} description={description} />
      <StInputContainer>
        <StInput value={portfolioTitle} onChange={onChangeInput} />
        {isInvalidTitle && <StErrorMessage>{errorMessage}</StErrorMessage>}
      </StInputContainer>
      <StButtonContainer>
        <NextStepButton onClick={onClickButton} notAllowed={`${isInvalidTitle}`} />
      </StButtonContainer>
    </StContainer>
  );
};

const StInputContainer = styled.div`
  height: 100px;
`;

const StInput = styled.input`
  border-radius: 10px;
  width: 600px;
  height: 50px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 20px;

  &:focus {
    border: 3px solid;
  }
`;

const StErrorMessage = styled.div`
  margin: 8px 0 0 5px;
  font-size: 15px;
  color: red;
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 600px;
  margin-top: 50px;
`;

export default Step03Title;
