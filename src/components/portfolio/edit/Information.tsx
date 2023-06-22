import React, { ChangeEvent, RefObject, useRef } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as MailIcon } from '@src/assets/portfolioDetail/port-mail-icon.svg';
import { ReactComponent as Telephone } from '@src/assets/portfolioDetail/port-telephone-icon.svg';
import { ReactComponent as Home } from '@src/assets/portfolioDetail/port-home-iocn.svg';
import { ReactComponent as Photo } from '@src/assets/portfolioDetail/portedit-photo-icon.svg';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

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
  getPortfolioImage: string | null;
}

interface StInputContainerProps {
  width?: string;
}

interface StInputProps {
  width?: string;
  height?: string;
}
const Information: React.FC<InformationProps> = props => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();
        const croppedImage = croppedCanvas.toDataURL();
      }
    }
  };

  return (
    <div>
      <StButtonContainer>
        <StButton color="#ccc" onClick={props.onPortfolioEditClear}>
          취소
        </StButton>
        <StButton onClick={props.onPortfolioUpdate}>수정완료</StButton>
      </StButtonContainer>
      <StFirstEditWrapper>
        <StLeftContainer>
          {/* ------------------------ */}

          <StImagePreviewer>
            {props.portfolioImagePreview ? (
              <Cropper
                ref={cropperRef}
                src={props.portfolioImagePreview}
                style={{ height: 300, width: '100%' }}
                aspectRatio={16 / 9}
                guides={true}
                crop={handleCrop}
              />
            ) : (
              <StPreviewerComment>선택된 이미지가 없습니다.</StPreviewerComment>
            )}
            <StFileUpload
              type="file"
              id="image"
              ref={props.fileInputRef}
              onChange={props.onhandlePortfolioImageChange}
            />
            <StIconWrapper>
              <Photo onClick={props.onImageClick} />
            </StIconWrapper>
          </StImagePreviewer>

          {/* ------------------------ */}

          {props.filter && <StFilter>{props.filter}</StFilter>}
        </StLeftContainer>
        <StRightContainer>
          <StInputContainer width="100%">
            <StInput
              type="text"
              id="portfolioTitle"
              value={props.portfolioTitle}
              onChange={props.onTitleHandler}
              width="100%"
              height="70px"
              style={{ fontSize: '23px', fontWeight: 'bold' }}
            />
          </StInputContainer>
          <StInputContainer width="100%">
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
          <StInputContainer width="100%">
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
          <StInputContainer width="100%">
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
          <StInputContainer width="100%">
            <StText>희망 근무지</StText>
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
          height="150px"
          style={{ border: '1px solid #ccc' }}
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
  padding: 10px;
  gap: 20px;
  margin-bottom: 20px;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 10px;

  @media (min-width: 768px) and (max-width: 1023px) {
    flex-direction: column;
    align-items: stretch;
  }

  @media (min-width: 480px) and (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
  @media (max-width: 479px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const StLeftContainer = styled.div`
  width: 40%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
  }

  @media (min-width: 480px) and (max-width: 767px) {
    width: 100%;
  }
  @media (max-width: 479px) {
    width: 100%;
  }
`;

const StFilter = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 20px;
  background: linear-gradient(to right, #18302d, #00312b);
  padding: 5px;
  color: white;
`;

const StRightContainer = styled.div`
  width: 60%;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
  }

  @media (min-width: 480px) and (max-width: 767px) {
    width: 100%;
  }
  @media (max-width: 479px) {
    width: 100%;
  }
`;

const StImagePreviewer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 5px;
  cursor: pointer;
`;

const StIconWrapper = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 5px;
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
  border-radius: 10px;
`;

const StText = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  @media (max-width: 1023px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 479px) {
    font-size: 10px;
  }
`;

const StIntro = styled.div`
  padding: 20px 0;
`;

const StIntroTitle = styled.h1`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 479px) {
    font-size: 15px;
  }
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
  /* border: 1px solid #ccc; */
  outline: none;
  border: none;
`;

const StMailIcon = styled(MailIcon)`
  margin-right: 10px;
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

const StButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
`;

const StButton = styled.button`
  background-color: ${({ color }) => color || '#6bf65f'};
  color: black;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-right: 8px;
  width: 100px;
  height: 40px;
  font-weight: bold;
  cursor: pointer;

  &:not([notallowed='true']):hover {
    transition: 0.5s;
    background-color: ${({ theme, color }) => (color ? color : theme.color.lightGreen)};
    color: white;
  }
  @media (max-width: 768px) {
    width: 70px;
    height: 30px;
    font-size: 10px;
  }

  @media (max-width: 479px) {
    width: 70px;
    height: 30px;
    font-size: 10px;
  }
`;

const StLine = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px auto;
  width: 100%;
  margin: 50px 0;
`;
