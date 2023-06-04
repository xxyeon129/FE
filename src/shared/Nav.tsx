import { styled } from 'styled-components';
import UserProfile from '@src/components/nav/UserProfile';
import AutoSearch from '../components/AutoSearch';
import Category from '@src/components/nav/Category';
import Logout from '@src/components/nav/Logout';
import LightAndDarkMode from '@src/components/nav/LightAndDarkMode';

const Nav = () => {
  return (
    <StNav>
      <UserProfile />

      <StAutoSearchContainer>
        <AutoSearch />
      </StAutoSearchContainer>

      <StCategoryContainer>
        <Category />
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
  padding: 30px 25px;

  background-color: white;
`;

const StAutoSearchContainer = styled.div`
  padding: 33px 0;

  /* background-color: lightsalmon; */
`;

const StCategoryContainer = styled.div`
  /* background-color: lightgoldenrodyellow; */
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
