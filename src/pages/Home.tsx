import { styled } from 'styled-components';
import { ReactComponent as Logo } from '@src/assets/logo.svg';
import { ReactComponent as BackgroundIcon } from '@src/assets/home-background-icon.svg';
import { PATH_URL } from '@src/constants/constants';
import theme from '@src/style/theme';
import { Link } from 'react-router-dom';

const Home = () => {
  const buttonList = [
    { value: '개발자', color: theme.color.neonGreen },
    { value: '디자이너', color: theme.color.skyBlue },
    { value: '포토그래퍼', color: theme.color.blueGreen },
  ];

  return (
    <StHome>
      <StIntroContainer>
        <StIntroTextContainer>
          <StIntroText>개발자, 디자이너, 포토그래퍼가 이용하는</StIntroText>
          <StIntroTitle>포트폴리오 공유 서비스</StIntroTitle>
        </StIntroTextContainer>
        <StLogo />
        <StButtonContainer>
          {buttonList.map((button, index) => (
            <Link to={PATH_URL.MAIN}>
              <StButton color={button.color}>{button.value} 포트폴리오 둘러보기</StButton>
            </Link>
          ))}
        </StButtonContainer>
        <StShadow />
        <StBackgroundIcon />
      </StIntroContainer>
      <StListContainer>
        <StTextLabel>지금 뜨는 포트폴리오</StTextLabel>
      </StListContainer>
    </StHome>
  );
};

const StHome = styled.div`
  width: 100%;
  height: 100%;
`;

const StIntroContainer = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const StIntroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const StIntroText = styled.p`
  font-size: 25px;
  margin-bottom: 15px;
`;

const StIntroTitle = styled.h1`
  font-weight: 900;
  font-size: 40px;
`;

const StLogo = styled(Logo)`
  width: 223px;
  height: 68px;
  z-index: 1;
`;

const StButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1;
`;

const StButton = styled.button<{ color: string }>`
  width: 280px;
  background-color: ${({ color }) => color};
  font-weight: 800;
  font-size: 18px;
  border-radius: 10px;
  padding: 12px 25px;
`;

const StShadow = styled.div`
  position: absolute;
  width: calc(100% - 270px);
  top: 370px;
  background: linear-gradient(180deg, #ffffff -5.06%, rgba(255, 255, 255, 0) 150%);
  transform: rotate(-180deg);
  padding: 250px;
  z-index: 0.1;
`;

const StBackgroundIcon = styled(BackgroundIcon)`
  position: absolute;
  top: 367px;
  margin-left: 570px;

  z-index: -1;
`;

const StTextLabel = styled.h2`
  font-weight: 900;
`;

const StListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 41px;
  margin-top: 50px;
`;

export default Home;
