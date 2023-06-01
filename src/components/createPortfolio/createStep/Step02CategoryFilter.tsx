import { styled } from 'styled-components';
import SelectDropdown from '../CreateSelectDropdown';
import { categoryList } from '@src/constants/portfolioFilteringData';
import { useRecoilState } from 'recoil';
import { createCategoryState, createFilterState } from '@src/states/createPortfolioTextState';
import PortfolioFilter from '../CreatePortfolioFilter';
import { STEP } from '@src/constants/createPortfolioConstants';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';

const Step02CategoryFilter = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  const [category, setCategory] = useRecoilState(createCategoryState);
  const [filter, setFilter] = useRecoilState(createFilterState);

  const categoryDropdownOptions = categoryList.slice(1);

  const title = '직군과 직무를 선택해주세요';
  const description = '직군 선택 후 직무 확인이 가능합니다.';

  return (
    <Step02Container>
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
      <StButtonContainer>
        <NextStepButton onClick={() => onNextButtonClick(STEP.THREE)} />
      </StButtonContainer>
    </Step02Container>
  );
};

const Step02Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StDropdownContainer = styled.div``;

const StFilterContainer = styled.div``;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 600px;
  margin-top: 50px;
`;

export default Step02CategoryFilter;
