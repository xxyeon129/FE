import useCreatePortfolioInput from '@src/Hook/useCreatePortfolioInput';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import { StContainer } from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { createTitleState } from '@src/states';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

const Step03Title = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  const setPortfolioTitle = useSetRecoilState(createTitleState);
  const { inputData, onChangeInput } = useCreatePortfolioInput();

  const onClickNextButton = async () => {
    await setPortfolioTitle(inputData);
    onNextButtonClick(STEP.FOUR);
  };

  const title = '포트폴리오를 잘 나타내는 제목을 입력해주세요';
  const description = '작성하신 제목은 나중에 수정하실 수 있습니다.';

  return (
    <StContainer>
      <TitleTextLabel title={title} description={description} />
      <StInput value={inputData} onChange={onChangeInput} />
      <StButtonContainer>
        <NextStepButton onClick={onClickNextButton} />
      </StButtonContainer>
    </StContainer>
  );
};

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

const StButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 600px;
  margin-top: 50px;
`;

export default Step03Title;
