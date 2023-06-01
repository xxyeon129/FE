import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { portfolioDataState } from '@src/states/SearchResultsState';
import { styled } from 'styled-components';
import { getPage } from '@src/apis/pagenation';
import { searchTermState } from '@src/states/SearchResultsState';

const SearchResults = () => {
  const [portfolioData, setPortfolioData] = useState();
  const searchTermData = useRecoilValue(searchTermState);

  const handlePageButtonClick = async index => {
    const pageData = await getPage(index, searchTermData);
    setPortfolioData(pageData);
    console.log(pageData);
  };
  // 초기 상태일 때는 검색어 x -> handlePageButtonClick => searchTermData 빈값이어서 전체 데이타 불러와지고 ->검색어 입력 searchTermState 변화 -> [searchTermData] 의존성 배열때문에  handlePageButtonClick(1); 실행됨

  // const portfolioDataData = useRecoilValue(portfolioDataState);

  useEffect(() => {
    handlePageButtonClick(1);
  }, [searchTermData]);

  return (
    <div>
      <h1>Search Result</h1>
      {portfolioData && portfolioData.content.length > 0 ? (
        <>
          <h2>'{searchTermData}' 기술 보유 포트폴리오 입니다.</h2>
          {portfolioData.content.map((portfolio, index) => (
            <Stboard key={index}>
              <h3>{portfolio.portfolioTitle}</h3>
              <p>{portfolio.userName}</p>
              <img src={portfolio.userProfileImage} alt="User Profile Image" />
            </Stboard>
          ))}
        </>
      ) : (
        <h2>'{searchTermData}'에 대한 포트폴리오가 없습니다.</h2>
      )}
      {portfolioData &&
        Array.from({ length: portfolioData.totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageButtonClick(index + 1)}>
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default SearchResults;

const Stboard = styled.div`
  border: 1px solid black;
`;
