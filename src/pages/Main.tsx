import { useCallback, useEffect, useRef, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { getAllList, getFilteredList, getLastId } from '@src/apis/portfolio';
import Filter from '@src/components/main/Filter';
import { PortfolioDataType } from '@src/types/portfolioType';
import { categoryState, createPortfolioState, filterState } from '@src/states';
import { filterListObject } from '@src/constants/portfolioFilteringData';
import * as S from '@src/style/common/commonStyles';
import PortfolioItem from '@src/components/common/PortfolioItem';
import SnackbarPopup from '@src/components/common/SnackbarPopup';
import useSnackbarPopup from '@src/Hook/useSnackbarPopup';

const Main = () => {
  const [list, setList] = useState<PortfolioDataType[]>([]);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [lastId, setLastId] = useState<number>(0);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [nextLastId, setNextLastId] = useState<number>(0);

  const [isPortfolioCreated, setIsPortfolioCreated] = useRecoilState(createPortfolioState);
  const [selectedFilter, setSelectedFilter] = useRecoilState(filterState);
  const selectedCategory = useRecoilValue(categoryState);

  const isExistData = list.length !== 0;

  const { isSnackbarVisible, showSnackbarPopup } = useSnackbarPopup();

  // --- 무한스크롤 ---
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreData = useCallback(async () => {
    if (nextLastId > 0) {
      setIsMoreLoading(true);
      let newData: PortfolioDataType[];
      let serverNextId = nextLastId;

      if (selectedFilter !== 'All') {
        const { serverData, serverLastId } = await getFilteredList({
          lastId: nextLastId,
          category: selectedCategory,
          filter: selectedFilter,
        });

        newData = serverData;
        serverNextId = serverLastId;
      } else {
        const { serverData, serverLastId } = await getAllList({
          lastId: nextLastId,
          category: selectedCategory,
        });
        newData = serverData;
        serverNextId = serverLastId;
      }

      setList(prevData => [...prevData, ...newData]);
      setNextLastId(serverNextId);
      setIsMoreLoading(false);
    } else {
      return;
    }
  }, [lastId, nextLastId]);

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

  // --- 데이터 호출 ---
  const fetchLastId = async (filterKeyword?: string) => {
    const lastId = await getLastId({ category: selectedCategory, filter: filterKeyword });
    setLastId(lastId);
    return lastId;
  };

  const fetchFirstMountList = async (filterKeyword: string) => {
    setList([]);
    setIsDataLoading(true);
    if (filterKeyword !== 'All') {
      fetchFilteredList(filterKeyword);
      return;
    }

    const firstServerLastId = await fetchLastId();

    const { serverData, serverLastId } = await getAllList({
      lastId: firstServerLastId,
      category: selectedCategory,
    });
    setNextLastId(serverLastId);
    setList(serverData);

    setIsDataLoading(false);
    return serverLastId;
  };

  const fetchFilteredList = async (filterKeyword: string) => {
    setIsDataLoading(true);
    if (filterKeyword === 'All') {
      fetchFirstMountList(filterKeyword);
    }

    const serverDataLastId = await fetchLastId(filterKeyword);

    const { serverData, serverLastId } = await getFilteredList({
      lastId: serverDataLastId,
      category: selectedCategory,
      filter: filterKeyword,
    });
    setNextLastId(serverLastId);
    setList(serverData);

    setIsDataLoading(false);
  };

  // --- 직무 필터링 ---
  const onClickFilterButton = async (filterKeyword: string) => {
    setSelectedFilter(filterKeyword);

    if (filterKeyword === 'All') {
      fetchFirstMountList(filterKeyword);
      return;
    }
    fetchFilteredList(filterKeyword);
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

    const updateNextId = async () => {
      const nextId = await fetchFirstMountList(selectedFilter);
      setNextLastId(nextId);
    };
    updateNextId();
  }, [selectedCategory]);

  useEffect(() => {
    if (isPortfolioCreated) {
      showSnackbarPopup();
      setIsPortfolioCreated(false);
    }
  }, []);

  return (
    <S.PageContainer>
      {selectedCategory === 'All' ? (
        <StAllCategoryTitle>ALL</StAllCategoryTitle>
      ) : (
        <Filter filterList={filterList} onClickFilterButton={onClickFilterButton} />
      )}

      {isExistData ? (
        <S.PortfolioListContainer>
          {list.map((item: PortfolioDataType) => (
            <PortfolioItem key={item.id} item={item} />
          ))}
        </S.PortfolioListContainer>
      ) : (
        <>
          {isDataLoading ? (
            <StLoadingContainer>
              <StLoadingSpinner />
            </StLoadingContainer>
          ) : (
            <StNoDataTextContainer>포트폴리오가 존재하지 않습니다.</StNoDataTextContainer>
          )}
        </>
      )}
      {!isMoreLoading && <StLoadingIndicator ref={lastItemRef} />}
      {isSnackbarVisible && (
        <SnackbarPopup
          text="정상적으로 포트폴리오가 작성되었습니다"
          type="done"
          isSnackbarVisible={isSnackbarVisible}
        />
      )}
    </S.PageContainer>
  );
};

const StAllCategoryTitle = styled.h1`
  margin: 0;
  font-weight: 900;
  margin: 30px 0;
`;

const StLoadingIndicator = styled.div`
  padding: 5px;
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const centerAlignStyle = `
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StLoadingContainer = styled.div`
  ${centerAlignStyle}
`;

const StLoadingSpinner = styled(AiOutlineLoading3Quarters)`
  animation: ${spinAnimation} 1s infinite linear;
  font-size: 30px;
  color: gray;
`;

const StNoDataTextContainer = styled.div`
  ${centerAlignStyle}

  font-size: 20px;
  font-weight: 500;
  color: gray;
`;

export default Main;
