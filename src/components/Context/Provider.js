import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { Theme } from "@src/Theme/Theme";

const Provider = ({ children }) => (
  <ThemeProvider theme={Theme}>{children}</ThemeProvider>
);

Provider.propTypes = {
  children: PropTypes.node,
};

export default Provider;
