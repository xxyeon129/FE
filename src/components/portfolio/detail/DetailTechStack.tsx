import React from 'react';
import TechStack from '@src/components/portfolio/detail/TechStack';
import { styled } from 'styled-components';

interface DetailTechStackProps {
  techStack: string[];
}

function DetailTechStack(props: DetailTechStackProps) {
  return (
    <div>
      <StTechStackSection>
        <StTechnology>
          보유 기술<StTechnologyNumber>{props.techStack.length}</StTechnologyNumber>
        </StTechnology>
        <StTechStackContainer>
          {props.techStack?.map((item, index) => (
            <StTechStack key={index}>{item}</StTechStack>
          ))}
        </StTechStackContainer>
      </StTechStackSection>
      <StLine />
    </div>
  );
}

export default DetailTechStack;

const StTechStackSection = styled.div`
  width: 100%;
  padding: 6%;
  margin-top: 5%;
`;

const StTechnology = styled.span`
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 30px;
  gap: 10px;
`;

const StTechnologyNumber = styled.span`
  color: green;
  font-size: 30px;
`;

const StTechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const StTechStack = styled.div`
  width: calc(20%);
  height: 37px;
  border-radius: 20px;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2fff1;
  /* gap: 50px; */
  margin-right: 15px;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: #eaeaea;
  }
`;

const StLine = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px auto;
  width: 90%;
`;
