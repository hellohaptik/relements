import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { Theme } from "@src/Theme/Theme";
import GlobalStyle from "@src/fonts/global";

const modes = ["light", "dark"];

const getTheme = mode => ({
  ...Theme,
  colors: {
    ...Theme.colors,
    ...Theme.modes[mode],
  },
});

const Provider = ({ children, mode = modes[0] }) => {
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.string,
};

export default Provider;
