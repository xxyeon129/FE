import { ChangeEvent, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createTelephoneState } from '@src/states';
import { PersonalInfoStyle } from '@src/style/common/createStepStyles';
import { ReactComponent as KOR } from '@src/assets/createPortfolio/create-portfolio-phone-kor.svg';
import { ReactComponent as US } from '@src/assets/createPortfolio/create-portfolio-phone-us.svg';
import { BiCaretDown } from 'react-icons/bi';
import useCloseDropdown from '@src/Hook/useCloseDropdown';
import { TELEPHONE_REGEX } from '../common/createPortfolio/validator';
import { isDarkModeState } from '@src/states/darkModeState';

const PhoneForm = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedCountryOption, setSelectedCountryOption] = useState<string>('KOR');
  const [telephone, setTelephone] = useRecoilState<string>(createTelephoneState);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);

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

  const onChangeKorHypenTelephone = (e: ChangeEvent<HTMLInputElement>) => {
    let hypenValue = e.target.value.replace(TELEPHONE_REGEX.ONLY_NUMBER, '');
    if (e.target.value.length < 11) {
      hypenValue = hypenValue.replace(TELEPHONE_REGEX.KOR_FIRST_TWO_NUMBER, `$1-$2-$3`);
    } else {
      hypenValue = hypenValue.replace(TELEPHONE_REGEX.KOR_FIRST_THREE_NUMBER, `$1-$2-$3`);
    }

    setTelephone(hypenValue);
  };

  const onChangeUsHypenTelephone = (e: ChangeEvent<HTMLInputElement>) => {
    let hypenValue = e.target.value
      .replace(TELEPHONE_REGEX.ONLY_NUMBER, '')
      .replace(TELEPHONE_REGEX.US_NUMBER, `$1-$2-$3`);

    setTelephone(hypenValue);
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
        <StTelephoneSelect onClick={onClickSelectBox} isdarkmode={`${isDarkMode}`}>
          {selectedCountryOption === 'KOR' ? <StKorFlagIcon /> : <StUsFlagIcon />}
          <BiCaretDown />
          {isDropdownOpen && (
            <StDropdownUnorderedList ref={dropdownRef} isdarkmode={`${isDarkMode}`}>
              {dropdownList.map((list, index) => (
                <StDropdownList
                  key={index}
                  onClick={() => onClickOption(list.value)}
                  isdarkmode={`${isDarkMode}`}
                >
                  <span>{list.value}</span>
                  <span className="number">{list.number}</span>
                </StDropdownList>
              ))}
            </StDropdownUnorderedList>
          )}
        </StTelephoneSelect>
        {selectedCountryOption === 'KOR' ? (
          <>
            <StLargeSizePhoneInput
              type="tel"
              value={telephone}
              onChange={onChangeKorHypenTelephone}
              maxLength={13}
              placeholder="포트폴리오에 표시될 전화번호를 입력해주세요."
            />
            <StSmallSizePhoneInput
              type="tel"
              value={telephone}
              onChange={onChangeKorHypenTelephone}
              maxLength={13}
              placeholder="전화번호 입력"
            />
          </>
        ) : (
          <>
            <StLargeSizePhoneInput
              type="tel"
              value={telephone}
              maxLength={10}
              onChange={onChangeUsHypenTelephone}
              placeholder="포트폴리오에 표시될 전화번호를 입력해주세요."
            />
            <StSmallSizePhoneInput
              type="tel"
              value={telephone}
              maxLength={10}
              onChange={onChangeUsHypenTelephone}
              placeholder="전화번호 입력"
            />
          </>
        )}
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

const phoneInputStyle = `
  width: 100%;
  border: none;

  &::placeholder {
    color: #b5b5b5;
  }  
`;

const StLargeSizePhoneInput = styled.input`
  ${phoneInputStyle}
  font-size: 15px;

  @media screen and (max-width: 545px) {
    transition: 0.5s;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const StSmallSizePhoneInput = styled.input`
  ${phoneInputStyle}
  display: none;
  font-size: 13px;
  @media screen and (max-width: 500px) {
    display: block;
  }
`;

const StTelephoneSelect = styled.div<{ isdarkmode: string }>`
  width: 70px;
  background-color: ${({ theme, isdarkmode }) =>
    isdarkmode === 'true' ? theme.color.fontColor : theme.color.gray};
  padding: 5px;
  border-radius: 5px;
  margin-right: 3px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const StDropdownUnorderedList = styled.ul<{ isdarkmode: string }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100px;
  border-radius: 5px;
  margin-top: 3px;
  top: 100%;
  left: 0;
  background-color: ${({ theme, isdarkmode }) =>
    isdarkmode === 'true' ? theme.color.darkModeGray : 'white'};
  border: 1px solid ${({ theme }) => theme.color.paleGray};
`;

const StDropdownList = styled.li<{ isdarkmode: string }>`
  padding: 10px 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .number {
    color: gray;
    font-size: 14px;
  }

  &:first-child {
    padding-top: 15px;
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    padding-bottom: 15px;
    border-radius: 0 0 5px 5px;
  }

  &:hover {
    background-color: ${({ theme, isdarkmode }) =>
      isdarkmode === 'true' ? 'black' : theme.color.lightGray};
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
