import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { Theme } from "@src/Theme/Theme";
import GlobalStyle from "@src/fonts/global";

const Provider = ({ children }) => (
  <ThemeProvider theme={Theme}>
    {children}
    <GlobalStyle />
  </ThemeProvider>
);

Provider.propTypes = {
  children: PropTypes.node,
};

export default Provider;
