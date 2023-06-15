import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${props => props.theme.size.tablet} {
    padding: 0 30px;
    align-items: baseline;
  }
`;

export const ButtonContainer = styled.div<{ width?: string; margintop?: string }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => (width ? width : '600px')};
  margin-top: ${({ margintop }) => (margintop ? margintop : '120px')};

  @media ${props => props.theme.size.tablet} {
    width: 100%;
  }
`;

export const StInputLabel = styled.div`
  color: gray;
  font-size: 13px;
`;
