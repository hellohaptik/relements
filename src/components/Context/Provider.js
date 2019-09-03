import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './Context';

const Provider = ({ children, theme }) => {
  return (
    <ThemeContext.Provider value={{ ...theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.shape({}),
};

export default Provider;
