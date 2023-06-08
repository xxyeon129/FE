import { styled } from 'styled-components';
import UserProfile from '@src/components/nav/UserProfile';
import AutoSearch from '../components/AutoSearch';
import Category from '@src/components/nav/Category';
import Auth from '@src/components/nav/Auth';
import LightAndDarkMode from '@src/components/nav/LightAndDarkMode';

interface NavProps {
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({ setIsLoginModalOpen, setIsSignUpModalOpen }: NavProps) => {
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
        <Auth
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsSignUpModalOpen={setIsSignUpModalOpen}
        />
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
  box-shadow: inset -30px 4px 50px rgba(0, 0, 0, 0.06);

  background-color: white;
  font-family: 'Open Sans', sans-serif;
`;

const StAutoSearchContainer = styled.div`
  padding: 33px 0;
`;

const StCategoryContainer = styled.div`
  height: 100%;
`;

const StBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default Nav;
