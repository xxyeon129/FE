import { css, styled } from 'styled-components';

interface TitleTextLabelProps {
  title: string;
  description: string;
  containerWidth?: string;
  responsiveDescription?: string;
}

const TitleTextLabel = ({
  title,
  description,
  containerWidth = '750px',
  responsiveDescription,
}: TitleTextLabelProps) => {
  return (
    <StTextContainer width={containerWidth}>
      <StTitle>{title}</StTitle>
      <StDescription>{description}</StDescription>
      <StResponsiveDescription>{responsiveDescription || description}</StResponsiveDescription>
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
  line-height: 150%;

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 21px;
    margin-bottom: 10px;
    white-space: pre-wrap;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 19px;
  }
`;

const descriptionStyle = `
  color: gray;
  white-space: pre-wrap;
  line-height: 150%;
`;

const StDescription = styled.div`
  ${descriptionStyle}
  font-size: 20px;

  @media screen and (max-width: 930px) {
    transition: 0.5s;
    font-size: 16px;
  }
  @media ${({ theme }) => theme.size.mobileRow} {
    transition: 0.5s;
    font-size: 20px;
  }
  @media screen and (max-width: 710px) {
    transition: 0.5s;
    font-size: 16px;
  }
  @media screen and (max-width: 545px) {
    display: none;
  }
`;

const StResponsiveDescription = styled.div`
  ${descriptionStyle}
  display: none;
  @media screen and (max-width: 545px) {
    display: block;
    font-size: 16px;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 14px;
    margin-bottom: 0;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 12px;
    margin-bottom: 0;
  }
`;

export default TitleTextLabel;
