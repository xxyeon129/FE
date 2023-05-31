import React from 'react';
import { useRecoilValue } from 'recoil';
import { portfolioDataState } from '@src/states/SearchResultsState';
import { styled } from 'styled-components';

const SearchResults = () => {
  const portfolioData = useRecoilValue(portfolioDataState);
  return (
    <div>
      <h1>Portfolio Page</h1>
      {portfolioData.map((portfolio, index) => (
        <Stboard key={index}>
          <img src={portfolio.portfolioImage} alt="Portfolio Image" />
          <h3>{portfolio.portfolioTitle}</h3>
          <p>{portfolio.userName}</p>
          <img src={portfolio.userProfileImage} alt="User Profile Image" />
        </Stboard>
      ))}
    </div>
  );
};

export default SearchResults;

const Stboard = styled.div`
  border: 1px solid black;
`;
