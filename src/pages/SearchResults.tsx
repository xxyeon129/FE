import React from 'react';
import { useRecoilValue } from 'recoil';
import { portfolioDataState } from '@src/states/SearchResultsState';
import AutoSearch from '@src/components/AutoSearch';
import { styled } from 'styled-components';

const SearchResults = () => {
  const portfolioData = useRecoilValue(portfolioDataState);
  return (
    <div>
      <AutoSearch />
      <h1>Portfolio Page</h1>
      {portfolioData.map((portfolio, index) => (
        <div key={index}>
          <div>{portfolio.portfolioImage}</div>
          <h3>{portfolio.portfolioTitle}</h3>
          <p>{portfolio.userName}</p>
          <p>{portfolio.userProfileImage}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

const Stboard = styled.div`
  border: 1px solid black;
`;
