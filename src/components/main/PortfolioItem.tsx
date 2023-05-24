import { PortfolioDataType } from '@src/types/portfolioType';
import { styled } from 'styled-components';
import { ReactComponent as UserImg } from '../../assets/test-profile-icon.svg';

const PortfolioItem = ({ item }: { item: PortfolioDataType }) => {
  return (
    <StItemContainer>
      <StImg src={item.portfolioImg} />
      <StDescriptionLabel>
        <StUserImgContainer>
          <UserImg />
        </StUserImgContainer>
        <StTitleLabel>{item.portfolioTitle}</StTitleLabel>
      </StDescriptionLabel>
    </StItemContainer>
  );
};

const StItemContainer = styled.div`
  border: 1px solid gray;
`;

const StImg = styled.img`
  width: 300px;
`;

const StDescriptionLabel = styled.div`
  display: flex;
  align-items: center;
`;

const StUserImgContainer = styled.div``;

const StTitleLabel = styled.div``;

export default PortfolioItem;
