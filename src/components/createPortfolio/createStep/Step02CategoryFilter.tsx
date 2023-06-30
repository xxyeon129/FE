import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';

import { createCategoryState, createFilterState } from '@src/states/createPortfolioTextState';
import { categoryList } from '@src/constants/portfolioFilteringData';
import { STEP } from '@src/constants/createPortfolioConstants';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';

import * as S from '@src/style/common/createStepStyles';
import SelectDropdown from '../CategorySelectDropdown';
import PortfolioFilter from '../PortfolioFilter';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import useSnackbarPopup from '@src/Hook/useSnackbarPopup';
import SnackbarPopup from '@src/components/common/SnackbarPopup';

const Step02CategoryFilter = ({
  onNextButtonClick,
  onPrevButtonClick,
}: CreatePortfolioStepProps) => {
  const [category, setCategory] = useRecoilState<string>(createCategoryState);
  const [filter, setFilter] = useRecoilState<string>(createFilterState);

  const { isSnackbarVisible, showSnackbarPopup } = useSnackbarPopup();

  const isAllSelected = category.length !== 0 && filter.length !== 0;

  const categoryDropdownOptions = categoryList.slice(1);

  const onClickNextButton = () => {
    if (!isAllSelected) {
      showSnackbarPopup();
      return;
    }
    onNextButtonClick(STEP.THREE);
  };

  const title = '직군과 직무를 선택해주세요';
  const description = '직군 선택 후 직무 확인이 가능합니다.';

  return (
    <S.Container>
      <S.ContentContainer>
        <TitleTextLabel title={title} description={description} containerWidth="750px" />

        <StSelectContainer>
          <StDropdownContainer>
            <SelectDropdown
              dropdownOptions={categoryDropdownOptions}
              selectBarDefaultText="직군 선택"
              selectedOption={category}
              setSelectedOption={setCategory}
            />
          </StDropdownContainer>

          <StFilterContainer>
            <PortfolioFilter
              category={category}
              selectedFilter={filter}
              setSelectedFilter={setFilter}
            />
          </StFilterContainer>
        </StSelectContainer>
      </S.ContentContainer>
      <S.ButtonContainer width="750px">
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.ONE)} />
        <NextStepButton onClick={onClickNextButton} notAllowed={`${!isAllSelected}`} />
      </S.ButtonContainer>
      {isSnackbarVisible && (
        <SnackbarPopup text="직군과 직무를 선택해주세요!" isSnackbarVisible={isSnackbarVisible} />
      )}
    </S.Container>
  );
};

const StSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 750px;

  @media ${({ theme }) => theme.size.tablet} {
    width: 100%;
  }
`;

const StDropdownContainer = styled.div``;

const StFilterContainer = styled.div``;

export default Step02CategoryFilter;
