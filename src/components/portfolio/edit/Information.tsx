import React, { ChangeEvent, RefObject } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as MailIcon } from '@src/assets/portfolioDetail/port-mail-icon.svg';
import { ReactComponent as Telephone } from '@src/assets/portfolioDetail/port-telephone-icon.svg';
import { ReactComponent as Home } from '@src/assets/portfolioDetail/port-home-iocn.svg';
import {
  Desktop,
  Tablet,
  Mobile,
  DesktopAndTablet,
  TabletAndMobile,
} from '@src/style/mediaQuery.ts';
import { prop } from 'cheerio/lib/api/attributes';

interface InformationProps {
  portfolioTitle: string;
  email: string;
  telephone: string;
  residence: string;
  location: string;
  intro: string;
  filter: string;
  onTitleHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onEmailHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onTelephoneHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onResidenceHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onLocationHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onIntroHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onPortfolioUpdate: () => void;
  onPortfolioEditClear: () => void;
  onImageClick: () => void;
  portfolioImagePreview: string | null;
  fileInputRef: RefObject<HTMLInputElement>;
  onhandlePortfolioImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface StInputContainerProps {
  width?: string;
}

interface StInputProps {
  width?: string;
  height?: string;
}
const Information: React.FC<InformationProps> = props => {
  console.log('dasd', props.portfolioImagePreview);
  return (
    <div>
      <button onClick={props.onPortfolioUpdate}>수정완료</button>
      <button onClick={props.onPortfolioEditClear}>수정취소</button>

      <StFirstEditWrapper>
        <StLeftContainer>
          <StImagePreviewer onClick={props.onImageClick}>
            {props.portfolioImagePreview ? (
              <StRepresentativeImageEdit src={props.portfolioImagePreview} alt="" />
            ) : (
              <StPreviewerComment>선택된 이미지가 없습니다.</StPreviewerComment>
            )}
            <StFileUpload
              type="file"
              id="image"
              ref={props.fileInputRef}
              onChange={props.onhandlePortfolioImageChange}
            />
          </StImagePreviewer>
          {props.filter && <StFilter>{props.filter}</StFilter>}
        </StLeftContainer>
        <StRightContainer>
          <StInputContainer width="90%">
            <StInput
              type="text"
              id="portfolioTitle"
              value={props.portfolioTitle}
              onChange={props.onTitleHandler}
              width="100%"
              height="70px"
            />
          </StInputContainer>
          <StInputContainer width="90%">
            <StMailIcon />
            <StInput
              type="text"
              id="email"
              value={props.email}
              onChange={props.onEmailHandler}
              width="100%"
              height="40px"
            />
          </StInputContainer>
          <StInputContainer width="90%">
            <StTelephoneIcon />
            <StInput
              type="text"
              id="telephone"
              value={props.telephone}
              onChange={props.onTelephoneHandler}
              width="100%"
              height="40px"
            />
          </StInputContainer>
          <StInputContainer width="42%">
            <StHomeIcon />
            <StInput
              type="text"
              id="residence"
              value={props.residence}
              onChange={props.onResidenceHandler}
              width="100%"
              height="40px"
            />
          </StInputContainer>
          <StText>희망근무지</StText>
          <StInputContainer width="30%">
            <StInput
              type="text"
              id="location"
              value={props.location}
              onChange={props.onLocationHandler}
              width="100%"
              height="40px"
            />
          </StInputContainer>
        </StRightContainer>
      </StFirstEditWrapper>
      <StIntro>
        <StIntroTitle>포트폴리오 소개</StIntroTitle>
        <StInput
          type="text"
          id="intro"
          value={props.intro}
          onChange={props.onIntroHandler}
          width="100%"
          height="200px"
        />
      </StIntro>
      <StLine />
    </div>
  );
};

export default Information;

const StFirstEditWrapper = styled.div`
  background-color: #f1f1f1;
  display: flex;
  align-items: flex-start;
  padding: 10px;
  gap: 20px;
  margin-bottom: 20px;
`;

const StLeftContainer = styled.div`
  width: 50%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StFilter = styled.div`
  margin-top: 10px;
  font-size: 16px;
  border-radius: 20px;
  background-color: red;
  padding: 5px;
`;

const StRightContainer = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
`;

const StImagePreviewer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 5px;
  cursor: pointer;
`;

const StFileUpload = styled.input`
  display: none;
`;

const StPreviewerComment = styled.div`
  font-size: 25px;
`;

const StRepresentativeImageEdit = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StProfileImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1);
`;

const StText = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StIntro = styled.div`
  padding: 20px 0;
`;

const StIntroTitle = styled.h1`
  margin-bottom: 20px;
`;

const StInputContainer = styled.div<StInputContainerProps>`
  width: ${props => props.width || '100%'};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StInput = styled.input<StInputProps>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;

const StMailIcon = styled(MailIcon)`
  /* margin-right: 10px; */
  padding: 5px;
`;

const StTelephoneIcon = styled(Telephone)`
  margin-right: 10px;
  padding: 5px;
`;

const StHomeIcon = styled(Home)`
  margin-right: 10px;
  padding: 5px;
`;

const StLine = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px auto;
  width: 100%;
  margin: 50px 0;
`;
