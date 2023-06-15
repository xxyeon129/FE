import { styled } from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  categoryState,
  filterState,
  selectedCategoryState,
  selectedHeaderState,
} from '@src/states';
import { categoryListForDisplay } from '@src/constants/portfolioFilteringData';
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
          <StLabel
            key={categoryItemIndex}
            isclicked={`${selectedCategory === categoryItem.value}`}
            color={categoryItem.color}
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

const StLabel = styled.div<{ isclicked: string; color: string }>`
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
`;

export default Category;
