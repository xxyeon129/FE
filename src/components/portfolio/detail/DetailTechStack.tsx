import React from 'react';
import { styled } from 'styled-components';

interface DetailTechStackProps {
  techStack: string[];
}

function DetailTechStack(props: DetailTechStackProps) {
  console.log('기술스텍', props.techStack);

  if (props.techStack.length === 0 || props.techStack.every(item => item.trim() === '')) {
    return null;
  }

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

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 479px) {
    font-size: 15px;
  }
`;

const StTechnologyNumber = styled.span`
  color: green;
  font-size: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 479px) {
    font-size: 15px;
  }
`;

const StTechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const StTechStack = styled.div`
  width: calc(20% - 5px);
  height: 37px;
  border-radius: 20px;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2fff1;
  margin-right: 15px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  font-weight: bold;
  font-size: 15px;
  padding: 8px;

  &:hover {
    transform: scale(1.1);
    background-color: #eaeaea;
  }

  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 10px;
  }

  @media (max-width: 479px) {
    font-size: 8px;
  }
`;

const StLine = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px auto;
  width: 90%;
`;
