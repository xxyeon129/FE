import { SetterOrUpdater } from 'recoil';

const useOnChangeInput = (setRecoilState: SetterOrUpdater<string>) => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRecoilState(() => e.target.value);
  };

  return {
    onChangeInput,
  };
};

export default useOnChangeInput;
