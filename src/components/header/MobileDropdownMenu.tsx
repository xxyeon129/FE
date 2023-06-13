import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import HeaderListItem from './HeaderListItem';

interface MobileDropdownMenuProps {
  isMobileDropdownOpen: boolean;
  setIsMobileDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileDropdownMenu = ({
  isMobileDropdownOpen,
  setIsMobileDropdownOpen,
}: MobileDropdownMenuProps) => {
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        isMobileDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsMobileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isMobileDropdownOpen, dropdownRef.current]);

  return (
    <StDropdownMenu>
      <StUnorderedList ref={dropdownRef}>
        <HeaderListItem liWidth="100%" setIsMobileDropdownOpen={setIsMobileDropdownOpen} />
      </StUnorderedList>
    </StDropdownMenu>
  );
};

const StDropdownMenu = styled.div`
  position: fixed;
  right: 10px;
  top: 45px;
  width: 200px;
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 998;
`;

const StUnorderedList = styled.ul`
  padding: 15px 0;
`;

export default MobileDropdownMenu;
