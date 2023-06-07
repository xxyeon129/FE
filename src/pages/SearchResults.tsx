import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
// import { portfolioDataState } from '@src/states/SearchResultsState';
import { styled } from 'styled-components';
import { searchPage } from '@src/apis/search';
import { searchTermState } from '@src/states/SearchResultsState';
import { useNavigate } from 'react-router-dom';
import { PortfolioDataType } from '@src/types/portfolioType';
import { ReactComponent as DefaultUserImage } from '@src/assets/nav/nav-default-user-image-icon.svg';
// api 테스트 및 기능 구현 완료

interface PortfolioDataContent {
  id: number;
  userProfileImage?: string;
  userName: string;
  portfolioTitle: string;
}
interface PortfolioData {
  content: PortfolioDataContent[];
  totalPages: number;
}
const SearchResults = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | undefined>();
  const searchTermData = useRecoilValue(searchTermState);
  const navigate = useNavigate();
  const noImageUrl = 'public/images/no-img.jpg';

  const handlePageButtonClick = async (index: number) => {
    const pageData = await searchPage(index, searchTermData);
    setPortfolioData(pageData);
    console.log(pageData);
  };
  // 초기 상태일 때는 검색어 x -> handlePageButtonClick => searchTermData 빈값이어서 전체 데이타 불러와지고 ->검색어 입력 searchTermState 변화 -> [searchTermData] 의존성 배열때문에  handlePageButtonClick(1); 실행됨

  // const portfolioDataData = useRecoilValue(portfolioDataState);

  const onClickHandler = (id: number) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    handlePageButtonClick(1);
  }, [searchTermData]);

  return (
    <>
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
            {/* userProfileImage */}
          </StHeader>
          <StLayout>
            {portfolioData.content.map((portfolio, index) => (
              <StItemContainer key={index} onClick={() => onClickHandler(portfolio.id)}>
                <StImgContainer>
                  {portfolio.portfolioImage ? (
                    <StPortfolioImg src={portfolio.portfolioImage} />
                  ) : (
                    <StNoImg src={noImageUrl} />
                  )}
                </StImgContainer>
                <StDescriptionContainer>
                  <StUserDescriptionContainer>
                    <StUserDefaultImage />
                    <StUserNameText>{portfolio.userName}</StUserNameText>
                  </StUserDescriptionContainer>
                  <StTitleText>{portfolio.portfolioTitle}</StTitleText>
                </StDescriptionContainer>
              </StItemContainer>
            ))}
          </StLayout>
        </>
      ) : (
        <StHeader>
          <h2>'{searchTermData}'에 대한 포트폴리오가 없습니다.</h2>
        </StHeader>
      )}
      {portfolioData &&
        Array.from({ length: portfolioData.totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageButtonClick(index + 1)}>
            {index + 1}
          </button>
        ))}
    </>
  );
};

export default SearchResults;

const StLayout = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
  gap: 36px;
  width: 100%;
  margin-top: 10px;
`;

const StItemContainer = styled.div`
  width: 250px;
  cursor: pointer;
`;

const StImgContainer = styled.div`
  width: 250px;
`;

const imageStyle = `
  width: 100%;
  height: 310px;
  object-fit: cover;
  border: 1px solid;
  border-radius: 7px;
`;

const StPortfolioImg = styled.img`
  width: 100%;
  height: 310px;
  object-fit: cover;
  border: 1px solid;
  border-radius: 7px;
`;

const StNoImg = styled.img`
  width: 100%;
  height: 310px;
  object-fit: cover;
  border: 1px solid;
  border-radius: 7px;
`;

const StDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 3px;
  padding: 7px 10px 10px 10px;
  border: 1px solid;
  border-radius: 13px;
  background: rgba(221, 221, 221, 0.27);
  box-shadow: inset 0px 3px 7px rgba(117, 117, 117, 0.25);
`;

const StTitleText = styled.div`
  font-weight: bold;
  padding-top: 8px;
  color: ${({ theme }) => theme.color.fontColor};
`;

const StUserDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StUserNameText = styled.div`
  padding-left: 7px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.fontColor};
`;

const StUserDefaultImage = styled(DefaultUserImage)`
  width: 22px;
  height: 22px;
`;

const StHeader = styled.div`
  padding: 10px 45px;
`;
