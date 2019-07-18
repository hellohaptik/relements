import React from "react";
import PropTypes from "prop-types";

import styles from "./Loader.scss";

const Loader = ({ size, className, prefixClassName }) => {
  return (
    <div
      data-testid="loader"
      className={`${styles.loader} ${prefixClassName} ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        data-testid="inner-loader"
        className={`${styles.loaderInner} ${prefixClassName}-inner`}
      />
    </div>
  );
};

Loader.propTypes = {
  /** Size of the loader to be shown */
  size: PropTypes.number,
  /** The classname to be appended to the outermost element */
  className: PropTypes.string,
  /** prefix to be appended before classname to the child elements */
  prefixClassName: PropTypes.string,
};

Loader.defaultProps = {
  size: 40,
  className: "",
  prefixClassName: "",
};

export default Loader;
