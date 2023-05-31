import { useState } from 'react';
import { styled } from 'styled-components';

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
      <StSelectBar onClick={onClickSelectBar}>{selectedOption || selectBarDefaultText}</StSelectBar>

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

const StSelectBar = styled.div`
  border: 1px solid;
  cursor: pointer;
`;

const StDropdownListContainer = styled.div`
  border: 1px solid gray;
`;

const StDropdownUnorderedList = styled.ul``;

const StDropdownList = styled.li`
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

export default SelectDropdown;
