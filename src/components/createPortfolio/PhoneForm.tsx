import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { createTelephoneState } from '@src/states';
import { PersonalInfoStyle } from '@src/style/common/createStepStyles';
import { ReactComponent as KOR } from '@src/assets/createPortfolio/create-portfolio-phone-kor.svg';
import { ReactComponent as US } from '@src/assets/createPortfolio/create-portfolio-phone-us.svg';
import { BiCaretDown } from 'react-icons/bi';
import useOnChangeInput from '@src/Hook/useOnChangeInput';
import useCloseDropdown from '@src/Hook/useCloseDropdown';

const PhoneForm = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedCountryOption, setSelectedCountryOption] = useState<string>('KOR');
  const [telephone, setTelephone] = useRecoilState<string>(createTelephoneState);

  const { onChangeInput: onChangeTelephone } = useOnChangeInput({ setRecoilState: setTelephone });
  const { dropdownRef, onClickOutside } = useCloseDropdown({ isDropdownOpen, setIsDropdownOpen });

  const dropdownList = [
    { value: 'KOR', number: '+82' },
    { value: 'US', number: '+1' },
  ];

  const onClickSelectBox = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onClickOption = (option: string) => {
    setSelectedCountryOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isDropdownOpen, dropdownRef.current]);

  return (
    <PersonalInfoStyle.Container>
      <PersonalInfoStyle.Label>전화번호</PersonalInfoStyle.Label>
      <StInputWrapper>
        <StTelephoneSelect onClick={onClickSelectBox}>
          {selectedCountryOption === 'KOR' ? <StKorFlagIcon /> : <StUsFlagIcon />}
          <BiCaretDown />
          {isDropdownOpen && (
            <StDropdownUnorderedList ref={dropdownRef}>
              {dropdownList.map((list, index) => (
                <StDropdownList key={index} onClick={() => onClickOption(list.value)}>
                  <span>{list.value}</span>
                  <span className="number">{list.number}</span>
                </StDropdownList>
              ))}
            </StDropdownUnorderedList>
          )}
        </StTelephoneSelect>
        <PersonalInfoStyle.Input
          type="tel"
          value={telephone}
          onChange={onChangeTelephone}
          placeholder="포트폴리오에 표시될 전화번호를 입력해주세요."
        />
      </StInputWrapper>
    </PersonalInfoStyle.Container>
  );
};

const StInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const StTelephoneSelect = styled.div`
  width: 70px;
  background-color: ${({ theme }) => theme.color.gray};
  padding: 5px;
  border-radius: 5px;
  margin-right: 3px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const StDropdownUnorderedList = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 80px;
  border-radius: 5px;
  margin-top: 3px;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.color.paleGray};
`;

const StDropdownList = styled.li`
  padding: 3px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .number {
    color: gray;
    font-size: 14px;
  }

  &:first-child {
    padding-top: 5px;
  }

  &:last-child {
    padding-bottom: 5px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.lightGray};
  }
`;

const flagIconStyle = `
  display: flex;
  width: 30px;
  height: 20px;
`;

const StKorFlagIcon = styled(KOR)`
  ${flagIconStyle}
`;

const StUsFlagIcon = styled(US)`
  ${flagIconStyle}
`;

export default PhoneForm;
