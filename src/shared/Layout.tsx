import TestNav from '@src/shared/Nav';
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

const StContent = styled.div`
  width: 100%;
`;

export default Layout;
