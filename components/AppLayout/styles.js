import css from "styled-jsx/css";

import { breakpoints, colors, fonts } from "../../styles/theme";

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${colors.primary} 1px, #fdfdfd 1px);
    background-position: 0 0, 25px 25px;
    background-size: 150px 50px;
    padding: 0;
    margin: 0;
    font-family: monospace;
  }
  * {
    box-sizing: border-box;
  }
`;

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }
  button {
    align-items: center;
    background: ${colors.black};
    border-radius: 9999px;
    border: 0;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-size: 16px;
    font-weight: 800;
    padding: 8px 24px;
    transition: opacity 0.3s ease;
  }
  main {
    position: relative;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 100%;
    overflow-y: hidden;
  }
  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`;
