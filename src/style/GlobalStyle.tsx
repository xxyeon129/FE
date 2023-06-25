import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    font-family: 'SUIT Variable', sans-serif;

    .darkMode{
      background-color: black;
      color: white;
    }
  }

  button{
    cursor: pointer;
    font-family: 'SUIT Variable', sans-serif;
  }

  input, textarea{
    font-family: 'SUIT Variable', sans-serif;
  }
`;

export default GlobalStyle;
