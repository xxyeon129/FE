import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@src/shared/ErrorFallback';
import Home from '@src/pages/Home';
import Main from '@src/pages/Main';
import Test from '@src/pages/Test';
import Detail from '@src/pages/Detail';
import MyPage from '@src/pages/MyPage';
import Layout from './Layout';
import SearchResults from '@src/pages/SearchResults';
import PortfolioDetails from '@src/pages/PortfolioDetails';
import MyPortfolio from '@src/pages/MyPortfolio';
import CreatePortfolio from '@src/pages/CreatePortfolio';
import Login from '@src/pages/Login';
import KakaoAuth from '@src/components/auth/KakaoAuth';
import TestKakaoLogin from '@src/components/auth/TestKakaoLogin';
import RedirectionNaver from '@src/components/socialLogin/RedirectionNaver';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Layout>
          <Routes>
            <Route path={PATH_URL.HOME} element={<Home />} />
            <Route path={PATH_URL.MAIN} element={<Main />} />
            <Route path={PATH_URL.DETAIL_PATH} element={<Detail />} />
            <Route path={PATH_URL.TEST} element={<Test />} />
            <Route path={PATH_URL.PORTFOLIODETAIL} element={<PortfolioDetails />} />
            <Route path={PATH_URL.MYPAGE} element={<MyPage />} />
            <Route path={PATH_URL.SEARCHRESULTS} element={<SearchResults />} />
            <Route path={PATH_URL.MY_PORTFOLIO_PATH} element={<MyPortfolio />} />
            <Route path={PATH_URL.CREATE_PORTFOLIO} element={<CreatePortfolio />} />
            <Route path="*" element={<Login />} />
            <Route path={PATH_URL.KAKAO_AUTH} element={<KakaoAuth />} />
            <Route path="/test/kakao" element={<TestKakaoLogin />} />
            <Route path="/api/users/naver" element={<RedirectionNaver />}></Route>
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default MainRouter;
