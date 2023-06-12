import { styled } from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  categoryState,
  filterState,
  selectedCategoryState,
  selectedHeaderState,
} from '@src/states';
import { categoryListWithIcon } from '@src/constants/portfolioFilteringData';
import { PATH_URL } from '@src/constants/constants';
import { ReactComponent as HomeIcon } from '@src/assets/nav/nav-home-icon.svg';

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

  const onClickHome = () => {
    setCategory('All');
    setFilter('All');
    setSelectedCategory('Home');
    setSelectedHeader(false);
    navigate(PATH_URL.MAIN);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StCategory>
      <StHome onClick={onClickHome}>
        <HomeIcon />
        <StLabel bold={`${selectedCategory === 'Home'}`}>Home</StLabel>
      </StHome>
      {categoryListWithIcon.map((categoryItem, categoryItemIndex: number) => (
        <StCategoryItem key={categoryItemIndex} onClick={() => onClickCategory(categoryItem.value)}>
          <categoryItem.icon />
          <StLabel key={categoryItemIndex} bold={`${selectedCategory === categoryItem.value}`}>
            {categoryItem.value}
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

const alignText = `
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StHome = styled.div`
  ${alignText}
  margin-top: 10px;
`;

const StCategoryItem = styled.div`
  ${alignText}
`;

const StLabel = styled.div<{ bold: string }>`
  margin-left: 10px;
  font-weight: ${({ bold }) => (bold === 'true' ? 'bold' : 'normal')};
`;

export default Category;
