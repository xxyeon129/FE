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
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 50px 0;
  width: 100%;
`;

const StFilterButton = styled.button`
  font-size: 16px;
  width: 140px;
  height: 37px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.color.lightGray};
`;

export default Filter;
