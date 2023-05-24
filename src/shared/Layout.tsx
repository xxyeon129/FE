import TestNav from '@src/components/main/TestNav';
import { styled } from 'styled-components';
import { ReactNode } from 'react';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
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
