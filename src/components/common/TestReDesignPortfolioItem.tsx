import { styled } from 'styled-components';
import { PortfolioDataType } from '@src/types/portfolioType';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';
import UserProfileImage from './UserProfileImage';

const TestReDesignPortfolioItem: React.FC<{ item: PortfolioDataType }> = ({ item }) => {
  const noImageUrl = 'public/images/no-img.jpg';
  const isportfolioImageExist = item.portfolioImage !== null;
  const navigate = useNavigate();

  const onClickPortfolioItem = () => {
    navigate(`${PATH_URL.PORTFOLIO_DETAIL}/${item.id}`);
  };

  return (
    <StItemContainer onClick={onClickPortfolioItem}>
      <StImgContainer>
        {isportfolioImageExist ? (
          <StPortfolioImg src={item.portfolioImage} />
        ) : (
          <StNoImg src={noImageUrl} />
        )}
        <StShadow />
        <StDescriptionContainer>
          <StTitle>{item.portfolioTitle}</StTitle>
          <StUserContainer>
            <UserProfileImage imgSrc={item.userProfileImage} size="22px" />
            <StUserNameText>{item.userName}</StUserNameText>
          </StUserContainer>
        </StDescriptionContainer>
      </StImgContainer>
    </StItemContainer>
  );
};

const StItemContainer = styled.div`
  cursor: pointer;
  font-family: 'Lato', sans-serif;

  &:hover {
    transform: scale(1.05);
    transition: 1s ease;
    cursor: pointer;
    z-index: 11;
  }
`;

const StImgContainer = styled.div`
  width: 250px;
  height: 310px;
  position: relative;
`;

const imageStyle = `
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  z-index: -1
`;

const StPortfolioImg = styled.img`
  ${imageStyle}
`;

const StNoImg = styled.img`
  ${imageStyle}
`;

const StDescriptionContainer = styled.div`
  position: absolute;
  bottom: -7%;
  left: 5%;
  z-index: 10;
`;

const StUserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const StUserNameText = styled.div`
  color: white;
  font-size: 15px;
  padding-left: 6px;
`;

const StTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 19px;
`;

const StShadow = styled.div`
  position: relative;
  padding: 50px;
  bottom: 33%;
  width: 100%;
  z-index: 1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.35) 0px -100px 36px -38px inset;
`;

export default TestReDesignPortfolioItem;
