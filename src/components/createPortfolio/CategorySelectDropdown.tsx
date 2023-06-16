import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { StInputLabel } from '../../style/common/createStepStyles';
import useCloseDropdown from '@src/Hook/useCloseDropdown';

interface CategorySelectDropdownProps {
  dropdownOptions: string[];
  selectBarDefaultText: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const CategorySelectDropdown = ({
  dropdownOptions,
  selectBarDefaultText,
  selectedOption,
  setSelectedOption,
}: CategorySelectDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { dropdownRef, onClickOutside } = useCloseDropdown({ isDropdownOpen, setIsDropdownOpen });

  const onClickSelectBar = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onClickOption = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isDropdownOpen, dropdownRef.current]);

  return (
    <StDropdownContainer>
      <StSelectBar onClick={onClickSelectBar} isclicked={`${isDropdownOpen}`}>
        <StTextContainer>
          <StInputLabel>직군</StInputLabel>
          <StSelectValue>{selectedOption || selectBarDefaultText}</StSelectValue>
        </StTextContainer>
        {isDropdownOpen ? <StArrowUpIcon /> : <StArrowDownIcon />}
      </StSelectBar>

      {isDropdownOpen && (
        <StDropdownUnorderedList ref={dropdownRef}>
          {dropdownOptions.map((option: string, index: number) => (
            <StDropdownList key={index} onClick={() => onClickOption(option)}>
              {option}
            </StDropdownList>
          ))}
        </StDropdownUnorderedList>
      )}
    </StDropdownContainer>
  );
};

const StDropdownContainer = styled.div`
  width: 100%;
  position: relative;
`;

const StSelectBar = styled.div<{ isclicked: string }>`
  outline: ${({ isclicked }) => (isclicked === 'true' ? '2px solid' : '1px solid')};
  border-radius: 7px;
  width: 100%;
  height: 50px;
  display: flex;
  padding: 35px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  cursor: pointer;
`;

const StTextContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5px;
`;

const StSelectValue = styled.div`
  padding-top: 2px;
  font-weight: 800;
`;

const StDropdownUnorderedList = styled.ul`
  position: absolute;
  width: 100%;
  margin-top: 5px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 7px;
`;

const StDropdownList = styled.li`
  cursor: pointer;
  padding: 9px 20px;

  &:hover {
    background-color: ${({ theme }) => theme.color.lightGray};
  }

  &:first-child {
    padding-top: 17px;
    border-radius: 7px 7px 0 0;
  }

  &:last-child {
    border-radius: 0 0 7px 7px;
    padding-bottom: 17px;
  }
`;

const StArrowDownIcon = styled(IoIosArrowDown)`
  font-size: 30px;
`;

const StArrowUpIcon = styled(IoIosArrowUp)`
  font-size: 30px;
`;

export default CategorySelectDropdown;
