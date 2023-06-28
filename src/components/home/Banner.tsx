import { styled } from 'styled-components';
import { ReactComponent as BannerImage } from '@src/assets/home/home-banner-image.svg';
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
        <h1>포트폴리오 공유 서비스</h1>
        <StLogoWrapper>{props.isDarkMode ? <DarkModeLogo /> : <Logo />}</StLogoWrapper>
      </StTextContainer>
      <BannerImage />
    </StBannerContainer>
  );
};

const StBannerContainer = styled.div<{ isdarkmode: string }>`
  width: 100%;
  height: 363px;
  transition: 0.5s;
  background-color: ${({ isdarkmode }) => (isdarkmode === 'true' ? 'white' : 'black')};
  display: flex;
  justify-content: space-between;
`;

const StTextContainer = styled.div<{ isdarkmode: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.5s;
  color: ${({ isdarkmode }) => (isdarkmode === 'true' ? 'black' : 'white')};
  padding-left: 100px;
`;

const StSubText = styled.span`
  font-size: 17.5px;
  line-height: 170%;
`;

const StLogoWrapper = styled.div`
  margin-top: 20px;
  svg {
    width: 125px;
    height: 46px;
  }
`;

export default Banner;
