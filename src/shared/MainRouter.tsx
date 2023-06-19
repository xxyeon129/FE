import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@src/shared/ErrorFallback';
import Layout from './Layout';
import Home from '@src/pages/Home';
import Main from '@src/pages/Main';
import Test from '@src/pages/Test';
import MyPage from '@src/pages/MyPage';
import SearchResults from '@src/pages/SearchResults';
import PortfolioDetails from '@src/pages/PortfolioDetails';
import MyPortfolio from '@src/pages/MyPortfolio';
import CreatePortfolio from '@src/pages/CreatePortfolio';
import Login from '@src/pages/Login';
import RedirectionNaver from '@src/components/socialLogin/RedirectionNaver';
import RedirectionKakao from '@src/components/socialLogin/RedirectionKakao';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Layout>
          <Routes>
            <Route path={PATH_URL.HOME} element={<Home />} />
            <Route path={PATH_URL.MAIN} element={<Main />} />
            <Route path={PATH_URL.TEST} element={<Test />} />
            <Route path={PATH_URL.PORTFOLIODETAIL} element={<PortfolioDetails />} />
            <Route path={PATH_URL.MYPAGE} element={<MyPage />} />
            <Route path={PATH_URL.SEARCHRESULTS} element={<SearchResults />} />
            <Route path={PATH_URL.MY_PORTFOLIO_PATH} element={<MyPortfolio />} />
            <Route path={PATH_URL.CREATE_PORTFOLIO} element={<CreatePortfolio />} />
            <Route path={PATH_URL.KAKAO_AUTH} element={<RedirectionKakao />} />
            <Route path={PATH_URL.NAVER_AUTH} element={<RedirectionNaver />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default MainRouter;
