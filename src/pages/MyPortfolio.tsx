import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getMyPortfolio } from '@src/apis/portfolio';
import { PortfolioDataType } from '@src/types/portfolioType';
import { PATH_URL } from '@src/constants/constants';
import * as S from '@src/style/common/portfolioStyle';
import PortfolioItem from '@src/components/main/PortfolioItem';
import NoPortfolio from '@src/components/myPortfolio/NoPortfolio';

const MyPortfolio = () => {
  const [myPortfolioList, setMyPortfolioList] = useState<PortfolioDataType[]>([]);
  const [isMyPortfolioExist, setIsMyPortfolioExist] = useState(false);
  const navigate = useNavigate();

  const onClickCreatePortfolioButton = () => {
    navigate(PATH_URL.CREATE_PORTFOLIO);
  };

  useEffect(() => {
    myPortfolioList.length !== 0 && setIsMyPortfolioExist(true);
  }, [myPortfolioList]);

  useEffect(() => {
    const fetchMyPortfolioData = async () => {
      const myPortfolioData = await getMyPortfolio();
      setMyPortfolioList(myPortfolioData);
    };
    fetchMyPortfolioData();
  }, []);

  return (
    <S.PageContainer>
      <StMyPortfolioPageTitle>My Portfolios</StMyPortfolioPageTitle>
      {isMyPortfolioExist ? (
        <StMyPortfolioContainer>
          <StButtonContainer>
            <StCreatePortfolioButton onClick={onClickCreatePortfolioButton}>
              포트폴리오 작성하기
            </StCreatePortfolioButton>
          </StButtonContainer>
          <S.PortfolioListContainer>
            {myPortfolioList?.map((portfolio, index) => (
              <PortfolioItem key={index} item={portfolio} />
            ))}
          </S.PortfolioListContainer>
        </StMyPortfolioContainer>
      ) : (
        <NoPortfolio />
      )}
    </S.PageContainer>
  );
};

const StMyPortfolioPageTitle = styled.h1`
  margin: 0;
  margin-top: 20px;
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 40px;
`;

const StCreatePortfolioButton = styled.button`
  border: 2px solid;
  font-weight: bold;
  border-radius: 50px;
  padding: 5px 10px;
  margin-top: 1.5rem;
`;

const StMyPortfolioContainer = styled.div``;

export default MyPortfolio;
