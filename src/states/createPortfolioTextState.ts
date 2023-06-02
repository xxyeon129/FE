import { ProjectDataType } from '@src/types/portfolioType';
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

export const createTechStackState = atom<string[]>({
  key: 'createTechStack',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const createProjectListState = atom<ProjectDataType[]>({
  key: 'createProjectList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const createProjectIdListState = atom<number[]>({
  key: 'createProjectIdList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const createExperienceState = atom<string>({
  key: 'createExperienceState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
