import { createGlobalStyle } from "styled-components";

import ProximaLight from "./ProximaNova-Light.woff2";
import ProximaRegular from "./ProximaNova-Regular.woff2";
import ProximaSemiBold from "./ProximaNova-SemiBold.woff2";
import ProximaBold from "./ProximaNova-Bold.woff2";
import ProximaExtraBold from "./ProximaNova-ExtraBold.woff2";
import ProximaBlack from "./ProximaNova-Black.woff2";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Proxima Nova';
  src: url(${ProximaLight}) format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Proxima Nova';
  src: url(${ProximaRegular}) format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Proxima Nova';
  src: url(${ProximaSemiBold}) format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Proxima Nova';
  src: url(${ProximaBold}) format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Proxima Nova';
  src: url(${ProximaExtraBold}) format('woff2');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Proxima Nova';
  src: url(${ProximaBlack}) format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

`;

export default GlobalStyle;
