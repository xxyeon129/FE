import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { getMyPortfolio } from '@src/apis/portfolio';
import { PortfolioDataType } from '@src/types/portfolioType';
import { PATH_URL } from '@src/constants/constants';
import * as S from '@src/style/common/commonStyles';
import NoPortfolio from '@src/components/myPortfolio/NoPortfolio';
import PortfolioItem from '@src/components/common/PortfolioItem';

const MyPortfolio = () => {
  const [myPortfolioList, setMyPortfolioList] = useState<PortfolioDataType[]>([]);
  const [isMyPortfolioExist, setIsMyPortfolioExist] = useState(false);
  const navigate = useNavigate();

  const onClickCreatePortfolio = () => {
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
          <S.PortfolioListContainer>
            <StCreatePortfolio onClick={onClickCreatePortfolio}>
              <StCreateIconContainer>
                <StCreateIcon />
              </StCreateIconContainer>
              <StCreateText>새 포트폴리오 작성</StCreateText>
            </StCreatePortfolio>
            {myPortfolioList?.map(portfolio => (
              <PortfolioItem key={portfolio.id} item={portfolio} />
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

const StCreatePortfolio = styled.div`
  cursor: pointer;
  border-radius: 7px;
  width: 250px;
  height: 350px;
  background-color: #e6e6e6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StCreateIconContainer = styled.div`
  width: 85px;
  height: 85px;
  border-radius: 50px;
  background-color: #c8c8c8;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StCreateIcon = styled(FaPlus)`
  width: 50px;
  height: 50px;
  color: white;
`;

const StCreateText = styled.div`
  margin-top: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.fontColor};
`;

const StMyPortfolioContainer = styled.div`
  margin: 50px 0;
`;

export default MyPortfolio;
