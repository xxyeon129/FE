import { categoryState, filterState } from '@src/states';
import { categoryList } from '@src/constants/portfolioFilteringData';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import AutoSearch from '../components/AutoSearch';
import UserProfile from '@src/components/nav/UserProfile';
const Nav = () => {
  const setCategory = useSetRecoilState<string>(categoryState);
  const setFilter = useSetRecoilState<string>(filterState);

  const onClickCategory = (categoryItem: string) => {
    setCategory(categoryItem);
    setFilter('All');
  };

  return (
    <StNav>
      <UserProfile />

      <AutoSearch />

      <StCategoryContainer>
        {categoryList.map((categoryItem: string, categoryItemIndex: number) => (
          <StCategoryLabel key={categoryItemIndex} onClick={() => onClickCategory(categoryItem)}>
            {categoryItem}
          </StCategoryLabel>
        ))}
      </StCategoryContainer>
    </StNav>
  );
};

const StNav = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.color.lightGray};

  width: 260px;
  padding: 25px;
  /* 
  background-color: lightcoral; */
`;

const StCategoryContainer = styled.div`
  background-color: lightgoldenrodyellow;
`;

const StCategoryLabel = styled.div`
  cursor: pointer;
`;

export default Nav;
