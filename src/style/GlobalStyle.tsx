import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    font-family: 'SUIT Variable', sans-serif;

    .darkMode{
      transition: 0.5s;
      background-color: black;
      color: white;

      input, textarea{
        color: white;
      }
    }
  }

  button{
    cursor: pointer;
    font-family: 'SUIT Variable', sans-serif;
  }

  input, textarea{
    font-family: 'SUIT Variable', sans-serif;
    background-color: inherit;
  }
`;

export default GlobalStyle;
