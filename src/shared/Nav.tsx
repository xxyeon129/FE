import { styled } from 'styled-components';
import { DesktopAndTablet, MobileRow } from '@src/style/mediaQuery';
import NavContent from '@src/components/nav/NavContent';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';

export interface NavProps {
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({ setIsLoginModalOpen, setIsLogoutModalOpen }: NavProps) => {
  const isDarkMode = useRecoilValue(isDarkModeState);

  return (
    <>
      <DesktopAndTablet>
        <StNav darkmode={`${isDarkMode}`}>
          <NavContent
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsLogoutModalOpen={setIsLogoutModalOpen}
          />
        </StNav>
      </DesktopAndTablet>
      <MobileRow>
        <StMobileNav darkmode={`${isDarkMode}`}>
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
  z-index: 1000;
`;

const StNav = styled.div<{ darkmode: string }>`
  ${commonNavStyle}
  padding: 45px 41px;
  width: 270px;
  background-color: ${({ darkmode }) => (darkmode === 'true' ? 'black' : 'white')};
  color: ${({ darkmode }) => (darkmode === 'true' ? 'white' : 'black')};
`;

const StMobileNav = styled.div<{ darkmode: string }>`
  ${commonNavStyle}
  padding: 45px 0;
  width: 85px;
  align-items: center;
  border-bottom-right-radius: 20px;
  background-color: ${({ darkmode }) => (darkmode === 'true' ? 'black' : 'white')};
  color: ${({ darkmode }) => (darkmode === 'true' ? 'white' : 'black')};
`;

export default Nav;
