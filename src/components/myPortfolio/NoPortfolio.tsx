import { PATH_URL } from '@src/constants/constants';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as NotFoundIcon } from '@src/assets/not-found-icon.svg';
import { ReactComponent as NotFoundDarkModeIcon } from '@src/assets/not-found-dark-mode-icon.svg';
import { Button } from '@src/style/common/commonStyles';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';

const NoPortfolio = () => {
  const isDarkMode = useRecoilValue(isDarkModeState);
  const navigate = useNavigate();

  const onClickCreatePortfolioButton = () => {
    navigate(PATH_URL.CREATE_PORTFOLIO);
  };

  return (
    <StNoPortfolio>
      <NotFoundDarkModeIcon />
      {/* {isDarkMode ? <NotFoundDarkModeIcon /> : <NotFoundIcon />} */}
      <StNoPortfolioText>
        작성하신 포트폴리오가 없습니다.
        <br />
        폴과 함께 작성해보세요!
      </StNoPortfolioText>
      <Button
        onClick={onClickCreatePortfolioButton}
        width="250px"
        fontsize="20px"
        padding="15px 0"
        responsivewidth="200px"
        responsivefontsize="18px"
      >
        포트폴리오 작성하기
      </Button>
    </StNoPortfolio>
  );
};

const StNoPortfolio = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StNoPortfolioText = styled.h2`
  text-align: center;
  font-weight: 800;
  line-height: 160%;
  margin-bottom: 35px;

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 18px;
  }
  @media screen and (max-width: 400px) {
    transition: 0.5s;
    font-size: 17px;
  }
  @media ${({ theme }) => theme.size.smallMobile} {
    transition: 0.5s;
    font-size: 15px;
  }
  @media screen and (max-width: 370px) {
    transition: 0.5s;
    font-size: 14px;
  }
`;

export default NoPortfolio;
