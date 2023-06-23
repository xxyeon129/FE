import AllChart from '@src/components/charts/AllChart';
import PhotographerChart from '@src/components/charts/PhotographerChart';
import { PageContainer as StPageContainer } from '@src/style/common/commonStyles';
import { styled } from 'styled-components';

const Chart = () => {
  return (
    <StPageContainer>
      <StTitle>Charts</StTitle>
      <StChart>
        <StChartWrapper>
          <AllChart />
          <PhotographerChart />
          {/* <DesignerChart /> */}
        </StChartWrapper>
      </StChart>
    </StPageContainer>
  );
};

const StChart = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const StTitle = styled.h1`
  margin: 0;
  font-weight: 900;
  margin: 30px 0;
`;

const StChartWrapper = styled.div`
  width: 100%;
`;

export default Chart;
