import React from "react";
import PropTypes from "prop-types";
import Icon from "components/UI/Icon";
import PlaceholderIcon from "icons/placeholder.svg";
import styles from "./ImagePlaceholder.scss";

const ImagePlaceholder = props => (
  <div className={`${styles.imagePlaceholder} ${props.prefixClassName}-holder`}>
    <Icon
      className={`${styles.imagePlaceholderIcon} ${props.prefixClassName}-icon`}
      src={PlaceholderIcon}
    />
    <div
      className={`${styles.imagePlaceholderText} ${props.prefixClassName}-wrapper`}
    >
      <span
        className={`${styles.imagePlaceholderTextTitle} ${props.prefixClassName}-title`}
      >
        Upload / Drag & Drop Image
      </span>
      <span
        className={`${styles.imagePlaceholderTextSubtitle} ${props.prefixClassName}-sub`}
      >
        {`Dimensions: ${props.dimensions ? props.dimensions : "450px X 450px"}`}
      </span>
      <span
        className={`${styles.imagePlaceholderTextSubtitle} ${props.prefixClassName}-sub-2`}
      >
        {`Max File Size: ${props.size ? props.size : 1}MB`}
      </span>
      <span
        className={`${styles.imagePlaceholderTextSubtitle} ${props.prefixClassName}-sub-3`}
      >
        {`Supported Formats: ${props.type ? props.type : ".png, .jpg"}`}
      </span>
    </div>
  </div>
);

ImagePlaceholder.propTypes = {
  prefixClassName: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.string,
  dimensions: PropTypes.string,
};

export default ImagePlaceholder;
