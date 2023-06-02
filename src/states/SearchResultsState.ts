import { atom } from 'recoil';

export const portfolioDataState = atom({
  key: 'portfolioDataState',
  default: {
    content: [],
  },
});

export const searchTermState = atom({
  key: 'searchTermState',
  default: '',
});
