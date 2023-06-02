import { categoryState, filterState } from '@src/states';
import { categoryList } from '@src/constants/portfolioFilteringData';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import AutoSearch from '../AutoSearch';
const TestNav = () => {
  const setCategory = useSetRecoilState<string>(categoryState);
  const setFilter = useSetRecoilState<string>(filterState);

  const onClickCategory = (categoryItem: string) => {
    setCategory(categoryItem);
    setFilter('All');
  };

  return (
    <StCategoryContainer>
      {categoryList.map((categoryItem: string, categoryItemIndex: number) => (
        <StCategoryLabel key={categoryItemIndex} onClick={() => onClickCategory(categoryItem)}>
          {categoryItem}
        </StCategoryLabel>
      ))}
      <AutoSearch />
    </StCategoryContainer>
  );
};

const StCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  gap: 0.5rem;

  width: 260px;
  height: 100vh;
  padding: 25px;
`;

const StCategoryLabel = styled.div`
  cursor: pointer;
`;

export default TestNav;
