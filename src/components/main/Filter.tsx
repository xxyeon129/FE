import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { filterState } from '@src/states';

interface FilterPropsType {
  filterList: string[];
  onClickFilterButton: (filterKeyword: string) => Promise<void>;
}

const Filter = ({ filterList, onClickFilterButton }: FilterPropsType) => {
  const [filter, setFilter] = useRecoilState<string>(filterState);

  const onClickFilter = (filterKeyword: string) => {
    setFilter(filterKeyword);
    onClickFilterButton(filterKeyword);
  };

  return (
    <StFilterListContainer>
      {filterList.map((filterKeyword, filterItemIndex) => (
        <StFilterButton
          key={filterItemIndex}
          onClick={() => onClickFilter(filterKeyword)}
          isselected={`${filterKeyword === filter}`}
        >
          {filterKeyword}
        </StFilterButton>
      ))}
    </StFilterListContainer>
  );
};

const StFilterListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 50px 0;
  width: 100%;
`;

const StFilterButton = styled.button<{ isselected: string }>`
  font-size: 16px;
  width: 140px;
  height: 37px;
  border-radius: 50px;
  background-color: ${({ theme, isselected }) =>
    isselected === 'true' ? theme.color.neonGreen : theme.color.lightGray};
  font-weight: ${({ isselected }) => isselected === 'true' && 'bold'};
  font-family: 'Open Sans', sans-serif;
`;

export default Filter;
