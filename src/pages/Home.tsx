import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { styled } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  categoryState,
  filterState,
  selectedCategoryState,
  selectedHeaderState,
} from '@src/states';
import { ReactComponent as Logo } from '@src/assets/logo.svg';
import { ReactComponent as DarkLogo } from '@src/assets/dark-mode-logo.svg';
import { ReactComponent as BackgroundIcon } from '@src/assets/home-background-icon.svg';
import { ReactComponent as BackgroundDarkModeIcon } from '@src/assets/home-background-dark-mode-icon.svg';
import { PATH_URL } from '@src/constants/constants';
import { CATEGORY_KEYWORD } from '@src/constants/portfolioFilteringData';
import { getPopularPortfolio } from '@src/apis/portfolio';
import { PortfolioDataType } from '@src/types/portfolioType';
import { fadeInAnimation } from '@src/style/common/commonStyles';
import * as S from '@src/style/common/commonStyles';
import theme from '@src/style/theme';
import PortfolioItem from '@src/components/common/PortfolioItem';
import { isDarkModeState } from '@src/states/darkModeState';
import useScrollFadeIn from '@src/Hook/useScrollFadeIn';
import SlidePortfolioSection from '@src/components/home/SlidePortfolioSection';
import ScrollLeadText from '@src/components/home/ScrollLeadText';
import IntroduceCardsSection from '@src/components/home/IntroduceCardsSection';
import Banner from '@src/components/home/Banner';
import LeadSignupLogin from '@src/components/home/LeadSignupLogin';

const Home = () => {
  const [latestPortfolioList, setLatestPortfolioList] = useState<PortfolioDataType[]>([]);
  const setCategory = useSetRecoilState<string>(categoryState);
  const setFilter = useSetRecoilState<string>(filterState);
  const setSelectedCategory = useSetRecoilState<string>(selectedCategoryState);
  const setSelectedHeader = useSetRecoilState<boolean>(selectedHeaderState);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);

  const navigate = useNavigate();

  const fadeInAnimationItem = {
    0: useScrollFadeIn('down', 1, 0.4),
    1: useScrollFadeIn('down', 1.5, 1),
    2: useScrollFadeIn('down', 2, 1.5),
    3: useScrollFadeIn('down', 1.4, 0.8),
    4: useScrollFadeIn('down', 1.5, 0.8),
    5: useScrollFadeIn('down', 1.6, 0.8),
    6: useScrollFadeIn('down', 1.8, 0.1),
    7: useScrollFadeIn('listDown', 1.1, 0.1),
    8: useScrollFadeIn('down', 2, 0.1),
    9: useScrollFadeIn('down', 2.2, 0.4),
  };

  const buttonList = [
    { display: '개발자', value: CATEGORY_KEYWORD.DEVELOP, color: theme.color.neonGreen },
    { display: '디자이너', value: CATEGORY_KEYWORD.DESIGN, color: theme.color.skyBlue },
    { display: '포토그래퍼', value: CATEGORY_KEYWORD.PHOTOGRAPHER, color: theme.color.blueGreen },
  ];

  const onClickButton = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setSelectedCategory(selectedCategory);
    setFilter('All');
    setSelectedHeader(false);

    navigate(PATH_URL.MAIN);
  };

  const { data: popularPortfolioList } = useQuery('popularPortfolioList', getPopularPortfolio);

  useEffect(() => {
    popularPortfolioList && setLatestPortfolioList(popularPortfolioList);
  }, [popularPortfolioList]);

  return (
    <StHome>
      <StIntroContainer>
        <StIntroTextContainer>
          <StIntroText {...fadeInAnimationItem[0]}>
            개발자, 디자이너, 포토그래퍼가 이용하는
          </StIntroText>
          <StIntroTitle {...fadeInAnimationItem[1]}>포트폴리오 공유 서비스</StIntroTitle>
        </StIntroTextContainer>
        <div {...fadeInAnimationItem[2]}>{isDarkMode ? <StDarkModeLogo /> : <StLogo />}</div>
        <StButtonContainer>
          {buttonList.map((button, index) => (
            <StButton key={index} color={button.color} onClick={() => onClickButton(button.value)}>
              {button.display} 포트폴리오 둘러보기
            </StButton>
          ))}
        </StButtonContainer>
        <StShadow isdarkmode={`${isDarkMode}`} />
        {isDarkMode ? <StBackgroundDarkModeIcon /> : <StBackgroundIcon />}
        <ScrollLeadText />
      </StIntroContainer>
      <SlidePortfolioSection
        fadeInAnimation={fadeInAnimationItem[3]}
        latestPortfolioList={latestPortfolioList}
      />
      <IntroduceCardsSection
        mainFadeInAnimation={fadeInAnimationItem[4]}
        subFadeInAnimation={fadeInAnimationItem[5]}
        isDarkMode={isDarkMode}
      />
      <Banner isDarkMode={isDarkMode} />
      <StListContainer>
        <StTextLabel {...fadeInAnimationItem[6]}>지금 뜨는 포트폴리오</StTextLabel>
        <S.PortfolioListContainer {...fadeInAnimationItem[7]}>
          {latestPortfolioList.map((item: PortfolioDataType) => (
            <PortfolioItem key={item.id} item={item} />
          ))}
        </S.PortfolioListContainer>
      </StListContainer>
      <LeadSignupLogin
        fadeInAnimationText={fadeInAnimationItem[8]}
        fadeInAnimationButton={fadeInAnimationItem[9]}
      />
    </StHome>
  );
};

