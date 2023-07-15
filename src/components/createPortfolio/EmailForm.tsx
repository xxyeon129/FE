import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { createEmailDomainState, createEmailIdState, createEmailState } from '@src/states';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import ErrorMessage from '../common/createPortfolio/ErrorMessage';
import useOnChangeInput from '@src/Hook/useOnChangeInput';
import useCloseDropdown from '@src/Hook/useCloseDropdown';
import useDecodeJWT from '@src/Hook/useDecodeJWT';
import { StInputLabel } from '@src/style/common/createStepStyles';
import { EMAIL_REGEX } from '../common/createPortfolio/validator';
import { isDarkModeState } from '@src/states/darkModeState';

interface EmailFormProps {
  isInvalidEmail: boolean;
  errorMessage: string | boolean;
}

const EmailForm = ({ isInvalidEmail, errorMessage }: EmailFormProps) => {
  const setEmail = useSetRecoilState<string>(createEmailState);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);
  const [emailIdValue, setEmailIdValue] = useRecoilState<string>(createEmailIdState);
  const [emailDomainValue, setEmailDomainValue] = useRecoilState<string>(createEmailDomainState);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSelectWriteDomain, setIsSelectWriteDomain] = useState<boolean>(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  const { dropdownRef, onClickOutside } = useCloseDropdown({ isDropdownOpen, setIsDropdownOpen });

  const onChangeEmailIdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(EMAIL_REGEX.ID, '');
    setEmailIdValue(inputValue);
    setIsCheckboxChecked(false);
  };

  const { onChangeInput: onChangeEmailDomainValue } = useOnChangeInput({
    setRecoilState: setEmailDomainValue,
  });

  const onClickSelectBar = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onClickInput = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const setJoinedEmail = () => {
    const joinedEmail = useDecodeJWT().sub;
    const joinedEmailArray = joinedEmail.split('@');
    setEmailIdValue(joinedEmailArray[0]);
    setEmailDomainValue(joinedEmailArray[1]);
  };

  const onChangeJoinedEmailCheckbox = () => {
    if (isCheckboxChecked) {
      setIsCheckboxChecked(false);
      setEmailIdValue('');
      setEmailDomainValue('');
    } else {
      setIsCheckboxChecked(true);
      setJoinedEmail();
    }
  };

  const onClickDomainOption = (domain: string) => {
    if (domain === '직접 입력') {
      setIsCheckboxChecked(false);
      setEmailDomainValue('');
      setIsSelectWriteDomain(true);
      return;
    }
    setIsCheckboxChecked(false);
    setIsSelectWriteDomain(false);
    setEmailDomainValue(domain);
  };

  const emailDomainList = ['gmail.com', 'naver.com', 'nate.com', '직접 입력'];

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isDropdownOpen, dropdownRef.current]);

  useEffect(() => {
    setEmail(`${emailIdValue}@${emailDomainValue}`);
  }, [emailIdValue, emailDomainValue]);

  return (
    <StEmailContainer>
      <StOutLineDiv>
        <StLabelContainer>
          <StInputLabel htmlFor="email">email</StInputLabel>
          <StJoinedEmailCheckWrapper>
            <StCheckJoinedEmail
              type="checkbox"
              id="check"
              checked={isCheckboxChecked}
              onChange={onChangeJoinedEmailCheckbox}
            />
            <StJoinedEmailLabel htmlFor="check">가입한 email로 입력</StJoinedEmailLabel>
          </StJoinedEmailCheckWrapper>
        </StLabelContainer>
        <StEmailInputWrapper>
          <StLargeSizeEmailIDInput
            id="email"
            value={emailIdValue}
            onChange={onChangeEmailIdValue}
            placeholder="포트폴리오에 표시될 email ID를 입력해주세요."
          />
          <StSmallSizeEmailIDInput
            id="email"
            value={emailIdValue}
            onChange={onChangeEmailIdValue}
            placeholder="email ID"
          />
          <StAtMark>@</StAtMark>
          <StDomainSelectBar onClick={onClickSelectBar}>
            {isSelectWriteDomain ? (
              <StDomainWriteInput
                value={emailDomainValue}
                onChange={onChangeEmailDomainValue}
                placeholder="email 주소를 입력해주세요."
                onClick={onClickInput}
              />
            ) : (
              <StEmailDomain isselected={emailDomainValue}>
                {emailDomainValue || (
                  <>
                    <span className="large-email-domain-default">email 주소를 선택해주세요.</span>
                    <span className="small-email-domain-default">주소 선택</span>
                  </>
                )}
              </StEmailDomain>
            )}
            {isDropdownOpen && (
              <StDropdownUnorderedList ref={dropdownRef} isdarkmode={`${isDarkMode}`}>
                {emailDomainList.map((domain, index) => (
                  <StDropdownDomainList
                    key={index}
                    onClick={() => onClickDomainOption(domain)}
                    isdarkmode={`${isDarkMode}`}
                  >
                    {domain}
                  </StDropdownDomainList>
                ))}
              </StDropdownUnorderedList>
            )}
            {isDropdownOpen ? <StArrowUpIcon /> : <StArrowDownIcon />}
          </StDomainSelectBar>
        </StEmailInputWrapper>
      </StOutLineDiv>
      {isInvalidEmail && <ErrorMessage errorMessage={errorMessage} />}
    </StEmailContainer>
  );
};

