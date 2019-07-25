import React from "react";
import PropTypes from "prop-types";
import Icon from "components/UI/Icon";
import PlaceholderIcon from "icons/file_placeholder.svg";
import styles from "./FilePlaceholder.scss";

const FilePlaceholder = props => (
  <div className={`${styles.filePlaceholder} ${props.prefixClassName}-holder`}>
    <Icon
      className={`${styles.filePlaceholderIcon} ${props.prefixClassName}-icon`}
      src={PlaceholderIcon}
    />
    <div
      className={`${styles.filePlaceholderText} ${props.prefixClassName}-wrapper`}
    >
      <span
        className={`${styles.filePlaceholderTextTitle} ${props.prefixClassName}-title`}
      >
        Upload / Drag & Drop File
      </span>
      <span
        className={`${styles.filePlaceholderTextSubtitle} ${props.prefixClassName}-sub`}
      >
        {`Max File Size: ${props.size ? props.size : 2}MB`}
      </span>
      <span
        className={`${styles.filePlaceholderTextSubtitle} ${props.prefixClassName}-sub-2`}
      >
        Supported Formats: .jpg, .png, .pdf, .docx
      </span>
    </div>
  </div>
);

FilePlaceholder.propTypes = {
  prefixClassName: PropTypes.string,
  size: PropTypes.number,
};

export default FilePlaceholder;
