import { useCallback, useEffect, useRef, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getAllList, getFilteredList, getLastId } from '@src/apis/portfolio';
import Filter from '@src/components/main/Filter';
import PortfolioItem from '@src/components/main/PortfolioItem';
import { PortfolioDataType } from '@src/types/portfolioType';
import { categoryState } from '@src/states';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Main = () => {
  const [list, setList] = useState<PortfolioDataType[]>([]);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const selectedCategory = useRecoilValue(categoryState);

  console.log('@@@@현재 list@@@@', list);

  const [lastId, setLastId] = useState<number>(0);

  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);

  // IntersectionObserver 객체
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreData = useCallback(async () => {
    if (lastId - 10 > 0) {
      setIsMoreLoading(true);

      let newData: PortfolioDataType[];
      if (filter !== 'All') {
        newData = await getFilteredList({
          lastId: lastId - 10,
          category: selectedCategory,
          filter,
        });
      } else {
        newData = await getAllList({ lastId: lastId - 10, category: selectedCategory });
      }

      setList(prevData => [...prevData, ...newData]);
      setLastId((prevId: number) => prevId - 10);
      setIsMoreLoading(false);
    } else {
      return;
    }
  }, [lastId]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) loadMoreData();
      });
      if (node) observer.current.observe(node);
    },
    [loadMoreData]
  );

  const filterListObject = {
    all: [],
    develop: ['All', 'Backend', 'Frontend', 'AI', 'Big Data', 'App', 'System', 'Security'],
    design: ['All', 'Graphic', 'UI/UX', 'Web', 'Visual', 'Interaction', 'Product', 'Brand'],
    photograph: ['All', 'Commercial', 'Portrait', 'Wedding', 'Fashion', 'Wildlife', 'Sports'],
  };

  const fetchLastId = async (filterKeyword?: string) => {
    const lastId = await getLastId({ category: selectedCategory, filter: filterKeyword });
    console.log('fetchLastId FILTER => ', filterKeyword);
    console.log('fetchLastId => ', lastId);

    setLastId(lastId);

    return lastId;
  };

  const fetchFirstMountList = async () => {
    setList([]);
    setFilter('All');
    const serverDataLastId = await fetchLastId();
    const serverData = await getAllList({ lastId: serverDataLastId, category: selectedCategory });
    setList(serverData);
  };

  const onClickFilterButton = async (filterKeyword: string) => {
    setFilter(filterKeyword);
    if (filterKeyword === 'All') {
      fetchFirstMountList();
      return;
    }

    const serverDataLastId = await fetchLastId(filterKeyword);

    const filteredData = await getFilteredList({
      lastId: serverDataLastId,
      category: selectedCategory,
      filter: filterKeyword,
    });

    setList(filteredData);
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

    fetchFirstMountList();
  }, [selectedCategory]);

  return (
    <StPortfolioPageContainer>
      <Filter filterList={filterList} onClickFilterButton={onClickFilterButton} />
      <StPortfolioListContainer>
        {list.map((item: PortfolioDataType) => (
          <PortfolioItem key={item.id} item={item} />
        ))}
      </StPortfolioListContainer>
      {isMoreLoading ? (
        <StLoadingSpinner />
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

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StLoadingSpinner = styled(AiOutlineLoading3Quarters)`
  animation: ${spinAnimation} 1s infinite linear;
  font-size: 30px;
  color: gray;
`;

export default Main;
