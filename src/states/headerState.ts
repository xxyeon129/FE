import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const selectedHeaderState = atom<boolean>({
  key: 'selectedHeaderState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
