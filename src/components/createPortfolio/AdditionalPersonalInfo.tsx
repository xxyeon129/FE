import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { createLocationState, createResidenceState, createTelephoneState } from '@src/states';
import useOnChangeInput from '@src/Hook/useOnChangeInput';

const AdditionalPersonalInfo: React.FC<{ sharedStyle: string }> = ({ sharedStyle }) => {
  const [telephone, setTelephone] = useRecoilState(createTelephoneState);
  const [residence, setResidence] = useRecoilState(createResidenceState);
  const [location, setLocation] = useRecoilState(createLocationState);

  const { onChangeInput: onChangeTelephone } = useOnChangeInput({ setRecoilState: setTelephone });
  const { onChangeInput: onChangeResidence } = useOnChangeInput({ setRecoilState: setResidence });
  const { onChangeInput: onChangeLocation } = useOnChangeInput({ setRecoilState: setLocation });

  const inputList = [
    { label: '전화번호', value: telephone, onChange: onChangeTelephone },
    { label: '거주지', value: residence, onChange: onChangeResidence },
    { label: '희망 근무지역', value: location, onChange: onChangeLocation },
  ];

  return (
    <StAdditionalInfomationOutLineDiv>
      {inputList.map((inputItem, index) => (
        <StAdditionalInfomationItem key={index} sharedstyle={sharedStyle}>
          <StInputDescription>{inputItem.label}</StInputDescription>
          <StPersonalInfoInput
            value={inputItem.value}
            onChange={inputItem.onChange}
            placeholder={`포트폴리오에 표시될 ${inputItem.label}${
              inputItem.label !== '희망 근무지역' ? '를' : '을'
            } 입력해주세요.`}
          />
        </StAdditionalInfomationItem>
      ))}
    </StAdditionalInfomationOutLineDiv>
  );
};

const StAdditionalInfomationOutLineDiv = styled.div`
  width: 100%;
  height: 195px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const StAdditionalInfomationItem = styled.div<{ sharedstyle: string }>`
  ${({ sharedstyle }) => sharedstyle}

  border-bottom: 1px solid gray;

  &:last-child {
    border: none;
  }
`;

const StInputDescription = styled.div`
  color: gray;
  font-size: 15px;
`;

const StPersonalInfoInput = styled.input`
  height: 100%;
  border: none;

  &::placeholder {
    color: #b5b5b5;
  }
`;

export default AdditionalPersonalInfo;
