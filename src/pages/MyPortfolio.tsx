import NoPortfolio from '@src/components/myPortfolio/NoPortfolio';

const MyPortfolio = () => {
  // TODO: 마이포트폴리오 조회

  // TEST CODE: 마이 포트폴리오 없을 경우 임시 코드
  const myPortfolioData = [];

  const isMyPortfolioExist = myPortfolioData.length !== 0;

  return <>{isMyPortfolioExist ? <></> : <NoPortfolio />}</>;
};

export default MyPortfolio;
