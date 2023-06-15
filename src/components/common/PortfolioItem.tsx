import { styled } from 'styled-components';
import { useState } from 'react';
import { PortfolioDataType } from '@src/types/portfolioType';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';
import UserProfileImage from './UserProfileImage';
import NoImage from './NoImage';

const PortfolioItem: React.FC<{ item: PortfolioDataType }> = ({ item }) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  const isportfolioImageExist = item.portfolioImage !== null;
  const navigate = useNavigate();

  const onClickPortfolioItem = () => {
    navigate(`${PATH_URL.PORTFOLIO_DETAIL}/${item.id}`);
  };

  const onImageError = () => {
    setImageLoadError(true);
  };

  return (
    <StItemContainer onClick={onClickPortfolioItem}>
      {isportfolioImageExist && !imageLoadError ? (
        <StPortfolioImg src={item.portfolioImage} onError={onImageError} />
      ) : (
        <NoImage height="270px" borderRadius="10px" boxShadow="0px 0px 4px rgba(0, 0, 0, 0.2)" />
      )}
      <StDescriptionContainer>
        <StUserContainer>
          <UserProfileImage imgSrc={item.userProfileImage} size="25px" />
          <StUserNameText>{item.userName}</StUserNameText>
        </StUserContainer>
        <StTitle>{item.portfolioTitle}</StTitle>
      </StDescriptionContainer>
    </StItemContainer>
  );
};

const StItemContainer = styled.div`
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: 1s ease;
    cursor: pointer;
    z-index: 11;
  }
`;

const StPortfolioImg = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
`;

const StDescriptionContainer = styled.div`
  margin-top: 15px;
`;

const StUserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const StUserNameText = styled.div`
  font-size: 14px;
  padding-left: 6px;
`;

const StTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 110%;
`;

export default PortfolioItem;
