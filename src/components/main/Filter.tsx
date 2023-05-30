import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { filterState } from '@src/states';

interface FilterPropsType {
  filterList: string[];
  onClickFilterButton: (filterKeyword: string) => Promise<void>;
}

const Filter: React.FC<FilterPropsType> = ({ filterList, onClickFilterButton }) => {
  const setFilter = useSetRecoilState<string>(filterState);

  const onClickFilter = (filterKeyword: string) => {
    console.log('필터!!!!', filterKeyword);

    setFilter(filterKeyword);
    onClickFilterButton(filterKeyword);
  };

  return (
    <StFilterListContainer>
      {filterList.map((filterKeyword, filterItemIndex) => (
        <StFilterButton key={filterItemIndex} onClick={() => onClickFilter(filterKeyword)}>
          {filterKeyword}
        </StFilterButton>
      ))}
    </StFilterListContainer>
  );
};

const StFilterListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border: 1px solid gray;
  padding: 3rem;
  width: 80vw;
`;

const StFilterButton = styled.button``;

export default Filter;
