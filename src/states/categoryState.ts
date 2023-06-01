import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const categoryState = atom<string>({
  key: 'categoryState',
  default: 'All',
  effects_UNSTABLE: [persistAtom],
});
