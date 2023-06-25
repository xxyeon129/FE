import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const isDarkModeState = atom<boolean>({
  key: 'isDarkModeState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