const StEmailContainer = styled.div`
  width: 100%;
`;

const StOutLineDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  padding: 20px;

  border: 1px solid gray;
  border-radius: 10px;
`;

const StLabelContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
  padding-bottom: 5px;
`;

const StJoinedEmailCheckWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StCheckJoinedEmail = styled.input`
  accent-color: ${({ theme }) => theme.color.neonGreen};
  cursor: pointer;
`;

const StJoinedEmailLabel = styled.label`
  font-size: 15px;
  cursor: pointer;

  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 12px;
  }
`;

const StEmailInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StAtMark = styled.span`
  flex-basis: 1;
  color: gray;
  padding: 0 5px;

  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    padding: 0 2.5px;
    font-size: 0.9rem;
  }
`;

const StEmailIDInput = styled.input`
  flex-basis: 1;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.color.paleGray};
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;

  &::placeholder {
    color: #b5b5b5;
  }
`;

const StLargeSizeEmailIDInput = styled(StEmailIDInput)`
  &::placeholder {
    @media screen and (max-width: 1023px) {
      transition: 0.4s;
      font-size: 13px;
    }
    @media screen and (max-width: 940px) {
      font-size: 11px;
    }
  }

  @media screen and (max-width: 865px) {
    display: none;
  }
`;

const StSmallSizeEmailIDInput = styled(StEmailIDInput)`
  display: none;

  @media screen and (max-width: 865px) {
    display: block;

    &::placeholder {
      font-size: 13px;
    }
  }
`;

const StDomainSelectBar = styled.div`
  flex-basis: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.color.paleGray};
  border-radius: 10px;
  padding-right: 5px;
  padding-left: 10px;
  cursor: pointer;
`;

const StDropdownUnorderedList = styled.ul<{ isdarkmode: string }>`
  position: absolute;
  width: 100%;
  background-color: ${({ isdarkmode }) => (isdarkmode === 'true' ? '#191a1d' : 'white')};
  margin-top: 5px;
  top: 100%;
  left: 0;
  border: 1px solid ${({ theme }) => theme.color.paleGray};
  border-radius: 10px;
`;

const StDropdownDomainList = styled.li<{ isdarkmode: string }>`
  cursor: pointer;
  padding: 9px 20px;

  &:hover {
    background-color: ${({ theme, isdarkmode }) =>
      isdarkmode === 'true' ? 'black' : theme.color.lightGray};
  }

  &:first-child {
    padding-top: 17px;
    padding-bottom: 10px;
    border-radius: 10px 10px 0 0;
  }

  &:not(:first-child, :last-child) {
    padding: 10px 20px;

    @media ${({ theme }) => theme.size.mobileColumn} {
      padding: 9px 10px;
    }
  }

  &:last-child {
    border-radius: 0 0 10px 10px;
    padding-top: 10px;
    padding-bottom: 17px;
  }

  @media ${({ theme }) => theme.size.mobileColumn} {
    padding: 9px 10px;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 475px) {
    transition: 0.5s;
    font-size: 0.7rem;
  }
`;

const StEmailDomain = styled.div<{ isselected: string }>`
  font-size: 15px;
  display: flex;

  color: ${({ isselected }) => isselected.length === 0 && '#b5b5b5'};

  & .large-email-domain-default {
    @media screen and (max-width: 850px) {
      transition: 0.5s;
      font-size: 13px;
    }
    @media screen and (max-width: 795px) {
      transition: 0.5s;
      font-size: 11px;
    }
    @media ${({ theme }) => theme.size.mobileRow} {
      transition: 0.5s;
      font-size: 15px;
    }
    @media screen and (max-width: 665px) {
      transition: 0.5s;
      font-size: 13px;
    }
    @media screen and (max-width: 605px) {
      transition: 0.5s;
      font-size: 11px;
    }
    @media screen and (max-width: 585px) {
      display: none;
    }
  }
  & .small-email-domain-default {
    display: none;

    @media screen and (max-width: 585px) {
      display: block;
      transition: 0.5s;
      font-size: 13px;
    }
    @media screen and (max-width: 418px) {
      transition: 0.5s;
      font-size: 0.7rem;
    }
    @media ${({ theme }) => theme.size.smallMobile} {
      transition: 0.5s;
      font-size: 0.6rem;
    }
  }
`;

const StDomainWriteInput = styled.input`
  width: 100%;
  margin-right: 10px;
  border: none;

  &::placeholder {
    color: #b5b5b5;
  }
`;

const iconStyle = `
  font-size: 25px;
  color: gray;
  cursor: pointer;

  @media screen and (max-width: 450px) {
    font-size: 1.2rem;
  }
`;

const StArrowDownIcon = styled(IoIosArrowDown)`
  ${iconStyle}
`;

const StArrowUpIcon = styled(IoIosArrowUp)`
  ${iconStyle}
`;

export default EmailForm;
