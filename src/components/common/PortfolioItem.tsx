import { styled } from 'styled-components';
import { PortfolioDataType } from '@src/types/portfolioType';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';
import UserProfileImage from './UserProfileImage';
import NoImage from './NoImage';
import useImgLoadError from '@src/Hook/useImgLoadError';

interface PortfolioItemProps {
  item: PortfolioDataType;
  listLength: number;
}

const PortfolioItem = ({ item, listLength }: PortfolioItemProps) => {
  const { imageLoadError, onImageError } = useImgLoadError();

  const navigate = useNavigate();

  const isportfolioImageExist = item.portfolioImage !== null;

  const onClickPortfolioItem = () => {
    navigate(`${PATH_URL.PORTFOLIO_DETAIL}/${item.id}`);
  };

  return (
    <StItemContainer onClick={onClickPortfolioItem} length={listLength}>
      {isportfolioImageExist && !imageLoadError ? (
        <StPortfolioImg src={item.portfolioImage} onError={onImageError} />
      ) : (
        <NoImage height="270px" borderRadius="10px" boxShadow="0px 0px 4px rgba(0, 0, 0, 0.2)" />
      )}
      <StDescriptionContainer>
        <StUserContainer>
          <StUserProfile>
            <UserProfileImage imgSrc={item.userProfileImage} size="25px" />
            <StUserNameText>{item.userName}</StUserNameText>
          </StUserProfile>
          <Stviews>{item.views}</Stviews>
        </StUserContainer>
        <StTitle>{item.portfolioTitle}</StTitle>
      </StDescriptionContainer>
    </StItemContainer>
  );
};

const StItemContainer = styled.div<{ length: number }>`
  cursor: pointer;

  @keyframes scaleUp {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.05);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate3d(0, -20%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  ${({ length }) =>
    Array.from(
      { length: 10 },
      (_, i) => `&:nth-child(${i + 1}) {
        animation-delay: ${i * 0.1}s;
      }`
    ).join('\n')}

  animation: fadeIn 0.3s ease-in both;

  &:hover {
    animation: fadeIn 0.3s ease-in both, scaleUp 1s ease;
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
  justify-content: space-between;
`;

const StUserNameText = styled.div`
  font-size: 14px;
  padding-left: 6px;
`;

const StTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 130%;
`;

const StUserProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Stviews = styled.div`
  font-size: 14px;
  padding-right: 6px;
  color: gray;
`;

export default PortfolioItem;
