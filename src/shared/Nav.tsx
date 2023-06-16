import { styled } from 'styled-components';
import { DesktopAndTablet, MobileRow } from '@src/style/mediaQuery';
import NavContent from '@src/components/nav/NavContent';

export interface NavProps {
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({ setIsLoginModalOpen, setIsLogoutModalOpen }: NavProps) => {
  return (
    <>
      <DesktopAndTablet>
        <StNav>
          <NavContent
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsLogoutModalOpen={setIsLogoutModalOpen}
          />
        </StNav>
      </DesktopAndTablet>
      <MobileRow>
        <StMobileNav>
          <NavContent
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsLogoutModalOpen={setIsLogoutModalOpen}
          />
        </StMobileNav>
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
  padding: 45px 41px;
  width: 270px;
`;

const StMobileNav = styled.div`
  ${commonNavStyle}
  padding: 45px 0;
  width: 85px;
  align-items: center;
  border-bottom-right-radius: 20px;
`;

export default Nav;
