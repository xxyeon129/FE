import React, { useState } from 'react';
import { styled } from 'styled-components';
import NoImage from '@src/components/common/NoImage';

interface Project {
  id: number;
  projectImageList: { imageUrl: string }[];
  title: string;
  term: string;
}

interface ProjectListProps {
  projects: Project[];
  onProjectDetail: (id: number) => void;
}

function ProjectList(props: ProjectListProps) {
  console.log('프로젝트 데이터 :', props.projects);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div>
      <StProjectList>
        <StContentTitle>
          프로젝트
          <StProjectNumber>{props.projects.length}</StProjectNumber>
        </StContentTitle>
        <StProjectBoxContainer>
          {props.projects.map((item, index) => (
            <StProjectBox
              key={index}
              onClick={() => props.onProjectDetail(item.id)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {item.projectImageList.length !== 0 ? (
                <>
                  <StProjectImg
                    src={item.projectImageList[0].imageUrl}
                    alt="프로젝트 이미지"
                    hovered={hoveredIndex === index}
                  />
                  <StProjectOverlay hovered={hoveredIndex === index}>
                    <StProjectTitle>{item.title}</StProjectTitle>
                    <StProjectTerm>{item.term}</StProjectTerm>
                  </StProjectOverlay>
                </>
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

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 479px) {
    font-size: 15px;
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
    transform: translateY(0px);
  }

  @media (max-width: 768px) {
    flex-basis: calc(50% - 20px);
  }

  @media (max-width: 479px) {
    flex-basis: calc(100%);
  }
`;

const StProjectImg = styled.img<{ hovered: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const StProjectOverlay = styled.div<{ hovered: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ hovered }) => (hovered ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: background-color 0.3s ease;
`;

const StProjectTitle = styled.div`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const StProjectTerm = styled.div`
  color: white;
  font-size: 14px;
`;
