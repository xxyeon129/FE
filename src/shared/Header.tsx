import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';
import { DesktopAndTablet, MobileRow } from '@src/style/mediaQuery';
import { ReactComponent as Logo } from '@src/assets/logo.svg';
import HeaderListItem from '@src/components/header/HeaderListItem';
import useResetSelectedFilterRecoilValues from '@src/Hook/useResetSelectedFilterRecoilValues';
import AutoSearch from '@src/components/AutoSearch';

interface HeaderProps {
  onClickMobileMenu: () => void;
  setIsInProgressModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ onClickMobileMenu, setIsInProgressModalOpen }: HeaderProps) => {
  const navigate = useNavigate();
  const resetSelectedRecoilValue = useResetSelectedFilterRecoilValues();

  const onClickLogo = () => {
    resetSelectedRecoilValue();
    navigate(PATH_URL.HOME);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StHeader>
      <StLogo onClick={onClickLogo} />
      <DesktopAndTablet>
        <StUnorderedList>
          <HeaderListItem liWidth="130px" setIsInProgressModalOpen={setIsInProgressModalOpen} />
        </StUnorderedList>
      </DesktopAndTablet>
      <MobileRow>
        <>
          <AutoSearch />
          <StMobileMenuContainer>
            <StMobileMenu onClick={onClickMobileMenu}>Menu</StMobileMenu>
          </StMobileMenuContainer>
        </>
      </MobileRow>
    </StHeader>
  );
};

const StHeader = styled.header`
  position: fixed;
  padding: 0 41px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  z-index: 998;
`;

const StLogo = styled(Logo)`
  width: 63px;
  height: 20px;
  cursor: pointer;
`;

const StUnorderedList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;

  gap: 20px;
`;

const StMobileMenuContainer = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

const StMobileMenu = styled.span`
  cursor: pointer;
`;

export default Header;
