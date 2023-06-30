import { useRef } from 'react';

interface useCloseDropdownProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useCloseDropdown = ({ isDropdownOpen, setIsDropdownOpen }: useCloseDropdownProps) => {
  const dropdownRef = useRef<HTMLUListElement>(null);

  const onClickOutside = (e: MouseEvent) => {
    if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  return { dropdownRef, onClickOutside };
};

export default useCloseDropdown;
