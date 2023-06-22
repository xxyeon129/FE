import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { createEmailDomainState, createEmailIdState, createEmailState } from '@src/states';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import ErrorMessage from '../common/createPortfolio/ErrorMessage';
import useOnChangeInput from '@src/Hook/useOnChangeInput';
import useCloseDropdown from '@src/Hook/useCloseDropdown';
import useDecodeJWT from '@src/Hook/useDecodeJWT';

interface EmailFormProps {
  isInvalidEmail: boolean;
  errorMessage: string | boolean;
}

const EmailForm = ({ isInvalidEmail, errorMessage }: EmailFormProps) => {
  const setEmail = useSetRecoilState(createEmailState);
  const [emailIdValue, setEmailIdValue] = useRecoilState<string>(createEmailIdState);
  const [emailDomainValue, setEmailDomainValue] = useRecoilState<string>(createEmailDomainState);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSelectWriteDomain, setIsSelectWriteDomain] = useState<boolean>(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  const { dropdownRef, onClickOutside } = useCloseDropdown({ isDropdownOpen, setIsDropdownOpen });

  const { onChangeInput: onChangeEmailIdValue } = useOnChangeInput({
    setRecoilState: setEmailIdValue,
  });

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
      setEmailDomainValue('');
      setIsSelectWriteDomain(true);
      return;
    }
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
            <StCheckJoinedEmail type="checkbox" id="check" onChange={onChangeJoinedEmailCheckbox} />
            <StJoinedEmailLabel htmlFor="check">가입한 email로 입력</StJoinedEmailLabel>
          </StJoinedEmailCheckWrapper>
        </StLabelContainer>
        <StEmailInputWrapper>
          <StEmailIDInput
            id="email"
            value={emailIdValue}
            onChange={onChangeEmailIdValue}
            placeholder="포트폴리오에 표시될 email ID를 입력해주세요."
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
              <StemailDomain isselected={emailDomainValue}>
                {emailDomainValue || 'email 주소를 선택해주세요.'}
              </StemailDomain>
            )}
            {isDropdownOpen && (
              <StDropdownUnorderedList ref={dropdownRef}>
                {emailDomainList.map((domain, index) => (
                  <StDropdownDomainList key={index} onClick={() => onClickDomainOption(domain)}>
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
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  padding: 10px;

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

const StInputLabel = styled.label`
  color: gray;
  font-weight: 800;
  font-size: 15px;
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
`;

const StEmailInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StAtMark = styled.span`
  flex-basis: 1;
  color: gray;
  padding: 0 5px;
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

const StDropdownUnorderedList = styled.ul`
  position: absolute;
  width: 100%;
  background-color: white;
  margin-top: 5px;
  top: 100%;
  left: 0;
  border: 1px solid ${({ theme }) => theme.color.paleGray};
  border-radius: 10px;
`;

const StDropdownDomainList = styled.li`
  cursor: pointer;
  padding: 9px 20px;

  &:hover {
    background-color: ${({ theme }) => theme.color.lightGray};
  }

  &:first-child {
    padding-top: 17px;
    padding-bottom: 10px;
    border-radius: 7px 7px 0 0;
  }

  &:not(:first-child, :last-child) {
    padding: 10px 20px;
  }

  &:last-child {
    border-radius: 0 0 7px 7px;
    padding-top: 10px;
    padding-bottom: 17px;
  }
`;

const StemailDomain = styled.div<{ isselected: string }>`
  font-size: 15px;

  color: ${({ isselected }) => isselected.length === 0 && '#b5b5b5'};
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
`;

const StArrowDownIcon = styled(IoIosArrowDown)`
  ${iconStyle}
`;

const StArrowUpIcon = styled(IoIosArrowUp)`
  ${iconStyle}
`;

export default EmailForm;
