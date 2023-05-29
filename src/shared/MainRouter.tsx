import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '@src/pages/Main';
import Test from '@src/pages/Test';
import Detail from '@src/pages/Detail';
import { PATH_URL } from '@src/constants/constants';
import HyoHwan from '@src/pages/HyoHwan';
import PortfolioDetails from '@src/pages/PortfolioDetails';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH_URL.MAIN} element={<Main />} />
        <Route path={PATH_URL.DETAIL_PATH} element={<Detail />} />
        <Route path={PATH_URL.TEST} element={<Test />} />
        <Route path={PATH_URL.HYO} element={<HyoHwan />} />
        <Route path={PATH_URL.PORTFOLIODETAIL} element={<PortfolioDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
