import React from "react";
import PropTypes from "prop-types";

import Context from "@src/components/Context";
import styles from "./Loader.scss";

const Loader = ({ size, className, prefixClassName }) => {
  const { primaryColor } = React.useContext(Context);
  return (
    <div
      data-testid="loader"
      className={`${styles.loader} ${prefixClassName} ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        data-testid="loader-inner"
        className={`${styles.loaderInner} ${prefixClassName}-inner`}
        viewBox="25 25 50 50"
      >
        <circle
          className="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
          stroke={primaryColor}
        />
      </svg>
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
  size: 32,
  className: "",
  prefixClassName: "",
};

export default Loader;
