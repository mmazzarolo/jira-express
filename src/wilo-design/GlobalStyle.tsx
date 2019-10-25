import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";

import { colorPrimary, colorPrimaryDark } from "./colors";

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  :root {
    --primary-color: ${colorPrimary};
    --primary-dark-color: ${colorPrimaryDark};
  }

  body {
    color: ${colorPrimaryDark};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4;
    background: black;
  }

  p {
    margin: 12px 0 0 0;
  }

`;
