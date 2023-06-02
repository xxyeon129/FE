import { styled } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.div<{ width?: string }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => (width ? width : '600px')};
  margin-top: 50px;
`;
