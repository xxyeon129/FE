import React, { MouseEvent } from 'react';
import { styled } from 'styled-components';
import NoImage from '@src/components/common/NoImage';
import { ReactComponent as Delete } from '@src/assets/portfolioDetail/port-projectDelete-icon.svg';

interface ProjectEditSectionProps {
  projects: Project[];
  onProjectCreate: () => void;
  onProjectDelete: (id: number) => void;
}

interface Project {
  id: number;
  projectImageList: ProjectImage[];
}

interface ProjectImage {
  imageUrl: string;
}

function ProjectEditSection(props: ProjectEditSectionProps) {
  console.log(props.projects);
  return (
    <div>
      <StProjectList>
        <StContentTitleContainer>
          <StContentTitle>
            프로젝트
            <StProjectNumber>{props.projects.length}</StProjectNumber>
          </StContentTitle>
          <StProjectCreateButton onClick={props.onProjectCreate}>
            + 프로젝트 추가
          </StProjectCreateButton>
        </StContentTitleContainer>
        <StProjectBoxContainer>
          {props.projects.map((item: Project, index: number) => (
            <StProjectBox key={index}>
              <DeleteIcon onClick={() => props.onProjectDelete(item.id)} />
              {item.projectImageList.length !== 0 ? (
                <StProjectImg src={item.projectImageList[0].imageUrl} alt="프로젝트 이미지" />
              ) : (
                <NoImage height="100%" borderRadius="10px" />
              )}
            </StProjectBox>
          ))}
        </StProjectBoxContainer>
      </StProjectList>
    </div>
  );
}

export default ProjectEditSection;

const StContentTitleContainer = styled.div`
  width: 100%;
  display: flex;

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
  }

  @media (min-width: 480px) and (max-width: 540px) {
    width: 100%;
    flex-direction: column;
  }

  @media (max-width: 479px) {
    width: 100%;
    flex-direction: column;
  }
`;

const StContentTitle = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 30px;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 479px) {
    font-size: 15px;
  }
`;

const StProjectCreateButton = styled.button`
  margin-left: auto;
  border-radius: 20px;
  width: 100px;
  border: 1px solid green;
  color: green;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: green;
    color: white;
  }
`;

const StProjectNumber = styled.span`
  color: green;
  font-size: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 479px) {
    font-size: 15px;
  }
`;

const StProjectList = styled.div`
  padding-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const StProjectBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  height: 100%;
  justify-content: flex-start;

  & > div {
    flex-basis: calc(33.33% - 20px);
  }

  @media (min-width: 480px) and (max-width: 767px) {
    width: 100%;
    flex-direction: row;
    & > div {
      flex-basis: calc(50% - 20px);
    }
  }

  @media (max-width: 479px) {
    width: 100%;
    flex-direction: column;
    & > div {
      flex-basis: calc(100%);
    }
  }
`;

const StProjectBox = styled.div`
  position: relative;
  background-color: #f2f2f2;
  border: 1px solid black;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StProjectImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const DeleteIcon = styled(Delete)`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.3);
  }
`;
