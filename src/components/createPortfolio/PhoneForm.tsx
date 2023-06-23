import { PersonalInfoStyle } from '@src/style/common/createStepStyles';

const PhoneForm = () => {
  return (
    <PersonalInfoStyle.Container>
      <PersonalInfoStyle.Label>전화번호 (-)제외</PersonalInfoStyle.Label>
      <PersonalInfoStyle.Input
        type="tel"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        placeholder="포트폴리오에 표시될 전화번호를 입력해주세요."
      />
    </PersonalInfoStyle.Container>
  );
};

export default PhoneForm;
