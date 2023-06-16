import { styled } from 'styled-components';
import * as S from '@src/style/common/portfolioItemStyles';
import { PortfolioDataType } from '@src/types/portfolioType';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';
import NoImage from '../common/NoImage';
import { CgClose } from 'react-icons/cg';

interface MyPortfolioItemProps {
  item: PortfolioDataType;
  onClickDeleteIcon: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
}

const MyPortfolioItem = ({ item, onClickDeleteIcon }: MyPortfolioItemProps) => {
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  const isportfolioImageExist = item.portfolioImage !== null;
  const navigate = useNavigate();

  const onClickPortfolioItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`${PATH_URL.PORTFOLIO_DETAIL}/${item.id}`);
  };

  const onImageError = () => {
    setImageLoadError(true);
  };

  return (
    <S.ItemContainer onClick={onClickPortfolioItem}>
      <StImgWrapper>
        {isportfolioImageExist && !imageLoadError ? (
          <>
            <StIconWrapper
              onClick={(e: React.MouseEvent<HTMLDivElement>) => onClickDeleteIcon(e, item.id)}
            >
              <StDeleteIcon />
            </StIconWrapper>
            <S.PortfolioImg
              src={item.portfolioImage}
              onError={onImageError}
              myportfolio="true"
              alt="my portfolio representative image"
            />
          </>
        ) : (
          <NoImage height="270px" borderRadius="10px" boxShadow="0px 0px 4px rgba(0, 0, 0, 0.2)" />
        )}
      </StImgWrapper>
      <StTitleWrapper>
        <S.Title>{item.portfolioTitle}</S.Title>
      </StTitleWrapper>
    </S.ItemContainer>
  );
};

const StTitleWrapper = styled.div`
  margin-top: 10px;
`;

const StImgWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StDeleteIcon = styled(CgClose)`
  font-size: 18px;
`;

const StIconWrapper = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;

  width: 28px;
  height: 28px;
  background-color: white;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  &:hover {
    transition: 0.3s;
    background-color: ${({ theme }) => theme.color.errorRed};
    ${StDeleteIcon} {
      color: white;
    }
  }
`;

export default MyPortfolioItem;
