import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { getAllList, getFilteredList } from '@src/apis/portfolio';
import Filter from '@src/components/main/Filter';
import PortfolioItem from '@src/components/main/PortfolioItem';
import { PortfolioDataType } from '@src/types/portfolioType';
import { categoryState } from '@src/states';

const Main = () => {
  const [list, setList] = useState<PortfolioDataType[]>([]);
  const [filterList, setFilterList] = useState<string[]>([]);
  const selectedCategory = useRecoilValue(categoryState);

  const filterListObject = {
    all: ['전체', '개발 전체', '디자인 전체', '사진 전체'],
    develop: ['전체', '프론트엔드', '백엔드', 'AI', '빅데이터', '모바일', '웹'],
    design: ['전체', '웹디자인', '영상디자인', '산업디자인', '패션디자인', '그래픽디자인'],
    photograph: ['전체', '인물', '공간', '풍경', '사물', '동물'],
  };

  const fetchAllList = async () => {
    const serverData = await getAllList(selectedCategory);
    setList(serverData.data);
  };

  const onClickFilterButton = async (filterKeyword: string) => {
    if (filterKeyword === '전체') {
      fetchAllList();
      return;
    }
    const filteredData = await getFilteredList(selectedCategory, filterKeyword);
    setList(filteredData.data);
  };

  useEffect(() => {
    switch (selectedCategory) {
      case 'All':
        setFilterList(filterListObject.all);
        break;
      case 'Develop':
        setFilterList(filterListObject.develop);
        break;
      case 'Design':
        setFilterList(filterListObject.design);
        break;
      case 'Photographer':
        setFilterList(filterListObject.photograph);
        break;
      default:
        break;
    }
    fetchAllList();
  }, [selectedCategory]);

  useEffect(() => {
    fetchAllList();
  }, []);

  return (
    <StPortfolioPageContainer>
      <Filter filterList={filterList} onClickFilterButton={onClickFilterButton} />
      <StPortfolioListContainer>
        {list.map((item: PortfolioDataType) => (
          <PortfolioItem key={item.id} item={item} />
        ))}
      </StPortfolioListContainer>
    </StPortfolioPageContainer>
  );
};

const StPortfolioPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
`;

const StPortfolioListContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 5rem;
`;

export default Main;
