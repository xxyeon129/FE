import { useState } from 'react';
import { styled } from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

interface SelectDropdownProps {
  dropdownOptions: string[];
  selectBarDefaultText: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const SelectDropdown = ({
  dropdownOptions,
  selectBarDefaultText,
  selectedOption,
  setSelectedOption,
}: SelectDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const onClickSelectBar = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onClickOption = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <StDropdownContainer>
      <StSelectBar onClick={onClickSelectBar} isclicked={`${isDropdownOpen}`}>
        <StTextContainer>
          <StLabel>직군</StLabel>
          <StSelectValue>{selectedOption || selectBarDefaultText}</StSelectValue>
        </StTextContainer>
        {isDropdownOpen ? <StArrowUpIcon /> : <StArrowDownIcon />}
      </StSelectBar>

      {isDropdownOpen && (
        <StDropdownListContainer>
          <StDropdownUnorderedList>
            {dropdownOptions.map((option: string, index: number) => (
              <StDropdownList key={index} onClick={() => onClickOption(option)}>
                {option}
              </StDropdownList>
            ))}
          </StDropdownUnorderedList>
        </StDropdownListContainer>
      )}
    </StDropdownContainer>
  );
};

const StDropdownContainer = styled.div``;

const StSelectBar = styled.div<{ isclicked: string }>`
  outline: ${({ isclicked }) => (isclicked === 'true' ? '2px solid' : '1px solid gray')};
  border-radius: 10px;
  width: 600px;
  height: 50px;
  display: flex;
  padding: 30px 20px;
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

const StLabel = styled.div`
  color: gray;
  font-size: 13px;
`;

const StSelectValue = styled.div``;

const StDropdownListContainer = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  width: 600px;
  margin-top: 5px;
  background-color: white;

  position: absolute;
`;

const StDropdownUnorderedList = styled.ul``;

const StDropdownList = styled.li`
  cursor: pointer;
  padding: 9px 20px;

  &:hover {
    background-color: lightgray;
  }

  &:first-child {
    padding-top: 15px;
    border-radius: 10px 10px 0 0;
  }

  &:last-child {
    border-radius: 0 0 10px 10px;
    padding-bottom: 15px;
  }
`;

const StArrowDownIcon = styled(IoIosArrowDown)`
  font-size: 30px;
`;

const StArrowUpIcon = styled(IoIosArrowUp)`
  font-size: 30px;
`;

export default SelectDropdown;
