import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const filterState = atom<string>({
  key: 'filterState',
  default: 'All',
  effects_UNSTABLE: [persistAtom],
});
