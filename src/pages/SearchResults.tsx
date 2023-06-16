import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { searchPage } from '@src/apis/search';
import { searchTermState } from '@src/states/SearchResultsState';
import { PortfolioDataType } from '@src/types/portfolioType';
import PortfolioItem from '@src/components/common/PortfolioItem';
import * as S from '@src/style/common/commonStyles';
import { Desktop, DesktopAndTablet, MobileRow, TabletAndMobile } from '@src/style/mediaQuery';

interface PortfolioData {
  content: PortfolioDataType[];
  totalPages: number;
}
interface StButtonProps {
  selected: boolean;
}
const SearchResults = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | undefined>();
  const searchTermData = useRecoilValue(searchTermState);
  const [selectedPage, setSelectedPage] = useState(1);
  const handlePageButtonClick = async (index: number) => {
    const pageData = await searchPage(index, searchTermData);
    setPortfolioData(pageData);
    setSelectedPage(index);
    console.log(pageData);
    console.log(searchTermData);
  };

  // 초기 상태일 때는 검색어 x -> handlePageButtonClick => searchTermData 빈값이어서 전체 데이타 불러와지고 ->검색어 입력 searchTermState 변화 -> [searchTermData] 의존성 배열때문에  handlePageButtonClick(1); 실행됨

  useEffect(() => {
    handlePageButtonClick(1);
  }, [searchTermData]);

  return (
    <>
      <DesktopAndTablet>
        <StContainer>
          <StHeader>
            <h1>Search Result</h1>
          </StHeader>
          {portfolioData && portfolioData.content.length > 0 ? (
            <>
              <StHeader>
                {searchTermData ? (
                  <h2>'{searchTermData}' 기술 보유 포트폴리오 입니다.</h2>
                ) : (
                  <h2>모든 포트폴리오입니다.</h2>
                )}
              </StHeader>
              <StLayout>
                <S.PortfolioListContainer>
                  {portfolioData.content.map(portfolio => (
                    <PortfolioItem key={portfolio.id} item={portfolio} />
                  ))}
                </S.PortfolioListContainer>
              </StLayout>
            </>
          ) : (
            <StHeader>
              <h2>'{searchTermData}'에 대한 포트폴리오가 없습니다.</h2>
            </StHeader>
          )}
          <StButtonContainer>
            {portfolioData &&
              Array.from({ length: portfolioData.totalPages }, (_, index) => (
                <StButtonList key={index + 1}>
                  <StButton
                    onClick={() => handlePageButtonClick(index + 1)}
                    selected={index + 1 === selectedPage}
                  >
                    {index + 1}
                  </StButton>
                </StButtonList>
              ))}
          </StButtonContainer>
        </StContainer>
      </DesktopAndTablet>

      <MobileRow>
        <StContainerMobile>
          <StHeader>
            <h1>Search Result</h1>
          </StHeader>
          {portfolioData && portfolioData.content.length > 0 ? (
            <>
              <StHeader>
                {searchTermData ? (
                  <h2>'{searchTermData}' 기술 보유 포트폴리오입니다.</h2>
                ) : (
                  <h2>모든 포트폴리오입니다.</h2>
                )}
              </StHeader>
              <StLayout>
                <S.PortfolioListContainer>
                  {portfolioData.content.map(portfolio => (
                    <PortfolioItem key={portfolio.id} item={portfolio} />
                  ))}
                </S.PortfolioListContainer>
              </StLayout>
            </>
          ) : (
            <StHeader>
              <h2>'{searchTermData}'에 대한 포트폴리오가 없습니다.</h2>
            </StHeader>
          )}
          <StButtonContainer>
            {portfolioData &&
              Array.from({ length: portfolioData.totalPages }, (_, index) => (
                <StButtonList key={index + 1}>
                  <StButton
                    onClick={() => handlePageButtonClick(index + 1)}
                    selected={index + 1 === selectedPage}
                  >
                    {index + 1}
                  </StButton>
                </StButtonList>
              ))}
          </StButtonContainer>
        </StContainerMobile>
      </MobileRow>
    </>
  );
};
export default SearchResults;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  overflow-y: auto;
  height: calc(100vh - 80px - 50px);

  @media (max-width: 768px) {
    height: calc(100vh - 80px);
  }
`;

const StContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 80px - 50px);
  overflow-y: auto;

  @media (max-width: 768px) {
    display: flex;
    /* padding-left: 30px; */
    align-items: center;
  }
`;

const StLayout = styled.div`
  width: 100%;
  padding: 0 41px;
  margin-top: 10px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const StHeader = styled.div`
  padding: 10px 45px;

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  padding-bottom: 12px;
  border-top: 1px solid rgba(48, 48, 56, 0.1);
  border-top: 1px solid rgba(var(--color-body-rgb), 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100% - 250px);
  background: #fff;
  padding: 0px 0;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin-left: 250px;

  @media (max-width: 768px) {
    width: calc(100% - 82px); /* Adjust the width based on the width of your sidebar */
    margin-left: 82px; /* Adjust the left margin based on the width of your sidebar */
    display: flex;
  }
`;

const StButtonList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  white-space: nowrap;
  font-size: 0;
  text-align: center;
`;

const StButton = styled.button<StButtonProps>`
  box-sizing: border-box;
  position: relative;
  display: block;
  min-width: 30px;
  height: 28px;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 0 7px;
  font-size: 14px;
  font-weight: normal;
  line-height: 26px;
  color: #303038;
  color: var(--color-body);
  text-align: center;

  ${({ selected }) =>
    selected &&
    `
    border-color: green;
    color: green;
  `}
`;
