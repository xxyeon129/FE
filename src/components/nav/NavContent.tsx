import { styled } from 'styled-components';
import AutoSearch from '../AutoSearch';
import Auth from './Auth';
import Category from './Category';
import UserProfile from './UserProfile';
import { NavProps } from '@src/shared/Nav';
import { DesktopAndTablet } from '@src/style/mediaQuery';
import LightAndDarkMode from './LightAndDarkMode';
const NavContent = ({ setIsLoginModalOpen, setIsLogoutModalOpen }: NavProps) => {
  return (
    <>
      <UserProfile setIsLoginModalOpen={setIsLoginModalOpen} />
      <StAutoSearchContainer>
        <DesktopAndTablet>
          <AutoSearch />
        </DesktopAndTablet>
      </StAutoSearchContainer>
      <StCategoryContainer>
        <Category />
      </StCategoryContainer>
      <StBottomContainer>
        <Auth
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsLogoutModalOpen={setIsLogoutModalOpen}
        />
        {/* TODO: 다크모드 2차 scope */}
        <LightAndDarkMode />
      </StBottomContainer>
    </>
  );
};

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

export default NavContent;
