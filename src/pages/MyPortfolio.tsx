import { getMyPortfolio } from '@src/apis/portfolio';
import PortfolioItem from '@src/components/main/PortfolioItem';
import NoPortfolio from '@src/components/myPortfolio/NoPortfolio';
import { PATH_URL } from '@src/constants/constants';
import { PortfolioDataType } from '@src/types/portfolioType';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const MyPortfolio = () => {
  const [myPortfolioList, setMyPortfolioList] = useState<PortfolioDataType[]>([]);
  const navigate = useNavigate();

  const isMyPortfolioExist = myPortfolioList.length !== 0;

  const onClickPortfolio = (portfolioId: number) => {
    navigate(`${PATH_URL.DETAIL}/${portfolioId}`);
  };

  const onClickCreatePortfolioButton = () => {
    navigate(PATH_URL.CREATE_PORTFOLIO);
  };

  useEffect(() => {
    const fetchMyPortfolioData = async () => {
      const myPortfolioData = await getMyPortfolio();
      setMyPortfolioList(myPortfolioData);
    };
    fetchMyPortfolioData();
  }, []);

  return (
    <StMyPortfolioPageContainer>
      <StMyPortfolioPageTitle>My Portfolios</StMyPortfolioPageTitle>
      <StButtonContainer>
        <StCreatePortfolioButton onClick={onClickCreatePortfolioButton}>
          포트폴리오 작성하기
        </StCreatePortfolioButton>
      </StButtonContainer>
      {isMyPortfolioExist ? (
        <StMyPortfolioListContainer>
          {myPortfolioList?.map((portfolio, index) => (
            <PortfolioItem
              key={index}
              item={portfolio}
              onClick={() => onClickPortfolio(portfolio.id)}
            />
          ))}
        </StMyPortfolioListContainer>
      ) : (
        <NoPortfolio />
      )}
    </StMyPortfolioPageContainer>
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

const StMyPortfolioPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StMyPortfolioListContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 2rem;
  margin-top: 3rem;
  width: 100%;
`;

export default MyPortfolio;
