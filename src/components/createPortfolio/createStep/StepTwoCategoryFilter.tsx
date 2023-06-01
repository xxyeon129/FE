import { styled } from 'styled-components';
import SelectDropdown from '../CreateSelectDropdown';
import { categoryList } from '@src/constants/portfolioFilteringData';
import { useRecoilState } from 'recoil';
import { createCategoryState, createFilterState } from '@src/states/createPortfolioTextState';
import PortfolioFilter from '../CreatePortfolioFilter';

interface StepTwoProps {
  onNextButtonClick: (step: string) => void;
}

const StepTwoCategoryFilter = ({ onNextButtonClick }: StepTwoProps) => {
  const [category, setCategory] = useRecoilState(createCategoryState);
  const [filter, setFilter] = useRecoilState(createFilterState);

  const categoryDropdownOptions = categoryList.slice(1);

  return (
    <StepTwoContainer>
      <StTextContainer>
        <StH1TagText>직군과 직무를 선택해주세요</StH1TagText>
        <StDescriptionText>직군 선택 후 직무 확인이 가능합니다.</StDescriptionText>
      </StTextContainer>

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
    </StepTwoContainer>
  );
};

const StepTwoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* TEST CODE */
  /* background-color: lightblue; */
`;

const StTextContainer = styled.div`
  position: relative;
  width: 600px;
  padding-bottom: 50px;
  /* background-color: lightcoral; */
`;

const StH1TagText = styled.h1``;

const StDescriptionText = styled.div`
  color: gray;
`;

const StSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StDropdownContainer = styled.div``;

const StFilterContainer = styled.div``;

export default StepTwoCategoryFilter;
