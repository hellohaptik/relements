import React from "react";
import PropTypes from "prop-types";

import Context from "@src/components/Context";
import { ThemedLoaderWrapper, ThemedSvg, ThemedCircle } from "./ThemedLoader";

import styles from "./Loader.scss";

const Loader = props => {
  if (props.themed) {
    const loaderProps = {
      ...props,
      "data-testid": "themedLoader",
    };

    return (
      <ThemedLoaderWrapper {...loaderProps}>
        <ThemedSvg data-testid="themedLoaderInner">
          <ThemedCircle data-testid="themedLoaderCircle" />
        </ThemedSvg>
      </ThemedLoaderWrapper>
    );
  }

  const { primaryColor } = React.useContext(Context);
  return (
    <div
      data-testid="loader"
      className={`${styles.loader} ${props.prefixClassName} ${props.className}`}
      style={{
        width: props.size,
        height: props.size,
      }}
    >
      <svg
        data-testid="loader-inner"
        className={`${styles.loaderInner} ${props.prefixClassName}-inner`}
        viewBox="25 25 50 50"
      >
        <circle
          className="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="3"
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
  themed: PropTypes.bool,
};

Loader.defaultProps = {
  size: 32,
  className: "",
  prefixClassName: "",
  themed: false,
};

export default Loader;
