import { useEffect, useRef } from 'react';
import { css, styled } from 'styled-components';
import HeaderListItem from './HeaderListItem';
import useCloseDropdown from '@src/Hook/useCloseDropdown';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';

interface MobileDropdownMenuProps {
  isMobileDropdownOpen: boolean;
  setIsMobileDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInProgressModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileDropdownMenu = ({
  isMobileDropdownOpen,
  setIsMobileDropdownOpen,
  setIsInProgressModalOpen,
}: MobileDropdownMenuProps) => {
  const { dropdownRef, onClickOutside } = useCloseDropdown({
    isDropdownOpen: isMobileDropdownOpen,
    setIsDropdownOpen: setIsMobileDropdownOpen,
  });
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isMobileDropdownOpen, dropdownRef.current]);

  return (
    <StDropdownMenu isdarkmode={`${isDarkMode}`}>
      <StUnorderedList ref={dropdownRef}>
        <HeaderListItem
          liWidth="100%"
          setIsMobileDropdownOpen={setIsMobileDropdownOpen}
          setIsInProgressModalOpen={setIsInProgressModalOpen}
        />
      </StUnorderedList>
    </StDropdownMenu>
  );
};

const StDropdownMenu = styled.div<{ isdarkmode: string }>`
  position: fixed;
  right: 10px;
  top: 45px;
  width: 200px;
  background-color: ${({ isdarkmode }) => (isdarkmode === 'true' ? 'black' : 'white')};
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 998;

  ${({ isdarkmode }) =>
    isdarkmode === 'true' &&
    css`
      border: 1px solid white;
    `}
`;

const StUnorderedList = styled.ul`
  padding: 15px 0;
`;

export default MobileDropdownMenu;
