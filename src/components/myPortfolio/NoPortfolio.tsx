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
  width: 100%;
  height: 80vh;

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
  font-size: 18px;
  margin-top: 15px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.color.neonGreen};
  border-radius: 50px;
  padding: 15px 25px;

  &:hover {
    transition: 0.5s;
    color: white;
    background-color: ${({ theme }) => theme.color.lightGreen};
  }
`;

export default NoPortfolio;
