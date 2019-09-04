import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageProgressBar.scss";

const ImageProgressBar = props => (
  <div
    className={`${styles.progressBar} ${props.active ? styles.active : ""} ${
      props.prefixClassName
    }-wrapper`}
  >
    <div
      className={`${styles.progressBarInner} ${props.prefixClassName}-bar`}
      style={{ width: `${props.complete}%` }}
    />
  </div>
);

ImageProgressBar.propTypes = {
  complete: PropTypes.number,
  active: PropTypes.bool,
  prefixClassName: PropTypes.string,
};

export default ImageProgressBar;
