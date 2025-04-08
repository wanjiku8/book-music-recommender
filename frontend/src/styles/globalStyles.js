import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  body {
    background-color:rgba(245, 245, 245, 0.48);
    color: #333;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
    padding: 20px;
    margin-bottom: 20px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input, textarea, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    background:rgb(255, 158, 2);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
      background:rgb(0, 0, 0);
    }
  }

  .nav {
    display: flex;
    background: #222;
    padding: 15px 0;
    border-bottom: 2px solid #444;

    a {
      color: white;
      text-decoration: none;
      padding: 0 20px;
      font-size: 18px;

      &:hover {
        color:rgb(0, 0, 0);
      }

      &.active {
        color:rgb(175, 76, 76);
        font-weight: bold;
      }
    }
  }
`;