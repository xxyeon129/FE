import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { StInputLabel } from '@src/style/common/createStepStyles';
import useCloseDropdown from '@src/Hook/useCloseDropdown';

interface SelectDropdownProps {
  dropdownOptions: string[];
  selectBarDefaultText: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  isPersonalInfo?: boolean;
}

const SelectDropdown = (props: SelectDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { dropdownRef, onClickOutside } = useCloseDropdown({ isDropdownOpen, setIsDropdownOpen });

  const onClickSelectBar = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onClickOption = (option: string) => {
    props.setSelectedOption(option);
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
      <StSelectBar
        onClick={onClickSelectBar}
        isclicked={`${isDropdownOpen}`}
        ispersonalinfo={`${props.isPersonalInfo}`}
      >
        <StTextContainer>
          <StInputLabel>{props.label}</StInputLabel>
          <StSelectValue
            ispersonalinfo={`${props.isPersonalInfo}`}
            isselected={props.selectedOption}
          >
            {props.selectedOption || props.selectBarDefaultText}
          </StSelectValue>
        </StTextContainer>
        {isDropdownOpen ? <StArrowUpIcon /> : <StArrowDownIcon />}
      </StSelectBar>

      {isDropdownOpen && (
        <StDropdownUnorderedList ref={dropdownRef}>
          {props.dropdownOptions.map((option: string, index: number) => (
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

const StSelectBar = styled.div<{ isclicked: string; ispersonalinfo: string }>`
  outline: ${({ isclicked }) => (isclicked === 'true' ? '2px solid' : '1px solid')};
  outline-color: ${({ ispersonalinfo }) => (ispersonalinfo === 'true' ? 'gray' : 'black')};
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

const StSelectValue = styled.div<{ ispersonalinfo: string; isselected: string }>`
  padding-top: 2px;
  font-weight: ${({ ispersonalinfo, isselected }) =>
    ispersonalinfo === 'true' ? (isselected.length > 1 ? '600' : '400') : '800'};
  color: ${({ isselected }) => !(isselected.length > 1) && '#b5b5b5'};
`;

const StDropdownUnorderedList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 170px;
  overflow-y: auto;
  margin-top: 5px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 7px;
  margin-bottom: 20px;
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

export default SelectDropdown;
