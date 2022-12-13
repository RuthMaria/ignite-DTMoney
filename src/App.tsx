import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

/*
ThemeProvider => aplica as cores em todos os componentes da aplicação
*/
export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>oi</h1>
      <GlobalStyle />
    </ThemeProvider>
  );
};
