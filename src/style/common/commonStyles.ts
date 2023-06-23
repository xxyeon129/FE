import { css, styled } from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 41px;
  width: 100%;
  height: 100%;
`;

export const PortfolioListContainer = styled.div<{ ismyportfolio?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  grid-auto-rows: min-content;
  row-gap: 60px;
  column-gap: 50px;
  width: 100%;
  margin-top: 10px;

  ${({ ismyportfolio }) =>
    ismyportfolio &&
    css`
      row-gap: 30px;
    `}
`;

export const Button = styled.button<{
  width: string;
  fontsize: string;
  padding: string;
  fontweight?: string;
  color?: string;
  hovercolor?: string;
  responsivewidth?: string;
  responsivefontsize?: string;
}>`
  display: flex;
  justify-content: center;
  border-radius: 8px;

  width: ${({ width }) => width};
  background-color: ${({ theme, color }) => (color ? color : theme.color.neonGreen)};
  font-weight: ${({ fontweight }) => (fontweight ? fontweight : '800')};
  font-size: ${({ fontsize }) => fontsize};
  padding: ${({ padding }) => padding};

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    width: ${({ responsivewidth }) => responsivewidth};
    font-size: ${({ responsivefontsize }) => responsivefontsize};
  }

  &:hover {
    transition: 0.5s;
    background-color: ${({ theme, hovercolor }) =>
      hovercolor ? hovercolor : theme.color.lightGreen};
    color: white;
  }
`;

export const ModalStyle = {
  Background: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
  `,
  Container: styled.div`
    width: 420px;
    height: 530px;
    border-radius: 30px;
    background-color: white;
    padding: 90px 50px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 2rem;

    @media ${({ theme }) => theme.size.mobileRow} {
      transition: 0.5s;
      width: 400px;
      height: 510px;
    }
    @media screen and (max-width: 600px) {
      transition: 0.5s;
      width: 370px;
      height: 480px;
    }
    @media screen and (max-width: 520px) {
      transition: 0.5s;
      width: 330px;
      height: 440px;
    }

    @media ${({ theme }) => theme.size.mobileColumn} {
      transition: 0.5s;
      width: 280px;
      height: 390px;
    }
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;

    @media ${({ theme }) => theme.size.mobileColumn} {
      transition: 0.5s;
      gap: 2rem;
    }
  `,
  MainText: styled.h2<{ type?: string }>`
    font-weight: 800;

    ${({ type }) =>
      type === 'multiline' &&
      css`
        @media screen and (max-width: 600px) {
          transition: 0.5s;
          font-size: 20px;
        }
        @media screen and (max-width: 520px) {
          transition: 0.5s;
          font-size: 18px;
        }
      `}
    @media ${({ theme }) => theme.size.mobileColumn} {
      transition: 0.5s;
      font-size: ${({ type }) => (type === 'multiline' ? '14px' : '20px')}; //14px;
    }
  `,
  SubText: styled.span`
    font-weight: 500;
    white-space: pre-wrap;
    line-height: 150%;
    text-align: center;
    @media ${({ theme }) => theme.size.mobileColumn} {
      transition: 0.5s;
      font-size: 13px;
    }
  `,
  TextWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    gap: 1rem;
  `,
};
