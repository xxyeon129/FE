import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getAllList, getFilteredList } from '@src/apis/portfolio';
import Filter from '@src/components/main/Filter';
import PortfolioItem from '@src/components/main/PortfolioItem';
import { PortfolioDataType } from '@src/types/portfolioType';
import { categoryState } from '@src/states';

const Main = () => {
  const [list, setList] = useState<PortfolioDataType[]>([]);
  const [filterList, setFilterList] = useState<string[]>([]);
  const selectedCategory = useRecoilValue(categoryState);

  const [lastId, setLastId] = useState<number>(9);

  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);

  // IntersectionObserver 객체
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreData = useCallback(async () => {
    setIsMoreLoading(true);
    // TODO: 카테고리, 필터 적용 시 조건 처리
    // TODO: api 호출 코드 last-portfolio-id={}&size=9  적용
    // const newData = await getAllList(lastId+9);
    // setList((prevData) => [...prevData, ...newData.data]);
    // setLastId((prevId: number) => prevId + 9)
    console.log('last!');

    setIsMoreLoading(false);
  }, [lastId]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) loadMoreData();
      });
    },
    [loadMoreData]
  );

  const filterListObject = {
    all: ['전체', '개발 전체', '디자인 전체', '사진 전체'],
    develop: ['All', 'Backend', 'Frontend', 'AI', 'Big Data', 'App', 'System', 'Security'],
    design: ['All', 'Graphic', 'UI/UX', 'Web', 'Visual', 'Interaction', 'Product', 'Brand'],
    photograph: ['All', 'Commercial', 'Portrait', 'Wedding', 'Fashion', 'Wildlife', 'Sports'],
  };

  const fetchAllList = async () => {
    const serverData = await getAllList({ lastId: 10 });
    setList(serverData);
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
      {isMoreLoading ? (
        <StLoadingContainer>...loading</StLoadingContainer>
      ) : (
        // TODO: 모든 데이터를 불러와서 lastId에 해당하는 데이터가 없을 경우 조건 작성 필요(!isNoMoreData &&)
        <StLoadingIndicator ref={lastItemRef} />
      )}
    </StPortfolioPageContainer>
  );
};

const StPortfolioPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  align-items: center;
`;

const StPortfolioListContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 2rem;
  margin-top: 5rem;
  width: 100%;
  margin-left: 3rem;
`;

const StLoadingIndicator = styled.div``;

const StLoadingContainer = styled.div``;

export default Main;
