import TestNav from '@src/components/main/testNav';
import { styled } from 'styled-components';
import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StLayout>
      <TestNav />
      <StContent>{children}</StContent>
    </StLayout>
  );
};

const StLayout = styled.div`
  display: flex;
`;

const StContent = styled.div``;

export default Layout;
