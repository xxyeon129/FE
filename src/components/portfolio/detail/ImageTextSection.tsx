import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Mail } from '@src/assets/portfolioDetail/port-mail-icon.svg';
import { ReactComponent as Telephone } from '@src/assets/portfolioDetail/port-telephone-icon.svg';
import { ReactComponent as Home } from '@src/assets/portfolioDetail/port-home-iocn.svg';
import { ReactComponent as EditIconSvg } from '@src/assets/portfolioDetail/port-edit-icon.svg';
import { ReactComponent as Trash } from '@src/assets/portfolioDetail/port-trash-icon.svg';
import { ReactComponent as ClickOn } from '@src/assets/portfolioDetail/port-clickon-icon.svg';
import { ReactComponent as ClickDown } from '@src/assets/portfolioDetail/port-clickdown-icon.svg';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';

interface ImageTextSectionProps {
  getPortfolioImage: string | null;
  imageLoadError: boolean;
  onImageError: () => void;
  proFileImage: string | null;
  portfolioTitle: string;
  hostid: number;
  userid: number;
  email: string;
  telephone: string;
  residence: string;
  location: string;
  intro: string;
  filter: string;

  onPortfolioEdit: () => void;
  onPortfolioDelete: () => void;
}

function ImageTextSection(props: ImageTextSectionProps) {
  const [contactToggle, setConTactToggle] = useState<boolean>(false);
  const [button, setButton] = useState(<ClickOn />);
  const isDarkMode = useRecoilValue(isDarkModeState);

  const toggleContact = () => {
    setConTactToggle(prevState => !prevState);
    setButton(contactToggle ? <ClickOn /> : <ClickDown />);
  };

  return (
    <div>
      <StContainer>
        <StContainerTop>
          <StRepresentativeImage
            src={props.getPortfolioImage || ''}
            alt="포트폴리오 이미지"
            onError={props.onImageError}
          />
        </StContainerTop>

        <StContainerMiddle>
          <StProfileContainer isdarkmode={`${isDarkMode}`}>
            {props.proFileImage && (
              <StProFileImage isdarkmode={`${isDarkMode}`} src={props.proFileImage} alt="" />
            )}
          </StProfileContainer>
        </StContainerMiddle>

        <StContainerLower>
          <StLowerContent>
            <Stfilter>{props.filter}</Stfilter>
            <StTitle>
              <StTitleh1 isdarkmode={`${isDarkMode}`}>{props.portfolioTitle}</StTitleh1>
              <StIconButton>
                {props.hostid === props.userid ? (
                  <StButtonSection>
                    <StEditIcon onClick={props.onPortfolioEdit} />
                    <StTrashIcon onClick={props.onPortfolioDelete} />
                  </StButtonSection>
                ) : null}
              </StIconButton>
            </StTitle>
            <Stpart>{props.intro}</Stpart>
            <StContactButton onClick={toggleContact}>{button}</StContactButton>
            {contactToggle && (
              <StContact>
                <StContactItem isdarkmode={`${isDarkMode}`}>
                  <StMailIcon />
                  <span>{props.email}</span>
                </StContactItem>
                <StContactItem isdarkmode={`${isDarkMode}`}>
                  <StTelephoneIcon />
                  <span>{props.telephone}</span>
                </StContactItem>
                <StContactItem isdarkmode={`${isDarkMode}`}>
                  <StHomeIcon />
                  <span>
                    {props.residence} | {props.location} 근무 희망
                  </span>
                </StContactItem>
              </StContact>
            )}
          </StLowerContent>
        </StContainerLower>
      </StContainer>
      <StLine />
    </div>
  );
}

export default ImageTextSection;

const StContainer = styled.div`
  position: relative;
`;

const StContainerTop = styled.div``;

const StContainerLower = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const StContainerMiddle = styled.div`
  display: flex;
  justify-content: center;
`;

const StProfileContainer = styled.div<{ isdarkmode: string }>`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: ${({ isdarkmode }) => (isdarkmode === 'true' ? 'none' : '2px solid white')};
  background-color: ${({ isdarkmode }) => (isdarkmode === 'true' ? 'black' : 'white')};
`;

const StLowerContent = styled.div`
  margin-top: -40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Stfilter = styled.div`
  margin-left: 10px;
  border-radius: 20px;
  padding: 10px;
  width: 100px;
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(to right, #45be59, #18302d);
  font-weight: bold;
  color: white;
  margin-top: -20px;
`;

const StClickOnIcon = styled(ClickOn)``;

const StContactButton = styled.div`
  text-align: center;
  cursor: pointer;
`;

const StContact = styled.div`
  position: relative;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 30px;
  width: 400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 400px;
  }

  @media (max-width: 479px) {
    width: 250px;
  }
`;

const StContactItem = styled.div<{ isdarkmode: string }>`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 479px) {
    font-size: 10px;
  }
`;

const StMailIcon = styled(Mail)`
  margin-right: 15px;
`;

const StTelephoneIcon = styled(Telephone)`
  margin-right: 17px;
  margin-top: 10px;
`;

const StHomeIcon = styled(Home)`
  margin-right: 15px;
  margin-top: 10px;
`;

const StTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 479px) {
    font-size: 10px;
    margin-left: 50px;
  }
`;

const StTitleh1 = styled.h1<{ isdarkmode: string }>`
  /* font-size: 20px; */
  font-weight: bold;
  /* color: #333; */
  align-items: center;
  justify-content: center;
  color: ${({ isdarkmode }) => (isdarkmode === 'true' ? '#FFFFFF' : '#333')};
`;

const Stpart = styled.div`
  margin: 20px 0;
  padding: 0 100px;
  line-height: 1.5;
`;

const StIconButton = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 479px) {
    align-items: center;
  }
`;

const StProFileImage = styled.img<{ isdarkmode: string }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: ${({ isdarkmode }) => (isdarkmode === 'true' ? 'none' : '2px solid white')};
  background-color: ${({ isdarkmode }) => (isdarkmode === 'true' ? 'black' : 'white')};

  margin-top: -150px;
  object-fit: cover;
`;

const StButtonSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StRepresentativeImage = styled.img`
  width: 100%;
  height: 300px;
  top: 0;
  left: 0;
  object-fit: cover;
`;

const StEditIcon = styled(EditIconSvg)`
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const StTrashIcon = styled(Trash)`
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const StLine = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px auto;
  width: 90%;
`;
