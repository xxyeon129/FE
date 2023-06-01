import { styled } from 'styled-components';

interface TitleTextLabelProps {
  title: string;
  description: string;
}

const TitleTextLabel = ({ title, description }: TitleTextLabelProps) => {
  return (
    <StTextContainer>
      <StTitle>{title}</StTitle>
      <StDescription>{description}</StDescription>
    </StTextContainer>
  );
};

const StTextContainer = styled.div`
  position: relative;
  width: 600px;
  padding-bottom: 50px;
`;

const StTitle = styled.h1``;

const StDescription = styled.div`
  color: gray;
`;

export default TitleTextLabel;
