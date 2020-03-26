import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    font: 400 14px Roboto,sans-serif;
    background-color: #f0f0f5;
    -webkit-font-smoothing: antialiased;
  }

  input, button, textarea {
    font: 400 14px Roboto,sans-serif;
  }

  button {
    cursor: pointer;
  }

  form input {
    width: 100%;
    height: 60px;
    color: #333;
    border: 1px solid #dcdce6;
    background-color: #fff;
    border-radius: 8px;
    padding: 0 24px;
  }

  form textarea {
    width: 100%;
    min-height: 140px;
    color: #333;
    border: 1px solid #dcdce6;
    background-color: #fff;
    border-radius: 8px;
    padding: 16px 24px;
    line-height: 24px;
    resize: vertical;
  }

  .button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 60px;
    margin-top: 16px;
    border: 0;
    border-radius: 8px;
    
    background-color: #e02041;
    color: #fff;
    font-weight: 700;
    font-size: 18px;
    text-decoration: none;
    transition: filter .2s linear;

    :hover {
      filter: brightness(90%);
    }
  }

  .back-link {
    display: flex;
    align-items: center;
    margin-top: 40px;
    color: #41414d;
    font-size: 18px;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s linear;
    opacity: 1;

    svg {
      margin-right: 8px;
    }

    :hover {
      opacity: 0.7;
    }
  }
`;
