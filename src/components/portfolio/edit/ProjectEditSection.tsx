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
  return (
    <div>
      <StProjectList>
        <StContentTitle>
          프로젝트
          <StProjectNumber>{props.projects.length}</StProjectNumber>
          <StProjectCreateButton onClick={props.onProjectCreate}>생성</StProjectCreateButton>
        </StContentTitle>
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

const StContentTitle = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 30px;
  gap: 10px;
  justify-content: space-between;
`;

const StProjectNumber = styled.span`
  color: green;
  font-size: 30px;
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

const StProjectCreateButton = styled.button``;

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
