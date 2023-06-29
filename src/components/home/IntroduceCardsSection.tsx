import { styled } from 'styled-components';
import { fadeInAnimationType } from '@src/types/commonType';
// icons
import { ReactComponent as ChartIcon } from '@src/assets/home/home-introduce-chart-icon.svg';
import { ReactComponent as FilterIcon } from '@src/assets/home/home-introduce-filter-icon.svg';
import { ReactComponent as SearchIcon } from '@src/assets/home/home-introduce-search-icon.svg';
import { ReactComponent as WriteIcon } from '@src/assets/home/home-introduce-write-icon.svg';
import { ReactComponent as DarkModeIcon } from '@src/assets/home/home-introduce-dark-mode-icon.svg';
import { ReactComponent as ResponsiveIcon } from '@src/assets/home/home-introduce-responsive-icon.svg';
// dark mode icons
import { ReactComponent as DarkModeChartIcon } from '@src/assets/home/darkMode/home-dark-mode-introduce-chart-icon.svg';
import { ReactComponent as DarkModeFilterIcon } from '@src/assets/home/darkMode/home-dark-mode-introduce-filter-icon.svg';
import { ReactComponent as DarkModeSearchIcon } from '@src/assets/home/darkMode/home-dark-mode-introduce-search-icon.svg';
import { ReactComponent as DarkModeWriteIcon } from '@src/assets/home/darkMode/home-dark-mode-introduce-write-icon.svg';
import { ReactComponent as DarkModeDarkModeIcon } from '@src/assets/home/darkMode/home-dark-mode-introduce-dark-mode-icon.svg';
import { ReactComponent as DarkModeResponsiveIcon } from '@src/assets/home/darkMode/home-dark-mode-introduce-responsive-icon.svg';

interface IntroduceSectionProps {
  mainFadeInAnimation: fadeInAnimationType;
  subFadeInAnimation: fadeInAnimationType;
  isDarkMode: boolean;
}

const IntroduceCardsSection = (props: IntroduceSectionProps) => {
  const mainIntroduceList = [
    {
      icon: ChartIcon,
      darkModeIcon: DarkModeChartIcon,
      title: '포트폴리오 통계',
      description: 'POL에 등록된\n직군, 직무별 포트폴리오의\n통계를 확인해보세요',
    },
    {
      icon: FilterIcon,
      darkModeIcon: DarkModeFilterIcon,
      title: '직군/직무 필터링',
      description: '이중 필터링을 통해\n원하는 포트폴리오만\n모아 볼 수 있어요',
    },
    {
      icon: SearchIcon,
      darkModeIcon: DarkModeSearchIcon,
      title: '포트폴리오 검색',
      description: '기술 스택, 제목을 검색해서\n키워드가 포함된\n포트폴리오를 확인해보세요',
    },
  ];

  const subIntroduceList = [
    {
      icon: WriteIcon,
      darkModeIcon: DarkModeWriteIcon,
      title: '단계별\n가이드 작성',
      description: '가이드를 따라 단계별로 쉽게\n포트폴리오를 작성할 수 있어요',
    },
    {
      icon: DarkModeIcon,
      darkModeIcon: DarkModeDarkModeIcon,
      title: '눈이 편안한\n다크모드',
      description: '다크모드로도 POL 서비스를\n이용할 수 있어요',
    },
    {
      icon: ResponsiveIcon,
      darkModeIcon: DarkModeResponsiveIcon,
      title: '반응형 화면\n지원',
      description: '다양한 디바이스 환경에서\n불편함 없이 이용할 수 있어요',
    },
  ];

  return (
    <StIntroduceContainer>
      <StMainIntroduceContainer {...props.mainFadeInAnimation}>
        {mainIntroduceList.map((mainIntroduceItem, index) => (
          <StIntroduceCard key={index} isdarkmode={`${props.isDarkMode}`}>
            <StIconWrapper>
              {props.isDarkMode ? <mainIntroduceItem.darkModeIcon /> : <mainIntroduceItem.icon />}
            </StIconWrapper>
            <StTextContainer>
              <StIntroduceTitle>{mainIntroduceItem.title}</StIntroduceTitle>
              <StIntroduceDescription>{mainIntroduceItem.description}</StIntroduceDescription>
            </StTextContainer>
          </StIntroduceCard>
        ))}
      </StMainIntroduceContainer>
      <StSubIntroduceContainer {...props.subFadeInAnimation}>
        {subIntroduceList.map((subIntroduceItem, index) => (
          <StIntroduceCard key={index} isdarkmode={`${props.isDarkMode}`}>
            <StIconWrapper>
              {props.isDarkMode ? <subIntroduceItem.darkModeIcon /> : <subIntroduceItem.icon />}
            </StIconWrapper>
            <StTextContainer>
              <StIntroduceTitle>{subIntroduceItem.title}</StIntroduceTitle>
              <StIntroduceDescription>{subIntroduceItem.description}</StIntroduceDescription>
            </StTextContainer>
          </StIntroduceCard>
        ))}
      </StSubIntroduceContainer>
      <StSubIntroduceContainer></StSubIntroduceContainer>
    </StIntroduceContainer>
  );
};

