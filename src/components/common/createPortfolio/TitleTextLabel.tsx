import { styled } from 'styled-components';

interface TitleTextLabelProps {
  title: string;
  description: string;
  containerWidth?: string;
}

const TitleTextLabel = ({ title, description, containerWidth = '600px' }: TitleTextLabelProps) => {
  return (
    <StTextContainer width={containerWidth}>
      <StTitle>{title}</StTitle>
      <StDescription>{description}</StDescription>
    </StTextContainer>
  );
};

const StTextContainer = styled.div<{ width: string }>`
  position: relative;
  width: ${({ width }) => width};
  padding-bottom: 50px;
`;

const StTitle = styled.h1``;

const StDescription = styled.div`
  color: gray;
  white-space: pre-wrap;
  line-height: 150%;
`;

export default TitleTextLabel;
