/* eslint-disable react/no-multi-comp */
import React from "react";
import PropTypes from "prop-types";

import Digit from "./components/Digit";
import styles from "./Odometer.scss";

const Odometer = ({
  children,
  fontSize,
  onClick,
  innerRef,
  className,
  prefixClassName,
}) => {
  let string = children;
  if (!string) return null;
  string = typeof string === "number" ? string.toString() : string;
  string = Array.isArray(string) ? string.join("") : string;

  return (
    <span
      data-testid="odometer"
      style={{ fontSize, height: `${fontSize}px` }}
      ref={innerRef}
      onClick={onClick}
      className={`${styles.odometer} ${className} ${prefixClassName}`}
    >
      {string.split("").map((letter, i) => {
        if (!Number.isNaN(parseInt(letter, 10))) {
          return (
            <Digit
              fontSize={fontSize}
              value={string}
              key={i}
              className={`${prefixClassName}-digit`}
            >
              {parseInt(letter, 10)}
            </Digit>
          );
        }
        return (
          <span
            style={{ lineHeight: `${fontSize}px` }}
            className={`${prefixClassName}-digit-value`}
          >
            {letter}
          </span>
        );
      })}
    </span>
  );
};

Odometer.propTypes = {
  /** The classname to be appended to the outermost element */
  className: PropTypes.string,
  /** prefix to be appended to the child elements */
  prefixClassName: PropTypes.string,
  /** Onclick function */
  onClick: PropTypes.func,
  /** Reference hook for span */
  innerRef: PropTypes.func,
  /** Other children to render */
  children: PropTypes.node,
  /** Font size of letter inside odometer */
  fontSize: PropTypes.number,
};

Odometer.defaultProps = {
  fontSize: 16,
  className: "",
  prefixClassName: "",
  onClick: () => {},
  innerRef: () => {},
};

Odometer.classNames = {
  $prefix: "Outermost element",
  "$prefix-digit-wrapper": "Element wrapping the value",
  "$prefix-digit-value": "Value element in Odometer",
};

export default Odometer;
