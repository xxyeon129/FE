import React from 'react';
import { styled } from 'styled-components';
import NoImage from '@src/components/common/NoImage';

interface Project {
  id: number;
  projectImageList: { imageUrl: string }[];
}

interface ProjectListProps {
  projects: Project[];
  onProjectDetail: (id: number) => void;
}

function ProjectList(props: ProjectListProps) {
  return (
    <div>
      <StProjectList>
        <StContentTitle>
          프로젝트
          <StProjectNumber>{props.projects.length}</StProjectNumber>
        </StContentTitle>
        <StProjectBoxContainer>
          {props.projects.map((item, index) => (
            <StProjectBox key={index} onClick={() => props.onProjectDetail(item.id)}>
              {item.projectImageList.length !== 0 ? (
                <StProjectImg src={item.projectImageList[0].imageUrl} alt="프로젝트 이미지" />
              ) : (
                <NoImage height="100%" borderTopRadius="10px" />
              )}
            </StProjectBox>
          ))}
        </StProjectBoxContainer>
      </StProjectList>
    </div>
  );
}

export default ProjectList;

const StContentTitle = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 30px;
  gap: 10px;
`;

const StProjectNumber = styled.span`
  color: green;
  font-size: 30px;
`;

const StProjectList = styled.div`
  margin: 5%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const StProjectBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const StProjectBox = styled.div`
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-top: 20px;
  flex-basis: calc(33.33% - 20px);
  cursor: pointer;
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
`;
