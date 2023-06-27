import { css, styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { PageContainer as StPageContainer } from '@src/style/common/commonStyles';
import AllChart from '@src/components/charts/AllChart';
import DeveloperChart from '@src/components/charts/DeveloperChart';
import DesignerChart from '@src/components/charts/DesignerChart';
import PhotographerChart from '@src/components/charts/PhotographerChart';
import { getAllChart } from '@src/apis/chart';
import { ChartDataType } from '@src/types/chartDataType';
import useCountUpAnimation from '@src/Hook/useCountUpAnimation';
import { ReactComponent as Logo } from '@src/assets/logo.svg';
import { ReactComponent as DarkModeLogo } from '@src/assets/dark-mode-logo.svg';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';

const Chart = () => {
  const [clickType, setClickType] = useState<string>('');
  const [data, setData] = useState<ChartDataType>({
    all: 0,
    develop: 0,
    design: 0,
    photographer: 0,
  });
  const [allPortfolioCount, setAllPortfolioCount] = useState<number>(0);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);

  const clickChartList = [
    { type: 'develop', ChartComponent: DeveloperChart },
    { type: 'design', ChartComponent: DesignerChart },
    { type: 'photographer', ChartComponent: PhotographerChart },
  ];

  const fetchChart = async () => {
    const serverChartData = await getAllChart();
    setData(serverChartData);
    return serverChartData;
  };

  useEffect(() => {
    const fetchChartData = async () => {
      const data = await fetchChart();
      setAllPortfolioCount(data.all);
    };
    fetchChartData();
  }, []);

  const animatedCount = useCountUpAnimation(allPortfolioCount);

  return (
    <StPageContainer>
      <StTitle>Charts</StTitle>
      <StDescriptionContainer>
        <StDescrption>
          총&nbsp;<span>{animatedCount}</span>개의 포트폴리오가&nbsp;&nbsp;
          {isDarkMode ? <DarkModeLogo /> : <Logo />}
          &nbsp;서비스에 등록되어 있어요.
        </StDescrption>
        {clickType.length === 0 && (
          <StSubDescription>직군 차트를 클릭하고 직무별 통계도 확인해보세요!</StSubDescription>
        )}
      </StDescriptionContainer>
      <StChart>
        <StAllChartWrapper isclicked={clickType}>
          <AllChart setClickType={setClickType} clickType={clickType} allChartData={data} />
        </StAllChartWrapper>
        {clickChartList.map(
          clickChart =>
            clickType === clickChart.type && (
              <StChartWrapper>
                <StTypeText>{clickChart.type}</StTypeText>
                <clickChart.ChartComponent />
              </StChartWrapper>
            )
        )}
      </StChart>
    </StPageContainer>
  );
};

const StChart = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-around;

  @media ${({ theme }) => theme.size.mobileRow} {
    flex-direction: column;
  }
`;

const StTitle = styled.h1`
  margin: 0;
  font-weight: 900;
  margin: 30px 0;
`;

const StDescriptionContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 7px;
`;

const StDescrption = styled.h2`
  display: flex;
  align-items: center;
  font-size: 30px;
  > span {
    font-weight: 1000;
    color: ${({ theme }) => theme.color.lightGreen};
  }
  & svg {
    width: 68px;
    height: 25px;
    @media screen and (max-width: 1050px) {
      transition: 0.5s;
      width: 60px;
      height: 22px;
    }
    @media screen and (max-width: 945px) {
      transition: 0.5s;
      width: 50px;
      height: 20px;
    }
    @media screen and (max-width: 840px) {
      transition: 0.5s;
      width: 40px;
      height: 20px;
    }
    @media screen and (max-width: 575px) {
      transition: 0.5s;
      width: 30px;
      height: 20px;
    }
  }

  @media screen and (max-width: 1050px) {
    transition: 0.5s;
    font-size: 25px;
  }
  @media screen and (max-width: 945px) {
    transition: 0.5s;
    font-size: 20px;
  }
  @media screen and (max-width: 840px) {
    transition: 0.5s;
    font-size: 17px;
  }
  @media screen and (max-width: 575px) {
    transition: 0.5s;
    font-size: 14px;
  }
`;

const StSubDescription = styled.h3`
  color: ${({ theme }) => theme.color.lightGreen};

  @media screen and (max-width: 840px) {
    transition: 0.5s;
    font-size: 15px;
  }
  @media screen and (max-width: 575px) {
    transition: 0.5s;
    font-size: 12px;
  }
`;

const StAllChartWrapper = styled.div<{ isclicked: string }>`
  @media ${({ theme }) => theme.size.mobileRow} {
    height: 100%;
    ${({ isclicked }) =>
      isclicked.length !== 0 &&
      css`
        transition: 0.5s;
        width: 100%;
      `};
  }
  ${({ isclicked }) =>
    isclicked.length !== 0 &&
    css`
      transition: 0.5s;
      width: 50%;
    `};
`;

const StChartWrapper = styled.div`
  width: 50%;
  min-height: 70%;
  flex-basis: 1;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 20px;
  @media ${({ theme }) => theme.size.mobileRow} {
    width: 100%;
    margin-left: 0px;
  }
`;

const StTypeText = styled.h2`
  margin-bottom: 40px;

  @media ${({ theme }) => theme.size.mobileRow} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Chart;