const StHome = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-bottom: 150px;
`;

const StIntroContainer = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    gap: 35px;
  }
`;

const StIntroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const StIntroText = styled.p`
  font-size: 25px;
  margin-bottom: 15px;

  @media screen and (max-width: 660px) {
    transition: 0.5s;
    font-size: 22px;
  }
  @media screen and (max-width: 525px) {
    transition: 0.5s;
    font-size: 20px;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 15px;
    margin-bottom: 10px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 12px;
  }
`;

const StIntroTitle = styled.h1`
  font-weight: 900;
  font-size: 40px;

  @media screen and (max-width: 660px) {
    transition: 0.5s;
    font-size: 37px;
  }
  @media screen and (max-width: 525px) {
    transition: 0.5s;
    font-size: 35px;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 30px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 20px;
  }
`;

const logoStyle = `
  width: 223px;
  height: 68px;
  z-index: 1;

  @media screen and (max-width: 660px) {
    transition: 0.5s;
    width: 218px;
    height: 63px;
  }
  @media screen and (max-width: 525px) {
    transition: 0.5s;
    width: 213px;
    height: 58px;
  }
  @media screen and (max-width: 480px) {
    transition: 0.5s;
    width: 203px;
    height: 48px;
  }
  @media screen and (max-width: 380px) {
    transition: 0.5s;
    width: 193px;
    height: 38px;
  }
`;

const StLogo = styled(Logo)`
  ${logoStyle}
`;

const StDarkModeLogo = styled(DarkLogo)`
  ${logoStyle}
`;

const StButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 2;
`;

const StButton = styled.button<{ color: string }>`
  width: 280px;
  background-color: ${({ color }) => color};
  font-weight: 800;
  font-size: 18px;
  border-radius: 10px;
  padding: 12px 25px;

  opacity: 0;
  animation: ${fadeInAnimation} ease-in 1s;
  animation-fill-mode: forwards;
  animation-duration: 1s;
  animation-delay: 2s;

  &:nth-child(2) {
    animation-delay: 2.8s;
  }
  &:nth-child(3) {
    animation-delay: 3.5s;
  }

  &:hover {
    transform: scale(1.07);
    transition: 1s ease;
  }

  @media screen and (max-width: 660px) {
    transition: 0.5s;
    width: 270px;
    font-size: 17px;
  }
  @media screen and (max-width: 525px) {
    transition: 0.5s;
    width: 260px;
    font-size: 16px;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    width: 250px;
    font-size: 15px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    width: 220px;
    font-size: 12px;
  }
`;

const StShadow = styled.div<{ isdarkmode: string }>`
  position: absolute;
  width: 100%;
  top: 300px;
  background: ${({ isdarkmode }) =>
    isdarkmode === 'true'
      ? 'linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)'
      : 'linear-gradient(180deg, #ffffff -5.06%, rgba(255, 255, 255, 0) 150%);'};
  transform: rotate(-180deg);
  padding: 250px;
  z-index: ${({ isdarkmode }) => (isdarkmode === 'true' ? '1' : '0.1')};
`;

const backgroundIconStyle = `
position: absolute;
top: 305px;
margin-left: 570px;
opacity: 0;

@media screen and (max-width: 830px) {
  transition: 0.5s;
  margin-left: 450px;
}
@media screen and (max-width: 480px) {
  transition: 0.5s;
  top: 245px;
  margin-left: 380px;
  width: 450px;
  height: 433px;
}

@media screen and (max-width: 380px) {
  transition: 0.5s;
  top: 240px;
  margin-left: 300px;
  width: 389px;
  height: 372px;
}
`;

const StBackgroundIcon = styled(BackgroundIcon)`
  ${backgroundIconStyle}
  z-index: -1;

  animation: ${fadeInAnimation} ease-in 1s;
  animation-fill-mode: forwards;
  animation-duration: 1s;
  animation-delay: 3.9s;
`;

const StBackgroundDarkModeIcon = styled(BackgroundDarkModeIcon)`
  ${backgroundIconStyle}
  z-index: -0.7;

  animation: ${fadeInAnimation} ease-in 1s;
  animation-fill-mode: forwards;
  animation-duration: 1s;
  animation-delay: 3.9s;
`;

const StTextLabel = styled.h2`
  font-weight: 900;
  margin-bottom: 30px;
`;

const StListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 41px;
  margin-top: 30px;
`;

export default Home;
