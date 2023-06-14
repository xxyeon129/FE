import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';
import { DesktopAndTablet, Mobile } from '@src/style/mediaQuery';
import { ReactComponent as Logo } from '@src/assets/logo.svg';
import HeaderListItem from '@src/components/header/HeaderListItem';

interface HeaderProps {
  onClickMobileMenu: () => void;
}

const Header = ({ onClickMobileMenu }: HeaderProps) => {
  return (
    <StHeader>
      <Link to={PATH_URL.HOME}>
        <StLogo />
      </Link>
      <DesktopAndTablet>
        <StUnorderedList>
          <HeaderListItem liWidth="130px" />
        </StUnorderedList>
      </DesktopAndTablet>

      <Mobile>
        <StMobileMenuContainer>
          <StMobileMenu onClick={onClickMobileMenu}>Menu</StMobileMenu>
        </StMobileMenuContainer>
      </Mobile>
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
