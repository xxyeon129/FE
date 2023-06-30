import { css, styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media ${props => props.theme.size.tablet} {
    padding: 0 30px;
    align-items: baseline;
  }

  @media ${({ theme }) => theme.size.smallMobile} {
    height: 120%;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  min-height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonContainer = styled.div<{ width?: string; margintop?: string }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => (width ? width : '750px')};
  ${({ width }) =>
    width === '900px' &&
    css`
      @media screen and (max-width: 1220px) {
        width: 100%;
        padding: 0 20px;
        margin-bottom: 30px;
      }
    `}

  @media ${props => props.theme.size.tablet} {
    width: 100%;
  }
`;

export const StInputLabel = styled.label`
  color: gray;
  font-size: 15px;
  font-weight: 800;
`;

export const PersonalInfoStyle = {
  Container: styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px 20px;
  `,
  Label: styled.label`
    color: gray;
    font-weight: 800;
    font-size: 15px;
  `,
  Input: styled.input`
    width: 100%;
    border: none;
    font-size: 15px;
    &::placeholder {
      color: #b5b5b5;
    }
  `,
};
