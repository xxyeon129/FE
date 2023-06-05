import Nav from '@src/shared/Nav';
import { styled } from 'styled-components';
import { ReactNode } from 'react';
import Header from './Header';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StLayout>
      <Nav />
      <Header />
      <StContent>{children}</StContent>
    </StLayout>
  );
};

const StLayout = styled.div`
  display: flex;
`;

const StContent = styled.div`
  margin-left: 250px;
  margin-top: 52px;
  width: calc(100% - 250px);
`;

export default Layout;
