import { useResetRecoilState } from 'recoil';
import {
  categoryState,
  filterState,
  selectedCategoryState,
  selectedHeaderState,
} from '@src/states';

const useResetSelectedFilterRecoilValues = () => {
  const resetCategory = useResetRecoilState(categoryState);
  const resetFilter = useResetRecoilState(filterState);
  const resetSelectedCategory = useResetRecoilState(selectedCategoryState);
  const resetSelectedHeader = useResetRecoilState(selectedHeaderState);

  const resetSelectedRecoilValue = () => {
    resetCategory();
    resetFilter();
    resetSelectedCategory();
    resetSelectedHeader();
  };

  return resetSelectedRecoilValue;
};

export default useResetSelectedFilterRecoilValues;
