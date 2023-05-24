import { categoryState } from '@src/states';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

const TestNav = () => {
  const setCategory = useSetRecoilState<string>(categoryState);

  const onClickCategory = (categoryItem: string) => {
    setCategory(categoryItem);
  };

  const categoryList = ['All', 'Develop', 'Design', 'Photographer'];
  return (
    <StCategoryContainer>
      {categoryList.map((categoryItem: string, categoryItemIndex: number) => (
        <StCategoryLabel key={categoryItemIndex} onClick={() => onClickCategory(categoryItem)}>
          {categoryItem}
        </StCategoryLabel>
      ))}
    </StCategoryContainer>
  );
};

const StCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  gap: 0.5rem;
`;

const StCategoryLabel = styled.div`
  cursor: pointer;
`;

export default TestNav;
