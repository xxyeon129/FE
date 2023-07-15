import { CATEGORY_KEYWORD, filterListObject } from '@src/constants/portfolioFilteringData';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SelectCategoryRequest from './SelectCategoryRequest';
import { PersonalInfoStyle } from '../../style/common/createStepStyles';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';

interface PortfolioFilterProps {
  category: string;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const PortfolioFilter = ({ category, selectedFilter, setSelectedFilter }: PortfolioFilterProps) => {
  const [filterList, setFilterList] = useState<string[]>([]);
  const [isSelectCategory, setIsSelectCategory] = useState<boolean>(false);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);

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
      <PersonalInfoStyle.Label>직무</PersonalInfoStyle.Label>
      <StFilterListContainer isselected={`${isSelectCategory}`}>
        {isSelectCategory ? (
          filterList.map((filter: string, index: number) => (
            <StFilterButton
              key={index}
              type="button"
              onClick={() => onClickFilterItem(filter)}
              isselected={`${selectedFilter === filter}`}
              isdarkmode={`${isDarkMode}`}
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

const StFilterListContainer = styled.div<{ isselected: string }>`
  display: ${({ isselected }) => (isselected === 'true' ? 'grid' : 'flex')};
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  padding: 20px 0;
  flex-wrap: wrap;
`;

const StFilterButton = styled.button<{ isselected: string; isdarkmode: string }>`
  border-radius: 50px;
  padding: 10px 20px;
  outline: ${({ isselected, theme: { color } }) =>
    isselected === 'true' ? `1px solid ${color.neonGreen}` : '1px solid white'};
  font-weight: ${({ isselected }) => (isselected === 'true' ? `900` : '600')};
  background-color: ${({ isselected, theme: { color } }) =>
    isselected === 'true' ? color.neonGreen : 'none'};
  color: ${({ isdarkmode, isselected }) =>
    isdarkmode === 'true' && (isselected === 'true' ? 'black' : 'white')};
`;

export default PortfolioFilter;
