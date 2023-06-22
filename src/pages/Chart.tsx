import PhotographerChart from '@src/components/charts/PhotographerChart';
import { PageContainer as StPageContainer } from '@src/style/common/commonStyles';
import { styled } from 'styled-components';

const Chart = () => {
  return (
    <StPageContainer>
      <StChart>
        <StTitle>Charts</StTitle>
        <PhotographerChart />
      </StChart>
    </StPageContainer>
  );
};

const StChart = styled.div`
  width: 100%;
  height: 100%;
`;

const StTitle = styled.h1`
  margin: 0;
  font-weight: 900;
  margin: 30px 0;
`;

export default Chart;
