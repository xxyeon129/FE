import { styled } from 'styled-components';
import { PortfolioDataType } from '@src/types/portfolioType';
import { ReactComponent as UserImg } from '@src/assets/test-profile-icon.svg';

const PortfolioItem: React.FC<{ item: PortfolioDataType }> = ({ item }) => {
  return (
    <StItemContainer>
      <StPortfolioImg src={item.portfolioImage} />
      <StDescriptionLabel>
        <StTitleText>{item.portfolioTitle}</StTitleText>
        <StUserDescriptionContainer>
          <StUserImgContainer>
            <UserImg />
          </StUserImgContainer>
          <StUserNameText>{item.userName}</StUserNameText>
        </StUserDescriptionContainer>
      </StDescriptionLabel>
    </StItemContainer>
  );
};

const StItemContainer = styled.div`
  border: 1px solid gray;
`;

const StPortfolioImg = styled.img`
  width: 300px;
`;

const StDescriptionLabel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
`;

const StTitleText = styled.div`
  font-weight: bold;
`;

const StUserDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

const StUserNameText = styled.div``;

const StUserImgContainer = styled.div``;

export default PortfolioItem;
