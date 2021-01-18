import React from "react";
import themes from "./themes";

// const Context = React.createContext({
//   primaryColor: "#124fa0",
//   fontSize: 14,
// });

const Context = React.createContext({
  ...themes.default,
});

export default Context;
