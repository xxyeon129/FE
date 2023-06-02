import { PATH_URL } from '@src/constants/constants';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const NoPortfolio = () => {
  const navigate = useNavigate();

  const onClickCreatePortfolioButton = () => {
    navigate(PATH_URL.CREATE_PORTFOLIO);
  };

  return (
    <StNoPortfolioContainer>
      <StNoPortfolioText>
        작성하신 포트폴리오가 없습니다.
        <br />
        폴과 함께 작성해보세요!
      </StNoPortfolioText>
      <StCreatePortfolioButton onClick={onClickCreatePortfolioButton}>
        포트폴리오 작성하기
      </StCreatePortfolioButton>
    </StNoPortfolioContainer>
  );
};

const StNoPortfolioContainer = styled.div`
  /* TODO: Nav, Header에 맞게 뷰포트 조정 필요 */
  width: 90vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StNoPortfolioText = styled.h3`
  text-align: center;
  line-height: 30px;
`;

const StCreatePortfolioButton = styled.button`
  font-size: 20px;
  font-weight: bold;
  background-color: lightgray;
  padding: 10px;
`;

export default NoPortfolio;
