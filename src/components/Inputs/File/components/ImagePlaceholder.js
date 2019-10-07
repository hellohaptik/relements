import React from "react";
import PropTypes from "prop-types";
import Icon from "components/UI/Icon";
import PlaceholderIcon from "icons/placeholder.svg";
import styles from "./ImagePlaceholder.scss";

const ImagePlaceholder = props => (
  <div
    className={`${styles.imagePlaceholder} ${props.prefixClassName}-wrapper`}
  >
    <Icon
      className={`${styles.imagePlaceholderIcon} ${props.prefixClassName}-icon`}
      src={PlaceholderIcon}
    />
    <div
      className={`${styles.imagePlaceholderText} ${props.prefixClassName}-text-wrapper`}
    >
      <span
        className={`${styles.imagePlaceholderTextTitle} ${props.prefixClassName}-title`}
      >
        Upload / Drag & Drop Image
      </span>
      <span
        className={`${styles.imagePlaceholderTextSubtitle} ${props.prefixClassName}-image-dimensions`}
      >
        {`Dimensions: ${props.dimensions}`}
      </span>
      <span
        className={`${styles.imagePlaceholderTextSubtitle} ${props.prefixClassName}-filesize`}
      >
        {`Max File Size: ${props.maxFileSize}MB`}
      </span>
      <span
        className={`${styles.imagePlaceholderTextSubtitle} ${props.prefixClassName}-format`}
      >
        {`Supported Formats: ${props.type}`}
      </span>
    </div>
  </div>
);

ImagePlaceholder.propTypes = {
  prefixClassName: PropTypes.string,
  maxFileSize: PropTypes.number,
  type: PropTypes.string,
  dimensions: PropTypes.string,
};

export default ImagePlaceholder;
