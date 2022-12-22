import { ThemeProvider } from 'styled-components';
import { Transactions } from './pages/Transactions';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';
import { TransactionsProvider } from './contexts/TransactionsContext';
/*
ThemeProvider => aplica as cores em todos os componentes da aplicação
*/
export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  );
};
