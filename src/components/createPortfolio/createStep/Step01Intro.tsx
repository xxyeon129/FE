import { styled } from 'styled-components';
import { STEP } from '@src/constants/createPortfolioConstants';
import { ReactComponent as Logo } from '@src/assets/logo.svg';
import { ReactComponent as LabelNumberOne } from '@src/assets/createPortfolio/create-portfolio-step01-intro-number-1.svg';
import { ReactComponent as LabelNumberTwo } from '@src/assets/createPortfolio/create-portfolio-step01-intro-number-2.svg';
import { ReactComponent as LabelNumberThree } from '@src/assets/createPortfolio/create-portfolio-step01-intro-number-3.svg';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';

const Step01Intro: React.FC<{ onNextButtonClick: (step: string) => void }> = ({
  onNextButtonClick,
}) => {
  const descriptionDetail = [
    {
      id: 1,
      label: '포트폴리오 기본 정보를 \n입력해주세요',
      text: '표시될 포트폴리오 제목과 주요 사용 기술, 카테고리 등 \n기본 정보를 알려주세요.',
      labelNumber: LabelNumberOne,
    },
    {
      id: 2,
      label: '포트폴리오 추가 정보를 \n입력해주세요',
      text: '참여하신 프로젝트 이력과 Youtube, Blog 링크를 추가해주시면 \n포트폴리오가 더 돋보일 수 있어요.',
      labelNumber: LabelNumberTwo,
    },
    {
      id: 3,
      label: '등록을 완료하세요',
      text: '포트폴리오 대표 이미지를 제출하고 등록을 완료하세요. \n바로 등록하지 않으셔도 기존 작성 내용이 임시저장됩니다.',
      labelNumber: LabelNumberThree,
    },
  ];

  return (
    <StStep01Container>
      <StContentContainer>
        <StDescriptionContainer>
          <StLogoAndTextDescriptionContainer>
            <StLogo />
            <StDescriptionText>과 함께</StDescriptionText>
          </StLogoAndTextDescriptionContainer>
          <StDescriptionText>포트폴리오를 입력해볼까요?</StDescriptionText>
        </StDescriptionContainer>
        <StDetailContainer>
          {descriptionDetail.map(detail => (
            <StDetailItem key={detail.id}>
              <StLabelContainer>
                <detail.labelNumber />
                <StLabel>{detail.label}</StLabel>
              </StLabelContainer>
              <StDetailText>{detail.text}</StDetailText>
            </StDetailItem>
          ))}
          <StButtonContainer>
            <NextStepButton
              onClick={() => onNextButtonClick(STEP.TWO)}
              width="150px"
              marginRight="0px"
              text="시작하기"
            />
          </StButtonContainer>
        </StDetailContainer>
      </StContentContainer>
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

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    padding-left: 30px;
  }
`;

const StContentContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${({ theme }) => theme.size.tablet} {
    flex-direction: column;
  }
`;

const StDescriptionContainer = styled.h1`
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 100px;

  @media ${({ theme }) => theme.size.tablet} {
    transition: 0.5s;
    margin: 0;
  }
  @media screen and (max-width: 580px) {
    transition: 0.5s;
    padding-bottom: 50px;
  }
`;

const StLogoAndTextDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    gap: 0;
  }
`;

const StLogo = styled(Logo)`
  width: 82px;
  height: 30px;

  @media screen and (max-width: 1350px) {
    transition: 0.5s;
    width: 80px;
    height: 28px;
  }
  @media screen and (max-width: 1205px) {
    transition: 0.5s;
    width: 77px;
    height: 25px;
  }
  @media ${({ theme }) => theme.size.tablet} {
    transition: 0.5s;
    width: 82px;
    height: 30px;
  }
  @media screen and (max-width: 580px) {
    transition: 0.5s;
    width: 77px;
    height: 25px;
  }
  @media screen and (max-width: 520px) {
    transition: 0.5s;
    width: 68px;
    height: 23px;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    width: 64px;
    height: 19px;
  }
`;

const StDescriptionText = styled.h3`
  line-height: 160%;
  font-weight: 800;

  @media screen and (max-width: 1350px) {
    transition: 0.5s;
    font-size: 30px;
  }

  @media screen and (max-width: 1205px) {
    transition: 0.5s;
    font-size: 25px;
  }

  @media ${({ theme }) => theme.size.tablet} {
    font-size: 35px;
  }

  @media screen and (max-width: 655px) {
    transition: 0.5s;
    font-size: 30px;
  }

  @media screen and (max-width: 580px) {
    transition: 0.5s;
    font-size: 25px;
  }
  @media screen and (max-width: 520px) {
    transition: 0.5s;
    font-size: 20px;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    font-size: 19px;
  }
`;

const StDetailContainer = styled.div`
  margin-right: 70px;

  @media screen and (max-width: 1340px) {
    transition: 0.5s;
    margin: 0;
  }
`;

const StDetailItem = styled.div`
  margin-bottom: 30px;
  @media screen and (max-width: 520px) {
    transition: 0.5s;
    margin-bottom: 20px;
  }
`;

const StLabelContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const StLabel = styled.h3`
  font-size: 19px;
  margin-left: 5px;
  font-weight: 800;

  @media screen and (max-width: 520px) {
    transition: 0.5s;
    font-size: 17px;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    line-height: 140%;
    font-size: 16px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    white-space: pre-wrap;
  }
`;

const StDetailText = styled.div`
  color: gray;
  padding-left: 22px;
  padding-top: 10px;
  max-width: 450px;
  min-height: 100px;
  line-height: 150%;
  white-space: pre-wrap;

  @media screen and (max-width: 645px) {
    white-space: normal;
  }
  @media screen and (max-width: 580px) {
    transition: 0.5s;
    font-size: 14px;
  }
  @media screen and (max-width: 520px) {
    transition: 0.5s;
    font-size: 13px;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    display: none;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  @media ${({ theme }) => theme.size.mobileColumn} {
    padding-top: 20px;
  }
`;

export default Step01Intro;
