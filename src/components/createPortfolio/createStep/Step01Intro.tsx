import { styled } from 'styled-components';
import { STEP } from '@src/constants/createPortfolioConstants';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';

const Step01Intro: React.FC<{ onNextButtonClick: (step: string) => void }> = ({
  onNextButtonClick,
}) => {
  const descriptionDetail = [
    {
      id: 1,
      label: '포트폴리오 기본 정보를 입력해주세요',
      text: '표시될 포트폴리오 제목과 주요 사용 기술, 카테고리 등\n기본 정보를 알려주세요.',
    },
    {
      id: 2,
      label: '포트폴리오 추가 정보를 입력해주세요',
      text: '참여하신 프로젝트 이력과 Youtube, Blog 링크를 추가해주시면\n포트폴리오가 더 돋보일 수 있어요.',
    },
    {
      id: 3,
      label: '등록을 완료하세요',
      text: '포트폴리오 대표 이미지를 제출하고 등록을 완료하세요.\n바로 등록하지 않으셔도 기존 작성 내용이 임시저장됩니다.',
    },
  ];

  return (
    <StStep01Container>
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
    </StStep01Container>
  );
};

const StStep01Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-right: 40px;
  padding-left: 60px;
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
  margin-bottom: 30px;

  &:last-child {
    border: none;
    margin: 0;
  }
`;

const StLabelContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const StLabel = styled.h3`
  font-size: 19px;
`;

const StLabelNumber = styled.h3`
  margin-right: 9px;
  font-size: 19px;
`;

const StDetailText = styled.div`
  color: gray;
  padding-left: 18px;
  padding-top: 10px;
  max-width: 450px;
  min-height: 100px;
  line-height: 150%;
  white-space: pre-wrap;
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;

export default Step01Intro;
