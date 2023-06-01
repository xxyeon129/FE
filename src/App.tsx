import { ThemeProvider } from 'styled-components';
import MainRouter from './shared/MainRouter';
import { QueryClientProvider, QueryClient } from 'react-query';
import theme from './style/theme';
import GlobalStyle from './style/GlobalStyle';
import './style/reset.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
