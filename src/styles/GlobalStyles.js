import styled, { createGlobalStyle } from 'styled-components';
import * as color from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    background-color: #DCF2F1;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  html, body, #root {
    height: 100%;
  }

  h1 {
    text-align: center;
    color: ${color.secColor};
    font-size: 30px;
  }

  button {
    background: ${color.buttonColor};
    color: #fff;
    border: none;
    border-radius: 50vh;
    padding: 8px 15px;
    cursor: pointer;
    margin: 5px 5px;
    transition: all 0.1s;

    &:hover {
      opacity: 0.97;
    }

    &:focus {
      filter: brightness(80%);
    }
  }

  a {
    text-decoration: none;
    color: #2C50FF;
  }
  a:hover {
    opacity: 0.7;
  }

  ul {
    list-style: none;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background-color: #0F2C59;
    color: green;
    font-weight: bold;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background-color: #0F2C59;
    color: red;
    font-weight: bold;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast .Toastify__close-button {
    color: white;
    opacity: 0.9;
  }
`;

export const Container = styled.section`
  min-width: 20%;
  max-width: 99%;
  background: ${color.primaryColor};
  margin: 7px auto;
  border-radius: 4px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
`;
