import { styled } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.div<{ width?: string; margintop?: string }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => (width ? width : '600px')};
  margin-top: ${({ margintop }) => (margintop ? margintop : '120px')};
`;

export const StInputLabel = styled.div`
  color: gray;
  font-size: 13px;
`;
