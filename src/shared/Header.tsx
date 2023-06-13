import { styled } from 'styled-components';
import { DesktopAndTablet, Mobile } from '@src/style/mediaQuery';
import HeaderListItem from '@src/components/header/HeaderListItem';

interface HeaderProps {
  onClickMobileMenu: () => void;
}

const Header = ({ onClickMobileMenu }: HeaderProps) => {
  return (
    <StHeader>
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
  margin-left: 250px;
  padding-right: 41px;
  width: 100%;
  height: 52px;
  background-color: white;
  font-family: 'Open Sans', sans-serif;
  z-index: 998;
`;

const StUnorderedList = styled.ul`
  margin-right: 250px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  gap: 20px;
`;

const StMobileMenuContainer = styled.span`
  margin-right: 250px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

const StMobileMenu = styled.span`
  cursor: pointer;
`;

export default Header;
