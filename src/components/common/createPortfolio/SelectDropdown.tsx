import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { PersonalInfoStyle } from '@src/style/common/createStepStyles';
import useCloseDropdown from '@src/Hook/useCloseDropdown';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';

interface SelectDropdownProps {
  dropdownOptions: string[];
  selectBarDefaultText: string;
  selectBarDefaultTextMobileSize: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  isPersonalInfo?: boolean;
}

const SelectDropdown = (props: SelectDropdownProps) => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);
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
          <PersonalInfoStyle.Label>{props.label}</PersonalInfoStyle.Label>
          <StSelectValue
            ispersonalinfo={`${props.isPersonalInfo}`}
            isselected={props.selectedOption}
          >
            {props.selectedOption || props.selectBarDefaultText}
          </StSelectValue>
          <StMobileSizeSelectValue
            ispersonalinfo={`${props.isPersonalInfo}`}
            isselected={props.selectedOption}
          >
            {props.selectedOption || props.selectBarDefaultTextMobileSize}
          </StMobileSizeSelectValue>
        </StTextContainer>
        {isDropdownOpen ? <StArrowUpIcon /> : <StArrowDownIcon />}
      </StSelectBar>

      {isDropdownOpen && (
        <StDropdownUnorderedList ref={dropdownRef} isdarkmode={`${isDarkMode}`}>
          {props.dropdownOptions.map((option: string, index: number) => (
            <StDropdownList
              key={index}
              onClick={() => onClickOption(option)}
              isdarkmode={`${isDarkMode}`}
            >
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

  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    padding: 35px 13px;
  }
`;

const StTextContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5px;
`;

const SelectValueStyle = styled.div<{ ispersonalinfo: string; isselected: string }>`
  padding-top: 2px;
  font-weight: ${({ ispersonalinfo, isselected }) =>
    ispersonalinfo === 'true' ? (isselected.length > 1 ? '600' : '400') : '800'};
  color: ${({ isselected }) => !(isselected.length > 1) && '#b5b5b5'};
`;

const StSelectValue = styled(SelectValueStyle)`
  @media screen and (max-width: 575px) {
    transition: 0.5s;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 500px) {
    transition: 0.5s;
    font-size: 0.7rem;
  }

  @media ${({ theme }) => theme.size.mobileColumn} {
    display: none;
  }
`;

const StMobileSizeSelectValue = styled(SelectValueStyle)`
  display: none;

  @media ${({ theme }) => theme.size.mobileColumn} {
    display: block;
  }
`;

const StDropdownUnorderedList = styled.ul<{ isdarkmode: string }>`
  position: absolute;
  width: 100%;
  max-height: 170px;
  overflow-y: auto;
  margin-top: 5px;
  background-color: ${({ theme, isdarkmode }) =>
    isdarkmode === 'true' ? theme.color.darkModeGray : 'white'};
  border: 1px solid gray;
  border-radius: 7px;
  margin-bottom: 20px;
`;

const StDropdownList = styled.li<{ isdarkmode: string }>`
  cursor: pointer;
  padding: 9px 20px;

  &:hover {
    background-color: ${({ theme, isdarkmode }) =>
      isdarkmode === 'true' ? 'black' : theme.color.lightGray};
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

const arrowIconStyle = `
  font-size: 30px;

  @media screen and (max-width: 390px) {
    transition: 0.5s;
    font-size: 1.2rem;
  }
`;

const StArrowDownIcon = styled(IoIosArrowDown)`
  ${arrowIconStyle}
`;

const StArrowUpIcon = styled(IoIosArrowUp)`
  ${arrowIconStyle}
`;

export default SelectDropdown;
