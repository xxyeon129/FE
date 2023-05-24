import React from 'react';
import { styled } from 'styled-components';

interface FilterPropsType {
  filterList: string[];
  onClickFilterButton: (filterKeyword: string) => Promise<void>;
}

const Filter: React.FC<FilterPropsType> = ({ filterList, onClickFilterButton }) => {
  return (
    <StFilterListContainer>
      {filterList.map((filterKeyword, filterItemIndex) => (
        <StFilterButton key={filterItemIndex} onClick={() => onClickFilterButton(filterKeyword)}>
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
`;

const StFilterButton = styled.button``;

export default Filter;
