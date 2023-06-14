import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Mail } from '@src/assets/portfolioDetail/port-mail-icon.svg';
import { ReactComponent as Telephone } from '@src/assets/portfolioDetail/port-telephone-icon.svg';
import { ReactComponent as Home } from '@src/assets/portfolioDetail/port-home-iocn.svg';
import NoImage from '@src/components/common/NoImage';
import { ReactComponent as EditIconSvg } from '@src/assets/portfolioDetail/port-edit-icon.svg';
import { ReactComponent as Trash } from '@src/assets/portfolioDetail/port-trash-icon.svg';
import { ReactComponent as ClickOn } from '@src/assets/portfolioDetail/port-clickon-icon.svg';
import { ReactComponent as ClickDown } from '@src/assets/portfolioDetail/port-clickdown-icon.svg';

interface ImageTextSectionProps {
  getPortfolioImage: string | null;
  imageLoadError: boolean;
  onImageError: () => void;
  proFileImage: string;
  portfolioTitle: string;
  hostid: number;
  userid: number;
  email: string;
  telephone: string;
  residence: string;
  location: string;
  intro: string;
  onPortfolioEdit: () => void;
  onPortfolioDelete: () => void;
}

function ImageTextSection(props: ImageTextSectionProps) {
  const [contactToggle, setConTactToggle] = useState<boolean>(false);
  const [button, setButton] = useState(<ClickOn />);

  const toggleContact = () => {
    setConTactToggle(prevState => !prevState);
    setButton(contactToggle ? <ClickOn /> : <ClickDown />);
  };

  return (
    <div>
      <StContainer>
        <StContainerTop>
          {props.getPortfolioImage && !props.imageLoadError ? (
            <StRepresentativeImage
              src={props.getPortfolioImage}
              alt=""
              onError={props.onImageError}
            />
          ) : (
            <NoImage height="250px" />
          )}
        </StContainerTop>

        <StContainerMiddle>
          <StProfileContainer>
            {props.proFileImage && <StProFileImage src={props.proFileImage} alt="" />}
          </StProfileContainer>
        </StContainerMiddle>

        <StContainerLower>
          <StLowerContent>
            <StTitle>
              <h1>{props.portfolioTitle}</h1>
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
                <Stpart>
                  <Mail /> {props.email}
                </Stpart>
                <Stpart>
                  <Telephone /> {props.telephone}
                </Stpart>
                <Stpart>
                  <Home /> {props.residence} | {props.location} 근무 희망
                </Stpart>
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
  align-items: flex-start; /* Align items to the top */
`;

const StContainerMiddle = styled.div`
  display: flex;
  justify-content: center;
`;

const StProfileContainer = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid white;
  background-color: white;
`;

const StLowerContent = styled.div`
  margin-top: -40px;
`;

const StContactButton = styled.div`
  text-align: center;
  font-weight: 1000;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const StContact = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
`;

const StTitle = styled.div`
  display: flex;
  gap: 10px;
`;

const Stpart = styled.div`
  margin: 20px 0;
`;

const StIconButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StProFileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: white;
  margin-top: -150px;
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
