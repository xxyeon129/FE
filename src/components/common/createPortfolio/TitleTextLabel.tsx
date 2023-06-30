import { css, styled } from 'styled-components';

interface TitleTextLabelProps {
  title: string;
  description: string;
  containerWidth?: string;
}

const TitleTextLabel = ({ title, description, containerWidth = '750px' }: TitleTextLabelProps) => {
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
  line-height: 250%;

  ${({ width }) =>
    width === '900px' &&
    css`
      padding-bottom: 30px;
      @media screen and (max-width: 1220px) {
        width: 100%;
        padding: 50px 20px;
      }
    `}

  @media ${({ theme }) => theme.size.tablet} {
    width: 100%;
  }
`;

const StTitle = styled.h1`
  margin-bottom: 15px;
  font-weight: 800;
`;

const StDescription = styled.div`
  color: gray;
  white-space: pre-wrap;
  line-height: 150%;
  font-size: 20px;
`;

export default TitleTextLabel;
