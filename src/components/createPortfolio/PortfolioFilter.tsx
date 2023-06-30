import { CATEGORY_KEYWORD, filterListObject } from '@src/constants/portfolioFilteringData';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SelectCategoryRequest from './SelectCategoryRequest';
import { StInputLabel } from '../../style/common/createStepStyles';
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
      <StInputLabel>직무</StInputLabel>
      <StFilterListContainer>
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
          <StSelectCategoryRequestWrapper>
            <SelectCategoryRequest />
          </StSelectCategoryRequestWrapper>
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

  @media ${({ theme }) => theme.size.smallMobile} {
    margin-bottom: 20px;
  }
`;

const StFilterListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  grid-auto-rows: min-content;
  row-gap: 10px;
  column-gap: 10px;
  width: 100%;
  margin-top: 10px;
`;

const StSelectCategoryRequestWrapper = styled.div`
  width: 100%;
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
