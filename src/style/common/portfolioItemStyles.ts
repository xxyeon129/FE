import { css, styled } from 'styled-components';

export const ItemContainer = styled.div`
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: 1s ease;
    cursor: pointer;
    z-index: 11;
  }
`;

export const PortfolioImg = styled.img<{ myportfolio?: string }>`
  width: 100%;
  height: ${({ myportfolio }) => (myportfolio ? '250px' : '270px')};
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);

  /* ${({ myportfolio }) => myportfolio === 'true' && css``} */
`;

export const Title = styled.div`
  font-weight: 800;
  font-size: 18px;
  line-height: 110%;
`;
