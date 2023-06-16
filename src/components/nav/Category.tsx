import { css, styled } from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  categoryState,
  filterState,
  selectedCategoryState,
  selectedHeaderState,
} from '@src/states';
import {
  CATEGORY_KEYWORD_DISPLAY,
  categoryListForDisplay,
} from '@src/constants/portfolioFilteringData';
import { PATH_URL } from '@src/constants/constants';

const Category = () => {
  const setCategory = useSetRecoilState<string>(categoryState);
  const setFilter = useSetRecoilState<string>(filterState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const setSelectedHeader = useSetRecoilState(selectedHeaderState);

  const navigate = useNavigate();

  const onClickCategory = (categoryItem: string) => {
    setCategory(categoryItem);
    setFilter('All');
    setSelectedCategory(categoryItem);
    setSelectedHeader(false);
    navigate(PATH_URL.MAIN);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StCategory>
      {categoryListForDisplay.map((categoryItem, categoryItemIndex: number) => (
        <StCategoryItem key={categoryItemIndex} onClick={() => onClickCategory(categoryItem.value)}>
          {categoryItem.icon && <categoryItem.icon />}
          <StLabel
            key={categoryItemIndex}
            isclicked={`${selectedCategory === categoryItem.value}`}
            color={categoryItem.color}
            value={categoryItem.display}
          >
            {categoryItem.display}
          </StLabel>
        </StCategoryItem>
      ))}
    </StCategory>
  );
};

const StCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StCategoryItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StLabel = styled.div<{ isclicked: string; color: string; value: string }>`
  margin-left: 10px;
  font-weight: ${({ isclicked }) => (isclicked === 'true' ? '900' : 'normal')};
  display: flex;
  align-items: center;

  &::after {
    content: '';
    display: ${({ isclicked }) => (isclicked === 'true' ? 'block' : 'none')};
    background-color: ${({ color }) => color};
    width: 8px;
    height: 8px;
    border-radius: 50px;
    margin-top: 2px;
    margin-left: 5px;
  }

  ${({ value }) =>
    value === CATEGORY_KEYWORD_DISPLAY.ALL &&
    css`
      margin: 0;
    `}

  @media ${({ theme }) => theme.size.mobileRow} {
    width: 15px;

    ${({ value }) =>
      value !== CATEGORY_KEYWORD_DISPLAY.ALL &&
      css`
        display: none;
      `}
  }
`;

export default Category;
