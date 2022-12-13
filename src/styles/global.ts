import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  border: 0;
  autline: 0;
  box-sizing: border-box;

}

:focus{
  outline: 0;
  box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']} ;
}

body {
  background-color: ${(props) => props.theme['gray-800']};
  color: ${(props) => props.theme['gray-100']};
  -webkit-font-smoothing: antialiased; // deixa as fontes mais fininhas e bonitas, padroniza entre os navegadores.
  -webkit-appearance: none;
}

body,
input,
textarea,
button {
  font: 400 1rem 'Roboto', sans-serif;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

@media (max-width: 720px) {
  html {
    font-size: 87.5%;
  }
}
`;
