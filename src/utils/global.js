import {createGlobalStyle} from "styled-components";

export default createGlobalStyle `
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    outline: none;
  }

  html {
    font-size: 62.5%;
    --color-main: ${props => props.theme.colors.main};
    --color-textColor: ${props => props.theme.colors.textColor};
    --color-whiteColor: ${props => props.theme.colors.whiteColor};
    --color-errorRed: ${props => props.theme.colors.errorRed};
    --color-green: ${props => props.theme.colors.green};
    --color-yellow: ${props => props.theme.colors.yellow};
    --color-yellowDark: ${props => props.theme.colors.yellowDark};
    --color-gray: ${props => props.theme.colors.gray};
    --shadow: ${props => props.theme.colors.shadow};

    @media ${props => props.theme.mediaQueries.small} {
      font-size: 60%;
    }

    @media ${props => props.theme.mediaQueries.smallest} {
      font-size: 55%;
    }
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.5;
    overflow-x: hidden;
  }

  a, input, textarea, button, select {
    font-family: inherit;
    text-decoration: none;
    transition: .3s all;
  }

  a, button{
    cursor: pointer;
  }

  a{
    color: var(--color-main);
    &:hover{
      color: var(--color-yellow);
    }
  }
  
  button {
    border: none!important;
  }
`;
