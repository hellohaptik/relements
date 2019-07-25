import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageProgressBar.scss";

const ImageProgressBar = ({ complete, active, prefixClassName }) => (
  <div
    className={`${styles.progressBar} ${
      active ? styles.active : ""
    } ${prefixClassName}-bar`}
  >
    <div
      className={`${styles.progressBarInner} ${prefixClassName}-bar-inner`}
      style={{ width: `${complete}%` }}
    />
  </div>
);

ImageProgressBar.propTypes = {
  complete: PropTypes.number,
  active: PropTypes.bool,
  prefixClassName: PropTypes.string,
};

export default ImageProgressBar;
