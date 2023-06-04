import { categoryState, filterState } from '@src/states';
import { categoryList } from '@src/constants/portfolioFilteringData';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import AutoSearch from '../components/AutoSearch';
import UserProfile from '@src/components/nav/UserProfile';
import Logout from '@src/components/nav/Logout';
import LightAndDarkMode from '@src/components/nav/LightAndDarkMode';
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

      <StAutoSearchContainer>
        <AutoSearch />
      </StAutoSearchContainer>

      <StCategoryContainer>
        {categoryList.map((categoryItem: string, categoryItemIndex: number) => (
          <StCategoryLabel key={categoryItemIndex} onClick={() => onClickCategory(categoryItem)}>
            {categoryItem}
          </StCategoryLabel>
        ))}
      </StCategoryContainer>

      <StBottomContainer>
        <Logout />
        <LightAndDarkMode />
      </StBottomContainer>
    </StNav>
  );
};

const StNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid ${({ theme }) => theme.color.lightGray};

  position: fixed;
  height: 100vh;
  width: 250px;
  padding: 42px 25px;

  /* background-color: lightcoral; */
`;

const StAutoSearchContainer = styled.div`
  padding: 33px 0;

  /* background-color: lightsalmon; */
`;

const StCategoryContainer = styled.div`
  background-color: lightgoldenrodyellow;
  height: 100%;
`;

const StCategoryLabel = styled.div`
  cursor: pointer;
`;

const StBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default Nav;
