import React from 'react';
import { styled } from 'styled-components';

interface TechStackProps {
  techStack: string[];
}

function TechStack(props: TechStackProps) {
  return (
    <div>
      <StTechStackSection>
        {props.techStack?.map((item, index) => (
          <StTechStack key={index}>{item}</StTechStack>
        ))}
      </StTechStackSection>
    </div>
  );
}

export default TechStack;

const StTechStackSection = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* border: 1px solid black; */
`;

const StTechStack = styled.div`
  width: calc(33.33% - 20px);
  height: 37px;
  border-radius: 20px;
  margin: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  transition: background-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
