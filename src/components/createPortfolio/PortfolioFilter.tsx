import { CATEGORY_KEYWORD, filterListObject } from '@src/constants/portfolioFilteringData';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SelectCategoryRequest from './SelectCategoryRequest';
import { StInputLabel } from '../../style/common/createStepStyles';

interface PortfolioFilterProps {
  category: string;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const PortfolioFilter = ({ category, selectedFilter, setSelectedFilter }: PortfolioFilterProps) => {
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
        setFilterList(filterListObject.develop.slice(1));
        break;
      case CATEGORY_KEYWORD.DESIGN:
        setFilterList(filterListObject.design.slice(1));
        break;
      case CATEGORY_KEYWORD.PHOTOGRAPHER:
        setFilterList(filterListObject.photograph.slice(1));
        break;
      default:
        break;
    }
  }, [category]);

  return (
    <StPortfolioFilter>
      <StInputLabel>직무</StInputLabel>
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
          <SelectCategoryRequest />
        )}
      </StFilterListContainer>
    </StPortfolioFilter>
  );
};

const StPortfolioFilter = styled.div`
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 25px 20px;
  width: 100%;
`;

const StFilterListContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 20px 0;
  flex-wrap: wrap;
`;

const StFilterButton = styled.button<{ isselected: string }>`
  border-radius: 50px;
  padding: 10px 20px;
  outline: ${({ isselected, theme: { color } }) =>
    isselected === 'true' ? `1px solid ${color.neonGreen}` : 'none'};
  font-weight: ${({ isselected }) => (isselected === 'true' ? `900` : '600')};
  background-color: ${({ isselected, theme: { color } }) =>
    isselected === 'true' ? color.neonGreen : 'none'};
`;

export default PortfolioFilter;
