import { CATEGORY_KEYWORD, filterListObject } from '@src/constants/portfolioFilteringData';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

interface CreatePortfolioProps {
  category: string;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const CreatePortfolioFilter = ({
  category,
  selectedFilter,
  setSelectedFilter,
}: CreatePortfolioProps) => {
  const [filterList, setFilterList] = useState<string[]>([]);
  const [isSelectCategory, setIsSelectCategory] = useState(false);

  const onClickFilterItem = (selectFilter: string) => {
    setSelectedFilter(selectFilter);
  };

  useEffect(() => {
    if (category.length !== 0) {
      setIsSelectCategory(true);
    }

    switch (category) {
      case CATEGORY_KEYWORD.DEVELOP:
        setFilterList(filterListObject.develop);
        break;
      case CATEGORY_KEYWORD.DESIGN:
        setFilterList(filterListObject.design);
        break;
      case CATEGORY_KEYWORD.PHOTOGRAPHER:
        setFilterList(filterListObject.photograph);
        break;
      default:
        break;
    }
  }, [category]);

  return (
    <StFilterListContainer>
      {isSelectCategory ? (
        filterList.map((filter: string, index: number) => (
          <StFilterButton
            key={index}
            type="button"
            onClick={() => onClickFilterItem(filter)}
            isselected={`${selectedFilter === filter}`}
          >
            {filter}
          </StFilterButton>
        ))
      ) : (
        <StNoCategoryText>
          선택한 카테고리가 없습니다.
          <br /> 카테고리를 선택해주세요!
        </StNoCategoryText>
      )}
    </StFilterListContainer>
  );
};

const StFilterListContainer = styled.div`
  padding: 1rem;
  border: 1px solid;
  display: flex;
  gap: 1rem;
`;

const StNoCategoryText = styled.div`
  color: gray;
`;

const StFilterButton = styled.button<{ isselected: string }>`
  border: ${({ isselected }) => (isselected === 'true' ? '2px solid' : '1px solid gray')};
`;

export default CreatePortfolioFilter;
