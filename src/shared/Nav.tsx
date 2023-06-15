import { styled } from 'styled-components';
import UserProfile from '@src/components/nav/UserProfile';
import AutoSearch from '../components/AutoSearch';
import Category from '@src/components/nav/Category';
import Auth from '@src/components/nav/Auth';
import LightAndDarkMode from '@src/components/nav/LightAndDarkMode';
import { Desktop, DesktopAndTablet, MobileRow, TabletAndMobile } from '@src/style/mediaQuery';

interface NavProps {
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({ setIsLoginModalOpen, setIsSignUpModalOpen }: NavProps) => {
  return (
    <>
      <DesktopAndTablet>
        <StNav>
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
        </StNav>
      </DesktopAndTablet>
      <MobileRow>
        <StMobileNav></StMobileNav>
      </MobileRow>
    </>
  );
};

const commonNavStyle = `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 3px -3px 8px rgba(0, 0, 0, 0.13);
  border-top-right-radius: 20px;
  position: fixed;
  top: 70px;
  height: calc(100vh - 70px);
  background-color: white;
  z-index: 1000;
`;

const StNav = styled.div`
  ${commonNavStyle}
  width: 270px;
  padding: 45px 41px;
`;

const StMobileNav = styled.div`
  ${commonNavStyle}
  width: 85px;
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
