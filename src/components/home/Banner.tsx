import { styled } from 'styled-components';
import bannerBackgroundImage from '@src/assets/home/home-banner-image.svg';
import { ReactComponent as Logo } from '@src/assets/dark-mode-logo.svg';
import { ReactComponent as DarkModeLogo } from '@src/assets/logo.svg';

interface BannerProps {
  isDarkMode: boolean;
}

const Banner = (props: BannerProps) => {
  return (
    <StBannerContainer isdarkmode={`${props.isDarkMode}`}>
      <StTextContainer isdarkmode={`${props.isDarkMode}`}>
        <StSubText>개발자, 디자이너, 포토그래퍼가 이용하는</StSubText>
        <StMainText>포트폴리오 공유 서비스</StMainText>
        <StLogoWrapper>{props.isDarkMode ? <DarkModeLogo /> : <Logo />}</StLogoWrapper>
      </StTextContainer>
      <StContainerShadow isdarkmode={`${props.isDarkMode}`} />
    </StBannerContainer>
  );
};

const StBannerContainer = styled.div<{ isdarkmode: string }>`
  width: 100%;
  height: 363px;
  transition: 0.5s;
  background-color: ${({ isdarkmode }) => (isdarkmode === 'true' ? 'white' : 'black')};
  display: flex;
  position: relative;

  background-image: url(${bannerBackgroundImage});
  background-repeat: no-repeat;
  background-position: 95% 0%;

  @media screen and (max-width: 1200px) {
    transition: 0.5s;
    background-position: 120% 0%;
  }
  @media screen and (max-width: 1060px) {
    transition: 0.5s;
    background-position: 180% 0%;
  }
  @media screen and (max-width: 950px) {
    transition: 1s;
    background-position: 50px 0%;
  }
  @media ${({ theme }) => theme.size.mobileRow} {
    transition: 0.5s;
    background-position: 80px 0%;
  }
  @media screen and (max-width: 755px) {
    transition: 0.5s;
    background-position: 50px 0%;
  }
  @media screen and (max-width: 725px) {
    transition: 0.5s;
    background-position: 30px 0%;
  }
  @media screen and (max-width: 710px) {
    transition: 0.5s;
    background-position: 10px 0%;
  }
  @media screen and (max-width: 685px) {
    transition: 0.5;
    height: 280px;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    background-position: -100px 40%;
  }
`;

const StContainerShadow = styled.div<{ isdarkmode: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: ${({ isdarkmode }) => (isdarkmode === 'true' ? 'white' : 'black')};
  @media screen and (max-width: 1120px) {
    transition: 1s;
    opacity: 0.7;
  }
  @media screen and (max-width: 950px) {
    transition: 1s;
    opacity: 0.75;
  }
  @media ${({ theme }) => theme.size.mobileRow} {
    transition: 0.5s;
    opacity: 0.7;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    opacity: 0.7;
  }
`;

const StTextContainer = styled.div<{ isdarkmode: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.5s;
  color: ${({ isdarkmode }) => (isdarkmode === 'true' ? 'black' : 'white')};
  padding-left: 100px;
  z-index: 1;

  @media screen and (max-width: 920px) {
    transition: 0.5s;
    padding-left: 50px;
  }
  @media screen and (max-width: 400px) {
    transition: 0.5s;
    padding-left: 30px;
  }
`;

const StSubText = styled.span`
  font-size: 17.5px;
  line-height: 170%;
  @media screen and (max-width: 685px) {
    transition: 0.5s;
    font-size: 15px;
  }
  @media screen and (max-width: 400px) {
    transition: 0.5s;
    font-size: 13px;
  }
`;

const StMainText = styled.h1`
  @media screen and (max-width: 685px) {
    transition: 0.5s;
    font-size: 28px;
  }
  @media screen and (max-width: 400px) {
    transition: 0.5s;
    font-size: 25px;
  }
`;

const StLogoWrapper = styled.div`
  margin-top: 20px;
  svg {
    width: 125px;
    height: 46px;

    @media screen and (max-width: 685px) {
      transition: 0.5s;
      width: 105px;
      height: 40px;
    }
  }
`;

export default Banner;
