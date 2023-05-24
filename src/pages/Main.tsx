import { getAllList, getFilteredList } from '@src/apis/portfolio';
import PortfolioItem from '@src/components/main/PortfolioItem';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { PortfolioDataType } from '@src/types/portfolioType';

const Main = () => {
  const [list, setList] = useState<PortfolioDataType[]>([]);

  const filterList = ['전체', '프론트엔드', '백엔드', 'AI', '빅데이터', '모바일', '웹'];

  const onClickFilterButton = async (filterKeyword: string) => {
    const filteredData = await getFilteredList(`filter=${filterKeyword}`);
    setList(filteredData.data);
  };

  useEffect(() => {
    const fetchAllList = async () => {
      const serverData = await getAllList();
      setList(serverData.data);
    };
    fetchAllList();
  }, []);

  return (
    <StPortfolioPageContainer>
      <StFilterListContainer>
        {filterList.map((filterKeyword, filterItemIndex) => (
          <StFilterButton key={filterItemIndex} onClick={() => onClickFilterButton(filterKeyword)}>
            {filterKeyword}
          </StFilterButton>
        ))}
      </StFilterListContainer>
      <StPortfolioListContainer>
        {list.map(item => (
          <PortfolioItem key={item.id} item={item} />
        ))}
      </StPortfolioListContainer>
    </StPortfolioPageContainer>
  );
};

const StPortfolioPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StFilterListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border: 1px solid gray;
  padding: 3rem;
`;

const StFilterButton = styled.button``;

const StPortfolioListContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 5rem;
`;

export default Main;
