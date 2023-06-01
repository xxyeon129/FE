import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const createCategoryState = atom<string>({
  key: 'createCategoryState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const createFilterState = atom<string>({
  key: 'createFilterState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const createTitleState = atom<string>({
  key: 'createTitleState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const createEmailState = atom<string>({
  key: 'createEmailState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const createTelephoneState = atom<string>({
  key: 'createTelephoneState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const createResidenceState = atom<string>({
  key: 'createResidenceState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const createLocationState = atom<string>({
  key: 'createLocationState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const createTechStack = atom<string>({
  key: 'createTechStack',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
