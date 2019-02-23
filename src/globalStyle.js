import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  a {
    color: #000;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: normal;
  }

  input {
    -webkit-appearance: none;
       -moz-appearance: none;
        -ms-appearance: none;
         -o-appearance: none;
            appearance: none;
    margin: 0;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    background-color: transparent;
  }

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  * {
    box-sizing: border-box;
  }

  /////////////////////////
  // (begin) button reset
  //  from: https://gist.github.com/anthonyshort/552543

  button,
  input[type=button] {
    margin:0;
    border:0;
    padding:0;
    display:inline-block;
    vertical-align:middle;
    white-space:normal;
    background:none;
    line-height:1;

    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;

    overflow:visible;
    width:auto;
  }

  button:focus {
    outline:0;
  }

  ::-webkit-file-upload-button
  { 
    padding:0;
    border:0;
    background:none;
  }

  // (end) button reset
  ///////////////////////

  html, body, #root {
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
