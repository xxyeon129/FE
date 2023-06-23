import { css, styled } from 'styled-components';
import { useState } from 'react';
import { PageContainer as StPageContainer } from '@src/style/common/commonStyles';
import AllChart from '@src/components/charts/AllChart';
import DesignerChart from '@src/components/charts/DesignerChart';
import DeveloperChart from '@src/components/charts/DeveloperChart';
import PhotographerChart from '@src/components/charts/PhotographerChart';

const Chart = () => {
  const [clickType, setClickType] = useState<string>('');

  const clickChartList = [
    { type: 'develop', ChartComponent: DeveloperChart },
    { type: 'design', ChartComponent: DesignerChart },
    { type: 'photographer', ChartComponent: PhotographerChart },
  ];

  return (
    <StPageContainer>
      <StTitle>Charts</StTitle>
      <StChart>
        <StAllChartWrapper isclicked={clickType}>
          <AllChart setClickType={setClickType} clickType={clickType} />
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
