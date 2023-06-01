import { STEP } from '@src/constants/createPortfolioConstants';
import { styled } from 'styled-components';
import NextStepButton from '@src/components/common/NextStepButton';

interface StepOneProps {
  onNextButtonClick: (step: string) => void;
}

const StepOneIntro = ({ onNextButtonClick }: StepOneProps) => {
  const descriptionDetail = [
    {
      id: 1,
      label: '포트폴리오 기본 정보를 입력해주세요',
      text: '표시될 포트폴리오 제목과 주요 사용 기술, 카테고리 등 기본 정보를 알려주세요.',
    },
    {
      id: 2,
      label: '포트폴리오 추가 정보를 입력해주세요',
      text: '포트폴리오 대표 이미지를 제출하고 Youtube, Blog 링크를 추가해주시면 포트폴리오가 더 돋보일 수 있어요.',
    },
    {
      id: 3,
      label: '등록을 완료하세요',
      text: '참여하신 프로젝트가 있다면 프로젝트를 입력하고 등록을 완료하세요.',
    },
  ];

  return (
    <StStepOneContainer>
      <StContentContainer>
        <StDescription>
          폴과 함께
          <br />
          포트폴리오를 입력해볼까요?
        </StDescription>
        <StDetailContainer>
          {descriptionDetail.map(detail => (
            <StDetailItem key={detail.id}>
              <StLabelContainer>
                <StLabelNumber>{detail.id}</StLabelNumber>
                <StLabel>{detail.label}</StLabel>
              </StLabelContainer>
              <StDetailText>{detail.text}</StDetailText>
            </StDetailItem>
          ))}
        </StDetailContainer>
      </StContentContainer>
      <StButtonContainer>
        <NextStepButton
          onClick={() => onNextButtonClick(STEP.TWO)}
          marginRight="70px"
          text="시작하기"
        />
      </StButtonContainer>
    </StStepOneContainer>
  );
};

const StStepOneContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 41px;
`;

const StContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StDescription = styled.h1`
  line-height: 160%;
  margin-right: 50px;
  display: flex;
  align-items: center;
  padding-bottom: 100px;
`;

const StDetailContainer = styled.div`
  margin-right: 70px;
`;

const StDetailItem = styled.div`
  border-bottom: 1px solid lightgray;

  &:last-child {
    border: none;
  }
`;

const StLabelContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const StLabel = styled.h3``;

const StLabelNumber = styled.h3`
  margin-right: 9px;
`;

const StDetailText = styled.div`
  color: gray;
  padding-left: 18px;
  max-width: 450px;
  min-height: 100px;
  line-height: 150%;
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;

export default StepOneIntro;
