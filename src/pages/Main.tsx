import { getAllList } from '@src/apis/portfolio';
import PortfolioItem from '@src/components/main/PortfolioItem';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { PortfolioDataType } from '@src/types/portfolioType';

const Main = () => {
  const [list, setList] = useState<PortfolioDataType[]>([]);

  useEffect(() => {
    const fetchAllList = async () => {
      const serverData = await getAllList();
      setList(serverData.data);
    };
    fetchAllList();
  }, []);

  return (
    <StPortfolioContainer>
      {list.map(item => (
        <PortfolioItem key={item.id} item={item} />
      ))}
    </StPortfolioContainer>
  );
};

const StPortfolioContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 12rem;
`;

export default Main;
