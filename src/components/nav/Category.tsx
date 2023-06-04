import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { categoryState, filterState } from '@src/states';
import { categoryListWithIcon } from '@src/constants/portfolioFilteringData';
import { PATH_URL } from '@src/constants/constants';
import { ReactComponent as HomeIcon } from '@src/assets/nav/nav-home-icon.svg';

const Category = () => {
  const setCategory = useSetRecoilState<string>(categoryState);
  const setFilter = useSetRecoilState<string>(filterState);

  const navigate = useNavigate();

  const onClickCategory = (categoryItem: string) => {
    setCategory(categoryItem);
    setFilter('All');
    navigate(PATH_URL.MAIN);
  };

  const onClickHome = () => {
    setCategory('All');
    setFilter('All');
    navigate(PATH_URL.MAIN);
  };

  return (
    <StCategory>
      <StHome onClick={onClickHome}>
        <HomeIcon />
        <StLabel>Home</StLabel>
      </StHome>
      {categoryListWithIcon.map((categoryItem, categoryItemIndex: number) => (
        <StCategoryItem key={categoryItemIndex} onClick={() => onClickCategory(categoryItem.value)}>
          <categoryItem.icon />
          <StLabel key={categoryItemIndex}>{categoryItem.value}</StLabel>
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

const StLabel = styled.div`
  margin-left: 10px;
`;

export default Category;
