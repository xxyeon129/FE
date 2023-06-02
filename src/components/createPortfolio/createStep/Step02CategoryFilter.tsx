import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { categoryList } from '@src/constants/portfolioFilteringData';
import { createCategoryState, createFilterState } from '@src/states/createPortfolioTextState';
import { STEP } from '@src/constants/createPortfolioConstants';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import * as S from '@src/components/common/createPortfolio/createStepStyles';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import SelectDropdown from '../CreateSelectDropdown';
import PortfolioFilter from '../CreatePortfolioFilter';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';

const Step02CategoryFilter = ({
  onNextButtonClick,
  onPrevButtonClick,
}: CreatePortfolioStepProps) => {
  const [category, setCategory] = useRecoilState(createCategoryState);
  const [filter, setFilter] = useRecoilState(createFilterState);

  const isAllSelected = category.length !== 0 && filter.length !== 0;

  const categoryDropdownOptions = categoryList.slice(1);

  const onClickNextButton = () => {
    if (!isAllSelected) return;
    onNextButtonClick(STEP.THREE);
  };

  const title = '직군과 직무를 선택해주세요';
  const description = '직군 선택 후 직무 확인이 가능합니다.';

  return (
    <S.Container>
      <TitleTextLabel title={title} description={description} />

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
      <S.ButtonContainer>
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.ONE)} />
        <NextStepButton onClick={onClickNextButton} notAllowed={`${!isAllSelected}`} />
      </S.ButtonContainer>
    </S.Container>
  );
};

const StSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StDropdownContainer = styled.div``;

const StFilterContainer = styled.div``;

export default Step02CategoryFilter;
