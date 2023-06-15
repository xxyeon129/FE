import { styled } from 'styled-components';
import AutoSearch from '../AutoSearch';
import Auth from './Auth';
import Category from './Category';
import UserProfile from './UserProfile';
import { NavProps } from '@src/shared/Nav';

const NavContent = ({ setIsLoginModalOpen }: NavProps) => {
  return (
    <>
      <UserProfile />
      <StAutoSearchContainer>
        <AutoSearch />
      </StAutoSearchContainer>
      <StCategoryContainer>
        <Category />
      </StCategoryContainer>
      <StBottomContainer>
        <Auth setIsLoginModalOpen={setIsLoginModalOpen} />
        {/* TODO: 다크모드 2차 scope */}
        {/* <LightAndDarkMode /> */}
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
