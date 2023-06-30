import { ThemeProvider } from 'styled-components';
import MainRouter from './shared/MainRouter';
import { QueryClientProvider, QueryClient } from 'react-query';
import theme from './style/theme';
import GlobalStyle from './style/GlobalStyle';
import './style/reset.css';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from './states/darkModeState';

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className={isDarkMode === true ? 'darkMode' : 'lightMode'}>
          <GlobalStyle />
          <MainRouter />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
