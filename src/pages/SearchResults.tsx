import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { searchPage } from '@src/apis/search';
import { searchTermState } from '@src/states/SearchResultsState';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DefaultUserImage } from '@src/assets/nav/nav-default-user-image-icon.svg';
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
  const [selectedPage, setSelectedPage] = useState(1);
  const handlePageButtonClick = async (index: number) => {
    const pageData = await searchPage(index, searchTermData);
    setPortfolioData(pageData);
    setSelectedPage(index);
    console.log(pageData);
  };

  const onClickHandler = (id: number) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    handlePageButtonClick(1);
  }, [searchTermData]);

  return (
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
      <StbuttonContainer>
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
      </StbuttonContainer>
    </StContainer>
  );
};
export default SearchResults;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 50px; /* Add a margin-bottom to create space for the fixed button container */
  overflow-y: auto;
  height: calc(
    100vh - 80px - 50px
  ); /* Subtract the top padding and bottom margin from the full viewport height */
`;

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
  ${imageStyle}
`;

const StNoImg = styled.img`
  ${imageStyle}
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

const StbuttonContainer = styled.div`
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
  margin-left: 250px; /* Add margin-left of 250px */
`;

const StButtonList = styled.div`
  display: flex;
  align-items: center; /* Add align-items: center */
  justify-content: center; /* Add justify-content: center */
  padding: 16px;
  white-space: nowrap;
  font-size: 0;
  text-align: center;
`;

const StButton = styled.button`
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

  /* Add styles for selected button */
  ${({ selected }) =>
    selected &&
    `
    border-color: green;
    color: green;
  `}
`;
