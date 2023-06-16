import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterState, selectedCategoryState } from '@src/states';
import { CATEGORY_KEYWORD } from '@src/constants/portfolioFilteringData';
import theme from '@src/style/theme';

interface FilterPropsType {
  filterList: string[];
  onClickFilterButton: (filterKeyword: string) => Promise<void>;
}

const Filter = ({ filterList, onClickFilterButton }: FilterPropsType) => {
  const [filter, setFilter] = useRecoilState<string>(filterState);
  const [backgroundColor, setBackgroundColor] = useState('');
  const selectedCategory = useRecoilValue(selectedCategoryState);

  const onClickFilter = (filterKeyword: string) => {
    setFilter(filterKeyword);
    onClickFilterButton(filterKeyword);
  };

  useEffect(() => {
    switch (selectedCategory) {
      case CATEGORY_KEYWORD.DEVELOP:
        setBackgroundColor(theme.color.neonGreen);
        break;
      case CATEGORY_KEYWORD.DESIGN:
        setBackgroundColor(theme.color.blueGreen);
        break;
      case CATEGORY_KEYWORD.PHOTOGRAPHER:
        setBackgroundColor(theme.color.skyBlue);
        break;
      default:
        break;
    }
  }, [selectedCategory]);

  return (
    <StFilterListContainer>
      {filterList.map((filterKeyword, filterItemIndex) => (
        <StFilterButton
          key={filterItemIndex}
          onClick={() => onClickFilter(filterKeyword)}
          isselected={`${filterKeyword === filter}`}
          color={backgroundColor}
        >
          {filterKeyword}
        </StFilterButton>
      ))}
    </StFilterListContainer>
  );
};

const StFilterListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-auto-rows: min-content;
  row-gap: 10px;
  column-gap: 10px;

  padding: 50px 0;

  @media screen and (min-width: 1580px) {
    display: flex;
    justify-content: space-between;
  }

  @media ${({ theme }) => theme.size.mobileRow} {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

const StFilterButton = styled.button<{ isselected: string; color: string }>`
  font-size: 16px;
  width: 140px;
  height: 37px;
  border-radius: 50px;
  background-color: ${({ theme, isselected, color }) =>
    isselected === 'true' ? color : theme.color.lightGray};
  font-weight: ${({ isselected }) => isselected === 'true' && '800'};

  @media ${({ theme }) => theme.size.mobileRow} {
    font-size: 13px;
    width: 100px;
  }
`;

export default Filter;