const StIntroduceContainer = styled.div`
  width: 100%;
  padding: 0 41px;
  margin: 50px 0;

  @media screen and (max-width: 565px) {
    padding: 0 20px;
  }
  @media screen and (max-width: 520px) {
    padding: 0 10px;
  }
`;

const containerStyle = `
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const StMainIntroduceContainer = styled.div`
  ${containerStyle}
`;

const StSubIntroduceContainer = styled.div`
  ${containerStyle}
`;

const StIntroduceCard = styled.div<{ isdarkmode: string }>`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-basis: 0;
  flex-grow: 1;
  border-radius: 30px;

  @media screen and (max-width: 1420px) {
    padding: 30px 20px;
  }
  @media screen and (max-width: 1355px) {
    padding: 30px 10px;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    padding: 30px 5px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    padding: 30px 2px;
  }

  &:hover {
    transition: 0.5s;
    background-color: ${({ theme, isdarkmode }) =>
      isdarkmode === 'true' ? theme.color.fontColor : theme.color.lightGray};
  }
`;

const StIconWrapper = styled.div`
  svg {
    width: 85px;
    height: 68px;

    @media screen and (max-width: 1005px) {
      transition: 0.3s;
      width: 80px;
      height: 63px;
    }
    @media screen and (max-width: 900px) {
      transition: 0.3s;
      width: 75px;
      height: 58px;
    }
    @media screen and (max-width: 850px) {
      transition: 0.3s;
      width: 70px;
      height: 53px;
    }
    @media screen and (max-width: 800px) {
      transition: 0.3s;
      width: 65px;
      height: 48px;
    }
    @media ${({ theme }) => theme.size.mobileRow} {
      transition: 0.3s;
      width: 75px;
      height: 58px;
    }
    @media screen and (max-width: 733px) {
      transition: 0.3s;
      width: 70px;
      height: 53px;
    }
    @media screen and (max-width: 665px) {
      transition: 0.3s;
      width: 65px;
      height: 48px;
    }
  }
`;

const StTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const StIntroduceTitle = styled.h2`
  text-align: center;
  line-height: 140%;

  @media screen and (max-width: 1080px) {
    transition: 0.3s;
    font-size: 22px;
  }
  @media screen and (max-width: 1005px) {
    transition: 0.3s;
    font-size: 20px;
  }
  @media screen and (max-width: 995px) {
    transition: 0.3s;
    font-size: 18px;
  }
  @media screen and (max-width: 900px) {
    transition: 0.3s;
    font-size: 16px;
  }
  @media screen and (max-width: 850px) {
    transition: 0.3s;
    font-size: 14px;
  }
  @media screen and (max-width: 800px) {
    transition: 0.3s;
    font-size: 12px;
  }
  @media ${({ theme }) => theme.size.mobileRow} {
    transition: 0.3s;
    font-size: 18px;
  }
  @media screen and (max-width: 733px) {
    transition: 0.3s;
    font-size: 16px;
  }
  @media screen and (max-width: 665px) {
    transition: 0.3s;
    font-size: 14px;
  }
  @media screen and (max-width: 615px) {
    transition: 0.3s;
    font-size: 12px;
  }
  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.3s;
    font-size: 10px;
  }
  @media screen and (max-width: 395px) {
    transition: 0.3s;
    white-space: pre-wrap;
  }
`;

const StIntroduceDescription = styled.p`
  white-space: pre-wrap;
  text-align: center;
  line-height: 140%;

  @media screen and (max-width: 1080px) {
    transition: 0.3s;
    font-size: 15px;
  }
  @media screen and (max-width: 995px) {
    transition: 0.3s;
    font-size: 13px;
  }
  @media screen and (max-width: 918px) {
    display: none;
  }
  @media ${({ theme }) => theme.size.mobileRow} {
    display: block;
    transition: 0.3s;
    font-size: 13px;
  }
  @media screen and (max-width: 733px) {
    transition: 0.3s;
    font-size: 11px;
  }
  @media screen and (max-width: 665px) {
    display: none;
  }
`;

export default IntroduceCardsSection;
