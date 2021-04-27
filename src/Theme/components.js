import React from "react";
import PropTypes from "prop-types";

export const Link = ({ children, href }) => <a href={href}>{children}</a>;
Link.propTypes = { children: PropTypes.node, href: PropTypes.string };

const codeStyle = {
  backgroundColor: "rgb(255 242 180)",
  color: "#ee4602",
  display: "inline",
  padding: "0px 4px",
  margin: "0px 4px",
  fontFamily: "monospace",
  borderRadius: "4px",
  border: "thin solid rgb(255 226 90)",
  fontSize: "inherit",
};
export const InlineCode = ({ children }) => (
  <span style={codeStyle}>{children}</span>
);
InlineCode.propTypes = { children: PropTypes.node };
