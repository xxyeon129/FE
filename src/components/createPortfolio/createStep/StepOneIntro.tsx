import { STEP } from '@src/constants/createPortfolioConstants';
import { styled } from 'styled-components';

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
      <StDescriptionContainer>
        <StDescription>
          폴과 함께
          <br />
          포트폴리오를 입력해볼까요?
        </StDescription>
        <StDescriptionDetailContainer>
          {descriptionDetail.map(detail => (
            <StDescriptionDetailItem key={detail.id}>
              <StLabelContainer>
                <StLabelNumber>{detail.id}</StLabelNumber>
                <StDescriptionDetailLabel>{detail.label}</StDescriptionDetailLabel>
              </StLabelContainer>
              <StDescriptionDetailText>{detail.text}</StDescriptionDetailText>
            </StDescriptionDetailItem>
          ))}
          {/* <StDescriptionDetailItem>
            <StDescriptionDetailLabel>
              1 &nbsp;포트폴리오 기본 정보를 입력해주세요
            </StDescriptionDetailLabel>
            <StDescriptionDetailText>
              표시될 포트폴리오 제목과 주요 사용 기술, 카테고리 등 기본 정보를 알려주세요.
            </StDescriptionDetailText>
          </StDescriptionDetailItem>
          <StDescriptionDetailItem>
            <StDescriptionDetailLabel>
              2 &nbsp;포트폴리오 추가 정보를 입력해주세요
            </StDescriptionDetailLabel>
            <StDescriptionDetailText>
              포트폴리오 대표 이미지를 제출하고 Youtube, Blog 링크를 추가해주시면 포트폴리오가 더
              돋보일 수 있어요.
            </StDescriptionDetailText>
          </StDescriptionDetailItem>
          <StDescriptionDetailItem>
            <StDescriptionDetailLabel>3 &nbsp;등록을 완료하세요</StDescriptionDetailLabel>
            <StDescriptionDetailText>
              참여하신 프로젝트가 있다면 프로젝트를 입력하고 등록을 완료하세요.
            </StDescriptionDetailText>
          </StDescriptionDetailItem> */}
        </StDescriptionDetailContainer>
      </StDescriptionContainer>
      <StButtonContainer>
        <StNextStepButton onClick={() => onNextButtonClick(STEP.TWO)}>시작하기</StNextStepButton>
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

const StDescriptionContainer = styled.div`
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

const StDescriptionDetailContainer = styled.div`
  margin-right: 70px;
`;

const StDescriptionDetailItem = styled.div`
  border-bottom: 1px solid lightgray;

  &:last-child {
    border: none;
  }
`;

const StLabelContainer = styled.div`
  display: flex;
`;

const StDescriptionDetailLabel = styled.h3``;

const StLabelNumber = styled.h3`
  margin-right: 9px;
`;

const StDescriptionDetailText = styled.div`
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

const StNextStepButton = styled.button`
  max-width: 120px;
  padding: 15px 25px;
  border-radius: 10px;
  font-weight: bold;
  margin-right: 70px;

  background-color: ${({ theme }) => theme.color.neonGreen};

  &:hover {
    transition: 0.5s;
    background-color: ${({ theme }) => theme.color.lightGreen};
    color: white;
  }
`;

export default StepOneIntro;
