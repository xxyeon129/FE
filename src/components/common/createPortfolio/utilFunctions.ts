import { SetterOrUpdater } from 'recoil';

export const onChangeInput = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setRecoilState: SetterOrUpdater<string>
) => {
  setRecoilState(() => e.target.value);
};
