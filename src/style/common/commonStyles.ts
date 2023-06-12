import { styled } from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 41px;
  width: 100%;
  height: 100%;
`;

export const PortfolioListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  grid-auto-rows: min-content;
  row-gap: 80px;
  column-gap: 50px;
  width: 100%;
  margin-top: 10px;
`;
